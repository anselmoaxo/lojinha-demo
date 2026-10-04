import type { Metadata } from "next";
import Script from "next/script";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ANALYTICS } from "@/config/analytics";
import { siteIndexable, siteOrigin, siteUrl } from "@/config/site";
import { store } from "@/content";
import { asset } from "@/lib/asset";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  robots: { index: siteIndexable, follow: siteIndexable },
  title: { default: store.seo.title, template: `%s | ${store.name}` },
  description: store.seo.description,
  alternates: { canonical: siteUrl() },
  openGraph: { title: store.seo.title, description: store.seo.description, url: siteUrl(), siteName: store.name, locale: "pt_BR", type: "website", images: [{ url: asset(store.seo.image), width: 1200, height: 630, alt: store.name }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full">
        <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
        <CartProvider>
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        {ANALYTICS.websiteId ? (
          <Script src={ANALYTICS.scriptUrl} data-website-id={ANALYTICS.websiteId} data-domains={ANALYTICS.domains} strategy="afterInteractive" />
        ) : null}
      </body>
    </html>
  );
}
