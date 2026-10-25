"""
desktop_agent.py - OS Clipboard, Active Window Detector & Zero-Save Hotkey Agent
v2.2 — Desktop Agent Parity with the Next.js Project Brain OS web workspace.

Works out-of-the-box with Python standard library (ctypes / subprocess / urllib).
Talks to the brain_api.py daemon (http://127.0.0.1:8765/capture) OR to the hosted
web workspace ingest endpoint (/api/agent/capture) — same wire format either way.

Configuration (environment variables):
  BRAIN_API_URL      capture endpoint. Defaults to http://127.0.0.1:8765/capture.
                     For the web workspace: http://<host>/api/agent/capture
  BRAIN_INGEST_TOKEN optional bearer token — required when the endpoint is
                     token-protected (Settings dialog -> "Agent ingest token").

Usage modes:
  0. Connectivity check (handshake: token_required, payload schema):
     python desktop_agent.py --check
  1. Instant CLI Capture:
     python desktop_agent.py --snip "Error: Cannot find module 'playwright'"
  2. Instant Clipboard Zero-Save Capture (bind to Win+Shift+Space):
     python desktop_agent.py --clipboard
  3. Continuous Smart Clipboard Watcher (auto-captures stack traces & decisions):
     python desktop_agent.py --watch

Examples:
  python desktop_agent.py --watch
  BRAIN_API_URL=http://localhost:3000/api/agent/capture python desktop_agent.py --clipboard
  BRAIN_API_URL=https://brain.example.com/api/agent/capture BRAIN_INGEST_TOKEN=abcd... python desktop_agent.py --watch
"""

import os
import sys
import time
import json
import platform
import subprocess
import urllib.request
import urllib.error
from typing import Tuple

BRAIN_API_URL = os.environ.get("BRAIN_API_URL", "http://127.0.0.1:8765/capture")
BRAIN_INGEST_TOKEN = os.environ.get("BRAIN_INGEST_TOKEN", "")


def _auth_headers() -> dict:
    """Bearer token header when configured (web workspace token-protected mode)."""
    if BRAIN_INGEST_TOKEN:
        return {"Authorization": f"Bearer {BRAIN_INGEST_TOKEN}", "X-Brain-Token": BRAIN_INGEST_TOKEN}
    return {}


def get_active_window_title() -> str:
    """Detects the active OS window title with zero third-party packages."""
    system = platform.system()
    try:
        if system == "Windows":
            import ctypes
            user32 = ctypes.windll.user32
            hwnd = user32.GetForegroundWindow()
            length = user32.GetWindowTextLengthW(hwnd)
            buf = ctypes.create_unicode_buffer(length + 1)
            user32.GetWindowTextW(hwnd, buf, length + 1)
            return buf.value or "Windows Desktop"
        elif system == "Darwin":
            script = 'tell application "System Events" to get name of first application process whose frontmost is true'
            out = subprocess.check_output(["osascript", "-e", script], text=True)
            return out.strip()
        elif system == "Linux":
            out = subprocess.check_output(["xdotool", "getactivewindow", "getwindowname"], text=True)
            return out.strip()
    except Exception:
        pass
    return f"{system} Active Window"


def get_clipboard_text() -> str:
    """Reads current OS clipboard text using standard OS utilities."""
    system = platform.system()
    try:
        if system == "Windows":
            out = subprocess.check_output(
                ["powershell", "-NoProfile", "-Command", "Get-Clipboard"],
                text=True
            )
            return out.strip()
        elif system == "Darwin":
            return subprocess.check_output(["pbpaste"], text=True).strip()
        elif system == "Linux":
            return subprocess.check_output(["xclip", "-selection", "clipboard", "-o"], text=True).strip()
    except Exception:
        pass
    return ""


def check_endpoint() -> None:
    """GET handshake: prints whether the endpoint is alive and token-protected."""
    req = urllib.request.Request(BRAIN_API_URL, headers={"Accept": "application/json", **_auth_headers()})
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            info = json.loads(resp.read().decode("utf-8"))
        print(f"✅ Endpoint alive: {BRAIN_API_URL}")
        print(f"   token_required : {info.get('token_required')}")
        print(f"   token_valid    : {info.get('token_valid')}")
        if info.get("token_required") and not BRAIN_INGEST_TOKEN:
            print("   ⚠️  Endpoint requires a token — set BRAIN_INGEST_TOKEN.")
        payload = info.get("payload") or {}
        if payload:
            print("   payload fields : " + ", ".join(payload.keys()))
    except urllib.error.HTTPError as e:
        print(f"❌ Endpoint responded HTTP {e.code} — {e.read().decode('utf-8', 'ignore')[:200]}")
    except Exception as e:
        print(f"❌ Cannot reach {BRAIN_API_URL} ({e})")


def send_zero_save_capture(raw_content: str, item_type: str = "clip", visual_hint: str = "") -> dict:
    window_title = get_active_window_title()
    payload = {
        "raw_content": raw_content,
        "item_type": item_type,
        "window_title": window_title,
        "source_app": "DesktopAgent",
        "visual_hint": visual_hint
    }
    req = urllib.request.Request(
        BRAIN_API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", **_auth_headers()},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "ignore")[:300]
        if e.code == 401:
            return {"toast_notification": f"❌ Ingest token missing/invalid (HTTP 401): {body}"}
        return {"toast_notification": f"❌ Capture failed (HTTP {e.code}): {body}"}


def watch_clipboard_loop(poll_seconds: float = 1.5):
    print("👀 Project Brain OS — Smart Clipboard & Error Watcher Active")
    print(f"   Endpoint: {BRAIN_API_URL}")
    print("   Copy any stack trace, terminal error, or 'Decision: ...' note to auto-capture!")
    last_text = get_clipboard_text()

    while True:
        time.sleep(poll_seconds)
        current = get_clipboard_text()
        if not current or current == last_text or len(current) < 12:
            continue

        last_text = current
        lower = current.lower()
        # Trigger automatically if it looks like an error, stack trace, or decision note
        is_interesting = any(
            kw in lower for kw in [
                "error:", "exception", "traceback", "cannot find module",
                "modulenotfounderror", "decision:", "why we chose"
            ]
        )
        if is_interesting:
            try:
                res = send_zero_save_capture(current, item_type="terminal")
                print(f"\n{res.get('toast_notification')}")
            except Exception as e:
                print(f"[DesktopAgent] Capture failed ({e})")


if __name__ == "__main__":
    if "--check" in sys.argv:
        check_endpoint()
    elif "--watch" in sys.argv:
        watch_clipboard_loop()
    elif "--clipboard" in sys.argv:
        clip = get_clipboard_text()
        if clip:
            res = send_zero_save_capture(clip, item_type="clip")
            print(res.get("toast_notification"))
        else:
            print("⚠️ Clipboard is empty.")
    elif "--snip" in sys.argv:
        idx = sys.argv.index("--snip")
        text = " ".join(sys.argv[idx + 1:]) if idx + 1 < len(sys.argv) else "Quick Snip"
        res = send_zero_save_capture(text, item_type="screenshot")
        print(res.get("toast_notification"))
    else:
        print("⚡ Running Quick Desktop Agent Test Capture...")
        print(f"   Endpoint: {BRAIN_API_URL}  (override with BRAIN_API_URL env)")
        try:
            res = send_zero_save_capture(
                "Error: Cannot find module 'playwright' in browser_repair.py",
                item_type="terminal",
                visual_hint="Captured from active IDE window"
            )
            print(res.get("toast_notification"))
        except Exception as exc:
            print(f"Capture failed ({exc}). Start the Brain OS endpoint first.")
