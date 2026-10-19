import { Icon } from "@/components/ui/Icon";
import { mailtoHref, site, telHref } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Coordonnées complètes (3 téléphones libellés, 4 e-mails, horaires, adresse).
 * Toutes les valeurs proviennent de src/content/site.ts.
 */
export function ContactDetails({
  tone = "light",
  headingLevel: H = "h3",
  stacked = false,
  className,
}: {
  tone?: "light" | "dark";
  headingLevel?: "h2" | "h3";
  /** Une seule colonne (colonne latérale) */
  stacked?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  const label = cn("eyebrow flex items-center gap-2", dark ? "text-signal" : "text-navy");
  const muted = dark ? "text-silver" : "text-steel";
  const strong = dark ? "text-white" : "text-ink";
  const linkHover = dark ? "hover:text-signal" : "hover:text-navy";
  return (
    <div className={cn("grid gap-8", !stacked && "sm:grid-cols-2", className)}>
      <div>
        <H className={label}>
          <Icon name="phone" className="size-4" /> Téléphone
        </H>
        <ul className="mt-3 space-y-2.5">
          {site.phones.map((p) => (
            <li key={p.e164} className="flex flex-wrap items-baseline gap-x-2">
              <span className={cn("min-w-[8.5rem]", muted)}>
                {p.label}
                {" "}:
              </span>
              <a
                href={telHref(p)}
                className={cn(
                  "tabular font-display text-[1.45rem] leading-tight font-bold",
                  strong,
                  linkHover,
                )}
              >
                {p.display}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <H className={label}>
          <Icon name="mail" className="size-4" /> E-mail
        </H>
        <ul className="mt-3 space-y-2.5">
          {site.emails.map((e) => (
            <li key={e.address}>
              <span className={cn("block text-sm", muted)}>{e.label}</span>
              <a
                href={mailtoHref(e)}
                className={cn(
                  "font-semibold break-all underline-offset-4 hover:underline",
                  strong,
                  linkHover,
                )}
              >
                {e.address}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <H className={label}>
          <Icon name="clock" className="size-4" /> Horaires
        </H>
        <p className={cn("mt-3", strong)}>
          {site.hours.days}
          {" "}:
          <br />
          {site.hours.slots}
        </p>
      </div>
      <div>
        <H className={label}>
          <Icon name="pin" className="size-4" /> Adresse
        </H>
        <address className={cn("mt-3 not-italic", strong)}>
          {site.address.street},
          <br />
          {site.address.postalCode} {site.address.cityDisplay}
        </address>
        <a
          href={site.googleMapsUrl}
          className={cn(
            "mt-2 inline-flex min-h-11 items-center gap-1.5 font-semibold underline underline-offset-4",
            dark ? "text-signal" : "text-navy",
          )}
          rel="noopener noreferrer"
          target="_blank"
        >
          Itinéraire
          <Icon name="arrowUpRight" className="size-4" />
          <span className="sr-only">(Google Maps, nouvel onglet)</span>
        </a>
      </div>
    </div>
  );
}
