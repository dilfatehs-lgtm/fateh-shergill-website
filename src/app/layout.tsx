import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { site } from "@/data/site";
import RevealObserver from "@/components/RevealObserver";
import HashScroll from "@/components/HashScroll";
import "./globals.css";

/**
 * Runs before first paint. Adding `.js-reveal` arms the hidden pre-reveal
 * state in globals.css, so scroll animations only exist when JS is alive.
 *
 * The watchdog is the important part. This inline script runs even when the
 * main bundle never arrives — blocked, 404'd, killed by an old browser or a
 * flaky connection — and without it the page would be left permanently
 * hidden by a reveal system that never loaded. (Exactly that happened when
 * Next.js dev-mode blocked the bundle over a LAN IP: whole sections
 * invisible but still occupying height.)
 *
 * So: if RevealObserver hasn't mounted and cleared this timer within 4s,
 * drop the gate and show everything un-animated. Visible-but-static always
 * beats invisible.
 */
const revealBootstrap = `document.documentElement.classList.add("js-reveal");
window.__revealFailsafe=setTimeout(function(){
  document.documentElement.classList.remove("js-reveal");
},4000);`;

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const description = `${site.name} is a licensed real estate broker with ${site.brokerage} (${site.office}), representing buyers and sellers across ${site.city} and the Lower Mainland.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://fatehshergill.com"),
  title: {
    default: `${site.name} — ${site.city} Real Estate Broker`,
    template: `%s — ${site.name}`,
  },
  description,
  /**
   * CREA's trademark policy prohibits its registered marks — REALTOR®, MLS®,
   * Multiple Listing Service® — in meta tags, including page title,
   * description, and keywords. Keep this list free of them.
   */
  keywords: [
    "Vancouver real estate broker",
    "Vancouver real estate agent",
    "Sutton Group West Coast Realty",
    "Fateh Shergill",
    "Lower Mainland homes for sale",
    "Vancouver home buying",
  ],
  openGraph: {
    title: `${site.name} — ${site.city} Real Estate Broker`,
    description,
    locale: "en_CA",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // No maximumScale / userScalable — pinch zoom must never be disabled.
  themeColor: "#12100d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-CA"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
      // The bootstrap script below adds `js-reveal` before React hydrates,
      // so the server and client class lists legitimately differ here.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body className="flex min-h-full flex-col">
        <RevealObserver />
        <HashScroll />
        <a
          href="#main"
          className="sr-only rounded-sm bg-fg px-4 py-3 text-fg-invert focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100]"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
