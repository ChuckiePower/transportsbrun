import { Icon } from "@/components/ui/Icon";
import { EmailText } from "@/components/ui/EmailText";
import { IconChip } from "@/components/ui/IconChip";
import { mailtoHref, site, telHref } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Coordonnées complètes (3 téléphones libellés, 4 e-mails, horaires, adresse),
 * toutes issues de src/content/site.ts. Version claire ou nuit.
 */
export function ContactDetails({
  tone = "light",
  headingLevel: H = "h3",
  stacked = false,
  className,
}: {
  tone?: "light" | "asphalt";
  headingLevel?: "h2" | "h3";
  stacked?: boolean;
  className?: string;
}) {
  const dark = tone === "asphalt";
  const head = cn(
    "flex items-center gap-3 font-display text-[1rem] font-bold",
    dark ? "text-white" : "text-ink",
  );
  const muted = dark ? "text-marking/80" : "text-ink-soft";
  const strong = dark ? "text-white" : "text-ink";
  const hover = dark ? "hover:text-sun" : "hover:text-brand";
  return (
    <div className={cn("grid gap-8", !stacked && "sm:grid-cols-2", className)}>
      <div>
        <H className={head}>
          <IconChip name="phone" tone={dark ? "asphalt" : "light"} />
          Téléphone
        </H>
        <ul className="mt-4 space-y-3">
          {site.phones.map((p) => (
            <li key={p.e164} className="flex flex-wrap items-baseline justify-between gap-x-4">
              <span className={muted}>{p.label}</span>
              <a
                href={telHref(p)}
                className={cn("tabular font-sign text-[1.375rem] font-extrabold", strong, hover)}
              >
                {p.display}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <H className={head}>
          <IconChip name="mail" tone={dark ? "asphalt" : "light"} />
          E-mail
        </H>
        <ul className="mt-4 space-y-3">
          {site.emails.map((e) => (
            <li key={e.address}>
              <span className={cn("block text-[0.875rem]", muted)}>{e.label}</span>
              <a
                href={mailtoHref(e)}
                className={cn(
                  "font-medium [overflow-wrap:anywhere] underline-offset-4 hover:underline",
                  strong,
                  hover,
                )}
              >
                <EmailText address={e.address} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <H className={head}>
          <IconChip name="clock" tone={dark ? "asphalt" : "light"} />
          Horaires
        </H>
        <p className={cn("mt-4", strong)}>{site.hours.display}</p>
      </div>
      <div>
        <H className={head}>
          <IconChip name="pin" tone={dark ? "asphalt" : "light"} />
          Adresse
        </H>
        <address className={cn("mt-4 not-italic", strong)}>
          {site.address.street},
          <br />
          {site.address.postalCode} {site.address.cityDisplay}
        </address>
        <a
          href={site.googleMapsUrl}
          className={cn(
            "mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-full border-[1.5px] px-4 font-display text-[0.875rem] font-semibold transition-colors",
            dark
              ? "border-white/30 text-white hover:border-white"
              : "border-line text-ink hover:border-ink",
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
