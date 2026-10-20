import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { clientLogos } from "@/content/client-logos";

/** Logos de clients : masqués tant que src/content/client-logos.ts est vide */
export function ClientLogos() {
  if (!clientLogos.length) return null;
  return (
    <section aria-label="Ils nous font confiance" className="py-12">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {clientLogos.map((c) => (
            <li key={c.name}>
              <Image src={c.logo} alt={c.name} className="h-10 w-auto" sizes="160px" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
