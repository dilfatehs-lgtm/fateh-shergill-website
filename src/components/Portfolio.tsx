"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { listings, type ListingSide } from "@/data/listings";
import ListingCard from "./ListingCard";
import { Reveal, HairlineReveal } from "./Reveal";

type TabId = "all" | ListingSide;

const tabs: { id: TabId; label: string; blurb: string }[] = [
  {
    id: "all",
    label: "All Transactions",
    blurb: "Every closing across both sides of the table.",
  },
  {
    id: "listing",
    label: "Sold Listings",
    blurb: "Homes I listed and sold on behalf of the seller.",
  },
  {
    id: "buyer",
    label: "Buyer Represented",
    blurb: "Purchases where I advised and negotiated for the buyer.",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState<TabId>("all");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const visible = useMemo(() => {
    const rows =
      active === "all" ? listings : listings.filter((l) => l.side === active);
    // Featured first, then newest sale date
    return [...rows].sort((a, b) => {
      if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
      return b.soldDate.localeCompare(a.soldDate);
    });
  }, [active]);

  const activeBlurb = tabs.find((t) => t.id === active)!.blurb;

  // Roving arrow-key navigation across the tablist (WAI-ARIA pattern)
  function onTabKeyDown(e: React.KeyboardEvent, index: number) {
    const last = tabs.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="portfolio" className="scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow">Selected Work</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.08] font-light">
            A record built one address at a time
          </h2>
        </Reveal>

        <HairlineReveal className="mt-9 w-full max-w-md" />

        {/* Tabs */}
        <Reveal delay={0.08}>
          <div className="mt-10">
            <div
              role="tablist"
              aria-label="Filter transactions"
              className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {tabs.map((tab, i) => {
                const selected = active === tab.id;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls="portfolio-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(tab.id)}
                    onKeyDown={(e) => onTabKeyDown(e, i)}
                    className={`relative min-h-[48px] shrink-0 cursor-pointer px-5 text-sm tracking-wide whitespace-nowrap transition-colors duration-200 ${
                      selected
                        ? "text-fg"
                        : "text-fg-muted hover:text-fg"
                    }`}
                  >
                    {tab.label}
                    {selected && (
                      <motion.span
                        layoutId="tab-underline"
                        aria-hidden="true"
                        className="absolute inset-x-2 bottom-0 h-px bg-brass"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 38,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="h-px w-full bg-line" aria-hidden="true" />

            <p
              aria-live="polite"
              className="mt-5 text-sm text-fg-muted"
            >
              {activeBlurb}{" "}
              <span className="tnum text-fg">
                {visible.length}{" "}
                {visible.length === 1 ? "property" : "properties"}
              </span>
            </p>
          </div>
        </Reveal>

        {/* Grid */}
        <div
          role="tabpanel"
          id="portfolio-panel"
          aria-labelledby={`tab-${active}`}
          tabIndex={-1}
          className="mt-10"
        >
          {visible.length === 0 ? (
            <div className="border border-dashed border-line bg-sand/40 px-8 py-20 text-center">
              <p className="font-display text-2xl text-fg">
                Nothing to show here yet
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm text-fg-muted">
                Transactions in this category will appear here as they close.
                In the meantime, I&rsquo;m happy to walk you through comparable
                work directly.
              </p>
              <a
                href="#contact"
                className="mt-7 inline-flex min-h-[48px] cursor-pointer items-center border border-fg px-6 text-sm transition-colors hover:bg-fg hover:text-fg-invert"
              >
                Get in touch
              </a>
            </div>
          ) : (
            /*
              Plain React, no animation library. Keying the grid by `active`
              makes React discard the previous card set outright and mount the
              new one — deterministic, with no chance of orphaned cards. The
              `animate-[grid-fade]` class gives a lightweight CSS crossfade on
              each swap; the earlier motion-based versions left removed cards
              stuck in the DOM.
            */
            <div
              key={active}
              className="grid animate-[grid-fade_0.3s_var(--ease-out-soft)_both] grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visible.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}

          {/* Advertising disclosure for past transactions. */}
          <p className="mt-12 max-w-3xl border-t border-line pt-6 text-xs leading-relaxed text-fg-muted">
            Transactions shown are completed sales in which I acted for the
            seller or the buyer, as indicated on each card. Where a property
            was listed by another brokerage, that brokerage is credited. Sale
            prices are published only where the parties have consented;
            otherwise the price is withheld. Past results are not a guarantee
            of future outcomes. This is not an offer to sell or a solicitation
            of properties currently listed with another brokerage.
          </p>
        </div>
      </div>
    </section>
  );
}
