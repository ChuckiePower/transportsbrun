import Link from "next/link";
import { FacebookIcon, Icon } from "@/components/ui/Icon";
import { EmailText } from "@/components/ui/EmailText";
import { legalNav, mailtoHref, mainNav, site, telHref } from "@/content/site";
import { LogoTile } from "./Logo";

/** Pied de page : grande carte nuit arrondie posée dans la page */
export function Footer() {
  const year = new Date().getFullYear();
  const heading = "font-display text-[0.95rem] font-bold text-white";
  const link = "text-cream/80 transition-colors hover:text-white";
  return (
    <footer className="px-3 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:px-4 md:pb-4">
      <div className="on-night mx-auto max-w-[87.5rem] rounded-xl bg-night text-cream/80">
        <div className="mx-auto grid max-w-[75rem] gap-12 px-6 py-14 sm:grid-cols-2 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="lg:col-span-4">
            <LogoTile />
            <p className="mt-6 max-w-xs text-white">{site.tagline}</p>
            <address className="mt-5 not-italic">
              <a href={site.googleMapsUrl} className={`inline-flex gap-2 ${link}`} rel="noopener noreferrer" target="_blank">
                <Icon name="pin" className="mt-1 size-4 shrink-0 text-brand-light" />
                <span>
                  {site.address.street},
                  <br />
                  {site.address.postalCode} {site.address.cityDisplay}
                  <span className="sr-only"> (voir sur Google Maps, nouvel onglet)</span>
                </span>
              </a>
            </address>
            <a
              href={site.social.facebook}
              className="mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-full border-[1.5px] border-white/20 px-4 text-white transition-colors hover:border-white"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FacebookIcon className="size-4" />
              <span>Suivez-nous sur Facebook</span>
              <span className="sr-only">(nouvel onglet)</span>
            </a>
          </div>

          <div className="lg:col-span-3">
            <h2 className={heading}>Téléphone</h2>
            <ul className="mt-4 space-y-3">
              {site.phones.map((p) => (
                <li key={p.e164}>
                  <span className="block text-[0.875rem] text-night-muted">{p.label}</span>
                  <a href={telHref(p)} className="font-display text-xl font-bold text-white tabular hover:text-brand-light">
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
            <h2 className={`${heading} mt-8`}>Horaires</h2>
            <p className="mt-3">{site.hours.display}</p>
          </div>

          <div className="lg:col-span-3">
            <h2 className={heading}>E-mail</h2>
            <ul className="mt-4 space-y-3">
              {site.emails.map((e) => (
                <li key={e.address}>
                  <span className="block text-[0.875rem] text-night-muted">{e.label}</span>
                  <a href={mailtoHref(e)} className={`[overflow-wrap:anywhere] ${link} hover:underline`}>
                    <EmailText address={e.address} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Plan du site" className="lg:col-span-2">
            <h2 className={heading}>Le site</h2>
            <ul className="mt-4 space-y-2">
              {[{ href: "/", label: "Accueil" }, ...mainNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={`inline-block py-1 ${link}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mx-auto flex max-w-[75rem] flex-col gap-3 border-t border-white/10 px-6 py-6 text-[0.875rem] sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p className="flex items-center gap-2.5">
            {/* Les trois barres du logo, une seule fois sur le site, en miniature */}
            <svg viewBox="0 0 30 12" aria-hidden="true" className="h-2.5 w-auto">
              <polygon points="5,0 11,0 6,12 0,12" fill="#a9b4f2" />
              <polygon points="14,0 20,0 15,12 9,12" fill="#bcc5da" />
              <polygon points="23,0 29,0 24,12 18,12" fill="#ffffff" opacity="0.7" />
            </svg>
            <span>
              © {year} {site.name}
            </span>
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`inline-block py-1 ${link}`}>
                  {item.label}
                </Link>
              </li>
            ))}
            {site.credit ? <li className="py-1">{site.credit}</li> : null}
          </ul>
        </div>
      </div>
    </footer>
  );
}
