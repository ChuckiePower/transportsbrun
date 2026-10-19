import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { contactPage } from "@/content/pages/contact";
import { cn } from "@/lib/cn";
import { requestTypes } from "@/lib/quote-schema";
import { checkboxClass, Field, inputClass } from "./fields";

/**
 * « Être rappelé » sans JavaScript : mini-formulaire classique (POST) sur la page Contact,
 * cible des liens « Être rappelé » (#rappel). Avec JavaScript, il est masqué : le tiroir prend le relais.
 */
export function CallbackFallbackForm({ className }: { className?: string }) {
  return (
    <section
      id="rappel"
      aria-labelledby="rappel-titre"
      className={cn(
        "scroll-mt-28 rounded-panel border border-line bg-surface p-6 shadow-md sm:p-10 js:hidden",
        className,
      )}
    >
      <h2 id="rappel-titre" className="text-h3 font-bold">
        Être rappelé
      </h2>
      <p className="mt-2 text-ink-soft">
        Laissez votre nom et votre numéro : l&apos;équipe vous rappelle.
      </p>
      <form method="post" action="/api/contact" className="mt-6 space-y-5">
        <input type="hidden" name="source" value="rappel" />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nom" required htmlFor="rappel-nom">
            <input
              id="rappel-nom"
              name="name"
              type="text"
              required
              autoComplete="name"
              className={inputClass}
            />
          </Field>
          <Field label="Téléphone" required htmlFor="rappel-tel">
            <input
              id="rappel-tel"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Type de demande" htmlFor="rappel-type">
          <div className="relative">
            <select
              id="rappel-type"
              name="requestType"
              defaultValue=""
              className={cn(inputClass, "appearance-none pr-12")}
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
          <label htmlFor="rappel-site">Ne pas remplir ce champ</label>
          <input
            id="rappel-site"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>
        <div className="flex gap-3">
          <input
            id="rappel-accord"
            name="consent"
            type="checkbox"
            required
            className={checkboxClass}
          />
          <label
            htmlFor="rappel-accord"
            className="cursor-pointer text-[0.875rem] leading-snug text-ink-soft"
          >
            {contactPage.form.consent}{" "}
            <span aria-hidden="true" className="text-error">
              *
            </span>
          </label>
        </div>
        <Button type="submit" icon="arrowRight">
          Être rappelé
        </Button>
      </form>
    </section>
  );
}
