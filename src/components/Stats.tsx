import { stats } from "@/data/listings";
import { RevealGroup, RevealItem } from "./Reveal";

export default function Stats() {
  const shown = stats.filter((s) => s.value !== null);
  if (shown.length === 0) return null;

  // Match the desktop column count to how many stats are actually shown, so a
  // set of 3 sits evenly rather than leaving a gap in a fixed 4-column grid.
  // (Full class strings, not interpolated, so Tailwind keeps them at build.)
  const cols =
    { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3" }[
      shown.length
    ] ?? "lg:grid-cols-4";

  return (
    <section aria-label="Career at a glance" className="border-y border-line bg-sand/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealGroup
          className={`grid grid-cols-2 gap-y-10 py-16 lg:py-20 ${cols}`}
        >
          {shown.map((stat) => (
            <RevealItem
              key={stat.label}
              className="border-l border-brass-soft pl-6 lg:pl-8"
            >
              <p className="tnum font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-none font-light text-fg">
                {stat.value}
              </p>
              <p className="mt-3 text-[0.68rem] tracking-[0.18em] text-fg-muted uppercase">
                {stat.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
