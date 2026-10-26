// ============================================================
// Brain Realtime Service — socket.io relay for live collaboration
// ============================================================
// Blueprint ("Real-time Chat Integration"): persistent, bidirectional
// channel underneath the grounded NDJSON ask/stream pipeline:
//   - presence     — who is online in a thread's room
//   - typing       — "is typing…" indicators relayed to peers
//   - live notes   — instant cross-client message broadcasts
//
// Sandbox topology (MUST keep): this is a mini-service on its own port.
// The Caddy gateway forwards `/` requests carrying `XTransformPort=3003`
// to this process, so the socket path is ALWAYS "/" and clients connect
// with `io('/?XTransformPort=3003')` — never a bare host:port URL.
//
// Persistence boundary: notes relayed here are EPHEMERAL. The persisted
// thread remains /api/chat + /api/ask/stream (TanStack Query cache =
// server truth). A future persistence hook can POST notes to /api/chat.

import { createServer } from "http";
import { Server, type Socket } from "socket.io";

interface Peer {
  id: string;
  name: string;
  room: string;
}

interface JoinPayload {
  room: string;
  user: { id: string; name: string };
}

interface TypingPayload {
  room: string;
  typing: boolean;
}

interface NotePayload {
  room: string;
  note: {
    clientId: string;
    content: string;
    kind: "question" | "note";
  };
}

const PORT = 3003;
const httpServer = createServer();

const io = new Server(httpServer, {
  // DO NOT change the path — Caddy forwards on it (see header comment).
  path: "/",
  cors: { origin: "*", methods: ["GET", "POST"] },
  pingTimeout: 60000,
  pingInterval: 25000,
});

const peers = new Map<string, Peer>();

const clean = (value: unknown, max: number): string =>
  typeof value === "string" ? value.slice(0, max) : "";

const roomPeerList = (room: string): Array<{ id: string; name: string }> =>
  [...peers.values()]
    .filter((p) => p.room === room)
    .map((p) => ({ id: p.id, name: p.name }));

const broadcastPresence = (room: string) => {
  io.to(room).emit("chat:presence", { room, peers: roomPeerList(room) });
};

io.on("connection", (socket: Socket) => {
  socket.on("rt:ping", (ack?: (v: unknown) => void) => {
    if (typeof ack === "function") ack({ pong: true, ts: new Date().toISOString() });
  });

  socket.on("chat:join", (raw: JoinPayload) => {
    const room = clean(raw?.room, 128);
    const name = clean(raw?.user?.name, 80) || "Guest";
    if (!room) return;
    const user = { id: socket.id, name };
    peers.set(socket.id, { id: user.id, name: user.name, room });
    void socket.join(room);
    broadcastPresence(room);
    if (process.env.RT_DEBUG) console.log(`[rt] join ${socket.id} ${user.name} -> ${room} (peers=${peers.size})`);
  });

  socket.on("chat:typing", (raw: TypingPayload) => {
    const peer = peers.get(socket.id);
    if (!peer || peer.room !== clean(raw?.room, 128)) return;
    socket.to(peer.room).emit("chat:typing", {
      room: peer.room,
      user: { id: peer.id, name: peer.name },
      typing: Boolean(raw?.typing),
    });
  });

  socket.on("chat:note", (raw: NotePayload) => {
    const peer = peers.get(socket.id);
    if (!peer || peer.room !== clean(raw?.room, 128)) return;
    const content = clean(raw?.note?.content, 4000);
    if (!content) return;
    // Relay to everyone EXCEPT the sender — the sender rendered its message
    // optimistically; peers dedup by id/clientId on receipt.
    socket.to(peer.room).emit("chat:note", {
      room: peer.room,
      note: {
        id: `rt-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        clientId: clean(raw?.note?.clientId, 80),
        kind: raw?.note?.kind === "note" ? "note" : "question",
        content,
        author: { id: peer.id, name: peer.name },
        ts: new Date().toISOString(),
      },
    });
  });

  socket.on("disconnect", () => {
    const peer = peers.get(socket.id);
    if (process.env.RT_DEBUG) console.log(`[rt] disconnect ${socket.id} (had-peer=${Boolean(peer)})`);
    if (peer) {
      peers.delete(socket.id);
      broadcastPresence(peer.room);
    }
  });

  socket.on("error", () => {
    // socket.io already surfaces transport errors to the client; swallow
    // server-side noise so a flapping client cannot spam the process log.
  });
});

httpServer.listen(PORT, () => {
  console.log(`Brain realtime service listening on :${PORT}`);
});

process.on("SIGTERM", () => {
  httpServer.close(() => process.exit(0));
});
process.on("SIGINT", () => {
  httpServer.close(() => process.exit(0));
});
