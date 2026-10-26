#!/usr/bin/env python3
"""
File: scripts/desktop_agent.py
Project Brain OS — Cross-Platform OS Capture, Screenshot/OCR & Privacy-Safe Agent

Features:
1. Active OS Window + Process Detection (Windows ctypes, macOS osascript, Linux xdotool)
2. Privacy & Exclusion Guardrails (blocks password managers, private browsing, .env views)
3. Secret Redaction before network/API dispatch (redacts API keys, Bearer tokens, PEM keys)
4. Base64 Screenshot Capture (PowerShell/screencapture/ImageMagick) for Vision OCR ingestion
5. Local Offline Spool Queue (~/.project-brain-spool.jsonl) if the Next.js server is offline
6. --check handshake mode against the workspace agent endpoint

Usage:
  python scripts/desktop_agent.py --once                # Immediate clipboard + window capture
  python scripts/desktop_agent.py --screenshot          # Capture screen + active window -> OCR pipeline
  python scripts/desktop_agent.py --watch               # Background clipboard & error watcher
  python scripts/desktop_agent.py --check               # Server handshake (GET /api/agent/capture)
"""

import argparse
import base64
import hashlib
import json
import os
import platform
import re
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request
from pathlib import Path

BRAIN_API_URL = os.environ.get("BRAIN_API_URL", "http://127.0.0.1:3000").rstrip("/")
BRAIN_AGENT_TOKEN = os.environ.get("BRAIN_AGENT_TOKEN", "")
SPOOL_FILE = Path.home() / ".project-brain-spool.jsonl"

# Privacy Exclusion Rules: Never capture from these window titles or apps
EXCLUDED_WINDOW_PATTERNS = [
    r"1password",
    r"bitwarden",
    r"keepass",
    r"lastpass",
    r"incognito",
    r"inprivate",
    r"private browsing",
    r"\.env",
    r"keychain access",
]

# Secret Redaction Patterns (client-side pre-flight; the server re-runs its own
# redactor on everything that reaches /api/capture — defense in depth)
SECRET_PATTERNS = [
    (re.compile(r"sk-ant-[A-Za-z0-9_\-]{20,}"), "[REDACTED_ANTHROPIC_KEY]"),
    (re.compile(r"sk-[A-Za-z0-9_\-]{20,}"), "[REDACTED_OPENAI_KEY]"),
    (re.compile(r"AIza[0-9A-Za-z_\-]{35}"), "[REDACTED_GOOGLE_KEY]"),
    (re.compile(r"gh[pousr]_[A-Za-z0-9_]{20,}"), "[REDACTED_GITHUB_TOKEN]"),
    (re.compile(r"(?i)(bearer\s+)[A-Za-z0-9_\-\.=]{16,}"), r"\1[REDACTED_BEARER_TOKEN]"),
    (re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]+?-----END [A-Z ]*PRIVATE KEY-----"), "[REDACTED_PRIVATE_KEY]"),
]


def is_window_excluded(window_title: str) -> bool:
    lower = (window_title or "").lower()
    return any(re.search(pat, lower) for pat in EXCLUDED_WINDOW_PATTERNS)


def redact_secrets(text: str) -> tuple:
    if not text:
        return "", 0
    redacted = text
    total = 0
    for pattern, replacement in SECRET_PATTERNS:
        redacted, count = pattern.subn(replacement, redacted)
        total += count
    return redacted, total


def get_active_window_title() -> str:
    sys_name = platform.system()
    try:
        if sys_name == "Windows":
            import ctypes
            user32 = ctypes.windll.user32
            hwnd = user32.GetForegroundWindow()
            length = user32.GetWindowTextLengthW(hwnd)
            buf = ctypes.create_unicode_buffer(length + 1)
            user32.GetWindowTextW(hwnd, buf, length + 1)
            return buf.value.strip() or "Windows Desktop"
        elif sys_name == "Darwin":
            script = 'tell application "System Events" to get name of first application process whose frontmost is true'
            app = subprocess.check_output(["osascript", "-e", script], text=True, timeout=2).strip()
            return app or "macOS Desktop"
        else:
            out = subprocess.check_output(["xdotool", "getactivewindow", "getwindowname"], text=True, timeout=2).strip()
            return out or "Linux Desktop"
    except Exception:
        return f"{sys_name} Workspace"


