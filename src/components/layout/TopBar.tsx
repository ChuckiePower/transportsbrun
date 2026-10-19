import { FacebookIcon, Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Container";
import { mailtoHref, mainEmail, mainPhone, site, telHref } from "@/content/site";

/** Barre supérieure (tablette et ordinateur) : téléphone, e-mail, horaires, Facebook */
export function TopBar() {
  return (
    <div className="on-dark hidden bg-ink text-[0.95rem] text-silver md:block">
      <Container className="flex h-10 items-center justify-between gap-6">
        <ul className="flex items-center gap-6">
          <li>
            <a
              href={telHref(mainPhone)}
              className="inline-flex items-center gap-2 font-semibold text-white hover:text-signal"
            >
              <Icon name="phone" className="size-4 text-signal" />
              {mainPhone.display}
            </a>
          </li>
          <li>
            <a
              href={mailtoHref(mainEmail)}
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Icon name="mail" className="size-4" />
              {mainEmail.address}
            </a>
          </li>
          <li className="hidden items-center gap-2 lg:inline-flex">
            <Icon name="clock" className="size-4" />
            <span>{site.hours.display}</span>
          </li>
        </ul>
        <a
          href={site.social.facebook}
          className="inline-flex size-9 items-center justify-center rounded-full hover:bg-white/10 hover:text-white"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FacebookIcon className="size-4" />
          <span className="sr-only">Transports Brun sur Facebook (nouvel onglet)</span>
        </a>
      </Container>
    </div>
  );
}
