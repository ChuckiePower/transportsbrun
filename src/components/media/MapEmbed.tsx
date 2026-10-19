"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";

const { latitude: lat, longitude: lon } = site.geo;
const bbox = [lon - 0.012, lat - 0.006, lon + 0.012, lat + 0.006]
  .map((n) => n.toFixed(5))
  .join(",");
const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

/**
 * Carte sans traceur : rien n'est chargé depuis un service tiers tant que le
 * visiteur n'a pas cliqué sur « Afficher la carte » (OpenStreetMap).
 */
export function MapEmbed() {
  const [show, setShow] = useState(false);
  const pill =
    "inline-flex min-h-11 items-center gap-1.5 rounded-full border-[1.5px] border-line bg-surface px-4 font-display text-[0.875rem] font-semibold text-ink transition-colors hover:border-ink";
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface p-2 shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-cream-2 sm:aspect-[16/10]">
        {show ? (
          <iframe
            title={`Carte : ${site.name}, ${site.address.street}, ${site.address.postalCode} ${site.address.city}`}
            src={embedUrl}
            className="absolute inset-0 size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            {/* Plan stylisé purement décoratif */}
            <svg
              aria-hidden="true"
              viewBox="0 0 400 250"
              className="absolute inset-0 size-full text-line"
              preserveAspectRatio="xMidYMid slice"
            >
              <g fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round">
                <path d="M-20 190 C 80 160, 140 200, 220 150 S 360 90, 430 110" />
                <path d="M120 -20 C 140 60, 170 120, 210 150 S 260 230, 250 280" />
              </g>
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.7"
              >
                <path d="M-20 80 C 120 70, 260 50, 430 40" />
                <path d="M300 -20 C 310 90, 320 180, 330 280" />
              </g>
            </svg>
            <span className="relative inline-flex size-14 items-center justify-center rounded-full bg-brand text-white shadow-md">
              <Icon name="pin" className="size-7" />
            </span>
            <p className="relative font-display text-[1.05rem] font-bold text-ink">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.cityDisplay}
            </p>
            <Button
              variant="secondary"
              size="sm"
              icon="map"
              iconPosition="start"
              onClick={() => setShow(true)}
              className="relative"
            >
              Afficher la carte
            </Button>
            <p className="relative max-w-xs text-[0.8125rem] text-ink-soft">
              Carte OpenStreetMap, chargée seulement après votre clic.
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 px-2 pt-3 pb-1">
        <a href={site.googleMapsUrl} className={pill} rel="noopener noreferrer" target="_blank">
          Google Maps <Icon name="arrowUpRight" className="size-4" />
          <span className="sr-only">(nouvel onglet)</span>
        </a>
        <a href={site.openStreetMapUrl} className={pill} rel="noopener noreferrer" target="_blank">
          OpenStreetMap <Icon name="arrowUpRight" className="size-4" />
          <span className="sr-only">(nouvel onglet)</span>
        </a>
      </div>
    </div>
  );
}
