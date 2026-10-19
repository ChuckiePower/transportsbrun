/**
 * Un seul IntersectionObserver pour tout le site : révélations au défilement, compteurs,
 * pied de page (pastille flottante), boutons du hero (barre d'appel mobile).
 * Chaque élément s'abonne avec watch(el, cb) et se désabonne avec la fonction retournée.
 */
type Callback = (entry: IntersectionObserverEntry) => void;

const callbacks = new Map<Element, Callback>();
let observer: IntersectionObserver | null = null;

export function watch(el: Element, cb: Callback): () => void {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    // Navigateur sans IntersectionObserver : tout est considéré comme visible (appel différé)
    queueMicrotask(() =>
      cb({
        isIntersecting: true,
        target: el,
        boundingClientRect: el.getBoundingClientRect(),
      } as IntersectionObserverEntry),
    );
    return () => {};
  }
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) callbacks.get(entry.target)?.(entry);
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0 },
  );
  callbacks.set(el, cb);
  observer.observe(el);
  return () => {
    callbacks.delete(el);
    observer?.unobserve(el);
  };
}
