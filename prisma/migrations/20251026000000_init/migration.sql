-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "rootPath" TEXT NOT NULL DEFAULT '',
    "keywords" TEXT NOT NULL DEFAULT '[]',
    "gitRemotes" TEXT NOT NULL DEFAULT '[]',
    "rollingSummary" TEXT NOT NULL DEFAULT '',
    "healthScore" INTEGER,
    "healthGaps" TEXT NOT NULL DEFAULT '[]',
    "lastCompressedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT,
    "itemType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rawContent" TEXT NOT NULL,
    "structuredSummary" TEXT NOT NULL DEFAULT '',
    "visualDescription" TEXT NOT NULL DEFAULT '',
    "filePath" TEXT NOT NULL DEFAULT '',
    "assetPath" TEXT NOT NULL DEFAULT '',
    "sourceApp" TEXT NOT NULL DEFAULT '',
    "sourceUrl" TEXT NOT NULL DEFAULT '',
    "metadata" TEXT NOT NULL DEFAULT '{}',
    "vaultSyncStatus" TEXT NOT NULL DEFAULT 'pending',
    "vaultSyncError" TEXT,
    "capturedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Item_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemVector" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "projectId" TEXT,
    "model" TEXT NOT NULL DEFAULT 'brain-hash-v1',
    "dim" INTEGER NOT NULL,
    "vector" TEXT NOT NULL,
    "indexedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ItemVector_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ItemVector_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Decision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "decision" TEXT NOT NULL,
    "alternatives" TEXT NOT NULL DEFAULT '[]',
    "reasoning" TEXT NOT NULL,
    "outcome" TEXT NOT NULL DEFAULT 'Active',
    "sourceItemId" TEXT,
    "decidedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Decision_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GraphEdge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT,
    "sourceNode" TEXT NOT NULL,
    "targetNode" TEXT NOT NULL,
    "relationType" TEXT NOT NULL,
    "weight" REAL NOT NULL DEFAULT 1.0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GraphEdge_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Setting" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL DEFAULT '',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UserAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'owner',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLoginAt" DATETIME
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mode" TEXT NOT NULL DEFAULT '',
    "llmUsed" BOOLEAN NOT NULL DEFAULT false,
    "grounded" BOOLEAN NOT NULL DEFAULT false,
    "sourcesJson" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT,
    "sourceItemId" TEXT,
    "errorSignature" TEXT NOT NULL DEFAULT '',
    "suggestedCommand" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'suggested',
    "verificationNote" TEXT NOT NULL DEFAULT '',
    "verifiedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Action_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Action_sourceItemId_fkey" FOREIGN KEY ("sourceItemId") REFERENCES "Item" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CaptureJob" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idempotencyKey" TEXT NOT NULL,
    "payloadJson" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'completed',
    "attempts" INTEGER NOT NULL DEFAULT 1,
    "lastError" TEXT NOT NULL DEFAULT '',
    "resultItemId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ItemRevision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL DEFAULT '',
    "rawContent" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'editor',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ItemRevision_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Item_projectId_capturedAt_idx" ON "Item"("projectId", "capturedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ItemVector_itemId_key" ON "ItemVector"("itemId");

-- CreateIndex
CREATE INDEX "ItemVector_projectId_idx" ON "ItemVector"("projectId");

-- CreateIndex
CREATE INDEX "Decision_projectId_decidedAt_idx" ON "Decision"("projectId", "decidedAt");

-- CreateIndex
CREATE INDEX "GraphEdge_projectId_createdAt_idx" ON "GraphEdge"("projectId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_email_key" ON "UserAccount"("email");

-- CreateIndex
CREATE INDEX "ChatMessage_projectId_createdAt_idx" ON "ChatMessage"("projectId", "createdAt");

-- CreateIndex
CREATE INDEX "Action_projectId_status_idx" ON "Action"("projectId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "CaptureJob_idempotencyKey_key" ON "CaptureJob"("idempotencyKey");

-- CreateIndex
CREATE INDEX "CaptureJob_status_createdAt_idx" ON "CaptureJob"("status", "createdAt");

-- CreateIndex
CREATE INDEX "ItemRevision_itemId_createdAt_idx" ON "ItemRevision"("itemId", "createdAt");

