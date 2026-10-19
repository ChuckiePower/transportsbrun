import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { TopBar } from "@/components/layout/TopBar";
import { Analytics } from "@/components/seo/Analytics";
import { JsonLd, localBusinessJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { fontDisplay, fontSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  // Les numéros sont déjà de vrais liens tel: ; évite les liens automatiques d'iOS
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: { type: "website", locale: site.locale, siteName: site.name },
};

export const viewport: Viewport = {
  themeColor: "#131417",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body className="flex min-h-dvh flex-col pb-[calc(4.25rem+env(safe-area-inset-bottom))] md:pb-0">
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a
          href="#contenu"
          className="fixed top-2 left-2 z-[60] -translate-y-24 rounded-sm bg-signal px-4 py-3 font-display text-lg font-bold text-ink uppercase shadow-lift transition-transform focus:translate-y-0"
        >
          Aller au contenu
        </a>
        <TopBar />
        <Header />
        <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <MobileCallBar />
        <JsonLd data={localBusinessJsonLd()} />
        <Analytics />
      </body>
    </html>
  );
}
