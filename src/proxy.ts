import { NextResponse, type NextRequest } from "next/server";
import { isProductionHost } from "@/lib/site-url";

/**
 * Préproduction jamais indexable : sur tout hôte autre que la production, chaque réponse
 * porte « X-Robots-Tag: noindex, nofollow » et /robots.txt interdit tout.
 * Sur le domaine de production, rien ne change (robots.txt normal, aucun en-tête ajouté).
 */
export function proxy(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (isProductionHost(host)) return NextResponse.next();

  const noindex = { "X-Robots-Tag": "noindex, nofollow" };
  if (request.nextUrl.pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nDisallow: /\n", {
      headers: {
        ...noindex,
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", noindex["X-Robots-Tag"]);
  return response;
}

export const config = {
  // Tout sauf les fichiers statiques versionnés de Next.js
  matcher: ["/((?!_next/static).*)"],
};
