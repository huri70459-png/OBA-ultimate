import { createHash } from "node:crypto";
import { lstat, readdir, readFile } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";

export const DEFAULT_SCAN_MAX_BYTES = 512 * 1024;
export const DEFAULT_SCAN_EXTENSIONS = new Set([
  ".md", ".mdx", ".txt", ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".py", ".go", ".rs", ".java", ".kt", ".json", ".jsonl", ".yaml", ".yml",
  ".toml", ".ini", ".sql", ".sh", ".ps1", ".css", ".scss", ".html",
]);
export const DEFAULT_IGNORED_DIRS = new Set([
  ".git", "node_modules", ".next", "dist", "build", "out", "coverage",
  "target", ".turbo", ".cache", "vendor", "__pycache__",
]);
const SECRET_NAMES = [/^\.env(?:\..*)?$/i, /(^|\.)秘密/i, /secret|credential|private[-_.]?key/i, /\.pem$/i, /\.key$/i];

export type ScanDecision = "import" | "unchanged" | "skipped" | "error";
export type ScanFile = { absolutePath: string; relativePath: string; content: string; hash: string; bytes: number };
export type ScanResult = { files: ScanFile[]; skipped: Array<{ path: string; reason: string }>; errors: Array<{ path: string; error: string }> };

export function isSecretPath(relativePath: string): boolean {
  return relativePath.split(/[\\/]/).some((part) => SECRET_NAMES.some((pattern) => pattern.test(part)));
}

export function isSafeProjectPath(rootPath: string, candidate: string): boolean {
  const root = resolve(rootPath);
  const target = resolve(candidate);
  const rel = relative(root, target);
  return rel === "" || (!rel.startsWith(`..${sep}`) && rel !== ".." && !isAbsolute(rel));
}

export async function scanProjectFiles(rootPath: string, options: { maxBytes?: number; extensions?: Set<string> } = {}): Promise<ScanResult> {
  const root = resolve(rootPath);
  const maxBytes = options.maxBytes ?? DEFAULT_SCAN_MAX_BYTES;
  const extensions = options.extensions ?? DEFAULT_SCAN_EXTENSIONS;
  const result: ScanResult = { files: [], skipped: [], errors: [] };
  async function visit(dir: string): Promise<void> {
    let entries;
    try { entries = await readdir(dir, { withFileTypes: true }); } catch (e) { result.errors.push({ path: dir, error: e instanceof Error ? e.message : "read failed" }); return; }
    for (const entry of entries) {
      const abs = resolve(dir, entry.name);
      const rel = relative(root, abs).replaceAll("\\", "/");
      if (entry.isDirectory()) {
        if (!DEFAULT_IGNORED_DIRS.has(entry.name)) await visit(abs);
        else result.skipped.push({ path: rel, reason: "ignored directory" });
        continue;
      }
      if (!entry.isFile()) continue;
      if (!isSafeProjectPath(root, abs)) { result.skipped.push({ path: rel, reason: "outside project root" }); continue; }
      if (isSecretPath(rel)) { result.skipped.push({ path: rel, reason: "secret-looking file" }); continue; }
      const ext = rel.slice(rel.lastIndexOf(".")).toLowerCase();
      if (!extensions.has(ext)) { result.skipped.push({ path: rel, reason: "unsupported file type" }); continue; }
      try {
        const stat = await lstat(abs);
        if (stat.size > maxBytes) { result.skipped.push({ path: rel, reason: `over ${maxBytes} byte limit` }); continue; }
        const content = await readFile(abs, "utf8");
        result.files.push({ absolutePath: abs, relativePath: rel, content, bytes: Buffer.byteLength(content), hash: createHash("sha256").update(content).digest("hex") });
      } catch (e) { result.errors.push({ path: rel, error: e instanceof Error ? e.message : "read failed" }); }
    }
  }
  await visit(root);
  return result;
}
