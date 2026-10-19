/**
 * Un seul écouteur de défilement pour tout le site (passif, cadencé par requestAnimationFrame).
 * Les composants s'abonnent avec onScroll(cb) et se désabonnent avec la fonction retournée.
 */
type Listener = (y: number) => void;
const listeners = new Set<Listener>();
let ticking = false;
let attached = false;

function run() {
  ticking = false;
  const y = window.scrollY;
  listeners.forEach((l) => l(y));
}

function onEvent() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(run);
  }
}

export function onScroll(listener: Listener): () => void {
  listeners.add(listener);
  if (!attached) {
    window.addEventListener("scroll", onEvent, { passive: true });
    window.addEventListener("resize", onEvent, { passive: true });
    attached = true;
  }
  listener(window.scrollY);
  return () => {
    listeners.delete(listener);
    if (!listeners.size && attached) {
      window.removeEventListener("scroll", onEvent);
      window.removeEventListener("resize", onEvent);
      attached = false;
    }
  };
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
