import { LegalLayout, LegalSection } from "@/components/sections/LegalLayout";
import { renderRich } from "@/components/ui/RichText";
import { privacyPolicy as pp } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

const path = "/politiques-de-confidentialites";
export const metadata = pageMetadata(
  {
    title: "Politique de confidentialité",
    ogTitle: "Politique de confidentialité",
    description:
      "Politique de confidentialité du site de Transports Brun : données collectées, finalités et droits des personnes.",
  },
  path,
  { noindex: true },
);

export default function ConfidentialitePage() {
  return (
    <LegalLayout title={pp.title} path={path}>
      <div className="space-y-4">
        {pp.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {pp.sections.map((section) => (
        <LegalSection key={section.title} title={section.title}>
          {section.paragraphs.map((p, i) => (
            <p key={i}>{renderRich(p)}</p>
          ))}
          {"list" in section && section.list ? (
            <ul className="list-disc space-y-1 pl-6">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {"after" in section && section.after
            ? section.after.map((p, i) => <p key={i}>{renderRich(p)}</p>)
            : null}
        </LegalSection>
      ))}
    </LegalLayout>
  );
}
