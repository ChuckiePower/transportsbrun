/**
 * Événements de mesure d'audience, sans cookie, UNIQUEMENT si un outil auto-hébergé
 * (Umami ou Plausible) a été activé au build. Sinon : ne fait rien.
 */
type TrackEvent = "click_call" | "click_quote" | "form_step_2" | "form_submit" | "callback_submit";

declare global {
  interface Window {
    umami?: { track: (name: string) => void };
    plausible?: (name: string) => void;
  }
}

export function track(event: TrackEvent): void {
  if (typeof window === "undefined") return;
  try {
    window.umami?.track(event);
    window.plausible?.(event);
  } catch {
    /* mesure facultative : jamais bloquante */
  }
}
