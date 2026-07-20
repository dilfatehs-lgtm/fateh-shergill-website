import type { CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { site } from "@/data/site";
import Skyline from "./Skyline";

/**
 * Hero — the one place the site uses a longer, choreographed entrance.
 *
 * Deliberately zero JavaScript: each line carries `data-reveal` and
 * `is-visible` straight from the server, so the CSS animation starts on the
 * very first paint. It doesn't wait for hydration, and if animations are
 * unavailable the text is simply there. Above-the-fold content should never
 * depend on a script running.
 */

const at = (ms: number) =>
  ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh items-center overflow-hidden pt-28 pb-20"
    >
      {/* Brass glow bleeding out of the top-right — pure CSS, no image
          weight, no layout cost. Low alpha so it reads as depth, not colour. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 78% 10%, rgba(176,141,87,0.16) 0%, rgba(176,141,87,0) 60%), radial-gradient(90% 70% at 6% 94%, rgba(203,167,107,0.07) 0%, rgba(203,167,107,0) 55%)",
        }}
      />
      {/* Fine grain. On dark, overlay lifts the texture instead of muddying it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Skyline sits along the bottom edge, behind the type. The mask fades
          the upper strokes so the mountain ridges dissolve into the dark
          rather than cutting hard lines across the headline and buttons —
          it should read as atmosphere, not as the subject. */}
      <Skyline
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[36vh] max-h-[320px] min-h-[170px] w-full opacity-80"
        style={{
          maskImage:
            "linear-gradient(to top, #000 0%, #000 42%, rgba(0,0,0,0.28) 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, #000 0%, #000 42%, rgba(0,0,0,0.28) 100%)",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="max-w-4xl">
          <p className="eyebrow is-visible" data-reveal="up" style={at(0)}>
            {site.city}, {site.province}
          </p>

          <h1 className="mt-7 font-display text-[clamp(2.75rem,8.5vw,6.5rem)] leading-[1.02] font-light tracking-[-0.015em]">
            <span
              className="is-visible block"
              data-reveal="up"
              style={at(90)}
            >
              Fateh Shergill
            </span>
            <span
              className="is-visible mt-2 block text-fg-muted italic"
              data-reveal="up"
              style={at(180)}
            >
              Real Estate Broker
            </span>
          </h1>

          <p
            className="is-visible mt-10 max-w-xl text-lg text-fg-muted"
            data-reveal="up"
            style={at(280)}
          >
            Considered, discreet representation for buyers and sellers across
            Vancouver and the Lower Mainland — backed by the reach of{" "}
            <span className="whitespace-nowrap text-fg">{site.brokerage}</span>,{" "}
            {site.office}.
          </p>

          <div
            className="is-visible mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            data-reveal="up"
            style={at(370)}
          >
            <a
              href="#contact"
              className="inline-flex min-h-[52px] cursor-pointer items-center justify-center bg-fg px-8 text-sm tracking-wide text-fg-invert transition-colors duration-200 hover:bg-brass-ink"
            >
              Start a Conversation
            </a>
            {/* Brass outline rather than a neutral one: --color-line is only
                1.25:1 on the dark canvas, too faint to read as a control.
                Brass at 70% clears 3:1 and suits the palette. */}
            <a
              href="#portfolio"
              className="inline-flex min-h-[52px] cursor-pointer items-center justify-center border border-brass/70 px-8 text-sm tracking-wide text-fg transition-colors duration-200 hover:border-brass hover:bg-surface"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#portfolio"
        aria-label="Scroll to portfolio"
        data-reveal="fade"
        style={at(900)}
        className="is-visible absolute bottom-10 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-3 text-fg-muted transition-colors hover:text-fg md:flex"
      >
        <span className="text-[0.62rem] tracking-[0.22em] uppercase">
          Scroll
        </span>
        <ArrowDown
          className="size-4 motion-safe:animate-[nudge_2.2s_ease-in-out_infinite]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </a>
    </section>
  );
}
