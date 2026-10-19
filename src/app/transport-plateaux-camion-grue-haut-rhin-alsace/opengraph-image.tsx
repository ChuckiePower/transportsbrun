import { plateauPage as page } from "@/content/pages/plateau";
import { renderOg } from "@/lib/og";

export const alt = page.meta.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({ title: page.meta.ogTitle, photo: page.meta.ogPhoto });
}
