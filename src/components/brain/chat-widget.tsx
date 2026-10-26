"use client";

// ChatWidget — conversational grounded Q&A over Project Brain OS memory.
//
// Blueprint alignment ("Real-time Chat Integration" + "Core Feature Enablement"):
//   - streaming: answers arrive over NDJSON from /api/ask/stream — progress
//     stages (searching → reading sources → synthesizing) render live, and
//     token-level deltas stream in for Ollama/OpenAI backends;
//   - persistence: every thread is stored per project (GET/DELETE /api/chat)
//     via TanStack Query, so conversations survive reloads;
//   - markdown: assistant answers render through react-markdown (safe by
//     default — raw HTML is never evaluated, keeping the XSS contract);
//   - honesty contract (v2.1 parity): no live LLM => evidence excerpts only,
//     explicitly badged. Never a fabricated answer.

import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import { BookOpen, Eraser, Send, Sparkles, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiDelete, apiGet } from "@/lib/api-client";
import { queryClient } from "@/lib/query-client";
import type { ChatRecord, GroundedSource, GroundedStreamEvent } from "@/lib/brain/types";
import { trackEvent } from "@/lib/telemetry";
import { shortTime } from "./ui-shared";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: string;
  mode?: "ask" | "synthesize";
  llmUsed?: boolean;
  grounded?: boolean;
  sources?: GroundedSource[];
  failed?: boolean;
  pending?: boolean;
}

interface ChatWidgetProps {
  /** Resolved project id — empty string searches the whole vault (Inbox thread). */
  projectId: string;
  className?: string;
}

const SUGGESTIONS = [
  "How did we fix the last deployment error?",
  "Which decisions must the AI respect here?",
  "Summarize this project's recent work",
];

let chatSeq = 0;
const nextId = () => `live-${Date.now()}-${chatSeq++}`;

const recordToMessage = (r: ChatRecord): ChatMessage => ({
  id: r.id,
  role: r.role,
  content: r.content,
  ts: r.created_at,
  mode: r.mode === "synthesize" ? "synthesize" : "ask",
  llmUsed: r.llm_used,
  grounded: r.grounded,
  sources: r.sources,
});

/** Safe markdown styling — raw HTML is never evaluated by react-markdown. */
const markdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="whitespace-pre-wrap text-xs leading-relaxed">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="ml-4 list-disc space-y-0.5 text-xs leading-relaxed">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="ml-4 list-decimal space-y-0.5 text-xs leading-relaxed">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => <li className="pl-0.5">{children}</li>,
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">{children}</code>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="brain-scroll overflow-x-auto rounded-lg border border-border bg-muted/50 p-2 text-[10px] leading-relaxed">
      {children}
    </pre>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="text-primary-300 underline underline-offset-2"
    >
      {children}
    </a>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
};

