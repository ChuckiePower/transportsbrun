import { expect, test, type Page } from "@playwright/test";
import { freshIp, outbox, validPayload } from "./helpers";

/** Délai minimal anti-robot (3 s) entre l'affichage et l'envoi JavaScript */
const MIN_FILL_WAIT = 3200;

async function fillStep1(page: Page) {
  await page.getByLabel("Type de demande").selectOption("Camion-grue");
  await page.getByLabel("Lieu de chargement").fill("Sélestat");
  await page.getByLabel("Lieu de livraison").fill("Strasbourg");
  await page.getByLabel("Nature de la charge").fill("Poutres, 12 m, 8 t");
}

async function fillStep2(page: Page) {
  await page.getByLabel(/^Nom/).fill("Dominique <b>Essai</b>");
  await page.getByLabel("Entreprise").fill("BTP & Fils");
  await page.getByLabel("E-mail").fill("dominique@example.com");
  await page.getByLabel("Téléphone").fill("+33 6 12 34 56 78");
  await page
    .getByLabel("Message")
    .fill("Levage de poutres <script>alert(1)</script> sur chantier.");
  await page.getByRole("checkbox").check();
}

test.describe("Formulaire de devis en deux étapes", () => {
  test("étape 1 : validation, focus sur le premier champ en erreur, passage à l'étape 2", async ({
    page,
  }) => {
    await page.goto("/contact");
    await expect(page.getByText("Étape 1 sur 2")).toBeVisible();
    // L'étape 2 est masquée tant que l'étape 1 n'est pas validée
    await expect(page.getByLabel("Message")).toBeHidden();

    await page.getByRole("button", { name: /Suivant/ }).click();
    const type = page.getByLabel("Type de demande");
    await expect(type).toBeFocused();
    await expect(type).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByText("Choisissez le type de demande.")).toBeVisible();
    await expect(page.getByRole("alert").first()).toContainText("Un champ est à compléter");

    await fillStep1(page);
    await page.getByRole("button", { name: /Suivant/ }).click();
    await expect(page.getByText("Étape 2 sur 2")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Vos coordonnées" })).toBeFocused();
    await expect(page.getByLabel("Type de demande")).toBeHidden();

    // Étape 2 vide : erreurs et focus sur le Nom
    await page.getByRole("button", { name: "Envoyer" }).click();
    const name = page.getByLabel(/^Nom/);
    await expect(name).toBeFocused();
    await expect(page.getByText("Indiquez votre nom.")).toBeVisible();
    await expect(
      page.getByText("Votre accord est nécessaire pour traiter la demande."),
    ).toBeVisible();

    // Retour : la saisie de l'étape 1 est conservée
    await page.getByRole("button", { name: "Retour" }).click();
    await expect(page.getByText("Étape 1 sur 2")).toBeVisible();
    await expect(page.getByLabel("Lieu de chargement")).toHaveValue("Sélestat");
  });

  test("parcours complet : présélection par l'URL → 2 étapes → succès (e-mail simulé)", async ({
    page,
  }) => {
    const before = outbox().length;
    await page.setExtraHTTPHeaders({ "x-forwarded-for": freshIp() });
    await page.goto("/contact?type=camion-grue&nature=modules#devis");

    await expect(page.getByLabel("Type de demande")).toHaveValue("Camion-grue");
    await expect(page.getByLabel("Nature de la charge")).toHaveValue("Modules");
    await fillStep1(page);
    await page.getByRole("button", { name: /Suivant/ }).click();
    await fillStep2(page);
    await page.waitForTimeout(MIN_FILL_WAIT);
    await page.getByRole("button", { name: "Envoyer" }).click();

    const status = page.getByRole("status").filter({ hasText: "Demande envoyée" });
    await expect(status).toBeVisible();
    await expect(status).toBeFocused();
    await expect(status.getByRole("link", { name: /Appeler le 03 89 73 34 63/ })).toBeVisible();

    const mails = outbox();
    expect(mails.length).toBe(before + 1);
    const mail = mails.at(-1)!;
    expect(mail.subject).toContain("Camion-grue");
    expect(JSON.stringify(mail.replyTo)).toContain("dominique@example.com");
    expect(JSON.stringify(mail.to)).toContain("contact@transports-brun.com");
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).toContain("&lt;script&gt;");
    expect(mail.html).toContain("BTP &amp; Fils");

    // La saisie conservée est effacée après l'envoi
    expect(await page.evaluate(() => sessionStorage.getItem("tb-devis"))).toBeNull();
  });

  test("présélection : une valeur inconnue dans l'URL est ignorée", async ({ page }) => {
    await page.goto("/contact?type=%3Cscript%3E&nature=n-importe-quoi");
    await expect(page.getByLabel("Type de demande")).toHaveValue("");
    await expect(page.getByLabel("Nature de la charge")).toHaveValue("");
  });

  test("saisie conservée pendant la session (hors consentement)", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Lieu de chargement").fill("Colmar");
    await page.getByLabel("Type de demande").selectOption("ADR");
    await page.reload();
    await expect(page.getByLabel("Lieu de chargement")).toHaveValue("Colmar");
    await expect(page.getByLabel("Type de demande")).toHaveValue("ADR");
    const saved = await page.evaluate(() => sessionStorage.getItem("tb-devis") ?? "");
    expect(saved).not.toContain("consent");
  });

  test("sans JavaScript : formulaire complet en une page, envoi classique puis page de confirmation", async ({
    browser,
  }) => {
    const before = outbox().length;
    const context = await browser.newContext({
      javaScriptEnabled: false,
      extraHTTPHeaders: { "x-forwarded-for": freshIp() },
    });
    const page = await context.newPage();
    await page.goto("/contact");
    // Les deux étapes sont visibles, sans boutons d'étape
    await expect(page.getByLabel("Type de demande")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
    await expect(page.getByRole("button", { name: /Suivant/ })).toBeHidden();

    await fillStep1(page);
    await fillStep2(page);
    await page.getByRole("button", { name: "Envoyer" }).click();
    await expect(page).toHaveURL(/\/contact\/merci$/);
    await expect(page.getByRole("heading", { name: /Demande envoyée/ })).toBeVisible();
    expect(outbox().length).toBe(before + 1);
    expect(outbox().at(-1)!.subject).toContain("Camion-grue");
    await context.close();
  });
});

