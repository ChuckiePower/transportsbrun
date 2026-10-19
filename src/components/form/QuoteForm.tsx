"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { mainPhone, site, telHref } from "@/content/site";
import { cn } from "@/lib/cn";
import {
  natureSlugs,
  quoteSchema,
  requestTypes,
  stepFields,
  typeSlugs,
  type QuoteData,
  type QuoteInput,
  type QuotePayload,
} from "@/lib/quote-schema";
import { track } from "@/lib/track";
import { fr } from "@/lib/typo";
import { CheckDraw, checkboxClass, ErrorText, Field, inputClass } from "./fields";

type Status = "idle" | "submitting" | "success" | "error";
type Step = 1 | 2;

const STORAGE_KEY = "tb-devis";
const FIELD_ORDER: (keyof QuoteInput)[] = [...stepFields[1], ...stepFields[2]];

const DEFAULTS: QuoteInput = {
  name: "",
  company: "",
  email: "",
  phone: "",
  requestType: "" as QuoteInput["requestType"],
  pickup: "",
  delivery: "",
  date: "",
  cargo: "",
  message: "",
  consent: false as unknown as true,
};

/** true une fois le composant hydraté (sans effet de bord ni rendu différent côté serveur) */
const noop = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

/**
 * Formulaire de devis en 2 étapes (même schéma, même endpoint POST /api/contact).
 * - Avec JavaScript : étapes, progression, validation au départ du champ, saisie conservée
 *   dans sessionStorage, envoi JSON, écran de succès.
 * - Sans JavaScript : un seul formulaire classique (POST) avec validation native du navigateur.
 */