export const ChatWidget = ({ projectId, className = "" }: ChatWidgetProps) => {
  const { toast } = useToast();
  const threadKey = projectId || "inbox";

  // ---- persisted history (TanStack Query = server state, blueprint §5) ----
  const history = useQuery({
    queryKey: ["chat-history", threadKey],
    queryFn: () =>
      apiGet<{ messages: ChatRecord[] }>(`/api/chat?project_id=${encodeURIComponent(projectId)}`),
    staleTime: 60_000,
  });

  const [live, setLive] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Thread switched (project changed): drop any in-flight local exchange.
  useEffect(() => {
    setLive([]);
    setStage(null);
    setBusy(false);
  }, [threadKey]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [live, stage, history.data]);

  const messages: ChatMessage[] = [
    ...(history.data?.messages ?? []).map(recordToMessage),
    ...live,
  ];

  const run = useCallback(
    async (mode: "ask" | "synthesize", rawQuery?: string) => {
      const query = (rawQuery ?? input).trim();
      if (!query || busy) return;
      setBusy(true);
      setInput("");
      setStage("searching vault evidence…");
      const userLiveId = nextId();
      setLive((l) => [...l, { id: userLiveId, role: "user", content: query, ts: new Date().toISOString() }]);

      let assistantId: string | null = null;
      const ensureAssistant = () => {
        if (assistantId === null) {
          assistantId = nextId();
          setLive((l) => [
            ...l,
            { id: assistantId!, role: "assistant", content: "", ts: new Date().toISOString(), mode, pending: true },
          ]);
        }
        return assistantId;
      };
      const patchAssistant = (patch: Partial<ChatMessage>) => {
        const id = ensureAssistant();
        setLive((l) => l.map((m) => (m.id === id ? { ...m, ...patch } : m)));
      };

      try {
        const res = await fetch("/api/ask/stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ query, project_id: projectId, mode }),
        });
        if (!res.ok || !res.body) {
          const errBody = (await res.json().catch(() => null)) as { error?: string } | null;
          throw new Error(errBody?.error ?? `Grounded stream -> ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buf = "";
        let sources: GroundedSource[] = [];
        let partial = "";
        let doneInfo = { llm_used: false, grounded: false };

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.trim()) continue;
            let ev: GroundedStreamEvent;
            try {
              ev = JSON.parse(line) as GroundedStreamEvent;
            } catch {
              continue; // partial line — next chunk completes it
            }
            if (ev.type === "status") {
              setStage(ev.detail ?? ev.stage);
            } else if (ev.type === "sources") {
              sources = ev.sources;
              setStage(`reading ${ev.sources.length} source(s)…`);
            } else if (ev.type === "delta") {
              partial += ev.text;
              setStage(null);
              patchAssistant({ content: partial });
            } else if (ev.type === "done") {
              setStage(null);
              doneInfo = { llm_used: ev.llm_used, grounded: ev.grounded };
              trackEvent("chat_answer", { mode, llm_used: ev.llm_used, grounded: ev.grounded });
              patchAssistant({
                content: ev.answer,
                pending: false,
                llmUsed: ev.llm_used,
                grounded: ev.grounded,
                sources,
              });
            } else if (ev.type === "saved") {
              // Server persisted both sides — flush them into the query cache so
              // the history stays authoritative, then drop the live buffer.
              // Idempotence guard: React StrictMode may double-invoke updater
              // functions, so a flush that already landed is a no-op.
              const now = new Date().toISOString();
              const flushedSources = sources;
              const flushedContent = partial;
              queryClient.setQueryData<{ messages: ChatRecord[] }>(
                ["chat-history", threadKey],
                (old) => {
                  const existing = old?.messages ?? [];
                  if (existing.some((m) => m.id === ev.message_id)) return { messages: existing };
                  return {
                    messages: [
                      ...existing,
                      {
                        id: ev.user_message_id,
                        project_id: projectId || null,
                        role: "user" as const,
                        content: query,
                        mode,
                        llm_used: false,
                        grounded: false,
                        sources: [] as GroundedSource[],
                        created_at: now,
                      },
                      {
                        id: ev.message_id,
                        project_id: projectId || null,
                        role: "assistant" as const,
                        content: flushedContent,
                        mode,
                        llm_used: doneInfo.llm_used,
                        grounded: doneInfo.grounded,
                        sources: flushedSources,
                        created_at: now,
                      },
                    ],
                  };
                },
              );
              setLive([]);
            } else if (ev.type === "error") {
              throw new Error(ev.error);
            }
          }
        }
      } catch (e) {
        setStage(null);
        setLive((l) => [
          ...l.map((m) => (m.pending ? { ...m, pending: false } : m)),
          {
            id: nextId(),
            role: "assistant",
            content: e instanceof Error ? e.message : "The query failed — try again.",
            ts: new Date().toISOString(),
            failed: true,
          },
        ]);
        void queryClient.invalidateQueries({ queryKey: ["chat-history", threadKey] });
        toast({ title: "Grounded query failed", variant: "destructive" });
      } finally {
        setBusy(false);
      }
    },
    [busy, input, projectId, threadKey, toast],
  );

  const clearThread = useCallback(async () => {
    try {
      await apiDelete(`/api/chat?project_id=${encodeURIComponent(projectId)}`);
      queryClient.setQueryData<{ messages: ChatRecord[] }>(["chat-history", threadKey], {
        messages: [],
      });
      setLive([]);
    } catch {
      toast({ title: "Could not clear the thread", variant: "destructive" });
    }
  }, [projectId, threadKey, toast]);

  const badgeFor = (msg: ChatMessage) => {
    if (msg.failed) return { label: "Query failed", cls: "border-destructive/30 bg-destructive/10 text-destructive" };
    if (msg.llmUsed) {
      return msg.mode === "synthesize"
        ? { label: "LLM wiki synthesis", cls: "border-success/30 bg-success/10 text-success" }
        : { label: "LLM-grounded answer", cls: "border-success/30 bg-success/10 text-success" };
    }
    return { label: "Offline · evidence excerpts only", cls: "border-warning/30 bg-warning/10 text-warning" };
  };

  const hasThread = messages.length > 0;

  return (
    <div className={`flex flex-col overflow-hidden rounded-xl border border-primary/25 bg-card/40 ${className}`}>
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-card/60 px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <BookOpen className="h-3.5 w-3.5 text-primary-300" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary-300">
            Grounded Chat
          </span>
          <span className="hidden text-[10px] text-muted-foreground sm:inline">
            answers cite vault evidence only
          </span>
        </div>
        {hasThread && (
          <button
            onClick={() => void clearThread()}
            className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Clear conversation"
          >
            <Eraser className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      {/* Message stream */}
      <div className="brain-scroll min-h-0 flex-1 space-y-3 overflow-y-auto p-3.5">
        {messages.length === 0 && !busy && (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15">
              <Sparkles className="h-4 w-4 text-primary-300" />
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              Ask this project&apos;s brain — every answer is grounded in your captured evidence and
              cites its sources.
            </p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => void run("ask", s)}
                  className="rounded-full border border-border bg-card/70 px-2.5 py-1 text-[10px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary-300"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => {
          const badge = badgeFor(msg);
          return msg.role === "user" ? (
            <div key={msg.id} className="flex items-start justify-end gap-2.5">
              <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary/20 px-3 py-2">
                <p className="whitespace-pre-wrap text-xs leading-relaxed text-foreground">
                  {msg.content}
                </p>
                <p className="mt-1 text-right text-[9px] text-muted-foreground/70">
                  {shortTime(msg.ts)}
                </p>
              </div>
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary">
                <User className="h-3 w-3 text-secondary-foreground" />
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex items-start gap-2.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Sparkles className="h-3 w-3 text-primary-300" />
              </div>
              <div className="min-w-0 max-w-[88%] space-y-1.5">
                {!msg.pending && (
                  <span
                    className={`inline-block rounded border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${badge.cls}`}
                  >
                    {badge.label}
                  </span>
                )}
                <div
                  className={`whitespace-pre-wrap rounded-2xl rounded-bl-sm border px-3 py-2 text-xs leading-relaxed ${
                    msg.failed
                      ? "border-destructive/30 bg-destructive/5 text-destructive"
                      : "border-border bg-card/80 text-foreground/95"
                  }`}
                >
                  {msg.failed ? (
                    msg.content
                  ) : (
                    <Markdown components={markdownComponents}>{msg.content}</Markdown>
                  )}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/70">
                      {msg.sources.length} source(s)
                    </p>
                    {msg.sources.map((s, i) => (
                      <div
                        key={s.id}
                        className="rounded-lg border border-border bg-card/50 px-2.5 py-1.5"
                      >
                        <p className="text-[10px] font-semibold text-foreground/90">
                          <span className="text-primary-300">[{i + 1}]</span> {s.title}
                          <span className="ml-1.5 font-normal text-muted-foreground/60">
                            {shortTime(s.captured_at)}
                          </span>
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground">
                          {s.excerpt}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {busy && (
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <Sparkles className="h-3 w-3 animate-pulse text-primary-300" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-border bg-card/70 px-3 py-2.5">
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary-400" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary-400" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary-400" />
              <span className="ml-1.5 text-[10px] text-muted-foreground">
                {stage ?? "synthesizing…"}
              </span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input row */}
      <div className="flex shrink-0 items-center gap-1.5 border-t border-border bg-card/60 p-2.5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && void run("ask")}
          placeholder="Ask this project's brain…"
          aria-label="Grounded question"
          disabled={busy}
          className="min-w-0 flex-1 rounded-lg border border-input bg-background/70 px-3 py-2 text-xs text-foreground placeholder-muted-foreground/60 focus:border-primary focus:outline-none disabled:opacity-50"
        />
        <button
          onClick={() => void run("ask")}
          disabled={busy || !input.trim()}
          aria-label="Ask"
          title="Ask (evidence-grounded answer)"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary-400 disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => void run("synthesize")}
          disabled={busy || !input.trim()}
          aria-label="Synthesize wiki page"
          title="Synthesize (whole-topic wiki synthesis)"
          className="flex h-8 shrink-0 items-center gap-1 rounded-lg border border-primary/40 bg-primary/10 px-2.5 text-[11px] font-medium text-primary-300 transition-colors hover:bg-primary/20 disabled:opacity-50"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Synthesize</span>
        </button>
      </div>
    </div>
  );
};
