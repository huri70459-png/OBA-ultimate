// enterprise-cleanup.cjs — deletes every account/chat/auth-setting row created by
// verify-enterprise.mjs, restoring open bootstrap mode. Standalone CommonJS file
// so the verify suite can exec it without shell-quoting gymnastics.

/* eslint-disable @typescript-eslint/no-require-imports */

const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

(async () => {
  await db.chatMessage.deleteMany({});
  await db.userAccount.deleteMany({});
  await db.setting.deleteMany({
    where: { key: { in: ["auth_mode", "auth_jwt_secret"] } },
  });
  await db.$disconnect();
  console.log("enterprise cleanup done");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
