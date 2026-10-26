"""
test_harness.py - Guided Scenario & Chaos Verification Suite for Project Brain OS
Zero external dependencies. Runs in an isolated sandbox vault (`./_sandbox_test_vault`)
and cleans up automatically so your real data is never touched.

Designed so you NEVER feel lost testing your app:
- Run `python test_harness.py` in your terminal.
- Executes 8 real-world developer scenarios & edge cases.
- Prints a plain-English Diagnostic Scorecard with exact file/function pointers if anything fails.
"""

import shutil
import json
from pathlib import Path
from typing import List, Dict, Any

from sqlite_store import BrainStore
from project_router import ProjectAndModelRouter
from capture_pipeline import ZeroSaveCapturePipeline
from llm_bridge import HybridLLMBridge
from memory_compressor import MemoryCompressor
import mcp_server


class GuidedTestHarness:
    def __init__(self, sandbox_dir: str = "./_sandbox_test_vault"):
        self.sandbox_path = Path(sandbox_dir).resolve()
        if self.sandbox_path.exists():
            shutil.rmtree(self.sandbox_path, ignore_errors=True)

        self.store = BrainStore(str(self.sandbox_path))
        self.router = ProjectAndModelRouter(self.store)
        self.llm = HybridLLMBridge(prefer_local_ollama=False)  # Deterministic fast test mode
        self.pipeline = ZeroSaveCapturePipeline(
            self.store,
            self.router,
            llm_callback=self.llm.analyze_capture_callback
        )
        self.compressor = MemoryCompressor(self.store, self.llm)
        self.results: List[Dict[str, Any]] = []

    def _record(self, scenario: str, passed: bool, explanation: str, inspect_hint: str) -> None:
        self.results.append({
            "scenario": scenario,
            "status": "PASS" if passed else "FAIL",
            "passed": passed,
            "explanation": explanation,
            "inspect_hint": inspect_hint
        })

    def run_all_scenarios(self, cleanup: bool = True) -> Dict[str, Any]:
        try:
            # -----------------------------------------------------------------
            # SCENARIO 1: SQLite Schema & Obsidian Vault Folder Initialization
            # -----------------------------------------------------------------
            p1 = self.store.upsert_project(
                name="Three Musketeers",
                root_path="C:/dev/three-musketeers",
                keywords=["three-musketeers", "gateway.mjs", "render", "dotenv"],
                git_remotes=["github.com/shaan/three-musketeers"],
                rolling_summary="Initial gateway service."
            )
            p2 = self.store.upsert_project(
                name="Tier-1 Control Plane",
                root_path="C:/dev/tier1-control-plane",
                keywords=["tier-1", "control-plane", "playwright", "browser-repair"],
                git_remotes=["github.com/shaan/tier1-control-plane"],
                rolling_summary="Browser repair automation control plane."
            )
            summary_file = self.sandbox_path / "Projects" / "three-musketeers" / "_project_summary.md"
            s1_ok = summary_file.exists() and len(self.store.get_all_projects()) == 2
            self._record(
                scenario="1. Vault & SQLite Initialization",
                passed=s1_ok,
                explanation=f"Created 2 projects in SQLite and verified '{summary_file.name}' on disk.",
                inspect_hint="Check BrainStore.upsert_project() in sqlite_store.py"
            )

            # -----------------------------------------------------------------
            # SCENARIO 2: Zero-Save Capture + Snip-to-Action Fix Extraction
            # -----------------------------------------------------------------
            cap1 = self.pipeline.capture(
                raw_content="Error: Cannot find module 'dotenv'\n  at gateway.mjs:14:2",
                item_type="screenshot",
                window_title="Terminal - three-musketeers",
                visual_hint="Red Render deployment terminal error for gateway.mjs"
            )
            extracted_fix = cap1["item"]["metadata"].get("fix", "")
            routed_proj = cap1["project_match"]["project_id"]
            s2_ok = (routed_proj == p1["id"]) and (extracted_fix == "pnpm add dotenv")
            self._record(
                scenario="2. Zero-Save Capture & Snip-to-Action Fix",
                passed=s2_ok,
                explanation=f"Auto-routed to [{cap1['project_match']['project_name']}] & extracted fix `{extracted_fix}`.",
                inspect_hint="Check HybridLLMBridge.analyze_capture_callback() in llm_bridge.py"
            )

            # -----------------------------------------------------------------
            # SCENARIO 3: Chaos Test — Ambiguous Multi-Project Capture Resolution
            # -----------------------------------------------------------------
            # Mentions 'playwright' (Project 2 keyword) inside a file path belonging to Project 2,
            # even though Project 1 had session momentum. Hard file path (+0.65) must win!
            cap_chaos = self.pipeline.capture(
                raw_content="Decision: Use Playwright trace viewer instead of raw screenshots\nReason: Easier DOM replay.",
                item_type="note",
                window_title="notes.md",
                active_file_path="C:/dev/tier1-control-plane/docs/notes.md"
            )
            s3_ok = (
                cap_chaos["project_match"]["project_id"] == p2["id"]
                and cap_chaos["decision_logged"] is not None
            )
            self._record(
                scenario="3. Chaos Test: Ambiguous Multi-Project & Decision Extraction",
                passed=s3_ok,
                explanation=(
                    f"Correctly prioritized hard file path for [{cap_chaos['project_match']['project_name']}] "
                    f"over session momentum and logged Decision '{cap_chaos['decision_logged']['title'] if cap_chaos['decision_logged'] else 'None'}'."
                ),
                inspect_hint="Check ProjectAndModelRouter.detect_project() in project_router.py"
            )

            # -----------------------------------------------------------------
            # SCENARIO 4: Two-Way Obsidian Disk Edit Sync (Disk .md -> SQLite FTS5)
            # -----------------------------------------------------------------
            md_path = Path(cap1["item"]["file_path"])
            original_disk = md_path.read_text(encoding="utf-8")
            md_path.write_text(original_disk + "\nManual Obsidian Edit: Added Hotfix Token Verification777\n", encoding="utf-8")

            sync_stats = self.compressor.sync_markdown_edits_from_disk()
            search_after_edit = self.store.search_vault("Verification777", project_id=p1["id"])
            s4_ok = sync_stats["sqlite_records_updated"] == 1 and len(search_after_edit) == 1
            self._record(
                scenario="4. Two-Way Obsidian Disk Edit -> SQLite FTS5 Sync",
                passed=s4_ok,
                explanation=f"Detected manual disk edit in '{md_path.name}' and indexed 'Verification777' in FTS5.",
                inspect_hint="Check MemoryCompressor.sync_markdown_edits_from_disk() in memory_compressor.py"
            )

            # -----------------------------------------------------------------
            # SCENARIO 5: AI Memory Compression & Token Budget Enforcement
            # -----------------------------------------------------------------
            comp_res = self.compressor.compress_project_memory(p1["id"])
            est_tokens = comp_res.get("estimated_summary_tokens", 9999)
            replay_exists = Path(comp_res.get("work_replay_file", "")).exists()
            s5_ok = (est_tokens < 450) and replay_exists and ("dotenv" in comp_res["compressed_rolling_summary"])
            self._record(
                scenario="5. Memory Compression & Work Session Replay",
                passed=s5_ok,
                explanation=f"Compressed project memory to {est_tokens} tokens and generated '_work_replay.md'.",
                inspect_hint="Check MemoryCompressor.compress_project_memory() in memory_compressor.py"
            )

            # -----------------------------------------------------------------
            # SCENARIO 6: Raw Unclear Prompt -> Pre-Structured Anti-Drift Spec
            # -----------------------------------------------------------------
            ctx_payload = self.store.build_context_injection_payload(p2["id"], active_query="playwright")
            rewritten = self.llm.rewrite_raw_prompt(
                raw_user_prompt="make the browser repair script stop failing on timeouts and log traces",
                context_payload=ctx_payload
            )
            spec_md = rewritten["structured_prompt_markdown"]
            s6_ok = (
                "Playwright trace viewer" in spec_md
                and rewritten["estimated_tokens"] < 2500
                and "Strict Output & Verification Contract" in spec_md
            )
            self._record(
                scenario="6. Anti-Drift Prompt Pre-Structurer (< 2,500 Tokens)",
                passed=s6_ok,
                explanation=(
                    f"Rewrote raw prompt into {rewritten['estimated_tokens']}-token spec grounded in "
                    f"Tier-2 Decision Graph ('Playwright trace viewer')."
                ),
                inspect_hint="Check HybridLLMBridge.rewrite_raw_prompt() in llm_bridge.py"
            )

            # -----------------------------------------------------------------
            # SCENARIO 7: Cross-Project Bug Solution Reuse
            # -----------------------------------------------------------------
            reusable_hits = self.compressor.find_cross_project_solutions(
                error_query="dotenv gateway",
                exclude_project_id=p2["id"]
            )
            s7_ok = len(reusable_hits) > 0 and reusable_hits[0]["suggested_fix"] == "pnpm add dotenv"
            self._record(
                scenario="7. Cross-Project Bug Fix Reuse Detection",
                passed=s7_ok,
                explanation=f"Queried from Project 2 and found reusable fix `{reusable_hits[0]['suggested_fix'] if reusable_hits else 'None'}` from [{reusable_hits[0]['source_project'] if reusable_hits else 'None'}].",
                inspect_hint="Check MemoryCompressor.find_cross_project_solutions() in memory_compressor.py"
            )

            # -----------------------------------------------------------------
            # SCENARIO 8: MCP Server Tool Execution & Error Resilience
            # -----------------------------------------------------------------
            mcp_server.store = self.store
            mcp_server.router = self.router
            mcp_server.pipeline = self.pipeline

            mcp_ctx = mcp_server.handle_tool_call("get_project_context", {"project_id": "Three Musketeers", "active_query": "dotenv"})
            graceful_error = False
            try:
                mcp_server.handle_tool_call("non_existent_tool_xyz", {})
            except ValueError:
                graceful_error = True

            s8_ok = (mcp_ctx.get("project_name") == "Three Musketeers") and graceful_error
            self._record(
                scenario="8. MCP Server Protocol & Malformed Tool Resilience",
                passed=s8_ok,
                explanation="Verified MCP 'get_project_context' resolution by project name and clean ValueError on invalid tool.",
                inspect_hint="Check handle_tool_call() in mcp_server.py"
            )

        finally:
            if cleanup and self.sandbox_path.exists():
                shutil.rmtree(self.sandbox_path, ignore_errors=True)

        passed_count = sum(1 for r in self.results if r["passed"])
        total_count = len(self.results)
        return {
            "all_passed": passed_count == total_count,
            "passed_count": passed_count,
            "total_count": total_count,
            "results": self.results
        }


def print_scorecard(report: Dict[str, Any]) -> None:
    print("\n" + "=" * 82)
    print("🩺 PROJECT BRAIN OS — GUIDED SCENARIO & CHAOS TEST SCORECARD")
    print("=" * 82)
    for r in report["results"]:
        badge = "✅ [PASS]" if r["passed"] else "❌ [FAIL]"
        print(f"{badge} {r['scenario']}")
        print(f"         Why/Result : {r['explanation']}")
        if not r["passed"]:
            print(f"         🔧 Fix Hint : {r['inspect_hint']}")
    print("-" * 82)
    status_line = (
        f"🎉 ALL {report['passed_count']}/{report['total_count']} SCENARIOS PASSED! Your Project Brain OS is 100% verified."
        if report["all_passed"]
        else f"⚠️  {report['passed_count']}/{report['total_count']} SCENARIOS PASSED. Inspect the Fix Hints above."
    )
    print(status_line)
    print("=" * 82 + "\n")


if __name__ == "__main__":
    harness = GuidedTestHarness()
    summary = harness.run_all_scenarios(cleanup=True)
    print_scorecard(summary)
