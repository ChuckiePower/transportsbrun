import { reviewsData as defaultData } from "@reviews-data";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ICON_SPRITE } from "@/components/ui/icon-sprite";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { GoogleReview, ReviewsData, ReviewTopic } from "@/content/reviews";
import { cn } from "@/lib/cn";

/*
 * Avis Google saisis à la main (src/content/reviews.ts) : aucun widget ni script externe,
 * aucun balisage JSON-LD (Review / aggregateRating interdits pour des avis repris d'une autre
 * plateforme). Rien ne s'affiche tant que les données sont vides.
 */

export function hasRating(
  d: ReviewsData = defaultData,
): d is ReviewsData & { rating: number; count: number } {
  return d.rating != null && d.count != null;
}

const formatRating = (v: number) =>
  v.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
}

function initials(author: string) {
  return author
    .replace(/\./g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

/** Cinq étoiles, remplies au prorata de la note (décoratives : la note est toujours écrite) */
export function Stars({ value, className }: { value: number; className?: string }) {
  const row = (filled: boolean) =>
    Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        focusable="false"
      >
        <use href={`${ICON_SPRITE}#star`} />
      </svg>
    ));
  return (
    <span
      aria-hidden="true"
      className={cn("stars relative inline-flex gap-[0.12em] text-line", className)}
    >
      {row(false)}
      <span
        className="stars-fill absolute inset-0 inline-flex gap-[0.12em] text-sun"
        style={{ clipPath: `inset(0 ${100 - (value / 5) * 100}% 0 0)` }}
      >
        {row(true)}
      </span>
    </span>
  );
}

/** Note globale « 4,8/5 · 23 avis Google » ; null sans données */
export function RatingBadge({
  data = defaultData,
  dark = false,
  className,
}: {
  data?: ReviewsData;
  dark?: boolean;
  className?: string;
}) {
  if (!hasRating(data)) return null;
  const content = (
    <>
      <Stars value={data.rating} className="text-[1rem]" />
      <span className={cn("tabular font-sign font-extrabold", dark ? "text-white" : "text-ink")}>
        {formatRating(data.rating)}/5
      </span>
      <span className={cn("text-[0.875rem]", dark ? "text-marking/80" : "text-ink-soft")}>
        {data.count} avis Google
      </span>
    </>
  );
  return data.profileUrl ? (
    <a
      href={data.profileUrl}
      rel="noopener noreferrer"
      target="_blank"
      className={cn(
        "inline-flex flex-wrap items-center gap-x-2 gap-y-1 hover:underline",
        className,
      )}
    >
      {content}
      <span className="sr-only">(fiche Google, nouvel onglet)</span>
    </a>
  ) : (
    <span className={cn("inline-flex flex-wrap items-center gap-x-2 gap-y-1", className)}>
      {content}
    </span>
  );
}

export function ReviewCard({ review, className }: { review: GoogleReview; className?: string }) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-lg border border-line bg-surface p-7 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft font-sign font-extrabold text-brand"
        >
          {initials(review.author)}
        </span>
        <figcaption className="min-w-0">
          <span className="block font-display font-semibold text-ink">{review.author}</span>
          <span className="block text-[0.875rem] text-ink-soft">
            <time dateTime={review.date}>{formatDate(review.date)}</time>
          </span>
        </figcaption>
      </div>
      <p className="mt-4 flex items-center gap-2">
        <Stars value={review.rating} className="text-[1.05rem]" />
        <span className="sr-only">Note : {review.rating} sur 5</span>
      </p>
      <blockquote className="mt-3 flex-1 text-ink">« {review.text} »</blockquote>
      {review.url ? (
        <a
          href={review.url}
          rel="noopener noreferrer"
          target="_blank"
          className="mt-4 inline-flex items-center gap-1.5 self-start text-[0.875rem] font-semibold text-brand hover:underline"
        >
          Voir l&apos;avis sur Google
          <Icon name="arrowUpRight" className="size-3.5" />
          <span className="sr-only">(nouvel onglet)</span>
        </a>
      ) : null}
    </figure>
  );
}

/** Section « Ce que disent nos clients » (accueil) */
export function ReviewsSection({ data = defaultData }: { data?: ReviewsData }) {
  const reviews = data.reviews.slice(0, 6);
  if (!reviews.length && !hasRating(data)) return null;
  return (
    <Section tone="cream-2" aria-labelledby="avis-titre" data-reviews="">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="avis-titre"
            eyebrow="Avis Google"
            title="Ce que disent nos clients"
            className="lg:col-span-7"
          />
          {hasRating(data) ? (
            <div data-reveal="" className="lg:col-span-5 lg:justify-self-end">
              <p className="tabular font-sign text-[clamp(3.5rem,7vw,5rem)] leading-none font-extrabold text-ink">
                {formatRating(data.rating)}
                <span className="text-[0.45em] text-ink-soft">/5</span>
              </p>
              <Stars value={data.rating} className="mt-3 text-[1.6rem]" />
              <p className="mt-2 text-ink-soft">
                {data.count} avis · Avis Google
                <span className="sr-only">, note moyenne {formatRating(data.rating)} sur 5</span>
              </p>
            </div>
          ) : null}
        </div>

        {reviews.length ? (
          <ul
            data-convoy=""
            className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0"
            aria-label="Avis clients"
          >
            {reviews.map((r, i) => (
              <li
                key={`${r.author}-${r.date}`}
                data-reveal=""
                style={{ ["--i" as string]: i % 3 }}
                className="w-[85%] shrink-0 snap-start md:w-auto"
              >
                <ReviewCard review={r} />
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-[0.875rem] text-ink-soft">
            Sélection d&apos;avis publiés sur notre fiche Google
            {data.updatedAt ? <> (mise à jour : {formatDate(data.updatedAt)})</> : null}.
          </p>
          <div className="flex flex-wrap gap-3">
            {data.profileUrl ? (
              <ButtonLink
                href={data.profileUrl}
                variant="secondary"
                icon="arrowUpRight"
                rel="noopener noreferrer"
                target="_blank"
              >
                Voir tous les avis sur Google
              </ButtonLink>
            ) : null}
            {data.writeReviewUrl ? (
              <ButtonLink
                href={data.writeReviewUrl}
                variant="secondary"
                icon="star"
                iconPosition="start"
                rel="noopener noreferrer"
                target="_blank"
              >
                Laisser un avis
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Encart d'avis (contact, bas des pages de service) : la note et un avis court,
 * en rapport avec le sujet de la page s'il y en a un. Null sans données.
 */
export function ReviewAside({
  topic,
  data = defaultData,
  className,
}: {
  /** Sujet(s) de la page : seul un avis qui en parle est affiché */
  topic?: ReviewTopic | ReviewTopic[];
  data?: ReviewsData;
  className?: string;
}) {
  const topics = topic === undefined ? null : Array.isArray(topic) ? topic : [topic];
  const review = topics
    ? data.reviews.find((r) => r.topics?.some((t) => topics.includes(t)))
    : data.reviews[0];
  if (!review && !(topics === null && hasRating(data))) return null;
  return (
    <aside
      aria-label="Avis client"
      className={cn("rounded-lg border border-line bg-surface p-6 shadow-sm", className)}
    >
      <RatingBadge data={data} />
      {review ? (
        <>
          <blockquote className="mt-4 text-ink">« {review.text} »</blockquote>
          <p className="mt-3 text-[0.875rem] text-ink-soft">
            {review.author}, <time dateTime={review.date}>{formatDate(review.date)}</time> · Avis
            Google
          </p>
        </>
      ) : null}
    </aside>
  );
}
