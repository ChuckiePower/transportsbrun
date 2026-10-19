import type { Metadata, Viewport } from "next";
import { ViewTransition, type ReactNode } from "react";
import { CallbackHost } from "@/components/form/CallbackHost";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Interactions } from "@/components/layout/Interactions";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { TopBar } from "@/components/layout/TopBar";
import { Analytics } from "@/components/seo/Analytics";
import { JsonLd, localBusinessJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { fontDisplay, fontSans, fontSign } from "./fonts";
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
  themeColor: "#f8f5ef",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontSign.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Active les animations « avant révélation » uniquement si JavaScript s'exécute */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-sun px-5 py-3 font-display font-semibold text-ink shadow-lg transition-transform focus:translate-y-0"
        >
          Aller au contenu
        </a>
        <TopBar />
        <Header />
        <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
          <ViewTransition>{children}</ViewTransition>
        </main>
        <Footer />
        <MobileCallBar />
        <FloatingCta />
        <CallbackHost />
        <Interactions />
        <JsonLd data={localBusinessJsonLd()} />
        <Analytics />
      </body>
    </html>
  );
}