test.describe("Être rappelé", () => {
  test("tiroir : validation, envoi « Demande de rappel », retour du focus", async ({ page }) => {
    const before = outbox().length;
    await page.setExtraHTTPHeaders({ "x-forwarded-for": freshIp() });
    await page.goto("/notre-histoire");
    const trigger = page.getByRole("main").getByRole("link", { name: "Être rappelé" });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Être rappelé" });
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "Être rappelé" }).click();
    await expect(dialog.getByText("Indiquez votre nom.")).toBeVisible();
    await expect(dialog.getByText("Indiquez un numéro de téléphone.")).toBeVisible();

    await dialog.getByLabel(/^Nom/).fill("Alex Rappel");
    await dialog.getByLabel("Téléphone").fill("06 11 22 33 44");
    await dialog.getByLabel("Type de demande").selectOption("Convoi exceptionnel");
    await dialog.getByRole("checkbox").check();
    await page.waitForTimeout(MIN_FILL_WAIT);
    await dialog.getByRole("button", { name: "Être rappelé" }).click();
    await expect(dialog.getByRole("status")).toContainText("Demande de rappel envoyée");

    const mail = outbox().at(-1)!;
    expect(outbox().length).toBe(before + 1);
    expect(mail.subject).toContain("Demande de rappel");
    expect(mail.subject).toContain("06 11 22 33 44");
    expect(mail.html).toContain("Convoi exceptionnel");

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});

test.describe("API /api/contact", () => {
  test("pot de miel rempli : réponse neutre, aucun e-mail", async ({ request }) => {
    const before = outbox().length;
    const res = await request.post("/api/contact", {
      headers: { "x-forwarded-for": freshIp() },
      data: validPayload({ website: "https://spam.example" }),
    });
    expect(res.status()).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(outbox().length).toBe(before);
  });

  test("envoi trop rapide refusé", async ({ request }) => {
    const res = await request.post("/api/contact", {
      headers: { "x-forwarded-for": freshIp() },
      data: validPayload({ startedAt: Date.now() }),
    });
    expect(res.status()).toBe(400);
  });

  test("injection d'en-tête refusée côté serveur", async ({ request }) => {
    const res = await request.post("/api/contact", {
      headers: { "x-forwarded-for": freshIp() },
      data: validPayload({ name: "Robot\r\nBcc: victime@example.com" }),
    });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body.fieldErrors.name).toBeTruthy();
  });

  test("rappel invalide refusé (422)", async ({ request }) => {
    const res = await request.post("/api/contact", {
      headers: { "x-forwarded-for": freshIp() },
      data: {
        source: "rappel",
        name: "A",
        phone: "12",
        consent: true,
        website: "",
        startedAt: Date.now() - 10_000,
      },
    });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body.fieldErrors.name).toBeTruthy();
    expect(body.fieldErrors.phone).toBeTruthy();
  });

  test("origine étrangère refusée", async ({ request }) => {
    const res = await request.post("/api/contact", {
      headers: { "x-forwarded-for": freshIp(), origin: "https://site-pirate.example" },
      data: validPayload(),
    });
    expect(res.status()).toBe(403);
  });

  test("envoi de formulaire classique sans en-tête Origin : redirigé vers la page d'erreur, aucun e-mail", async ({
    request,
  }) => {
    const before = outbox().length;
    const { startedAt: _s, consent: _c, ...fields } = validPayload();
    void _s;
    void _c;
    const res = await request.post("/api/contact", {
      headers: { "x-forwarded-for": freshIp() },
      form: { ...(fields as Record<string, string>), consent: "on" },
      maxRedirects: 0,
    });
    expect(res.status()).toBe(303);
    expect(res.headers()["location"]).toBe("/contact/erreur");
    expect(outbox().length).toBe(before);
  });

  test("limitation de débit : la 6e demande en 10 minutes est refusée (429)", async ({
    request,
  }) => {
    const ip = freshIp();
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) {
      const res = await request.post("/api/contact", {
        headers: { "x-forwarded-for": ip },
        data: validPayload({ message: `Demande de test numéro ${i + 1} pour la limitation.` }),
      });
      statuses.push(res.status());
    }
    expect(statuses.slice(0, 5)).toEqual([200, 200, 200, 200, 200]);
    expect(statuses[5]).toBe(429);
  });
});
