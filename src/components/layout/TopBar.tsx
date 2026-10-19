import { Container } from "@/components/ui/Container";
import { FacebookIcon, Icon } from "@/components/ui/Icon";
import { mailtoHref, mainEmail, mainPhone, site, telHref } from "@/content/site";

/** Fine ligne d'informations au-dessus de l'en-tête (tablette et ordinateur) */
export function TopBar() {
  return (
    <aside aria-label="Contact rapide" className="hidden text-[0.8125rem] text-ink-soft md:block">
      <Container className="flex h-10 items-center justify-between gap-6">
        <ul className="flex items-center gap-5">
          <li>
            <a
              href={telHref(mainPhone)}
              className="inline-flex items-center gap-1.5 font-medium text-ink hover:text-brand"
            >
              <Icon name="phone" className="size-3.5 text-brand" />
              {mainPhone.display}
            </a>
          </li>
          <li>
            <a
              href={mailtoHref(mainEmail)}
              className="inline-flex items-center gap-1.5 hover:text-brand"
            >
              <Icon name="mail" className="size-3.5" />
              {mainEmail.address}
            </a>
          </li>
          <li className="hidden items-center gap-1.5 lg:inline-flex">
            <Icon name="clock" className="size-3.5" />
            {site.hours.display}
          </li>
        </ul>
        <a
          href={site.social.facebook}
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 hover:text-brand"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FacebookIcon className="size-3.5" />
          <span>Facebook</span>
          <span className="sr-only">(nouvel onglet)</span>
        </a>
      </Container>
    </aside>
  );
}
