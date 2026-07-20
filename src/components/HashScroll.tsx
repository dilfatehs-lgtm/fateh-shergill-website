"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reliable scroll-to-section for cross-page links.
 *
 * Clicking "About" from a /listings/… page sends you to `/#about`. Browsers
 * are meant to scroll to that element on load, but with a tall page, a global
 * `scroll-behavior: smooth`, web-font reflow, and Next.js hydration all racing,
 * the native jump frequently no-ops or gets reset by a late layout shift.
 *
 * So we re-assert the position a few times across the first ~600ms, then stop —
 * and abandon immediately if the visitor starts scrolling themselves, so we
 * never fight their input. CSS `scroll-padding-top` keeps the target clear of
 * the fixed header.
 *
 * Runs only when a hash is present, so ordinary same-page anchor clicks on the
 * home page keep their native smooth-scroll behaviour untouched.
 */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const raw = window.location.hash;
    if (raw.length < 2) return;
    const id = decodeURIComponent(raw.slice(1));

    let cancelled = false;
    const timers: number[] = [];

    const stop = () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // The moment the user scrolls, it's their view — stop re-asserting.
    window.addEventListener("wheel", stop, { passive: true, once: true });
    window.addEventListener("touchmove", stop, { passive: true, once: true });
    window.addEventListener("keydown", stop, { once: true });

    const jump = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (!el) return;
      const top = Math.round(el.getBoundingClientRect().top);
      // Already in place (within the header offset) — nothing to do.
      if (top > -40 && top < 120) return;
      const prev = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      el.scrollIntoView({ block: "start" });
      document.documentElement.style.scrollBehavior = prev;
    };

    // Repeat across the load window to survive a late reflow or scroll reset.
    [0, 120, 300, 600].forEach((d) => {
      timers.push(window.setTimeout(jump, d));
    });

    return () => {
      stop();
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [pathname]);

  return null;
}