export function QuoteForm({
  intro,
  consentText,
  submitLabel,
}: {
  intro: string;
  consentText: string;
  submitLabel: string;
}) {
  const enhanced = useHydrated();
  const [step, setStep] = useState<Step>(1);
  const [dir, setDir] = useState<"fwd" | "back" | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [errorCount, setErrorCount] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const stepTitle = useRef<(HTMLHeadingElement | null)[]>([]);
  const successRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const uid = useId();

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    setValue,
    getValues,
    getFieldState,
    reset,
    trigger,
    subscribe,
    formState: { errors },
  } = useForm<QuoteInput, unknown, QuoteData>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    shouldFocusError: true,
    defaultValues: DEFAULTS,
  });

  // Restaure la saisie en cours puis applique la présélection de l'URL (?type=…&nature=…)
  useEffect(() => {
    startedAt.current = Date.now();
    try {
      const saved = JSON.parse(
        sessionStorage.getItem(STORAGE_KEY) ?? "null",
      ) as Partial<QuoteInput> | null;
      if (saved && typeof saved === "object") {
        const clean = Object.fromEntries(
          Object.entries(saved).filter(
            ([k, v]) => k in DEFAULTS && k !== "consent" && typeof v === "string",
          ),
        );
        reset({ ...DEFAULTS, ...clean });
      }
    } catch {
      /* stockage indisponible : on continue sans */
    }
    const params = new URLSearchParams(window.location.search);
    const type = typeSlugs[params.get("type") ?? ""];
    if (type) setValue("requestType", type);
    const nature = natureSlugs[params.get("nature") ?? ""];
    if (nature && !getValues("cargo")) setValue("cargo", nature);
  }, [reset, setValue, getValues]);

  // Sauvegarde continue (hors consentement) pour ne rien perdre en changeant de page
  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: ({ values }) => {
          try {
            const { consent: _consent, ...rest } = values;
            void _consent;
            // Rien de saisi (ex. remise à zéro après envoi) : on ne garde aucune trace
            if (Object.values(rest).every((v) => !v)) sessionStorage.removeItem(STORAGE_KEY);
            else sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
          } catch {
            /* ignoré */
          }
        },
      }),
    [subscribe],
  );

  // Focus sur le titre de l'étape affichée (annoncé par les lecteurs d'écran)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepTitle.current[step]?.focus();
  }, [step]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function flagErrors(count: number) {
    setErrorCount(count);
    setShakeKey((k) => k + 1);
  }

  async function next() {
    const ok = await trigger([...stepFields[1]]);
    if (!ok) {
      const invalid = stepFields[1].filter((k) => getFieldState(k).invalid);
      flagErrors(invalid.length || 1);
      setFocus(invalid[0] ?? "requestType");
      return;
    }
    setErrorCount(0);
    setDir("fwd");
    setStep(2);
    track("form_step_2");
  }

  function back() {
    setDir("back");
    setStep(1);
  }

  async function onValid(data: QuoteData) {
    setStatus("submitting");
    setServerError(null);
    setErrorCount(0);
    const payload: QuotePayload = {
      ...data,
      website: honeypot.current?.value ?? "",
      startedAt: startedAt.current,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Partial<Record<keyof QuoteInput, string[]>>;
      };
      if (res.ok && body.ok) {
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignoré */
        }
        track("form_submit");
        reset(DEFAULTS);
        setStatus("success");
        return;
      }
      if (body.fieldErrors) {
        const keys = FIELD_ORDER.filter((k) => body.fieldErrors?.[k]?.length);
        keys.forEach((k) => setError(k, { type: "server", message: body.fieldErrors![k]![0] }));
        if (keys[0]) {
          if ((stepFields[1] as readonly string[]).includes(keys[0])) setStep(1);
          setTimeout(() => setFocus(keys[0]!), 0);
        }
        flagErrors(keys.length);
      }
      setServerError(body.error ?? "L'envoi n'a pas abouti.");
      setStatus("error");
    } catch {
      setServerError("Connexion impossible. Vérifiez votre réseau et réessayez.");
      setStatus("error");
    }
  }

  function onInvalid(errs: FieldErrors<QuoteInput>) {
    const keys = FIELD_ORDER.filter((k) => errs[k]);
    if (keys[0] && (stepFields[1] as readonly string[]).includes(keys[0])) {
      setDir("back");
      setStep(1);
      setTimeout(() => setFocus(keys[0]!), 0);
    }
    flagErrors(keys.length);
    setServerError(null);
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="py-4 outline-none">
        <CheckDraw />
        <h3 className="mt-5 font-display text-h3 font-bold text-ink">Demande envoyée, merci !</h3>
        <p className="mt-3 text-lead text-ink">
          Votre demande a bien été transmise à l&apos;équipe Transports Brun. Nous vous contacterons
          dans les plus brefs délais.
        </p>
        <p className="mt-2 text-ink-soft">{fr`Une urgence ? L'équipe est joignable ${site.hours.sentence}.`}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={telHref(mainPhone)} icon="phone" iconPosition="start">
            Appeler le {mainPhone.display}
          </ButtonLink>
          <Button
            variant="secondary"
            onClick={() => {
              startedAt.current = Date.now();
              setStep(1);
              setStatus("idle");
            }}
          >
            Envoyer une autre demande
          </Button>
        </div>
      </div>
    );
  }

  const id = (name: string) => `${uid}-${name}`;
  const errorId = (name: keyof QuoteInput) => (errors[name] ? `${id(name)}-erreur` : undefined);
  const describedBy = (name: keyof QuoteInput, hint?: boolean) =>
    [hint ? `${id(name)}-aide` : null, errorId(name)].filter(Boolean).join(" ") || undefined;
  // Pas d'animation au premier affichage, seulement lors d'un changement d'étape
  const animClass = dir === null ? undefined : dir === "fwd" ? "step-enter" : "step-enter-back";
  const stepHeading = (n: Step, label: string) => (
    <h3
      ref={(el) => {
        stepTitle.current[n] = el;
      }}
      tabIndex={-1}
      className="font-display text-[1.125rem] font-bold text-ink outline-none"
    >
      <span className="js:hidden">{n}. </span>
      {label}
    </h3>
  );

  return (
    <form
      method="post"
      action="/api/contact"
      noValidate={enhanced}
      onSubmit={(e) => {
        e.preventDefault();
        if (step === 1) {
          void next();
          return;
        }
        void handleSubmit(onValid, onInvalid)(e);
      }}
      aria-describedby={`${uid}-intro`}
      className="space-y-7"
    >
      <p id={`${uid}-intro`} className="text-ink-soft">
        {intro}
      </p>

      {/* Progression (avec JavaScript uniquement) */}
      <div className="hidden js:block">
        <div className="flex items-center justify-between font-display text-[0.875rem] font-semibold">
          <span className="text-brand" aria-live="polite">
            Étape {step} sur 2 · {step === 1 ? "Votre transport" : "Vos coordonnées"}
          </span>
          <span className="hidden text-ink-soft sm:inline">
            {step === 1 ? "Plus qu'une étape ensuite" : "Dernière étape"}
          </span>
        </div>
        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-cream-2"
          role="progressbar"
          aria-label="Progression du formulaire"
          aria-valuemin={1}
          aria-valuemax={2}
          aria-valuenow={step}
        >
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-500 ease-out-soft"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      <div aria-live="assertive" aria-atomic="true">
        {errorCount > 0 || serverError ? (
          <div
            key={shakeKey}
            className="flex animate-shake gap-3 rounded-md border-[1.5px] border-error/40 bg-error/5 p-4 text-error"
            role="alert"
          >
            <Icon name="alert" className="mt-0.5 size-5 shrink-0" />
            <div>
              {errorCount > 0 ? (
                <p className="font-semibold">
                  {errorCount === 1
                    ? "Un champ est à compléter ou à corriger."
                    : `${errorCount} champs sont à compléter ou à corriger.`}
                </p>
              ) : null}
              {serverError ? (
                <p className={errorCount > 0 ? "mt-1" : "font-semibold"}>{serverError}</p>
              ) : null}
              {status === "error" && !errorCount ? (
                <p className="mt-1">
                  Vous pouvez aussi nous appeler au{" "}
                  <a href={telHref(mainPhone)} className="font-semibold underline">
                    {mainPhone.display}
                  </a>
                  .
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      {/* Étape 1 : votre transport */}
      <fieldset
        data-active={step === 1 ? "" : undefined}
        className={cn("quote-step space-y-5", animClass)}
      >
        <legend className="sr-only">Votre transport</legend>
        {stepHeading(1, "Votre transport")}
        <Field
          label="Type de demande"
          required
          htmlFor={id("requestType")}
          error={errors.requestType?.message}
          errorId={errorId("requestType")}
        >
          <div className="relative">
            <select
              id={id("requestType")}
              required
              className={cn(inputClass, "appearance-none pr-12")}
              aria-invalid={errors.requestType ? true : undefined}
              aria-describedby={describedBy("requestType")}
              {...register("requestType")}
            >
              <option value="">Choisissez…</option>
              {requestTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <Icon
              name="chevronRight"
              className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 rotate-90 text-ink-soft"
            />
          </div>
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Lieu de chargement"
            htmlFor={id("pickup")}
            error={errors.pickup?.message}
            errorId={errorId("pickup")}
          >
            <input
              id={id("pickup")}
              type="text"
              autoComplete="off"
              placeholder="Ville ou adresse"
              className={inputClass}
              aria-invalid={errors.pickup ? true : undefined}
              aria-describedby={describedBy("pickup")}
              {...register("pickup")}
            />
          </Field>
          <Field
            label="Lieu de livraison"
            htmlFor={id("delivery")}
            error={errors.delivery?.message}
            errorId={errorId("delivery")}
          >
            <input
              id={id("delivery")}
              type="text"
              autoComplete="off"
              placeholder="Ville ou adresse"
              className={inputClass}
              aria-invalid={errors.delivery ? true : undefined}
              aria-describedby={describedBy("delivery")}
              {...register("delivery")}
            />
          </Field>
          <Field
            label="Date souhaitée"
            htmlFor={id("date")}
            error={errors.date?.message}
            errorId={errorId("date")}
          >
            <input
              id={id("date")}
              type="date"
              className={inputClass}
              aria-invalid={errors.date ? true : undefined}
              aria-describedby={describedBy("date")}
              {...register("date")}
            />
          </Field>
          <Field
            label="Nature de la charge"
            htmlFor={id("cargo")}
            hint="Dimensions et poids approximatifs"
            hintId={`${id("cargo")}-aide`}
            error={errors.cargo?.message}
            errorId={errorId("cargo")}
          >
            <input
              id={id("cargo")}
              type="text"
              autoComplete="off"
              placeholder="Ex. : module 6 × 2,5 m, 4 t"
              className={inputClass}
              aria-invalid={errors.cargo ? true : undefined}
              aria-describedby={describedBy("cargo", true)}
              {...register("cargo")}
            />
          </Field>
        </div>
        <div className="hidden pt-1 js:flex">
          <Button onClick={() => void next()} icon="arrowRight">
            Suivant : vos coordonnées
          </Button>
        </div>
      </fieldset>

      {/* Étape 2 : vos coordonnées */}
      <fieldset
        data-active={step === 2 ? "" : undefined}
        className={cn("quote-step space-y-5", animClass)}
      >
        <legend className="sr-only">Vos coordonnées</legend>
        {stepHeading(2, "Vos coordonnées")}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Nom"
            required
            htmlFor={id("name")}
            error={errors.name?.message}
            errorId={errorId("name")}
          >
            <input
              id={id("name")}
              type="text"
              required
              autoComplete="name"
              className={inputClass}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy("name")}
              {...register("name")}
            />
          </Field>
          <Field
            label="Entreprise"
            htmlFor={id("company")}
            error={errors.company?.message}
            errorId={errorId("company")}
          >
            <input
              id={id("company")}
              type="text"
              autoComplete="organization"
              className={inputClass}
              aria-invalid={errors.company ? true : undefined}
              aria-describedby={describedBy("company")}
              {...register("company")}
            />
          </Field>
          <Field
            label="E-mail"
            required
            htmlFor={id("email")}
            error={errors.email?.message}
            errorId={errorId("email")}
          >
            <input
              id={id("email")}
              type="email"
              required
              inputMode="email"
              autoComplete="email"
              className={inputClass}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email")}
              {...register("email")}
            />
          </Field>
          <Field
            label="Téléphone"
            required
            htmlFor={id("phone")}
            error={errors.phone?.message}
            errorId={errorId("phone")}
          >
            <input
              id={id("phone")}
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              className={inputClass}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy("phone")}
              {...register("phone")}
            />
          </Field>
        </div>
        <Field
          label="Message"
          required
          htmlFor={id("message")}
          error={errors.message?.message}
          errorId={errorId("message")}
        >
          <textarea
            id={id("message")}
            rows={5}
            required
            minLength={10}
            className={cn(inputClass, "min-h-36 resize-y")}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message")}
            {...register("message")}
          />
        </Field>

        {/* Pot de miel : invisible pour les humains, rempli par les robots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}>Ne pas remplir ce champ</label>
          <input
            ref={honeypot}
            id={id("website")}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <div>
          <div className="flex gap-3">
            <input
              id={id("consent")}
              type="checkbox"
              required
              className={checkboxClass}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={describedBy("consent")}
              {...register("consent")}
            />
            <label
              htmlFor={id("consent")}
              className="cursor-pointer text-[0.95rem] leading-snug text-ink-soft"
            >
              {consentText}{" "}
              <span aria-hidden="true" className="text-error">
                *
              </span>
            </label>
          </div>
          {errors.consent?.message ? (
            <ErrorText id={errorId("consent")!}>{errors.consent.message}</ErrorText>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Button
            type="submit"
            icon={status === "submitting" ? undefined : "arrowRight"}
            disabled={status === "submitting"}
            className="min-w-48"
          >
            {status === "submitting" ? (
              <span className="inline-flex items-center gap-2">
                <Icon name="loader" className="size-5 animate-spin" />
                Envoi en cours…
              </span>
            ) : (
              submitLabel
            )}
          </Button>
          <span className="hidden js:inline-flex">
            <Button variant="secondary" onClick={back} icon="chevronLeft" iconPosition="start">
              Retour
            </Button>
          </span>
        </div>

        {/* Réassurance au point de friction */}
        <ul className="space-y-2 rounded-md bg-cream-2/70 p-4 text-[0.9rem] text-ink-soft">
          <Reassure icon="shield">
            Vos données servent uniquement à traiter votre demande (voir la{" "}
            <Link href="/politiques-de-confidentialites" className="underline hover:text-brand">
              politique de confidentialité
            </Link>
            ).
          </Reassure>
          <Reassure icon="clock">{fr`L'équipe est joignable ${site.hours.sentence}.`}</Reassure>
          <Reassure icon="phone">
            {fr`Une question ?`}{" "}
            <a
              href={telHref(mainPhone)}
              className="font-semibold text-ink underline hover:text-brand"
            >
              {mainPhone.display}
            </a>
          </Reassure>
        </ul>
      </fieldset>
    </form>
  );
}

function Reassure({ icon, children }: { icon: "shield" | "clock" | "phone"; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <Icon name={icon} className="mt-0.5 size-4 shrink-0 text-brand" />
      <span>{children}</span>
    </li>
  );
}
