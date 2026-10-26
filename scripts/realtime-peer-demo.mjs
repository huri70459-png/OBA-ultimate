// Peer simulator — joins the chat rooms from the CLI and emits typing + a note
// so the browser UI can be observed receiving live traffic (E2E for Task 11).
import { io } from "socket.io-client";

const rooms = process.argv.slice(2);
const socket = io("http://localhost:3003", { transports: ["websocket", "polling"] });

socket.on("connect", () => {
  for (const room of rooms) {
    socket.emit("chat:join", { room, user: { id: "u-peer", name: "Cli Peer" } });
  }
  setTimeout(() => {
    for (const room of rooms) socket.emit("chat:typing", { room, typing: true });
  }, 400);
  setTimeout(() => {
    for (const room of rooms) socket.emit("chat:typing", { room, typing: false });
  }, 6000);
  setTimeout(() => {
    for (const room of rooms) {
      socket.emit("chat:note", {
        room,
        note: { clientId: `peer-${Date.now()}`, content: "Live from the CLI peer — realtime layer works!", kind: "note" },
      });
    }
  }, 1500);
});

socket.on("disconnect", () => process.exit(0));
setTimeout(() => process.exit(0), 12000);
