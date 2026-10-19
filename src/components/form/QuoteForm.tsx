"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { mainPhone, telHref } from "@/content/site";
import { cn } from "@/lib/cn";
import {
  quoteSchema,
  requestTypes,
  type QuoteData,
  type QuoteInput,
  type QuotePayload,
} from "@/lib/quote-schema";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER: (keyof QuoteInput)[] = [
  "name",
  "company",
  "email",
  "phone",
  "requestType",
  "pickup",
  "delivery",
  "date",
  "cargo",
  "message",
  "consent",
];

const inputBase =
  "block w-full rounded-sm border-2 border-line bg-white px-3.5 py-3 text-[1.0625rem] text-ink shadow-[inset_0_1px_2px_rgb(19_20_23/0.06)] transition-colors placeholder:text-mist hover:border-mist focus:border-navy focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-navy aria-[invalid=true]:border-danger";

export function QuoteForm({
  intro,
  consentText,
  submitLabel,
}: {
  intro: string;
  consentText: string;
  submitLabel: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [errorCount, setErrorCount] = useState(0);
  const startedAt = useRef<number>(0);
  const successRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<QuoteInput, unknown, QuoteData>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    shouldFocusError: true,
    defaultValues: {
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
    },
  });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const honeypot = useRef<HTMLInputElement>(null);

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
        setStatus("success");
        reset();
        return;
      }
      if (body.fieldErrors) {
        const keys = FIELD_ORDER.filter((k) => body.fieldErrors?.[k]?.length);
        keys.forEach((k) => setError(k, { type: "server", message: body.fieldErrors![k]![0] }));
        if (keys[0]) setFocus(keys[0]);
        setErrorCount(keys.length);
      }
      setServerError(body.error ?? "L'envoi n'a pas abouti.");
      setStatus("error");
    } catch {
      setServerError("Connexion impossible. Vérifiez votre réseau et réessayez.");
      setStatus("error");
    }
  }

  function onInvalid(errs: FieldErrors<QuoteInput>) {
    setErrorCount(Object.keys(errs).length);
    setServerError(null);
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-md border-2 border-success bg-white p-6 outline-none sm:p-8"
      >
        <p className="flex items-center gap-3 font-display text-2xl font-bold text-success uppercase">
          <Icon name="check" className="size-7" />
          Demande envoyée
        </p>
        <p className="mt-3 text-lead">
          Merci, votre demande a bien été transmise à Transports Brun. Nous vous contacterons dans
          les plus brefs délais.
        </p>
        <p className="mt-2 text-steel">
          Pour une demande urgente, appelez-nous au{" "}
          <a href={telHref(mainPhone)} className="font-semibold text-navy underline">
            {mainPhone.display}
          </a>
          .
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus("idle");
          }}
        >
          Envoyer une autre demande
        </Button>
      </div>
    );
  }

  const id = (name: string) => `${uid}-${name}`;
  const errorId = (name: keyof QuoteInput) => (errors[name] ? `${id(name)}-erreur` : undefined);
  const describedBy = (name: keyof QuoteInput, hint?: boolean) =>
    [hint ? `${id(name)}-aide` : null, errorId(name)].filter(Boolean).join(" ") || undefined;

  return (
    <form
      noValidate
      onSubmit={(e) => void handleSubmit(onValid, onInvalid)(e)}
      aria-describedby={`${uid}-intro`}
      className="space-y-6"
    >
      <p id={`${uid}-intro`} className="text-steel">
        {intro}
      </p>
      <p className="text-sm text-steel">
        Les champs marqués d&apos;un astérisque (<span aria-hidden="true">*</span>
        <span className="sr-only">astérisque</span>) sont obligatoires.
      </p>

      <div aria-live="assertive" aria-atomic="true">
        {errorCount > 0 || serverError ? (
          <div
            className="flex gap-3 rounded-sm border-2 border-danger bg-danger/5 p-4 text-danger"
            role="alert"
          >
            <Icon name="alert" className="mt-0.5 size-5 shrink-0" />
            <div>
              {errorCount > 0 ? (
                <p className="font-semibold">
                  {errorCount === 1
                    ? "Le formulaire contient une erreur : merci de la corriger."
                    : `Le formulaire contient ${errorCount} erreurs : merci de les corriger.`}
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

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="eyebrow mb-4 text-navy">Vos coordonnées</legend>
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
            autoComplete="name"
            className={inputBase}
            aria-invalid={errors.name ? true : undefined}
            aria-required="true"
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
            className={inputBase}
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
            inputMode="email"
            autoComplete="email"
            className={inputBase}
            aria-invalid={errors.email ? true : undefined}
            aria-required="true"
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
            inputMode="tel"
            autoComplete="tel"
            className={inputBase}
            aria-invalid={errors.phone ? true : undefined}
            aria-required="true"
            aria-describedby={describedBy("phone")}
            {...register("phone")}
          />
        </Field>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="eyebrow mb-4 text-navy">Votre transport</legend>
        <Field
          label="Type de demande"
          required
          htmlFor={id("requestType")}
          error={errors.requestType?.message}
          errorId={errorId("requestType")}
          className="sm:col-span-2"
        >
          <div className="relative">
            <select
              id={id("requestType")}
              className={cn(inputBase, "appearance-none pr-11")}
              aria-invalid={errors.requestType ? true : undefined}
              aria-required="true"
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
              className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 rotate-90 text-steel"
            />
          </div>
        </Field>
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
            className={inputBase}
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
            className={inputBase}
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
            className={inputBase}
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
            className={inputBase}
            aria-invalid={errors.cargo ? true : undefined}
            aria-describedby={describedBy("cargo", true)}
            {...register("cargo")}
          />
        </Field>
        <Field
          label="Message"
          required
          htmlFor={id("message")}
          error={errors.message?.message}
          errorId={errorId("message")}
          className="sm:col-span-2"
        >
          <textarea
            id={id("message")}
            rows={6}
            className={cn(inputBase, "min-h-36 resize-y")}
            aria-invalid={errors.message ? true : undefined}
            aria-required="true"
            aria-describedby={describedBy("message")}
            {...register("message")}
          />
        </Field>
      </fieldset>

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
            className="mt-1 size-6 shrink-0 cursor-pointer rounded-xs border-2 border-line accent-navy"
            aria-invalid={errors.consent ? true : undefined}
            aria-required="true"
            aria-describedby={describedBy("consent")}
            {...register("consent")}
          />
          <label
            htmlFor={id("consent")}
            className="cursor-pointer text-[0.98rem] leading-snug text-steel"
          >
            {consentText}{" "}
            <span aria-hidden="true" className="text-danger">
              *
            </span>
          </label>
        </div>
        {errors.consent?.message ? (
          <ErrorText id={errorId("consent")!}>{errors.consent.message}</ErrorText>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          icon={status === "submitting" ? undefined : "arrowRight"}
          disabled={status === "submitting"}
          aria-disabled={status === "submitting"}
          className="sm:min-w-56"
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
        <p className="text-sm text-steel">
          Vos données servent uniquement à traiter votre demande (voir la{" "}
          <Link href="/politiques-de-confidentialites" className="underline">
            politique de confidentialité
          </Link>
          ).
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  htmlFor,
  hint,
  hintId,
  error,
  errorId,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
  hint?: string;
  hintId?: string;
  error?: string;
  errorId?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block font-semibold text-ink">
        {label}
        {required ? (
          <>
            {" "}
            <span aria-hidden="true" className="text-danger">
              *
            </span>
          </>
        ) : null}
      </label>
      {hint ? (
        <p id={hintId} className="-mt-1 mb-1.5 text-sm text-steel">
          {hint}
        </p>
      ) : null}
      {children}
      {error && errorId ? <ErrorText id={errorId}>{error}</ErrorText> : null}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p
      id={id}
      className="mt-1.5 flex items-center gap-1.5 text-[0.95rem] font-semibold text-danger"
    >
      <Icon name="alert" className="size-4 shrink-0" />
      {children}
    </p>
  );
}
