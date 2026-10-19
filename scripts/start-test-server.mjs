/**
 * Démarre le serveur de production autonome (.next/standalone) pour les tests,
 * après y avoir copié les fichiers statiques comme le fait l'image Docker.
 */
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { spawn } from "node:child_process";

if (!existsSync(".next/standalone/server.js")) {
  console.error("Build introuvable : lancez d'abord « pnpm build ».");
  process.exit(1);
}
cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
cpSync("public", ".next/standalone/public", { recursive: true });
mkdirSync(".playwright", { recursive: true });
if (process.env.MAIL_OUTBOX_FILE) rmSync(process.env.MAIL_OUTBOX_FILE, { force: true });

const child = spawn(process.execPath, [".next/standalone/server.js"], {
  stdio: "inherit",
  env: { ...process.env, HOSTNAME: "127.0.0.1" },
});
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => child.kill(sig));
child.on("exit", (code) => process.exit(code ?? 0));