def get_clipboard_text() -> str:
    sys_name = platform.system()
    try:
        if sys_name == "Windows":
            return subprocess.check_output(
                ["powershell", "-NoProfile", "-Command", "Get-Clipboard"],
                text=True,
                timeout=3,
            ).strip()
        elif sys_name == "Darwin":
            return subprocess.check_output(["pbpaste"], text=True, timeout=2).strip()
        else:
            return subprocess.check_output(["xclip", "-selection", "clipboard", "-o"], text=True, timeout=2).strip()
    except Exception:
        return ""


def capture_screenshot_base64() -> str:
    """Captures the screen to a temporary PNG file and returns a data:image/png;base64 URI."""
    sys_name = platform.system()
    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp:
        tmp_path = tmp.name

    try:
        if sys_name == "Darwin":
            subprocess.run(["screencapture", "-x", tmp_path], check=True, timeout=5)
        elif sys_name == "Windows":
            ps_script = (
                "Add-Type -AssemblyName System.Windows.Forms,System.Drawing; "
                "$bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds; "
                "$bmp = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height; "
                "$graphics = [System.Drawing.Graphics]::FromImage($bmp); "
                "$graphics.CopyFromScreen($bounds.Location, [System.Drawing.Point]::Empty, $bounds.Size); "
                f"$bmp.Save('{tmp_path}', [System.Drawing.Imaging.ImageFormat]::Png);"
            )
            subprocess.run(["powershell", "-NoProfile", "-Command", ps_script], check=True, timeout=6)
        else:
            subprocess.run(["import", "-window", "root", tmp_path], check=True, timeout=5)

        with open(tmp_path, "rb") as f:
            encoded = base64.b64encode(f.read()).decode("ascii")
            return f"data:image/png;base64,{encoded}"
    except Exception as exc:
        print(f"[BrainAgent] Screenshot capture unavailable: {exc}", file=sys.stderr)
        return ""
    finally:
        if os.path.exists(tmp_path):
            try:
                os.remove(tmp_path)
            except OSError:
                pass


def spool_offline_capture(payload: dict) -> None:
    with open(SPOOL_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(payload) + "\n")
    print(f"[BrainAgent] Server unreachable. Spooled capture to {SPOOL_FILE}")


def flush_spool() -> None:
    if not SPOOL_FILE.exists():
        return
    remaining = []
    with open(SPOOL_FILE, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f if line.strip()]
    for line in lines:
        try:
            payload = json.loads(line)
            send_to_brain(payload, allow_spool=False)
        except Exception:
            remaining.append(line)
    if remaining:
        with open(SPOOL_FILE, "w", encoding="utf-8") as f:
            f.write("\n".join(remaining) + "\n")
    else:
        SPOOL_FILE.unlink(missing_ok=True)


def describe_result(result: dict) -> str:
    """Formats the capture confirmation from either API shape.

    /api/capture         -> { status, item: { title }, projectMatch: { projectName, confidence } }
    /api/agent/capture   -> { status, item_title, project: { name, confidence } }
    """
    item = result.get("item") or {}
    project = result.get("projectMatch") or result.get("project") or {}
    title = item.get("title") or result.get("item_title") or result.get("item_name") or "(untitled)"
    project_name = project.get("projectName") or project.get("name") or "Inbox"
    confidence = project.get("confidence", 0)
    try:
        conf_pct = int(float(confidence) * 100)
    except (TypeError, ValueError):
        conf_pct = 0
    return f"Auto-filed to [{project_name}] (confidence: {conf_pct}%) - Title: {title}"


