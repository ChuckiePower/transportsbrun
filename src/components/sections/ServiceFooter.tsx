import { reviewsData } from "@reviews-data";
import { ReviewAside } from "@/components/reviews/Reviews";
import type { ReviewTopic } from "@/content/reviews";
import { Container } from "@/components/ui/Container";
import type { Faq as FaqItem } from "@/content/faq";
import { CtaBand } from "./CtaBand";
import { Faq } from "./Faq";

/**
 * Bas commun des pages intérieures : un avis Google sur le même sujet (s'il y en a un),
 * la FAQ courte (3 questions) et le bandeau final.
 */
export function ServiceFooter({
  topics,
  faqs,
  quote,
}: {
  topics?: ReviewTopic[];
  faqs?: FaqItem[];
  quote?: string;
}) {
  return (
    <>
      {topics ? <ReviewSlot topics={topics} /> : null}
      {faqs?.length ? <Faq items={faqs} tone="cream-2" /> : null}
      <CtaBand quote={quote} />
    </>
  );
}

function ReviewSlot({ topics }: { topics: ReviewTopic[] }) {
  // Aucun avis sur ce sujet : pas de section (et pas d'espace vide)
  if (!reviewsData.reviews.some((r) => r.topics?.some((t) => topics.includes(t)))) return null;
  return (
    <div className="py-12">
      <Container>
        <ReviewAside topic={topics} className="mx-auto max-w-2xl" />
      </Container>
    </div>
  );
}
