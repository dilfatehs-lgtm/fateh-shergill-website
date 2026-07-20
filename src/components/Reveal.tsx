import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll-reveal primitives — plain server components.
 *
 * These ship no JavaScript. They only mark elements with `data-reveal`;
 * globals.css owns the hidden state and the animation, and RevealObserver
 * flips `.is-visible` when the element scrolls into view.
 *
 * Because the hidden state is gated on `.js-reveal` (added by the bootstrap
 * script), content stays visible if scripts fail or frames are throttled.
 */

type Direction = "up" | "down" | "left" | "right" | "fade";

type RevealStyle = CSSProperties & { "--reveal-delay"?: string };

function delayStyle(delay: number): RevealStyle | undefined {
  return delay
    ? { "--reveal-delay": `${Math.round(delay * 1000)}ms` }
    : undefined;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  /** Seconds. */
  delay?: number;
  className?: string;
}) {
  return (
    <div className={className} data-reveal={direction} style={delayStyle(delay)}>
      {children}
    </div>
  );
}

/**
 * Group wrapper. Children marked with RevealItem are staggered by the
 * observer as the group enters — 45ms apart, so a 4-up grid finishes in
 * under 200ms.
 */
export function RevealGroup({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "section";
}) {
  return (
    <Tag className={className} data-reveal-group="">
      {children}
    </Tag>
  );
}

/** A single staggered child of RevealGroup. */
export function RevealItem({
  children,
  className,
  direction = "up",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  as?: "div" | "li";
}) {
  return (
    <Tag className={className} data-reveal={direction}>
      {children}
    </Tag>
  );
}

/** Brass rule that draws itself horizontally. */
export function HairlineReveal({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`hairline ${className}`}
      data-reveal="hairline"
    />
  );
}
