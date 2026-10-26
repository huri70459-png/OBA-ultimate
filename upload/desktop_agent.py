"""
desktop_agent.py - OS Clipboard, Active Window Detector & Zero-Save Hotkey Agent
Works out-of-the-box with Python standard library (ctypes / subprocess / urllib).
Talks directly to `http://127.0.0.1:8765/capture`.

Usage modes:
  1. Instant CLI Capture:
     python desktop_agent.py --snip "Error: Cannot find module 'playwright'"
  2. Instant Clipboard Zero-Save Capture (bind this command to Win+Shift+Space):
     python desktop_agent.py --clipboard
  3. Continuous Smart Clipboard Watcher (auto-captures copied stack traces & decisions):
     python desktop_agent.py --watch
"""

import sys
import time
import json
import platform
import subprocess
import urllib.request
from typing import Tuple

BRAIN_API_URL = "http://127.0.0.1:8765/capture"


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
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    with urllib.request.urlopen(req, timeout=5) as resp:
        return json.loads(resp.read().decode("utf-8"))


def watch_clipboard_loop(poll_seconds: float = 1.5):
    print("👀 Project Brain OS — Smart Clipboard & Error Watcher Active")
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
                print(f"[DesktopAgent] Waiting for brain_api.py daemon ({e})")


if __name__ == "__main__":
    if "--watch" in sys.argv:
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
        try:
            res = send_zero_save_capture(
                "Error: Cannot find module 'playwright' in browser_repair.py",
                item_type="terminal",
                visual_hint="Captured from active IDE window"
            )
            print(res.get("toast_notification"))
        except Exception as exc:
            print(f"Start `python brain_api.py` first! ({exc})")
