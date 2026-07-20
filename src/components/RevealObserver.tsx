"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the CSS reveal system.
 *
 * The reveal CSS hides every `[data-reveal]` element (once `.js-reveal` is on
 * <html>) until this observer adds `.is-visible`. Crucially it re-runs on
 * every route change: the root layout persists across client-side navigation,
 * so a once-only effect would never reveal a newly-navigated page's elements —
 * they'd stay hidden and the page would look blank until a hard refresh. That
 * exact bug is why this depends on `pathname`.
 *
 * On each run, anything already in the viewport is revealed immediately (no
 * flash on navigation); the rest reveal as they scroll into view. Reveals
 * never replay — a shown element is unobserved.
 *
 * Safety net: if IntersectionObserver is missing or anything throws, we reveal
 * everything at once rather than leaving content hidden.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    // The bundle made it. Cancel the inline watchdog in layout.tsx that would
    // otherwise unhide everything at 4s, and take ownership of revealing.
    const w = window as Window & { __revealFailsafe?: number };
    if (w.__revealFailsafe !== undefined) {
      clearTimeout(w.__revealFailsafe);
      delete w.__revealFailsafe;
    }

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    ).filter((el) => !el.classList.contains("is-visible"));

    const reveal = (el: HTMLElement) => {
      const group = el.closest<HTMLElement>("[data-reveal-group]");
      if (group) {
        const siblings = Array.from(
          group.querySelectorAll<HTMLElement>("[data-reveal]"),
        );
        const index = siblings.indexOf(el);
        if (index > 0) el.style.setProperty("--reveal-delay", `${index * 45}ms`);
      }
      el.classList.add("is-visible");
    };

    const showAll = () => {
      nodes.forEach(reveal);
      root.classList.remove("js-reveal");
    };

    if (typeof IntersectionObserver === "undefined") {
      showAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.15 },
    );

    try {
      for (const el of nodes) {
        // Already on screen (e.g. the top of a freshly-navigated page)?
        // Reveal now so navigation never flashes hidden content.
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) reveal(el);
        else observer.observe(el);
      }
    } catch {
      showAll();
      return;
    }

    // Backstop: if anything is still hidden but in view after 3s, drop the gate.
    const failsafe = window.setTimeout(() => {
      const anyInView = nodes.some((el) => {
        if (el.classList.contains("is-visible")) return false;
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0;
      });
      if (anyInView) showAll();
    }, 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
