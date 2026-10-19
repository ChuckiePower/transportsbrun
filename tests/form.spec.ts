import { expect, test } from "@playwright/test";
import { freshIp, outbox, validPayload } from "./helpers";

test.describe("Formulaire de devis", () => {
  test("affiche les erreurs de validation et place le focus sur le premier champ en erreur", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Envoyer" }).click();

    await expect(page.getByRole("alert").first()).toContainText("erreurs");
    const name = page.getByLabel("Nom");
    await expect(name).toBeFocused();
    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByText("Indiquez votre nom.")).toBeVisible();
    await expect(
      page.getByText("Votre accord est nécessaire pour traiter la demande."),
    ).toBeVisible();

    await page.getByLabel("E-mail").fill("pas-un-email");
    await page.getByLabel("E-mail").blur();
    await expect(page.getByText(/Adresse e-mail invalide/)).toBeVisible();
  });

  test("envoie une demande valide (transport simulé) avec Reply-To et contenu échappé", async ({
    page,
  }) => {
    const before = outbox().length;
    await page.setExtraHTTPHeaders({ "x-forwarded-for": freshIp() });
    await page.goto("/contact");

    await page.getByLabel("Nom").fill("Dominique <b>Essai</b>");
    await page.getByLabel("Entreprise").fill("BTP & Fils");
    await page.getByLabel("E-mail").fill("dominique@example.com");
    await page.getByLabel("Téléphone").fill("+33 6 12 34 56 78");
    await page.getByLabel("Type de demande").selectOption("Camion-grue");
    await page.getByLabel("Lieu de chargement").fill("Sélestat");
    await page.getByLabel("Lieu de livraison").fill("Strasbourg");
    await page.getByLabel("Nature de la charge").fill("Poutres, 12 m, 8 t");
    await page
      .getByLabel("Message")
      .fill("Levage de poutres <script>alert(1)</script> sur chantier.");
    await page.getByRole("checkbox").check();
    // délai minimal anti-robot (3 s) entre l'affichage et l'envoi
    await page.waitForTimeout(3200);
    await page.getByRole("button", { name: "Envoyer" }).click();

    await expect(page.getByRole("status")).toContainText("Demande envoyée");
    await expect(page.getByRole("status")).toBeFocused();

    const mails = outbox();
    expect(mails.length).toBe(before + 1);
    const mail = mails.at(-1)!;
    expect(mail.subject).toContain("Camion-grue");
    expect(JSON.stringify(mail.replyTo)).toContain("dominique@example.com");
    expect(JSON.stringify(mail.to)).toContain("contact@transports-brun.com");
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).toContain("&lt;script&gt;");
    expect(mail.html).toContain("BTP &amp; Fils");
  });

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

  test("origine étrangère refusée", async ({ request }) => {
    const res = await request.post("/api/contact", {
      headers: { "x-forwarded-for": freshIp(), origin: "https://site-pirate.example" },
      data: validPayload(),
    });
    expect(res.status()).toBe(403);
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
