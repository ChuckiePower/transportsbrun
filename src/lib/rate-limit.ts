/**
 * Limitation de débit en mémoire (fenêtre glissante par clé, ex. adresse IP).
 * Suffisant pour une instance unique ; à remplacer par un stockage partagé si
 * plusieurs instances de l'application tournent derrière le même proxy.
 */
const hits = new Map<string, number[]>();
const MAX_KEYS = 10_000;

export type RateLimitResult = { ok: boolean; remaining: number; retryAfterSeconds: number };

export function rateLimit(
  key: string,
  { max, windowMs }: { max: number; windowMs: number },
  now = Date.now(),
): RateLimitResult {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    const retryAfterSeconds = Math.ceil((windowMs - (now - recent[0]!)) / 1000);
    return { ok: false, remaining: 0, retryAfterSeconds };
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > MAX_KEYS) {
    // purge simple : on retire les clés dont la dernière requête est hors fenêtre
    for (const [k, times] of hits) {
      if (now - times[times.length - 1]! >= windowMs) hits.delete(k);
    }
  }
  return { ok: true, remaining: max - recent.length, retryAfterSeconds: 0 };
}

export function clearRateLimit(): void {
  hits.clear();
}
