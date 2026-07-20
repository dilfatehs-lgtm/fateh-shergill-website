"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { Menu, X, Phone } from "lucide-react";
import { site } from "@/data/site";

/**
 * The nav targets are sections that only exist on the home page. From any
 * other route (e.g. a /listings/… detail page) a bare "#about" anchor points
 * at nothing, so the link does nothing — which is the bug this fixes. The
 * hrefs are resolved against the current path: same-page anchors on home,
 * full "/#about" links elsewhere so they navigate home and then scroll.
 */
const sections = [
  { hash: "#portfolio", label: "Portfolio" },
  { hash: "#about", label: "About" },
  { hash: "#approach", label: "Approach" },
  { hash: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  const pathname = usePathname();
  const onHome = pathname === "/";
  // Same-page anchor on home; otherwise route home first, then scroll.
  const to = (hash: string) => (onHome ? hash : `/${hash}`);
  const homeHref = onHome ? "#top" : "/";

  const links = sections.map((s) => ({ href: to(s.hash), label: s.label }));

  useEffect(() => {
    // rAF-throttled so the scroll listener never blocks the main thread
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Lock body scroll and provide an Escape route while the menu is open
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-canvas/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a
          href={homeHref}
          className="group flex flex-col leading-none"
          aria-label={`${site.name} — home`}
        >
          <span className="font-display text-xl tracking-wide text-fg sm:text-2xl">
            {site.name}
          </span>
          <span className="mt-1 text-[0.62rem] tracking-[0.22em] text-fg-muted uppercase">
            {site.brokerage}
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative cursor-pointer py-2 text-sm text-fg-muted transition-colors duration-200 hover:text-fg after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-brass after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
            className="inline-flex cursor-pointer items-center gap-2 border border-fg px-5 py-3 text-sm text-fg transition-colors duration-200 hover:bg-fg hover:text-fg-invert"
          >
            <Phone className="size-4" aria-hidden="true" strokeWidth={1.75} />
            {site.phoneDisplay}
          </a>
        </nav>

        {/* Mobile trigger — 44px min touch target */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-3 flex size-11 cursor-pointer items-center justify-center text-fg lg:hidden"
        >
          {open ? (
            <X className="size-6" strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Menu className="size-6" strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: EASE_OUT }}
            className="overflow-hidden border-t border-line bg-canvas lg:hidden"
          >
            <ul className="mx-auto max-w-7xl px-6 py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[56px] cursor-pointer items-center border-b border-line/70 font-display text-2xl text-fg transition-colors active:text-brass-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-6 pb-2">
                <a
                  href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                  className="flex min-h-[56px] cursor-pointer items-center justify-center gap-2 bg-fg text-fg-invert"
                >
                  <Phone
                    className="size-4"
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                  Call {site.phoneDisplay}
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
