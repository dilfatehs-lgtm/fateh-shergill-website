/**
 * Shared motion tokens — one rhythm across the entire site.
 * Tuples (not plain arrays) so Motion's `Easing` type accepts them.
 */

/** Entering elements decelerate. Mirrors --ease-out-soft in globals.css. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Exiting elements accelerate away. */
export const EASE_IN: [number, number, number, number] = [0.55, 0, 0.55, 0.2];

export const DURATION = {
  /** Hover, colour, small state changes */
  fast: 0.2,
  /** Menus, chips, card exits */
  base: 0.32,
  /** Scroll reveals */
  reveal: 0.58,
  /** Hero lines only — the deliberate exception */
  hero: 0.75,
} as const;
