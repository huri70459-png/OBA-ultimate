// One-off maintenance: remove junk projects that pollute project auto-routing.
//
// Found during Task 16 phase-1 board run: single-letter projects ("s", "hu")
// and leftover "Gap Probe <nonce>" rows make the router match nearly ANY
// capture (keyword "s" hits every text), so low-confidence captures never
// reach the Inbox and verify-blueprint's inbox check + selftest scenario 10
// fail. Deleting a project is lossless-by-design per schema.prisma:
//   Item.projectId      -> SetNull  (items fall back to the Inbox)
//   ItemVector.projectId-> SetNull
//   Decision/GraphEdge/Action.projectId -> Cascade (probe junk removed)
//
// Usage: node scripts/cleanup-junk-projects.mjs [--dry-run]

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const dryRun = process.argv.includes("--dry-run");

const junk = await prisma.project.findMany({
  where: {
    OR: [
      { name: { in: ["s", "hu"] } },
      { name: { startsWith: "Gap Probe" } },
    ],
  },
  select: { id: true, name: true, slug: true, _count: { select: { items: true, decisions: true, edges: true } } },
});

if (junk.length === 0) {
  console.log("CLEAN: no junk projects found");
  process.exit(0);
}

for (const p of junk) {
  console.log(
    `${dryRun ? "[dry-run] would delete" : "deleting"} project "${p.name}" (${p.slug}) — ` +
      `${p._count.items} items->inbox, ${p._count.decisions} decisions, ${p._count.edges} edges (cascade)`
  );
}

if (!dryRun) {
  const ids = junk.map((p) => p.id);
  const res = await prisma.project.deleteMany({ where: { id: { in: ids } } });
  console.log(`DONE: ${res.count} junk project(s) deleted; their items now live in the Inbox`);
}
await prisma.$disconnect();
