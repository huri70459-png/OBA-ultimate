// Project Brain OS — Local Vector Engine ("brain-hash-v1")
// sqlite-vec-pattern embeddings: hashed n-gram feature vectors stored as base64 Float32
// inside the same SQLite db (ItemVector table). Fully deterministic, offline, zero API keys.
//
// Why hashed n-grams: word unigrams capture exact topic overlap, word bigrams capture
// phrase structure ("knowledge graph"), and character trigrams give morphological
// robustness ("deploy" matches "deployment", "render" matches "rendering") — enough
// semantic lift to answer queries like "find the screenshot with red Render logs"
// without any external embedding service. Swap `embedText` for a neural embedder later;
// the storage/similarity contract (base64 Float32 + cosine) stays identical.

import { randomUUID } from "crypto";

export const EMBEDDING_DIM = 256;
export const EMBEDDING_MODEL = "brain-hash-v1";

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "but", "nor", "so", "yet", "of", "to", "in", "on", "at",
  "by", "for", "with", "about", "into", "from", "as", "is", "are", "was", "were", "be",
  "been", "being", "am", "do", "does", "did", "have", "has", "had", "will", "would",
  "shall", "should", "can", "could", "may", "might", "must", "it", "its", "this", "that",
  "these", "those", "i", "you", "he", "she", "we", "they", "them", "his", "her", "my",
  "your", "our", "their", "me", "him", "us", "if", "then", "else", "when", "while",
  "because", "than", "too", "very", "just", "also", "not", "no", "yes", "here", "there",
  "what", "which", "who", "whom", "how", "all", "any", "both", "each", "few", "more",
  "most", "other", "some", "such", "only", "own", "same", "s", "t", "don", "now",
]);

/** FNV-1a 32-bit string hash — fast, deterministic, well-distributed. */
function fnv1a(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Normalize text into meaningful lowercase tokens (stopwords removed). */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9+#._-]+/i)
    .map((t) => t.replace(/^[._-]+|[._-]+$/g, ""))
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

/** Character trigrams of a token (edge-padded) for morphological robustness. */
function charTrigrams(token: string): string[] {
  const padded = `#${token}#`;
  const grams: string[] = [];
  for (let i = 0; i < padded.length - 2; i++) grams.push(padded.slice(i, i + 3));
  return grams;
}

interface FeatureWeight {
  key: string;
  weight: number;
}

/** Extract weighted n-gram features from token stream. */
function extractFeatures(tokens: string[]): FeatureWeight[] {
  const features: FeatureWeight[] = [];

  for (const tok of tokens) {
    // Word unigram — strongest signal
    features.push({ key: `w:${tok}`, weight: 1.0 });
    // Character trigrams — morphological variants ("deploy" ≈ "deployment")
    for (const g of charTrigrams(tok)) {
      features.push({ key: `c:${g}`, weight: 0.3 });
    }
  }

  // Word bigrams — phrase structure ("red render", "knowledge graph")
  for (let i = 0; i < tokens.length - 1; i++) {
    features.push({ key: `b:${tokens[i]}_${tokens[i + 1]}`, weight: 0.7 });
  }

  return features;
}

/**
 * Embed text into a sparse-hashed, L2-normalized dense vector.
 * Deterministic: same text always yields the same vector.
 */
export function embedText(text: string): Float32Array {
  const vec = new Float32Array(EMBEDDING_DIM);
  const tokens = tokenize(text);
  if (tokens.length === 0) return vec;

  // Count raw occurrences per feature key first (for sublinear TF)
  const counts = new Map<string, number>();
  const weights = new Map<string, number>();
  for (const f of extractFeatures(tokens)) {
    counts.set(f.key, (counts.get(f.key) ?? 0) + 1);
    weights.set(f.key, Math.max(weights.get(f.key) ?? 0, f.weight));
  }

  let norm = 0;
  for (const [key, count] of counts) {
    const tf = 1 + Math.log(count); // sublinear TF dampens repetition
    const contribution = tf * (weights.get(key) ?? 1.0);
    const bucket = fnv1a(key) % EMBEDDING_DIM;
    // Alternate sign by a second hash bit to reduce collision bias
    const sign = fnv1a(`sign:${key}`) & 1 ? 1 : -1;
    vec[bucket] += sign * contribution;
  }

  for (let i = 0; i < EMBEDDING_DIM; i++) norm += vec[i] * vec[i];
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let i = 0; i < EMBEDDING_DIM; i++) vec[i] /= norm;
  }
  return vec;
}

/** Cosine similarity for L2-normalized vectors (= dot product). */
export function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  const len = Math.min(a.length, b.length);
  let dot = 0;
  for (let i = 0; i < len; i++) dot += a[i] * b[i];
  return dot;
}

/** Serialize a Float32 vector to base64 for compact SQLite storage. */
export function encodeVector(vec: Float32Array): string {
  return Buffer.from(vec.buffer, vec.byteOffset, vec.byteLength).toString("base64");
}

/** Decode a base64 Float32 vector back from SQLite storage. */
export function decodeVector(b64: string): Float32Array {
  const buf = Buffer.from(b64, "base64");
  return new Float32Array(buf.buffer, buf.byteOffset, Math.floor(buf.byteLength / 4));
}

/** Convenience: embed + encode in one call for storage rows. */
export function embedForStorage(text: string): {
  model: string;
  dim: number;
  vector: string;
} {
  return {
    model: EMBEDDING_MODEL,
    dim: EMBEDDING_DIM,
    vector: encodeVector(embedText(text)),
  };
}

/** New row id helper. */
export function newVectorId(): string {
  return `vec_${randomUUID().replace(/-/g, "").slice(0, 12)}`;
}

/** Top topic keywords from a text blob (for session rollups / summaries). */
export function topKeywords(text: string, limit = 6): string[] {
  const counts = new Map<string, number>();
  for (const tok of tokenize(text)) {
    counts.set(tok, (counts.get(tok) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([k]) => k);
}
