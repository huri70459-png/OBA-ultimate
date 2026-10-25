#!/usr/bin/env python3
"""Quick functional smoke test for v2.2 endpoints (settings + agent parity)."""
import json
import time
import urllib.request

BASE = "http://localhost:3000"
NONCE = str(int(time.time()))


def call(path, body=None, method=None, headers=None):
    url = BASE + path
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(
        url,
        data=data,
        method=method or ("POST" if data else "GET"),
        headers={"Content-Type": "application/json", **(headers or {})},
    )
    try:
        with urllib.request.urlopen(req, timeout=40) as r:
            return r.status, json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.loads(e.read().decode())
        except Exception:
            return e.code, {}


print("--- POST invalid provider (expect 400) ---")
s, d = call("/api/llm-backend", {"provider": "bogus"})
print(s, d)
assert s == 400, "invalid provider should 400"

print("--- POST dedup window 2 + provider offline ---")
s, d = call("/api/llm-backend", {"dedup_window_hours": 2, "provider": "deterministic-offline", "probe": False})
print(s, d)
assert s == 200 and d["dedup_window_hours"] == 2

print("--- health echoes window ---")
s, d = call("/api/health")
print(s, d.get("config"))
assert d["config"]["dedup_window_hours"] == 2

print("--- reset to 36 + auto ---")
s, d = call("/api/llm-backend", {"dedup_window_hours": 36, "provider": "auto", "probe": False})
assert s == 200 and d["dedup_window_hours"] == 36

content = "Error: Cannot find module 'agent-smoke-" + NONCE + "' in gateway.mjs"
payload = {
    "raw_content": content,
    "item_type": "terminal",
    "window_title": "Terminal - node gateway.mjs",
    "source_app": "DesktopAgent",
}

print("--- AGENT CAPTURE (new) ---")
s, d = call("/api/agent/capture", payload)
print(s, json.dumps({k: d.get(k) for k in ("status", "item_id", "project", "routed_model")}))
assert s == 200 and d["status"] == "captured_zero_save"
assert d["toast_notification"], "toast_notification must exist (brain_api.py parity)"
print("    routed project:", d["project"])

print("--- AGENT CAPTURE repeat (expect duplicate_merged) ---")
s, d = call("/api/agent/capture", payload)
print(s, d.get("status"), d.get("duplicate"))
assert s == 200 and d["status"] == "duplicate_merged" and d["duplicate"]["occurrence_count"] == 2

print("--- ALL AGENT/SETTINGS SMOKE CHECKS PASSED ---")
