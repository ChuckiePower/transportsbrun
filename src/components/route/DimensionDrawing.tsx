import { craneSpecs } from "@/content/equipment";

/**
 * Plan coté (vue de profil) du camion-grue : porteur ou remorque.
 * Uniquement les caractéristiques publiées (longueur de plateau, hauteur, charge utile) ;
 * échelle commune de 36 px par mètre pour que les deux plans se comparent.
 */
const PX_PER_M = 36;
const GROUND = 172;

function num(v: string) {
  return Number(v.replace(",", "."));
}

export function DimensionDrawing({ unit }: { unit: "Porteur" | "Remorque" }) {
  const spec = craneSpecs.find((s) => s.name === unit)!;
  const [len, height, payload] = spec.rows as [
    (typeof spec.rows)[number],
    (typeof spec.rows)[number],
    (typeof spec.rows)[number],
  ];
  const deckLen = num(len.value) * PX_PER_M;
  const deckTop = GROUND - num(height.value) * PX_PER_M;
  const x0 = 84;
  const x1 = x0 + deckLen;
  const isTruck = unit === "Porteur";
  const wheelR = isTruck ? 17 : 13;
  const wheelY = GROUND - wheelR;
  const label = `${unit} : ${len.label.toLowerCase()} ${len.value} ${len.unit}, ${height.label.toLowerCase()} ${height.value} ${height.unit}, ${payload.label} ${payload.value} ${payload.unit}`;

  return (
    <figure className="rounded-lg border border-line bg-surface p-5 shadow-sm sm:p-6">
      <figcaption className="flex items-center justify-between gap-3">
        <span className="eyebrow">{unit}</span>
        <span className="tabular rounded-full bg-cream-2 px-3 py-1 font-sign text-[0.9rem] font-bold text-ink">
          C.U. {payload.value} {payload.unit}
        </span>
      </figcaption>
      <svg
        viewBox="0 0 430 200"
        role="img"
        aria-label={label}
        className="mt-4 h-auto w-full"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* sol */}
        <path d={`M8 ${GROUND}H422`} stroke="#d8cfbd" strokeWidth="3" strokeDasharray="12 10" />
        {/* plateau */}
        <rect
          x={x0}
          y={deckTop}
          width={deckLen}
          height="9"
          rx="2"
          className="stroke-ink"
          strokeWidth="2"
        />
        {isTruck ? (
          <g className="stroke-ink" strokeWidth="2">
            {/* châssis, cabine, grue repliée */}
            <path d={`M${x0} ${deckTop + 15}H${x1 + 40}`} />
            <path
              d={`M${x1 + 6} 150V84a8 8 0 0 1 8-8h34a8 8 0 0 1 7.5 5.2l11 31a8 8 0 0 1 .5 2.7V146a6 6 0 0 1-6 6h-4`}
            />
            <path d={`M${x1 + 15} 86h30l9 26h-39z`} />
            <path d={`M${x1 - 14} ${deckTop}V74h10v${deckTop - 74}`} />
            <path d={`M${x1 - 9} 78 ${x0 + 70} 104`} />
            <path d={`M${x0 + 70} 104v10`} />
            <circle cx={x0 + 46} cy={wheelY} r={wheelR} />
            <circle cx={x0 + 86} cy={wheelY} r={wheelR} />
            <circle cx={x1 + 38} cy={wheelY} r={wheelR} />
          </g>
        ) : (
          <g className="stroke-ink" strokeWidth="2">
            {/* remorque à timon */}
            <path d={`M${x0 + 20} ${deckTop + 9}V${deckTop + 16}H${x1 - 10}V${deckTop + 9}`} />
            <path d={`M${x1 - 10} ${deckTop + 14}L${x1 + 60} ${deckTop + 22}`} />
            <circle cx={x1 + 64} cy={deckTop + 23} r="4" />
            <circle cx={x0 + 46} cy={wheelY} r={wheelR} />
            <circle cx={x0 + 78} cy={wheelY} r={wheelR} />
            <circle cx={x1 - 50} cy={wheelY} r={wheelR} />
          </g>
        )}
        {/* cote de longueur (au-dessus du plateau) */}
        <g className="stroke-brand" strokeWidth="1.5">
          <path d={`M${x0} ${deckTop - 6}V${deckTop - 32}`} strokeDasharray="3 3" />
          <path d={`M${x1} ${deckTop - 6}V${deckTop - 32}`} strokeDasharray="3 3" />
          <path d={`M${x0 + 2} ${deckTop - 26}H${x1 - 2}`} />
          <path d={`m${x0 + 9} ${deckTop - 31}-7 5 7 5`} />
          <path d={`m${x1 - 9} ${deckTop - 31} 7 5-7 5`} />
        </g>
        <text
          x={(x0 + x1) / 2}
          y={deckTop - 34}
          textAnchor="middle"
          className="fill-brand font-sign text-[15px] font-bold"
        >
          {len.value} {len.unit}
        </text>
        {/* cote de hauteur (à gauche) */}
        <g className="stroke-brand" strokeWidth="1.5">
          <path d={`M${x0 - 6} ${deckTop}H${x0 - 30}`} strokeDasharray="3 3" />
          <path d={`M${x0 - 24} ${deckTop + 2}V${GROUND - 2}`} />
          <path d={`m${x0 - 29} ${deckTop + 9} 5-7 5 7`} />
          <path d={`m${x0 - 29} ${GROUND - 9} 5 7 5-7`} />
        </g>
        <text
          x={x0 - 32}
          y={(deckTop + GROUND) / 2 + 5}
          textAnchor="end"
          className="fill-brand font-sign text-[15px] font-bold"
        >
          {height.value} {height.unit}
        </text>
      </svg>
    </figure>
  );
}
