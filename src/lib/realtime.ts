// ============================================================
// Realtime client — typed socket.io handle for live collaboration
// ============================================================
// Blueprint ("Real-time Chat Integration"): persistent bidirectional
// channel alongside the NDJSON ask/stream pipeline.
//
// Sandbox topology (MUST keep): every connection goes through the Caddy
// gateway — `io('/?XTransformPort=3003')` with path "/". NEVER connect to
// a bare host:port URL (the gateway is the only externally exposed port).
//
// Graceful degradation: the realtime service is optional infrastructure.
// If it is not running, the handle goes offline after a few bounded
// reconnect attempts, silently — the grounded chat keeps working and the
// UI simply hides presence/typing affordances.

import { io, type Socket } from "socket.io-client";

export interface RealtimePeer {
  id: string;
  name: string;
}

export interface RealtimeNote {
  id: string;
  clientId: string;
  kind: "question" | "note";
  content: string;
  author: RealtimePeer;
  ts: string;
}

export interface RealtimeHandlers {
  /** Full presence list for the room (includes this client). */
  onPresence?: (peers: RealtimePeer[]) => void;
  /** A peer started/stopped typing. */
  onTyping?: (event: { user: RealtimePeer; typing: boolean }) => void;
  /** A live note was broadcast into the room (dedup by id/clientId upstream). */
  onNote?: (note: RealtimeNote) => void;
  /** Connection status flips — UI uses this to show/hide live affordances. */
  onStatus?: (connected: boolean) => void;
}

export interface RealtimeHandle {
  socket: Socket;
  /** Relay "is typing" state for the local user. */
  emitTyping: (typing: boolean) => void;
  /** Broadcast an ephemeral note to every peer in the room. */
  sendNote: (note: { clientId: string; content: string; kind: "question" | "note" }) => void;
  /** Deterministically tear the socket down. */
  close: () => void;
}

const REALTIME_URL = "/?XTransformPort=3003";
const JOIN_DEBOUNCE_MS = 60;

/** Resolve the display identity once per page session (open mode => Guest). */
let identityCache: RealtimePeer | null = null;
const resolveIdentity = async (): Promise<RealtimePeer> => {
  if (identityCache) return identityCache;
  try {
    const res = await fetch("/api/auth/session", { credentials: "same-origin" });
    const data = (await res.json()) as {
      user?: { id?: string; name?: string | null; email?: string } | null;
    };
    const user = data.user;
    identityCache = {
      id: user?.id ?? "local",
      name: user?.name?.trim() || user?.email?.split("@")[0] || "Guest",
    };
  } catch {
    identityCache = { id: "local", name: "Guest" };
  }
  return identityCache;
};

export const connectRealtime = (room: string, handlers: RealtimeHandlers): RealtimeHandle => {
  const socket = io(REALTIME_URL, {
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 4,
    reconnectionDelay: 1200,
    timeout: 8000,
  });

  const onPresence = (data: { peers?: RealtimePeer[] }) => {
    // Presence is "others online" — the server stamps peer ids with server-side
    // socket ids, so the local socket can subtract itself before surfacing.
    handlers.onPresence?.((data.peers ?? []).filter((p) => p.id !== socket.id));
  };
  const onTyping = (data: { user?: RealtimePeer; typing?: boolean }) => {
    if (data.user) handlers.onTyping?.({ user: data.user, typing: Boolean(data.typing) });
  };
  const onNote = (data: { note?: RealtimeNote }) => {
    if (data.note) handlers.onNote?.(data.note);
  };
  const onConnect = () => {
    handlers.onStatus?.(true);
    void resolveIdentity().then((user) => {
      socket.emit("chat:join", { room, user });
    });
  };

  socket.on("connect", onConnect);
  socket.on("disconnect", () => handlers.onStatus?.(false));
  socket.on("connect_error", () => handlers.onStatus?.(false));
  socket.on("chat:presence", onPresence);
  socket.on("chat:typing", onTyping);
  socket.on("chat:note", onNote);

  return {
    socket,
    emitTyping: (typing: boolean) => socket.emit("chat:typing", { room, typing }),
    sendNote: (note) => socket.emit("chat:note", { room, note }),
    close: () => {
      socket.off("chat:presence", onPresence);
      socket.off("chat:typing", onTyping);
      socket.off("chat:note", onNote);
      socket.disconnect();
    },
  };
};

export const REALTIME_JOIN_DEBOUNCE_MS = JOIN_DEBOUNCE_MS;
