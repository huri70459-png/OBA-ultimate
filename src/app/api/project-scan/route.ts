import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/auth";
import { capture } from "@/lib/brain/pipeline";
import { scanProjectFiles } from "@/lib/brain/project-scanner";
import { getProjectById } from "@/lib/brain/store";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const gate = await apiGuard(req, { mutation: true });
  if (!gate.ok) return NextResponse.json({ error: gate.error }, { status: gate.status });
  const body = await req.json().catch(() => ({}));
  const project = await getProjectById(String(body.projectId ?? ""));
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  if (!project.rootPath) return NextResponse.json({ error: "Project has no root path" }, { status: 400 });
  const scan = await scanProjectFiles(project.rootPath);
  const existing = await db.item.findMany({ where: { projectId: project.id }, select: { metadata: true } });
  const indexed = new Map<string, string>();
  const manifestRow = await db.setting.findUnique({ where: { key: `project_scan:${project.id}` } });
  if (manifestRow) { try { for (const [path, hash] of Object.entries(JSON.parse(manifestRow.value) as Record<string, string>)) indexed.set(path, hash); } catch {} }
  for (const row of existing) { try { const m = JSON.parse(row.metadata) as { indexed_source_path?: string; indexed_content_hash?: string }; if (m.indexed_source_path) indexed.set(m.indexed_source_path, m.indexed_content_hash ?? ""); } catch {} }
  let imported = 0; let unchanged = 0;
  for (const file of scan.files) {
    if (indexed.get(file.relativePath) === file.hash) { unchanged++; continue; }
    await capture({ rawContent: file.content, itemType: "note", activeFilePath: file.absolutePath, sourceApp: "Project File Scanner", forcedProjectId: project.id, extraMetadata: { indexed_source_path: file.relativePath, indexed_content_hash: file.hash, indexed_at: new Date().toISOString(), provenance: "explicit-project-scan" } });
    imported++;
  }
  for (const file of scan.files) indexed.set(file.relativePath, file.hash);
  await db.setting.upsert({ where: { key: `project_scan:${project.id}` }, create: { key: `project_scan:${project.id}`, value: JSON.stringify(Object.fromEntries(indexed)) }, update: { value: JSON.stringify(Object.fromEntries(indexed)) } });
  return NextResponse.json({ projectId: project.id, rootPath: project.rootPath, imported, unchanged, skipped: scan.skipped.length, errors: scan.errors.length, skippedFiles: scan.skipped.slice(0, 100), errorsDetail: scan.errors.slice(0, 100) });
}
