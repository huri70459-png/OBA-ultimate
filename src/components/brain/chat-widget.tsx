"use client";

// ChatWidget — conversational grounded Q&A over Project Brain OS memory.
//
// Blueprint alignment ("Deep Intelligence"):
//   - sleek dark interface, clear message bubbles, prominent avatars;
//   - contextual links: assistant replies carry numbered vault-source cards;
//   - minimalist input with integrated actions (Ask / Synthesize);
//   - real-time feel: typing indicator, smooth auto-scroll.
//
// Honesty contract (v2.1 parity): with no live LLM backend the assistant
// returns evidence excerpts only and says so — it never fabricates an answer.
// All content renders as escaped React text (no dangerouslySetInnerHTML).

import { useCallback, useEffect, useRef, useState } from "react";
import { BookOpen, Eraser, Send, Sparkles, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { GroundedAnswer, GroundedSource } from "@/lib/brain/types";
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
}

interface ChatWidgetProps {
  /** Resolved project id — empty string searches the whole vault (Inbox). */
  projectId: string;
  className?: string;
}

const SUGGESTIONS = [
  "How did we fix the last deployment error?",
  "Which decisions must the AI respect here?",
  "Summarize this project's recent work",
];

let chatSeq = 0;
const nextId = () => `chat-${Date.now()}-${chatSeq++}`;

export const ChatWidget = ({ projectId, className = "" }: ChatWidgetProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);

  const run = useCallback(
    async (mode: "ask" | "synthesize", rawQuery?: string) => {
      const query = (rawQuery ?? input).trim();
      if (!query || busy) return;
      setBusy(true);
      setInput("");
      const userMsg: ChatMessage = { id: nextId(), role: "user", content: query, ts: new Date().toISOString() };
      setMessages((m) => [...m, userMsg]);
      try {
        const res = await fetch(mode === "synthesize" ? "/api/synthesize" : "/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, project_id: projectId }),
        });
        const data: GroundedAnswer = await res.json();
        if (!res.ok) throw new Error(data.error || "Grounded query failed");
        setMessages((m) => [
          ...m,
          {
            id: nextId(),
            role: "assistant",
            content: data.answer,
            ts: new Date().toISOString(),
            mode,
            llmUsed: data.llm_used,
            grounded: data.grounded,
            sources: data.sources,
          },
        ]);
      } catch (e) {
        setMessages((m) => [
          ...m,
          {
            id: nextId(),
            role: "assistant",
            content: e instanceof Error ? e.message : "The query failed — try again.",
            ts: new Date().toISOString(),
            failed: true,
          },
        ]);
        toast({ title: "Grounded query failed", variant: "destructive" });
      } finally {
        setBusy(false);
      }
    },
    [busy, input, projectId, toast],
  );

  const badgeFor = (msg: ChatMessage) => {
    if (msg.failed) return { label: "Query failed", cls: "border-destructive/30 bg-destructive/10 text-destructive" };
    if (msg.llmUsed) {
      return msg.mode === "synthesize"
        ? { label: "LLM wiki synthesis", cls: "border-success/30 bg-success/10 text-success" }
        : { label: "LLM-grounded answer", cls: "border-success/30 bg-success/10 text-success" };
    }
    return { label: "Offline · evidence excerpts only", cls: "border-warning/30 bg-warning/10 text-warning" };
  };

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
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
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
                <span
                  className={`inline-block rounded border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${badge.cls}`}
                >
                  {badge.label}
                </span>
                <div
                  className={`whitespace-pre-wrap rounded-2xl rounded-bl-sm border px-3 py-2 text-xs leading-relaxed ${
                    msg.failed
                      ? "border-destructive/30 bg-destructive/5 text-destructive"
                      : "border-border bg-card/80 text-foreground/95"
                  }`}
                >
                  {msg.content}
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
              <span className="ml-1.5 text-[10px] text-muted-foreground">searching vault evidence…</span>
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
