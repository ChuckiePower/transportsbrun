import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, Icon } from "@/components/ui/Icon";
import { Stripes } from "@/components/ui/Stripes";
import { legalNav, mailtoHref, mainNav, site, telHref } from "@/content/site";
import { LogoPlate } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-ink text-silver">
      <div className="rule-stripes" aria-hidden="true" />
      <Container className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <LogoPlate />
          <p className="mt-6 max-w-sm text-white">{site.tagline}</p>
          <address className="mt-5 not-italic">
            <a
              href={site.googleMapsUrl}
              className="inline-flex gap-2 hover:text-white"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name="pin" className="mt-1 size-4 shrink-0 text-signal" />
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
            className="mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-sm border border-white/20 px-4 hover:border-white hover:text-white"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FacebookIcon className="size-4" />
            <span>Suivez-nous sur Facebook</span>
            <span className="sr-only">(nouvel onglet)</span>
          </a>
        </div>

        <div className="lg:col-span-3">
          <h2 className="eyebrow text-white">Téléphone</h2>
          <ul className="mt-4 space-y-3">
            {site.phones.map((p) => (
              <li key={p.e164}>
                <span className="block text-sm">{p.label}</span>
                <a
                  href={telHref(p)}
                  className="tabular font-display text-2xl font-bold text-white hover:text-signal"
                >
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
          <h2 className="eyebrow mt-8 text-white">Horaires</h2>
          <p className="mt-3">
            {site.hours.days}
            {" "}: {site.hours.slots}
          </p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="eyebrow text-white">E-mail</h2>
          <ul className="mt-4 space-y-3">
            {site.emails.map((e) => (
              <li key={e.address}>
                <span className="block text-sm">{e.label}</span>
                <a
                  href={mailtoHref(e)}
                  className="break-all text-white hover:text-signal hover:underline"
                >
                  {e.address}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Plan du site" className="lg:col-span-2">
          <h2 className="eyebrow text-white">Le site</h2>
          <ul className="mt-4 space-y-2">
            {[{ href: "/", label: "Accueil" }, ...mainNav].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block py-1 hover:text-white hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3">
            <Stripes tone="dark" className="h-3.5" />
            <span>
              © {year} {site.name}
            </span>
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block py-1 hover:text-white hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {site.credit ? <li className="py-1">{site.credit}</li> : null}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
