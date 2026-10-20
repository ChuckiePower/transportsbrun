import type { StaticImageData } from "next/image";

/** Logos de clients (section masquée tant que la liste est vide), avec leur accord. */
export type ClientLogo = { name: string; logo: StaticImageData; url?: string };

// TODO(manu): logos de clients, avec leur accord (facultatif)
export const clientLogos: ClientLogo[] = [];
