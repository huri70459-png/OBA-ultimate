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
  graphEdges: { source: string; target: string; relation: string }[];
}

export interface CaptureResult {
  status: "captured_zero_save";
  toastNotification: string;
  item: BrainItem;
  projectMatch: ProjectMatch;
  modelRoute: ModelRoute;
  decisionLogged: BrainDecision | null;
}

export interface ContextPayload {
  project_name: string;
  tier_1_rolling_memory: string;
  tier_2_decision_graph: {
    title: string;
    decision: string;
    reasoning: string;
    outcome: string;
    decidedAt: string;
  }[];
  tier_3_recent_and_relevant_evidence: {
    title: string;
    type: string;
    summary: string;
    visual_context?: string;
    captured_at: string;
  }[];
  knowledge_graph_edges: GraphEdge[];
  structured_prompt_markdown?: string;
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
}

export interface ProjectDetails {
  project: BrainProject;
  healthScore: number;
  items: BrainItem[];
  decisions: BrainDecision[];
  graphEdges: GraphEdge[];
}
