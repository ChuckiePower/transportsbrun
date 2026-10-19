"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { useForm } from "react-hook-form";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { contactPage } from "@/content/pages/contact";
import { mainPhone, site, telHref } from "@/content/site";
import { cn } from "@/lib/cn";
import {
  callbackSchema,
  requestTypes,
  type CallbackData,
  type CallbackInput,
} from "@/lib/quote-schema";
import { track } from "@/lib/track";
import { fr } from "@/lib/typo";
import { CheckDraw, checkboxClass, ErrorText, Field, inputClass } from "./fields";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Tiroir « Être rappelé » : nom, téléphone, type de demande facultatif.
 * Même endpoint que le devis (source « rappel »), mêmes protections anti-abus.
 */
export default function CallbackDrawer({
  open,
  onOpenChange,
  returnFocusTo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusTo: RefObject<HTMLElement | null>;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const uid = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CallbackInput, unknown, CallbackData>({
    resolver: zodResolver(callbackSchema),
    mode: "onTouched",
    defaultValues: {
      source: "rappel",
      name: "",
      phone: "",
      requestType: "",
      consent: false as unknown as true,
    },
  });

  useEffect(() => {
    if (open) startedAt.current = Date.now();
  }, [open]);

  async function onValid(data: CallbackData) {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          website: honeypot.current?.value ?? "",
          startedAt: startedAt.current,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && body.ok) {
        track("callback_submit");
        reset();
        setStatus("success");
        return;
      }
      setServerError(body.error ?? "L'envoi n'a pas abouti.");
      setStatus("error");
    } catch {
      setServerError("Connexion impossible. Vérifiez votre réseau et réessayez.");
      setStatus("error");
    }
  }

  const id = (n: string) => `${uid}-${n}`;
  const err = (n: keyof CallbackInput) => (errors[n] ? `${id(n)}-erreur` : undefined);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o && status === "success") setStatus("idle");
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-night/40 backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <Dialog.Content
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            returnFocusTo.current?.focus();
          }}
          className="fixed inset-x-3 bottom-3 z-50 max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-panel bg-surface p-6 shadow-lg data-[state=closed]:animate-fade-out data-[state=open]:animate-sheet-in sm:inset-x-auto sm:top-3 sm:right-3 sm:bottom-3 sm:w-[28rem] sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Rappel</p>
              <Dialog.Title className="mt-2 font-display text-h3 font-bold text-ink">
                Être rappelé
              </Dialog.Title>
            </div>
            <Dialog.Close className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-line hover:border-ink">
              <Icon name="close" className="size-5" />
              <span className="sr-only">Fermer</span>
            </Dialog.Close>
          </div>
          <Dialog.Description className="mt-3 text-ink-soft">
            {fr`Laissez votre nom et votre numéro : l'équipe Transports Brun vous rappelle ${site.hours.sentence}.`}
          </Dialog.Description>

          {status === "success" ? (
            <div role="status" className="mt-8">
              <CheckDraw />
              <p className="mt-5 font-display text-h3 font-bold text-ink">
                Demande de rappel envoyée
              </p>
              <p className="mt-2 text-ink-soft">
                Merci, nous vous rappelons dans les plus brefs délais.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={telHref(mainPhone)} icon="phone" iconPosition="start">
                  Appeler le {mainPhone.display}
                </ButtonLink>
                <Dialog.Close asChild>
                  <Button variant="secondary">Fermer</Button>
                </Dialog.Close>
              </div>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={(e) => void handleSubmit(onValid)(e)}
              className="mt-7 space-y-5"
            >
              {serverError ? (
                <div
                  role="alert"
                  className="flex animate-shake gap-3 rounded-md border-[1.5px] border-error/40 bg-error/5 p-4 text-error"
                >
                  <Icon name="alert" className="mt-0.5 size-5 shrink-0" />
                  <p className="font-semibold">{serverError}</p>
                </div>
              ) : null}
              <Field
                label="Nom"
                required
                htmlFor={id("name")}
                error={errors.name?.message}
                errorId={err("name")}
              >
                <input
                  id={id("name")}
                  type="text"
                  autoComplete="name"
                  className={inputClass}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={err("name")}
                  {...register("name")}
                />
              </Field>
              <Field
                label="Téléphone"
                required
                htmlFor={id("phone")}
                error={errors.phone?.message}
                errorId={err("phone")}
              >
                <input
                  id={id("phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className={inputClass}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={err("phone")}
                  {...register("phone")}
                />
              </Field>
              <Field label="Type de demande" htmlFor={id("requestType")}>
                <div className="relative">
                  <select
                    id={id("requestType")}
                    className={cn(inputClass, "appearance-none pr-12")}
                    {...register("requestType")}
                  >
                    <option value="">Je ne sais pas encore</option>
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
                    className={checkboxClass}
                    aria-invalid={errors.consent ? true : undefined}
                    aria-describedby={err("consent")}
                    {...register("consent")}
                  />
                  <label
                    htmlFor={id("consent")}
                    className="cursor-pointer text-[0.875rem] leading-snug text-ink-soft"
                  >
                    {contactPage.form.consent}{" "}
                    <span aria-hidden="true" className="text-error">
                      *
                    </span>
                  </label>
                </div>
                {errors.consent?.message ? (
                  <ErrorText id={err("consent")!}>{errors.consent.message}</ErrorText>
                ) : null}
              </div>
              <Button
                type="submit"
                className="w-full"
                icon={status === "submitting" ? undefined : "arrowRight"}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <span className="inline-flex items-center gap-2">
                    <Icon name="loader" className="size-5 animate-spin" />
                    Envoi en cours…
                  </span>
                ) : (
                  "Être rappelé"
                )}
              </Button>
              <p className="flex items-center justify-center gap-2 text-[0.875rem] text-ink-soft">
                <Icon name="phone" className="size-4 text-brand" />
                Ou appelez directement le{" "}
                <a href={telHref(mainPhone)} className="font-semibold text-ink underline">
                  {mainPhone.display}
                </a>
              </p>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
