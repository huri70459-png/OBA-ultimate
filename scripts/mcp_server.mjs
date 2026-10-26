#!/usr/bin/env node
/**
 * File: scripts/mcp_server.mjs
 * Project Brain OS — Spec-Compliant Model Context Protocol (MCP) Server over stdio.
 *
 * Supports Cursor, Claude Desktop, Claude Code, and Windsurf. Bridges JSON-RPC 2.0
 * stdio directly to the running Project Brain OS instance (default
 * http://127.0.0.1:3000) with full protocol lifecycle negotiation.
 *
 * Tools (6):
 *   list_projects        -> GET    /api/projects
 *   get_project_context  -> GET    /api/context?project_id&q&goal   (3-Tier payload
 *                                   + anti-drift structured prompt)
 *   search_project_brain -> GET    /api/search?q&mode&project_id   (hybrid/fts/semantic)
 *   zero_save_capture    -> POST   /api/capture                    (privacy-guarded)
 *   log_decision          -> POST   /api/decisions                 (real decision rows)
 *   verify_fix_outcome    -> PATCH  /api/items/:id                  (closed-loop
 *                                   detected->suggested->attempted->verified/failed)
 *
 * Usage in .cursor/mcp.json or claude_desktop_config.json:
 * {
 *   "mcpServers": {
 *     "project-brain-os": {
 *       "command": "node",
 *       "args": ["/absolute/path/to/PROJECT-BRAIN-OS/scripts/mcp_server.mjs"],
 *       "env": {
 *         "BRAIN_API_URL": "http://127.0.0.1:3000",
 *         "BRAIN_AGENT_TOKEN": ""
 *       }
 *     }
 *   }
 * }
 */

import readline from "node:readline";

const BRAIN_API_URL = (process.env.BRAIN_API_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");
const BRAIN_AGENT_TOKEN = process.env.BRAIN_AGENT_TOKEN || "";
const SUPPORTED_PROTOCOL_VERSION = "2025-06-18";

async function callBrainApi(pathname, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(BRAIN_AGENT_TOKEN ? { "x-brain-token": BRAIN_AGENT_TOKEN } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${BRAIN_API_URL}${pathname}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    throw new Error(`Brain API HTTP ${response.status}: ${JSON.stringify(data).slice(0, 500)}`);
  }
  return data;
}

const TOOLS = [
  {
    name: "list_projects",
    description:
      "List all registered projects in Project Brain OS with their slug, health score, root path, and rolling memory summary.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "get_project_context",
    description:
      "Retrieve the 3-Tier Context Payload (Rolling Memory, Active Decisions, Retrieved Evidence, and Knowledge Graph edges) for a project before writing or debugging code. Returns the anti-drift structured execution prompt.",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "string",
          description: "Project ID, slug, or display name (e.g., 'proj_tier1' or 'tier-1-control-plane')",
        },
        query: {
          type: "string",
          description: "Current coding task, bug description, or architectural question",
        },
        raw_prompt: {
          type: "string",
          description: "Optional raw prompt to rewrite into a structured anti-drift execution prompt",
        },
      },
      required: ["project_id"],
      additionalProperties: false,
    },
  },
  {
    name: "search_project_brain",
    description:
      "Hybrid keyword + semantic search across Project Brain OS captures, screenshots, terminal logs, and notes.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        project_id: { type: "string", description: "Optional project ID/slug/name filter" },
        mode: {
          type: "string",
          enum: ["hybrid", "fts", "semantic"],
          description: "Search mode (default: hybrid)",
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
  },
  {
    name: "zero_save_capture",
    description:
      "Capture a terminal error, stack trace, architectural note, or debugging finding directly into Project Brain OS with automatic project routing. Runs through the server-side Privacy Guard (sensitive windows blocked, secrets redacted).",
    inputSchema: {
      type: "object",
      properties: {
        raw_content: { type: "string", description: "Content, stack trace, or markdown note" },
        item_type: {
          type: "string",
          enum: ["note", "terminal", "clip", "screenshot", "doc", "commit"],
          description: "Capture type (default: note)",
        },
        window_title: { type: "string", description: "Active file/window or IDE context" },
        source_app: { type: "string", description: "Source application name (e.g., Cursor, Claude Code)" },
        forced_project_id: { type: "string", description: "Optional explicit project ID/slug/name" },
      },
      required: ["raw_content"],
      additionalProperties: false,
    },
  },
  {
    name: "log_decision",
    description:
      "Record an architectural decision with alternatives and reasoning into the Project Brain decision graph (creates a real Decision row and re-compresses Tier-1 memory).",
    inputSchema: {
      type: "object",
      properties: {
        project_id: { type: "string", description: "Project ID, slug, or display name" },
        title: { type: "string", description: "Short title of the decision" },
        decision: { type: "string", description: "The chosen option or architecture" },
        alternatives: {
          type: "array",
          items: { type: "string" },
          description: "Other options considered",
        },
        reasoning: { type: "string", description: "Why this option was chosen" },
      },
      required: ["project_id", "title", "decision", "reasoning"],
      additionalProperties: false,
    },
  },
  {
    name: "verify_fix_outcome",
    description:
      "Close the loop on a suggested fix by marking it 'attempted', 'verified', or 'failed' so Project Brain OS updates health scores and adds a VERIFIED_BY knowledge-graph edge on success.",
    inputSchema: {
      type: "object",
      properties: {
        item_id: { type: "string", description: "Capture Item ID containing the suggested fix" },
        status: {
          type: "string",
          enum: ["attempted", "verified", "failed"],
          description: "Verification outcome",
        },
        verification_note: { type: "string", description: "What actually worked or why it failed" },
      },
      required: ["item_id", "status"],
      additionalProperties: false,
    },
  },
];

