import { LegalLayout, LegalSection } from "@/components/sections/LegalLayout";
import { renderRich } from "@/components/ui/RichText";
import {
  cookiesSection,
  host,
  imageCredit,
  mentionsLegales as ml,
  odrSection,
  webAgency,
} from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

const path = "/mentions-legales";
export const metadata = pageMetadata(
  {
    title: "Mentions légales",
    ogTitle: "Mentions légales",
    description:
      "Mentions légales du site de Transports Brun, transporteur routier à Saint-Hippolyte (Haut-Rhin).",
  },
  path,
  { noindex: true },
);

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title={ml.title} path={path}>
      <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[16rem_1fr]">
        {ml.company.map((row) => (
          <div key={row.label} className="contents">
            <dt className="font-bold text-ink">
              {row.label}
              {" "}:
            </dt>
            <dd>
              {row.href ? (
                <a href={row.href}>{row.value.join(" ")}</a>
              ) : (
                row.value.map((v, i) => (
                  <span key={i} className="block">
                    {v}
                  </span>
                ))
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div>
        <p className="font-bold text-ink">{ml.legalForm}</p>
        <dl className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-[16rem_1fr]">
          {ml.registration.map((row) => (
            <div key={row.label} className="contents">
              <dt className="font-bold text-ink">
                {row.label}
                {" "}:
              </dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {webAgency.show ? (
        <LegalSection title={webAgency.title}>
          <p>
            <strong>{webAgency.name}</strong>
            {webAgency.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
            <span className="block">
              Téléphone{" "}: {webAgency.phone}
            </span>
            <span className="block">
              E-mail{" "}: <a href={`mailto:${webAgency.email}`}>{webAgency.email}</a>
            </span>
            <span className="block">
              Site{" "}:{" "}
              <a href={`https://${webAgency.site}`} rel="noopener noreferrer" target="_blank">
                {webAgency.site}
              </a>
            </span>
          </p>
        </LegalSection>
      ) : null}

      {imageCredit.show ? (
        <LegalSection title={imageCredit.title}>
          <p>{imageCredit.text}</p>
        </LegalSection>
      ) : null}

      <LegalSection title={host.title}>
        <p>
          <strong>{host.name}</strong>
          {host.lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </p>
      </LegalSection>

      <LegalSection title={ml.personalData.title}>
        <p>{ml.personalData.intro}</p>
        <p>{ml.personalData.rights}</p>
        <ul className="list-disc space-y-1 pl-6">
          {ml.personalData.channels.map((c) => (
            <li key={c}>{renderRich(c)}</li>
          ))}
        </ul>
        <p>{ml.personalData.objection}</p>
      </LegalSection>

      <LegalSection title={cookiesSection.title}>
        {cookiesSection.paragraphs.map((p, i) => (
          <p key={i}>{renderRich(p)}</p>
        ))}
      </LegalSection>

      <LegalSection title={odrSection.title}>
        <p>{renderRich(odrSection.text)}</p>
      </LegalSection>
    </LegalLayout>
  );
}
