import { cn } from "@/lib/cn";

/*
 * Carte stylisée de la France (contour simplifié, projection équirectangulaire maison), sans fond
 * de carte externe. Saint-Hippolyte est le point de départ ; des routes en pointillés rayonnent
 * vers le pays (national) puis au-delà des frontières (international). Aucune autre ville nommée.
 */
const FRANCE =
  "M213.4 12.4L225.8 24.0L245.1 42.0L258.8 44.0L276.7 50.0L275.3 64.0L293.2 72.0L302.9 74.0L319.4 78.0L335.9 90.0L352.4 94.0L369.0 96.8L357.9 112.0L352.4 132.0L351.1 152.8L335.9 158.0L333.2 164.0L320.8 178.0L311.1 200.0L330.4 200.0L330.4 216.0L335.9 232.0L335.9 244.0L326.3 252.0L334.5 272.0L333.2 284.0L352.4 290.0L349.7 304.8L335.9 314.0L323.5 330.0L305.6 332.0L290.5 326.0L275.3 320.0L264.3 318.0L251.9 314.0L234.0 326.0L227.2 338.0L227.2 352.0L229.9 358.8L214.8 362.0L191.4 356.0L180.3 348.0L161.1 346.0L134.9 344.0L122.5 338.0L103.3 326.0L94.2 321.2L101.9 314.0L107.4 292.0L110.1 270.0L108.8 250.0L111.5 234.0L103.3 208.0L92.2 192.0L84.0 180.0L88.1 172.0L73.0 164.0L62.0 156.0L46.8 148.0L24.8 144.0L16.5 134.0L12.4 122.0L19.3 112.0L35.8 108.0L60.6 103.2L77.1 112.0L99.1 110.0L104.6 98.0L99.1 88.0L90.9 68.0L107.4 68.0L111.5 82.0L137.7 84.0L148.7 78.0L145.9 68.0L170.7 58.0L183.1 46.0L187.2 20.0L196.9 16.0Z";
const CORSE =
  "M402.0 336.0L406.1 352.0L402.0 382.0L395.1 400.0L384.1 392.0L380.0 372.0L382.7 352.0L393.7 346.0L399.2 336.0Z";

/** Point de départ : Saint-Hippolyte (Haut-Rhin) */
const SH = { x: 346, y: 127 };

/** Routes nationales (vers l'intérieur) puis internationales (au-delà des frontières) */
const national = [
  `M${SH.x} ${SH.y} Q 290 90 218 118`,
  `M${SH.x} ${SH.y} Q 250 170 150 206`,
  `M${SH.x} ${SH.y} Q 300 230 236 296`,
  `M${SH.x} ${SH.y} Q 230 210 118 278`,
  `M${SH.x} ${SH.y} Q 220 140 58 132`,
];
const international = [
  `M${SH.x} ${SH.y} Q 400 92 470 48`,
  `M${SH.x} ${SH.y} Q 300 50 268 -14`,
  `M${SH.x} ${SH.y} Q 420 220 448 300`,
  `M${SH.x} ${SH.y} Q 230 330 176 418`,
];

export function FranceMap({ className }: { className?: string }) {
  return (
    <figure className={cn("relative", className)}>
      <svg
        viewBox="-40 -40 540 480"
        role="img"
        aria-label="Carte de France : depuis Saint-Hippolyte (Haut-Rhin), des routes vers toute la France et au-delà des frontières"
        data-map=""
        className="h-auto w-full"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          {[...national, ...international].map((d, i) => (
            <mask
              key={i}
              id={`map-route-${i}`}
              maskUnits="userSpaceOnUse"
              x="-40"
              y="-40"
              width="540"
              height="480"
            >
              <path
                d={d}
                pathLength={100}
                className="map-draw"
                stroke="#fff"
                strokeWidth="10"
                style={{ ["--i" as string]: i }}
              />
            </mask>
          ))}
        </defs>
        <path d={FRANCE} className="fill-surface stroke-[#d8cfbd]" strokeWidth="2" />
        <path d={CORSE} className="fill-surface stroke-[#d8cfbd]" strokeWidth="2" />

        {/* Régional : cercle autour du point de départ */}
        <circle
          cx={SH.x}
          cy={SH.y}
          r="34"
          className="fill-sun/15 stroke-sun"
          strokeWidth="2.5"
          strokeDasharray="6 7"
        />

        {national.map((d, i) => (
          <path
            key={d}
            d={d}
            mask={`url(#map-route-${i})`}
            className="stroke-brand"
            strokeWidth="3.5"
            strokeDasharray="9 9"
          />
        ))}
        {international.map((d, i) => (
          <path
            key={d}
            d={d}
            mask={`url(#map-route-${national.length + i})`}
            className="stroke-ink"
            strokeWidth="3.5"
            strokeDasharray="9 9"
          />
        ))}

        {/* Saint-Hippolyte */}
        <circle cx={SH.x} cy={SH.y} r="11" className="fill-ink" />
        <circle cx={SH.x} cy={SH.y} r="4.5" className="fill-cream" />
        <g transform={`translate(${SH.x + 18} ${SH.y - 26})`}>
          <rect x="0" y="-15" width="122" height="26" rx="13" className="fill-ink" />
          <text
            x="61"
            y="3"
            textAnchor="middle"
            className="fill-white font-sign text-[13px] font-bold"
          >
            Saint-Hippolyte
          </text>
        </g>
      </svg>
      <figcaption className="mt-4 flex flex-wrap justify-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 font-display text-[0.875rem] font-semibold text-ink">
          <span
            aria-hidden="true"
            className="size-3 rounded-full border-[1.5px] border-dashed border-sun"
          />
          Régional
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 font-display text-[0.875rem] font-semibold text-ink">
          <span aria-hidden="true" className="road-x h-1 w-6 bg-brand" />
          National
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 font-display text-[0.875rem] font-semibold text-ink">
          <span aria-hidden="true" className="road-x h-1 w-6 bg-ink" />
          International
        </span>
      </figcaption>
    </figure>
  );
}