def send_to_brain(payload: dict, allow_spool: bool = True) -> dict:
    url = f"{BRAIN_API_URL}/api/capture"
    data = json.dumps(payload).encode("utf-8")
    headers = {"Content-Type": "application/json"}
    if BRAIN_AGENT_TOKEN:
        headers["x-brain-token"] = BRAIN_AGENT_TOKEN

    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            if result.get("status") == "blocked":
                print(f"[Privacy Guard] Server rejected the capture: {result.get('reason', 'unknown')}")
            else:
                print(f"[BrainAgent] {describe_result(result)}")
            return result
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")[:200]
        print(f"[BrainAgent] Server rejected the capture (HTTP {exc.code}): {body}", file=sys.stderr)
        return {"status": "rejected", "http": exc.code}
    except urllib.error.URLError as exc:
        if allow_spool:
            spool_offline_capture(payload)
        else:
            raise exc
        return {"status": "spooled"}


def check_handshake() -> None:
    """GET /api/agent/capture — prints the handshake (used by --check and the regression suite)."""
    url = f"{BRAIN_API_URL}/api/agent/capture"
    req = urllib.request.Request(url, method="GET")
    if BRAIN_AGENT_TOKEN:
        req.add_header("x-brain-token", BRAIN_AGENT_TOKEN)
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            info = json.loads(resp.read().decode("utf-8"))
            print(
                f"[BrainAgent] Server handshake OK: endpoint={info.get('endpoint')} "
                f"token_required={info.get('token_required')} token_valid={info.get('token_valid')}"
            )
    except Exception as exc:
        print(f"[BrainAgent] Handshake failed: {exc}", file=sys.stderr)
        sys.exit(1)


def trigger_capture(include_screenshot: bool = False) -> None:
    flush_spool()
    window_title = get_active_window_title()
    if is_window_excluded(window_title):
        print(f"[Privacy Guard] Skipped capture from excluded window: {window_title}")
        return

    raw_clip = get_clipboard_text()
    sanitized_clip, redactions = redact_secrets(raw_clip)
    image_data_url = capture_screenshot_base64() if include_screenshot else ""

    if not sanitized_clip and not image_data_url:
        print("[BrainAgent] Nothing in clipboard or screenshot to capture.")
        return

    item_type = "screenshot" if include_screenshot else (
        "terminal" if any(k in sanitized_clip for k in ("Traceback", "Error:", "ERR!", "Exception")) else "clip"
    )

    payload = {
        "raw_content": sanitized_clip or f"Screenshot captured from {window_title}",
        "item_type": item_type,
        "window_title": window_title,
        "source_app": "DesktopAgent",
        "image_base64": image_data_url,
        "visual_hint": f"Captured from {window_title} (redacted {redactions} secrets)",
    }
    send_to_brain(payload)


def watch_loop(interval: float = 2.0) -> None:
    print(f"[BrainAgent] Project Brain OS Desktop Agent watching clipboard -> {BRAIN_API_URL}")
    last_hash = ""
    while True:
        try:
            clip = get_clipboard_text()
            if clip and len(clip) >= 24:
                digest = hashlib.sha256(clip.encode("utf-8", errors="ignore")).hexdigest()
                if digest != last_hash:
                    last_hash = digest
                    # Auto-capture high-signal clips (errors, decisions, code blocks)
                    if any(
                        token in clip
                        for token in ("Error:", "Traceback", "Exception", "Decision:", "ERR_", "failed")
                    ):
                        trigger_capture(include_screenshot=False)
        except KeyboardInterrupt:
            print("\nStopped Desktop Agent.")
            break
        except Exception as exc:
            print(f"[BrainAgent] Watch warning: {exc}", file=sys.stderr)
        time.sleep(interval)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Project Brain OS Desktop Agent")
    parser.add_argument("--once", action="store_true", help="Capture current clipboard + active window immediately")
    parser.add_argument("--screenshot", action="store_true", help="Capture full screen + active window for OCR")
    parser.add_argument("--watch", action="store_true", help="Watch clipboard in background for errors & decisions")
    parser.add_argument("--check", action="store_true", help="Server handshake probe (GET /api/agent/capture)")
    args = parser.parse_args()

    if args.check:
        check_handshake()
    elif args.screenshot:
        trigger_capture(include_screenshot=True)
    elif args.watch:
        watch_loop()
    else:
        trigger_capture(include_screenshot=False)
