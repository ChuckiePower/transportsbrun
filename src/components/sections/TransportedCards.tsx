import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { Icon } from "@/components/ui/Icon";
import { AdrPlate } from "@/components/route/AdrPlate";
import { IconChip } from "@/components/ui/IconChip";
import { transported } from "@/content/transported";

const cardBase =
  "group relative flex h-full rounded-lg border border-line bg-surface shadow-sm transition-[box-shadow,transform] duration-300 ease-out-soft hover:-translate-y-[3px] hover:shadow-md focus-within:-translate-y-[3px] focus-within:shadow-md motion-reduce:transform-none";

function QuoteButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 w-full items-center justify-between gap-2 rounded-full border-[1.5px] border-line bg-surface px-4 py-2 font-display text-[0.8125rem] leading-tight font-semibold text-ink transition-colors hover:border-ink xs:w-auto xs:justify-start xs:self-start sm:text-[0.875rem]"
    >
      Demander un devis pour ce transport
      <span className="sr-only"> : {label}</span>
      <Icon
        name="arrowRight"
        className="size-4 text-brand transition-transform duration-200 group-hover:translate-x-[3px]"
      />
    </Link>
  );
}

/** « Ce que nous transportons » : cartes à photo, chacune avec un devis présélectionné */
export function TransportedCards() {
  const withPhoto = transported.filter((t) => t.photo);
  const without = transported.filter((t) => !t.photo);
  return (
    <div className="space-y-5">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {withPhoto.map((t, i) => (
          <li key={t.id} data-reveal="" style={{ ["--i" as string]: i % 3 }}>
            <article className={`${cardBase} flex-col p-2`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-cream-2">
                <Photo
                  id={t.photo!}
                  fill
                  decorative
                  sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.03] motion-reduce:transform-none"
                  style={{ objectPosition: t.focal }}
                />
              </div>
              <div className="flex flex-1 flex-col px-4 pt-5 pb-4 sm:px-5">
                <div className="flex items-center gap-3">
                  <IconChip
                    name={t.icon}
                    className="group-focus-within:rotate-6 group-hover:rotate-6 motion-reduce:rotate-0"
                  />
                  <h3 className="text-h3 font-bold">
                    <Link href={t.serviceHref} className="rounded-sm hover:text-brand">
                      {t.title}
                    </Link>
                  </h3>
                </div>
                <p className="mt-3 mb-5 flex-1 text-ink-soft">{t.text}</p>
                <QuoteButton href={t.quoteHref} label={t.title} />
              </div>
            </article>
          </li>
        ))}
      </ul>
      {without.map((t) => (
        <article
          key={t.id}
          data-reveal=""
          className="on-asphalt relative isolate flex flex-col gap-6 overflow-hidden rounded-lg bg-asphalt p-7 text-marking shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-9"
        >
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <AdrPlate size="lg" />
            <div>
              <h3 className="text-h3 font-bold text-white">
                <Link href={t.serviceHref} className="rounded-sm hover:underline">
                  {t.title}
                </Link>
              </h3>
              <p className="mt-1 max-w-xl text-marking/80">{t.text}</p>
            </div>
          </div>
          <Link
            href={t.quoteHref}
            className="inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-sun px-5 py-2 font-display text-[0.9rem] font-semibold text-ink shadow-sun transition-colors hover:bg-sun-hover sm:self-center"
          >
            Demander un devis pour ce transport
            <span className="sr-only"> : {t.title}</span>
            <Icon name="arrowRight" className="size-4" />
          </Link>
        </article>
      ))}
    </div>
  );
}