async function executeTool(name, args = {}) {
  switch (name) {
    case "list_projects": {
      return await callBrainApi("/api/projects");
    }
    case "get_project_context": {
      const params = new URLSearchParams({
        project_id: String(args.project_id || ""),
        q: String(args.query || ""),
        goal: String(args.raw_prompt || args.query || ""),
      });
      return await callBrainApi(`/api/context?${params.toString()}`);
    }
    case "search_project_brain": {
      const params = new URLSearchParams({
        q: String(args.query || ""),
        mode: String(args.mode || "hybrid"),
      });
      if (args.project_id) params.set("project_id", String(args.project_id));
      return await callBrainApi(`/api/search?${params.toString()}`);
    }
    case "zero_save_capture": {
      return await callBrainApi("/api/capture", {
        method: "POST",
        body: JSON.stringify({
          raw_content: args.raw_content,
          item_type: args.item_type || "note",
          window_title: args.window_title || "MCP Coding Agent",
          source_app: args.source_app || "MCP-Agent",
          forced_project_id: args.forced_project_id || undefined,
        }),
      });
    }
    case "log_decision": {
      // Real Decision row via /api/decisions (not a text-mangled capture) —
      // the decision graph, compression, and context tiers all consume it.
      return await callBrainApi("/api/decisions", {
        method: "POST",
        body: JSON.stringify({
          project_id: args.project_id,
          title: args.title,
          decision: args.decision,
          reasoning: args.reasoning,
          alternatives: Array.isArray(args.alternatives) ? args.alternatives : [],
        }),
      });
    }
    case "verify_fix_outcome": {
      return await callBrainApi(`/api/items/${encodeURIComponent(args.item_id)}`, {
        method: "PATCH",
        body: JSON.stringify({
          fix_status: args.status,
          verification_note: args.verification_note || "",
        }),
      });
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function sendResponse(id, result) {
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result }) + "\n");
}

function sendError(id, code, message, data = undefined) {
  process.stdout.write(
    JSON.stringify({
      jsonrpc: "2.0",
      id,
      error: { code, message, ...(data ? { data } : {}) },
    }) + "\n"
  );
}

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

rl.on("line", async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;

  let msg;
  try {
    msg = JSON.parse(trimmed);
  } catch (err) {
    sendError(null, -32700, "Parse error", String(err));
    return;
  }

  const { id, method, params } = msg;

  // Notifications have no id and expect no response
  if (id === undefined || id === null) {
    return;
  }

  try {
    if (method === "initialize") {
      sendResponse(id, {
        protocolVersion: params?.protocolVersion || SUPPORTED_PROTOCOL_VERSION,
        capabilities: {
          tools: { listChanged: false },
        },
        serverInfo: {
          name: "project-brain-os-mcp",
          version: "2.5.0",
        },
      });
      return;
    }

    if (method === "ping") {
      sendResponse(id, {});
      return;
    }

    if (method === "tools/list") {
      sendResponse(id, { tools: TOOLS });
      return;
    }

    if (method === "tools/call") {
      const toolName = params?.name;
      const toolArgs = params?.arguments || {};
      const output = await executeTool(toolName, toolArgs);
      sendResponse(id, {
        content: [
          {
            type: "text",
            text: JSON.stringify(output, null, 2),
          },
        ],
        isError: false,
      });
      return;
    }

    sendError(id, -32601, `Method not found: ${method}`);
  } catch (err) {
    sendResponse(id, {
      content: [
        {
          type: "text",
          text: `Project Brain OS MCP Tool Error: ${err instanceof Error ? err.message : String(err)}`,
        },
      ],
      isError: true,
    });
  }
});
