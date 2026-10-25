// Project Brain OS — Shared Types (port of Python dataclass dicts)

export interface BrainProject {
  id: string;
  name: string;
  slug: string;
  rootPath: string;
  keywords: string[];
  gitRemotes: string[];
  rollingSummary: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrainItem {
  id: string;
  projectId: string | null;
  itemType: "note" | "screenshot" | "terminal" | "clip" | string;
  title: string;
  rawContent: string;
  structuredSummary: string;
  visualDescription: string;
  filePath: string;
  assetPath: string;
  sourceApp: string;
  sourceUrl: string;
  metadata: Record<string, unknown>;
  capturedAt: string;
}

export interface BrainDecision {
  id: string;
  projectId: string;
  title: string;
  decision: string;
  alternatives: string[];
  reasoning: string;
  outcome: string;
  sourceItemId: string | null;
  decidedAt: string;
}

export interface GraphEdge {
  id: string;
  projectId: string | null;
  sourceNode: string;
  targetNode: string;
  relationType: string;
  weight: number;
  createdAt: string;
}

export interface ProjectMatch {
  projectId: string | null;
  projectName: string;
  projectSlug: string;
  confidence: number;
  reasons: string[];
}

export interface ModelRoute {
  targetModel: string;
  taskMode: string;
  reason: string;
}

export interface AnalysisResult {
  title: string;
  summary: string;
  visualDescription: string;
  actionMetadata: {
    error?: string;
    rootCause?: string;
    fix?: string;
  };
  decision: {
    title: string;
    chosen: string;
    reasoning: string;
    alternatives: string[];
  } | null;
  graphEdges: Array<{ source: string; target: string; relation: string }>;
}

export interface CaptureResult {
  /** v2.1: "duplicate_merged" folds the capture into an existing item (no new row). */
  status: "captured_zero_save" | "duplicate_merged";
  toastNotification: string;
  item: BrainItem;
  projectMatch: ProjectMatch;
  modelRoute: ModelRoute;
  decisionLogged: BrainDecision | null;
  /** Auto-run per-project memory compression (v2 wiring, port of brain_api.py /capture) */
  memory_compression?: ProjectCompressionReport | { skipped: true };
}

// ==========================================
// V2 UPGRADE — Hybrid LLM Bridge / Cross-Project Learning / Disk Sync
// ==========================================

/** Detected AI backend (port of llm_bridge.detect_active_backend). */
export interface LlmBackend {
  provider: "ollama" | "openai" | "anthropic" | "gemini" | "deterministic-offline";
  model: string;
  mode: "local_llm" | "cloud_llm" | "offline_fallback";
}

/** Output of the Anti-Drift Prompt Pre-Structurer (port of llm_bridge.rewrite_raw_prompt). */
export interface PromptRewriteResult {
  project_name: string;
  raw_prompt: string;
  refined_objective: string;
  known_fixes_referenced: string[];
  estimated_tokens: number;
  token_budget_status: string;
  backend_used: LlmBackend;
  structured_prompt_markdown: string;
}

/** A reusable bug fix found in another project (port of memory_compressor.find_cross_project_solutions). */
export interface CrossProjectSolution {
  item_id: string;
  source_project: string;
  title: string;
  summary: string;
  suggested_fix: string;
  captured_at: string;
}

// ==========================================
// V2.1 PART A — Deduplication / Inbox Triage / Grounded Q&A
// ==========================================

/** Result of the v2.1 exact-duplicate lookup (port of memory_compressor.find_recent_duplicate). */
export interface DuplicateLookupResult {
  item: BrainItem | null;
  fingerprint: string;
}

/** Item state after folding a duplicate capture in (port of record_duplicate_occurrence). */
export interface DuplicateMergeResult {
  item: BrainItem;
  occurrence_count: number;
  last_seen_at: string;
}

/** Result of moving an inbox item into a project (port of brain_api.triage_item). */
export interface TriageResult {
  ok: boolean;
  item_id: string;
  project_id: string;
  project_name: string;
  /** Old -> new vault path when the file physically moved on disk. */
  file_moved: boolean;
  file_path: string;
  error?: string;
}

/** A source excerpt backing a grounded answer (port of brain_api.grounded_answer). */
export interface GroundedSource {
  id: string;
  title: string;
  project_id: string | null;
  captured_at: string;
  /** Capped at 700 chars, taken from structuredSummary or rawContent. */
  excerpt: string;
}

export interface GroundedAnswer {
  answer: string;
  sources: GroundedSource[];
  grounded: boolean;
  mode: "ask" | "synthesize";
  /** False when no LLM backend answered — the UI then shows excerpts, not a generated answer. */
  llm_used: boolean;
  error?: string;
}

/** Result of the Two-Way Obsidian Disk Sync (port of sync_markdown_edits_from_disk). */
export interface DiskSyncStats {
  files_checked: number;
  sqlite_records_updated: number;
  vectors_resynced: number;
}

/** Per-project compression report (port of memory_compressor.compress_project_memory). */
export interface ProjectCompressionReport {
  project_id: string;
  project_name: string;
  compressed_rolling_summary: string;
  estimated_summary_tokens: number;
  health: { score: number; status: string; gaps: string[] };
  summary_file: string;
  work_replay_file: string;
  items_compressed: number;
  /** v2.1: total observed occurrences after exact-duplicate folding (sum of occurrence_count). */
  occurrences_represented: number;
  llm_digest_used: boolean;
}

export interface ContextPayload {
  project_name: string;
  tier_1_rolling_memory: string;
  tier_2_decision_graph: Array<{
    title: string;
    decision: string;
    reasoning: string;
    outcome: string;
    decidedAt: string;
  }>;
  tier_3_recent_and_relevant_evidence: Array<{
    title: string;
    type: string;
    summary: string;
    visual_context?: string;
    captured_at: string;
  }>;
  knowledge_graph_edges: Array<{
    source_node: string;
    target_node: string;
    relation_type: string;
  }>;
  structured_prompt_markdown?: string;
  // v2 Anti-Drift Prompt Pre-Structurer enrichment
  token_estimate?: number;
  token_budget_status?: string;
  backend_used?: LlmBackend;
  refined_objective?: string;
  known_fixes_referenced?: string[];
}

export interface TimelineEntry {
  id: string;
  itemType: string;
  title: string;
  structuredSummary: string;
  sourceApp: string;
  capturedAt: string;
  projectName: string | null;
}

export interface SelfTestCheck {
  name: string;
  status: "PASS" | "WARN" | "FAIL";
  detail: string;
  /** Plain-English file/function pointer shown when a scenario fails (guided chaos harness). */
  fixHint?: string;
}

export interface HealthGap {
  gap: string;
  detail: string;
  severity: "high" | "medium" | "low";
}

export interface ProjectDetails {
  project: BrainProject;
  healthScore: number;
  healthGaps: HealthGap[];
  lastCompressedAt: string | null;
  items: BrainItem[];
  decisions: BrainDecision[];
  graphEdges: GraphEdge[];
}

export interface SessionReportEntry {
  projectId: string | null;
  projectName: string;
  title: string;
  members: number;
}

export interface CompressionReport {
  ranAt: string;
  durationMs: number;
  trigger: "manual" | "auto" | "self-test";
  sessionsCreated: number;
  sessionDetails: SessionReportEntry[];
  summariesUpdated: string[];
  gapReport: Record<string, HealthGap[]>;
  vectorsBackfilled: number;
  skipped?: string;
}
