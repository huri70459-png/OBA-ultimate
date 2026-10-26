"""
llm_bridge.py - Hybrid Local/Cloud LLM Router & Anti-Drift Prompt Pre-Structurer
Zero external dependencies (uses Python standard library urllib.request, json, os, re).

Features:
1. Auto-detects Local Ollama (http://127.0.0.1:11434), OpenAI, Anthropic, or Gemini APIs.
2. Falls back automatically to a deterministic offline engine if no API key or local server is running.
3. Plugs directly into ZeroSaveCapturePipeline(store, router, llm_callback=bridge.analyze_capture_callback).
4. Rewrites raw, unclear user prompts into structured, hallucination-proof engineering specs grounded in Project Memory.
"""

import os
import re
import json
import urllib.request
import urllib.error
from typing import Dict, Any, Optional, List


class HybridLLMBridge:
    def __init__(
        self,
        prefer_local_ollama: bool = True,
        ollama_url: str = "http://127.0.0.1:11434",
        ollama_model: str = "llama3.2",
        timeout_seconds: int = 8
    ):
        self.prefer_local_ollama = prefer_local_ollama
        self.ollama_url = ollama_url.rstrip("/")
        self.ollama_model = os.environ.get("OLLAMA_MODEL", ollama_model)
        self.timeout = timeout_seconds

        # Optional Cloud API Keys from environment
        self.openai_key = os.environ.get("OPENAI_API_KEY", "")
        self.anthropic_key = os.environ.get("ANTHROPIC_API_KEY", "")
        self.gemini_key = os.environ.get("GEMINI_API_KEY", "")

    def detect_active_backend(self) -> Dict[str, str]:
        """Checks which AI backend is currently reachable without crashing."""
        if self.prefer_local_ollama and self._is_ollama_alive():
            return {"provider": "ollama", "model": self.ollama_model, "mode": "local_llm"}
        if self.openai_key:
            return {"provider": "openai", "model": "gpt-4o-mini", "mode": "cloud_llm"}
        if self.anthropic_key:
            return {"provider": "anthropic", "model": "claude-3-5-sonnet-latest", "mode": "cloud_llm"}
        if self.gemini_key:
            return {"provider": "gemini", "model": "gemini-2.5-flash", "mode": "cloud_llm"}
        return {"provider": "deterministic-offline", "model": "rule-synthesizer-v2", "mode": "offline_fallback"}

    def _is_ollama_alive(self) -> bool:
        try:
            req = urllib.request.Request(f"{self.ollama_url}/api/tags", method="GET")
            with urllib.request.urlopen(req, timeout=1.5) as resp:
                return resp.status == 200
        except Exception:
            return False

    def complete_text(self, system_prompt: str, user_prompt: str, max_tokens: int = 600) -> str:
        """
        Attempts live LLM completion via Ollama or Cloud API; seamlessly returns empty string
        on failure so callers can use deterministic synthesis without throwing exceptions.
        """
        backend = self.detect_active_backend()
        provider = backend["provider"]

        try:
            if provider == "ollama":
                payload = {
                    "model": self.ollama_model,
                    "prompt": f"System: {system_prompt}\n\nUser: {user_prompt}",
                    "stream": False
                }
                data = json.dumps(payload).encode("utf-8")
                req = urllib.request.Request(
                    f"{self.ollama_url}/api/generate",
                    data=data,
                    headers={"Content-Type": "application/json"},
                    method="POST"
                )
                with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                    body = json.loads(resp.read().decode("utf-8"))
                    return body.get("response", "").strip()

            elif provider == "openai":
                payload = {
                    "model": backend["model"],
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    "max_tokens": max_tokens,
                    "temperature": 0.2
                }
                req = urllib.request.Request(
                    "https://api.openai.com/v1/chat/completions",
                    data=json.dumps(payload).encode("utf-8"),
                    headers={
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {self.openai_key}"
                    },
                    method="POST"
                )
                with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                    body = json.loads(resp.read().decode("utf-8"))
                    return body["choices"][0]["message"]["content"].strip()

        except Exception:
            # Fall through cleanly to offline synthesis
            return ""

        return ""

    # =========================================================================
    # 1. CALLBACK FOR ZERO-SAVE CAPTURE PIPELINE
    # =========================================================================
    def analyze_capture_callback(
        self,
        routed_model: str,
        task_mode: str,
        raw_content: str,
        window_title: str = "",
        visual_hint: str = ""
    ) -> Dict[str, Any]:
        """
        Drop-in callback for ZeroSaveCapturePipeline.
        Combines deterministic entity/error extraction with optional LLM enrichment.
        """
        lines = [ln.strip() for ln in raw_content.splitlines() if ln.strip()]
        first_line = re.sub(r"^#+\s*", "", lines[0]) if lines else (window_title or "Captured Item")
        title = first_line[:68]

        action_metadata: Dict[str, Any] = {}
        graph_edges: List[Dict[str, str]] = []
        decision_data: Optional[Dict[str, Any]] = None

        # A. Extract Missing Dependencies / Terminal Errors (Snip -> Action)
        node_mod = re.search(r"Cannot find module ['\"]([^'\"]+)['\"]", raw_content)
        py_mod = re.search(r"ModuleNotFoundError: No module named ['\"]([^'\"]+)['\"]", raw_content)
        port_err = re.search(r"EADDRINUSE.*?:(\d+)", raw_content)
        syntax_err = re.search(r"(SyntaxError|TypeError|ReferenceError|KeyError|ValueError):\s*([^\n]+)", raw_content)

        if node_mod:
            pkg = node_mod.group(1)
            fix_cmd = f"pnpm add {pkg}"
            title = f"Error: Missing Node dependency '{pkg}'"
            action_metadata = {"error": "ModuleNotFound", "rootCause": f"Missing npm/pnpm package '{pkg}'", "fix": fix_cmd}
            graph_edges.append({"source": title, "target": fix_cmd, "relation": "FIXED_BY"})
        elif py_mod:
            pkg = py_mod.group(1)
            fix_cmd = f"pip install {pkg}"
            title = f"Error: Missing Python module '{pkg}'"
            action_metadata = {"error": "ModuleNotFoundError", "rootCause": f"Missing Python package '{pkg}'", "fix": fix_cmd}
            graph_edges.append({"source": title, "target": fix_cmd, "relation": "FIXED_BY"})
        elif port_err:
            port = port_err.group(1)
            fix_cmd = f"npx kill-port {port}"
            title = f"Error: Port {port} already in use (EADDRINUSE)"
            action_metadata = {"error": "EADDRINUSE", "rootCause": f"Port {port} locked by another process", "fix": fix_cmd}
            graph_edges.append({"source": title, "target": fix_cmd, "relation": "FIXED_BY"})
        elif syntax_err:
            err_type, err_msg = syntax_err.group(1), syntax_err.group(2).strip()
            title = f"{err_type}: {err_msg[:45]}"
            action_metadata = {"error": err_type, "rootCause": err_msg, "fix": f"Inspect stack trace for {err_type}"}

        # B. Extract File & Component Graph Nodes
        file_mentions = re.findall(r"\b([a-zA-Z0-9_-]+\.(?:py|ts|tsx|js|mjs|json|md|sql|html))\b", f"{raw_content} {window_title}")
        for fm in sorted(set(file_mentions)):
            graph_edges.append({"source": fm, "target": title, "relation": "MENTIONED_IN"})

        # C. Extract Architectural Decisions (Decision + Alternatives + Reasoning)
        if any(k in raw_content.lower() for k in ("decision:", "why we chose", "we decided to", "switched from")):
            reason_match = re.search(r"(?:reason|reasoning|because|why)[:\s]+([^\n.]+)", raw_content, re.IGNORECASE)
            alt_match = re.search(r"(?:alternatives|instead of|over|rejected)[:\s]+([^\n.]+)", raw_content, re.IGNORECASE)
            decision_data = {
                "title": title,
                "chosen": first_line,
                "reasoning": reason_match.group(1).strip() if reason_match else "Captured from architectural rationale note",
                "alternatives": [a.strip() for a in alt_match.group(1).split(",") if a.strip()] if alt_match else []
            }

        # D. Optional Live LLM Summary Upgrade (if Ollama or Cloud API is active)
        llm_summary = ""
        if len(raw_content) > 120:
            llm_summary = self.complete_text(
                system_prompt="Summarize this developer capture in 1 concise sentence (< 25 words) focusing on technical facts.",
                user_prompt=raw_content[:1500],
                max_tokens=80
            )

        if llm_summary:
            summary = f"[{routed_model}] {llm_summary}"
        elif action_metadata.get("fix"):
            summary = f"[{routed_model}] Diagnosed {action_metadata['error']} -> Suggested Fix: `{action_metadata['fix']}`"
        else:
            summary = f"[{routed_model}] " + " ".join(lines[:2])[:180]

        return {
            "title": title,
            "summary": summary,
            "visual_description": visual_hint or (f"Visual capture from '{window_title}'" if window_title else ""),
            "action_metadata": action_metadata,
            "decision": decision_data,
            "graph_edges": graph_edges
        }

    # =========================================================================
    # 2. RAW UNCLEAR PROMPT -> STRUCTURED ANTI-DRIFT SPEC REWRITER
    # =========================================================================
    def rewrite_raw_prompt(
        self,
        raw_user_prompt: str,
        context_payload: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Solves 'unclear prompts', 'context drift', and 'token exhaustion'.
        Takes a messy, raw user request (e.g., "fix the gateway crash and add caching")
        and rewrites it into a strict, copy-paste-ready engineering specification
        anchored to the project's 3-Tier Memory, Active Decisions, and Vault Evidence.
        """
        project_name = context_payload.get("project_name", "Active Project")
        rolling_memory = context_payload.get("tier_1_rolling_memory", "No summary yet.")
        decisions = context_payload.get("tier_2_decision_graph", [])
        evidence = context_payload.get("tier_3_recent_and_relevant_evidence", [])

        # Extract actionable constraints from Decision Graph
        decision_bullets = []
        for d in decisions[:6]:
            decision_bullets.append(f"- **MUST RESPECT [{d['title']}]**: {d['decision']} (Rationale: {d['reasoning']})")
        if not decision_bullets:
            decision_bullets.append("- Keep implementation dependency-light and modular.")

        # Extract past fixes and known files from Vault Evidence
        evidence_bullets = []
        known_fixes = []
        for ev in evidence[:5]:
            summary_txt = ev.get("summary") or ""
            evidence_bullets.append(f"- `[{ev.get('type', 'note').upper()}]` **{ev.get('title')}**: {summary_txt}")
            meta = ev.get("metadata") or {}
            if isinstance(meta, dict) and meta.get("fix"):
                known_fixes.append(f"`{meta['fix']}` (for {ev.get('title')})")
        if not evidence_bullets:
            evidence_bullets.append("- No prior conflicting captures found in vault.")

        # Optional LLM polish of the raw goal
        refined_objective = self.complete_text(
            system_prompt=(
                "Rewrite the user's raw software request into 2-3 crystal-clear technical bullet points. "
                "Do not invent libraries that violate the project context."
            ),
            user_prompt=f"Project: {project_name}\nContext: {rolling_memory}\nRaw Request: {raw_user_prompt}",
            max_tokens=160
        )

        if not refined_objective:
            # Deterministic structuring of raw prompt
            sentences = [s.strip() for s in re.split(r"[.;\n]+", raw_user_prompt) if s.strip()]
            if not sentences:
                sentences = ["Implement the requested feature cleanly while preserving existing project architecture."]
            refined_objective = "\n".join(f"{idx+1}. {s}" for idx, s in enumerate(sentences))

        structured_markdown = (
            f"# 🎯 STRUCTURED AI EXECUTION SPEC — [{project_name}]\n\n"
            f"## 1. Clarified Engineering Objective\n"
            f"*(Rewritten from raw input: \"{raw_user_prompt.strip()}\")*\n"
            f"{refined_objective}\n\n"
            f"## 2. Tier-1 Compressed Project State\n"
            f"{rolling_memory}\n\n"
            f"## 3. Tier-2 Non-Negotiable Architectural Constraints (Anti-Drift Guardrails)\n"
            + "\n".join(decision_bullets) + "\n\n"
            f"## 4. Tier-3 Grounded Vault Evidence & Past Fixes\n"
            + "\n".join(evidence_bullets) + "\n\n"
            f"## 5. Strict Output & Verification Contract\n"
            f"- **No Context Drift:** Do NOT introduce new frameworks or databases that contradict Section 3.\n"
            f"- **Token Efficiency:** Output only the modified/new files with complete, runnable code (no placeholders).\n"
            f"- **Self-Verification Step:** Conclude with a 1-command terminal verification test so I know immediately how to test it.\n"
        )

        # Estimate token count (~4 chars per token)
        estimated_tokens = max(1, len(structured_markdown) // 4)

        return {
            "project_name": project_name,
            "raw_prompt": raw_user_prompt,
            "refined_objective": refined_objective,
            "known_fixes_referenced": known_fixes,
            "estimated_tokens": estimated_tokens,
            "token_budget_status": "OPTIMAL (< 2,500 tokens)" if estimated_tokens < 2500 else "WARNING",
            "backend_used": self.detect_active_backend(),
            "structured_prompt_markdown": structured_markdown
        }
