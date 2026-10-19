import { existsSync } from "node:fs";
import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

/**
 * Tests de bout en bout sur le build de production (pnpm build au préalable).
 * Aucun e-mail n'est envoyé : MAIL_OUTBOX_FILE capture les messages dans un fichier.
 */
const PORT = Number(process.env.E2E_PORT ?? 3200);
export const BASE_URL = `http://127.0.0.1:${PORT}`;
export const OUTBOX = path.resolve(".playwright/outbox.jsonl");

// Chromium préinstallé (environnements sans téléchargement de navigateurs)
const chromium = process.env.PW_CHROMIUM_PATH ?? "/opt/pw-browsers/chromium";
const launchOptions = existsSync(chromium) ? { executablePath: chromium } : {};

export default defineConfig({
  testDir: "./tests",
  outputDir: ".playwright/results",
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  timeout: 60_000,
  use: {
    baseURL: BASE_URL,
    locale: "fr-FR",
    launchOptions,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "e2e",
      testIgnore: /screenshots\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], launchOptions },
    },
    {
      name: "screenshots",
      testMatch: /screenshots\.spec\.ts/,
      use: { launchOptions },
    },
  ],
  webServer: {
    command: `node scripts/start-test-server.mjs`,
    url: BASE_URL,
    reuseExistingServer: false,
    timeout: 60_000,
    env: {
      PORT: String(PORT),
      MAIL_OUTBOX_FILE: OUTBOX,
      // Jamais d'envoi réel pendant les tests, même si un .env local définit un SMTP
      SMTP_HOST: "",
      SITE_URL: "https://transports-brun.com",
    },
  },
});
