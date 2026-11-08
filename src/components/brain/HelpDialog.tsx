"use client";

import { BookOpen, CheckCircle2, Code2, Database, Settings2, ShieldCheck, X } from "lucide-react";
import { useWorkspace } from "./workspace-store";

const sections = [
  ["Overview", "Brain OS is a local-first knowledge workspace. Capture notes, errors, screenshots, and decisions; route them to projects; search the evidence; and build grounded context for AI work."],
  ["Daily workflow", "Select a project, use Zero-Save Capture for raw material, use Log Decision for choices, review items in the Vault, run Compress Memory after a work session, then ask Grounded Chat questions about the evidence."],
  ["Features", "Dashboard shows health and activity. Vault edits Markdown. Timeline shows history. Graph connects decisions and evidence. Context Injector creates structured prompts. Grounded Chat answers only from indexed evidence. Scan Project Files imports safe text/code files from a project."],
  ["Project scanning", "Use Scan Project Files for an explicit import. The scanner supports common text and code files, skips secrets, .git, node_modules, build output, binaries, archives, and files over 512 KB. The per-project automatic rescan switch checks for changes every 30 seconds while the app is open."],
  ["Customization", "Choose light/dark mode and English/中文 from the header. Configure the AI backend, model, URLs, deduplication window, and agent token in Settings. Enable automatic indexing separately for each project. Use project keywords and paths to improve routing."],
  ["Privacy and safety", "The app is local-first and uses SQLite. Sensitive windows and common secrets are blocked or redacted by the capture pipeline. Imported files are never deleted or modified. Keep automatic indexing disabled for repositories containing material you do not want indexed."],
  ["Getting help", "Run Self-Test to validate the main workflows. Check the health endpoint when troubleshooting. For technical setup, Docker, environment variables, tests, and recovery steps, see README.md and docs/USER-GUIDE.md in the repository."],
] as const;

export const HelpDialog = () => {
  const open = useWorkspace((s) => s.helpOpen);
  const close = useWorkspace((s) => s.closeDialog);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-label="Project Brain OS documentation">
      <div className="flex max-h-[min(780px,90vh)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3"><BookOpen className="h-5 w-5 text-primary-300" /><div><h2 className="text-base font-semibold">Project Brain OS Guide</h2><p className="text-xs text-muted-foreground">How it works, what each feature does, and how to use it safely.</p></div></div>
          <button onClick={() => close("helpOpen")} aria-label="Close documentation" className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground"><X className="h-4 w-4" /></button>
        </div>
        <div className="grid min-h-0 flex-1 gap-5 overflow-y-auto p-5 md:grid-cols-[190px_1fr]">
          <nav className="space-y-1 text-xs text-muted-foreground">{sections.map(([title]) => <a key={title} href={`#guide-${title.toLowerCase().replaceAll(" ", "-")}`} className="block rounded-md px-3 py-2 hover:bg-accent hover:text-foreground">{title}</a>)}</nav>
          <article className="space-y-5 text-sm leading-6"><div className="grid grid-cols-1 gap-2 sm:grid-cols-3"><div className="rounded-lg border border-border bg-background/50 p-3"><Database className="mb-2 h-4 w-4 text-primary-300" /><p className="font-medium">Local-first</p><p className="text-xs text-muted-foreground">SQLite, vault files, and offline fallback.</p></div><div className="rounded-lg border border-border bg-background/50 p-3"><ShieldCheck className="mb-2 h-4 w-4 text-success" /><p className="font-medium">Privacy guarded</p><p className="text-xs text-muted-foreground">Secrets and sensitive captures are filtered.</p></div><div className="rounded-lg border border-border bg-background/50 p-3"><Code2 className="mb-2 h-4 w-4 text-info" /><p className="font-medium">Evidence-backed</p><p className="text-xs text-muted-foreground">Answers cite indexed project evidence.</p></div></div>{sections.map(([title, body]) => <section key={title} id={`guide-${title.toLowerCase().replaceAll(" ", "-")}`}><h3 className="flex items-center gap-2 text-sm font-semibold"><CheckCircle2 className="h-4 w-4 text-primary-300" />{title}</h3><p className="mt-1 text-muted-foreground">{body}</p></section>)}<section><h3 className="flex items-center gap-2 text-sm font-semibold"><Settings2 className="h-4 w-4 text-primary-300" />Recommended first steps</h3><ol className="mt-1 list-decimal space-y-1 pl-5 text-muted-foreground"><li>Select or create a project.</li><li>Run Scan Project Files once and review skipped files.</li><li>Capture decisions and errors as they happen.</li><li>Compress memory after meaningful work sessions.</li><li>Ask Grounded Chat only questions the vault can support.</li></ol></section></article>
        </div>
      </div>
    </div>
  );
};
