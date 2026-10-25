// Project Brain OS — Zero-Tagging Auto-Project Detection Router
// Faithful port of project_router.py (scoring weights & thresholds preserved)

import type { BrainProject, ProjectMatch } from "./types";
import { getAllProjects } from "./store";

export { routeAiModel } from "./model-routing";

interface RouterState {
  lastActiveProjectId: string | null;
}

const state: RouterState = { lastActiveProjectId: null };

export async function detectProject(input: {
  rawContent?: string;
  windowTitle?: string;
  activeFilePath?: string;
  sourceUrl?: string;
  confidenceThreshold?: number;
}): Promise<ProjectMatch> {
  const {
    rawContent = "",
    windowTitle = "",
    activeFilePath = "",
    sourceUrl = "",
    confidenceThreshold = 0.35,
  } = input;

  const projects = await getAllProjects();
  if (projects.length === 0) {
    return {
      projectId: null,
      projectName: "Inbox",
      projectSlug: "inbox",
      confidence: 0,
      reasons: ["No projects registered"],
    };
  }

  const combinedContext =
    `${windowTitle} ${activeFilePath} ${sourceUrl} ${rawContent}`.toLowerCase();
  const normFilePath = activeFilePath.replace(/\\/g, "/").toLowerCase();

  let bestMatch: BrainProject | null = null;
  let bestScore = 0;
  let bestReasons: string[] = [];

  for (const proj of projects) {
    let score = 0;
    const reasons: string[] = [];

    // 1. Hard Path Match (+0.65)
    const rootPath = (proj.rootPath || "").replace(/\\/g, "/").toLowerCase();
    if (rootPath && normFilePath.includes(rootPath)) {
      score += 0.65;
      reasons.push(`File path matched project root '${rootPath}'`);
    }

    // 2. Project Name or Slug in Window Title / URL (+0.45 / +0.40)
    const slug = proj.slug.toLowerCase();
    const nameLower = proj.name.toLowerCase();
    if (windowTitle.toLowerCase().includes(slug) || windowTitle.toLowerCase().includes(nameLower)) {
      score += 0.45;
      reasons.push(`Window title contains project name/slug '${proj.name}'`);
    } else if (sourceUrl.toLowerCase().includes(slug)) {
      score += 0.4;
      reasons.push(`URL contains project slug '${slug}'`);
    }

    // 3. Git Remote Match (+0.50)
    for (const remote of proj.gitRemotes) {
      if (combinedContext.includes(remote.toLowerCase())) {
        score += 0.5;
        reasons.push(`Matched git remote '${remote}'`);
      }
    }

    // 4. Keyword Fingerprint Matches (+0.18 per keyword, capped at +0.54)
    let kwHits = 0;
    for (const kw of proj.keywords) {
      if (combinedContext.includes(kw.toLowerCase())) {
        kwHits += 1;
        reasons.push(`Matched keyword '${kw}'`);
      }
    }
    score += Math.min(kwHits * 0.18, 0.54);

    // 5. Session Momentum Bonus (+0.15 if this was the most recently active project)
    if (state.lastActiveProjectId && proj.id === state.lastActiveProjectId && score > 0) {
      score += 0.15;
      reasons.push("Session momentum bonus (last active project)");
    }

    if (score > bestScore) {
      bestScore = Math.min(score, 1.0);
      bestMatch = proj;
      bestReasons = reasons;
    }
  }

  if (bestMatch && bestScore >= confidenceThreshold) {
    state.lastActiveProjectId = bestMatch.id;
    return {
      projectId: bestMatch.id,
      projectName: bestMatch.name,
      projectSlug: bestMatch.slug,
      confidence: Math.round(bestScore * 100) / 100,
      reasons: bestReasons,
    };
  }

  return {
    projectId: null,
    projectName: "Inbox",
    projectSlug: "inbox",
    confidence: Math.round(bestScore * 100) / 100,
    reasons: ["Confidence below threshold; routed to Inbox"],
  };
}
