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
 * visiteur n'a pas cliqué sur « Afficher la carte » (OpenStreetMap, sans cookie publicitaire).
 */
export function MapEmbed() {
  const [show, setShow] = useState(false);
  return (
    <div className="overflow-hidden rounded-md border border-line bg-white shadow-card">
      <div className="relative aspect-[4/3] bg-sand sm:aspect-[16/10]">
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
              <g fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round">
                <path d="M-20 190 C 80 160, 140 200, 220 150 S 360 90, 430 110" />
                <path d="M120 -20 C 140 60, 170 120, 210 150 S 260 230, 250 280" />
              </g>
              <g fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7">
                <path d="M-20 80 L 430 40" />
                <path d="M300 -20 L 330 280" />
                <path d="M30 -20 L 60 280" />
              </g>
            </svg>
            <span className="relative inline-flex size-14 items-center justify-center rounded-full bg-navy text-white shadow-lift">
              <Icon name="pin" className="size-7" />
            </span>
            <p className="relative font-display text-xl font-bold uppercase">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.cityDisplay}
            </p>
            <Button
              variant="navy"
              icon="map"
              iconPosition="start"
              onClick={() => setShow(true)}
              className="relative"
            >
              Afficher la carte
            </Button>
            <p className="relative max-w-xs text-sm text-steel">
              La carte est fournie par OpenStreetMap et n&apos;est chargée qu&apos;après votre clic.
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-line px-5 py-3">
        <a
          href={site.googleMapsUrl}
          className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-navy underline underline-offset-4"
          rel="noopener noreferrer"
          target="_blank"
        >
          Ouvrir dans Google Maps <Icon name="arrowUpRight" className="size-4" />
          <span className="sr-only">(nouvel onglet)</span>
        </a>
        <a
          href={site.openStreetMapUrl}
          className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-navy underline underline-offset-4"
          rel="noopener noreferrer"
          target="_blank"
        >
          Ouvrir dans OpenStreetMap <Icon name="arrowUpRight" className="size-4" />
          <span className="sr-only">(nouvel onglet)</span>
        </a>
      </div>
    </div>
  );
}
