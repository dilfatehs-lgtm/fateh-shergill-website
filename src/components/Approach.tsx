import { ClipboardList, Handshake, LineChart } from "lucide-react";
import { Reveal, HairlineReveal, RevealGroup, RevealItem } from "./Reveal";
import { testimonials } from "@/data/listings";

const pillars = [
  {
    icon: LineChart,
    title: "Pricing grounded in evidence",
    body: "Every recommendation starts with recent comparables, active competition, and absorption rate for your specific block — not a round number that sounds good in a listing appointment.",
  },
  {
    icon: ClipboardList,
    title: "Preparation before exposure",
    body: "Photography, staging, timing, and disclosure sorted before a single buyer walks through. The first two weeks on market are the ones that set your final number.",
  },
  {
    icon: Handshake,
    title: "Negotiation without theatre",
    body: "Subject removal, bridge financing, tenanted properties, competing offers — handled calmly and in writing, so you always know exactly where you stand.",
  },
];

export default function Approach() {
  return (
    <section
      id="approach"
      className="scroll-mt-24 border-y border-line bg-sand/40 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow">Approach</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] font-light">
            How the work actually gets done
          </h2>
        </Reveal>

        <HairlineReveal className="mt-8 w-40" />

        <RevealGroup className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {pillars.map(({ icon: Icon, title, body }, i) => (
            <RevealItem key={title} className="flex flex-col">
              <span
                className="tnum text-[0.68rem] tracking-[0.2em] text-brass-ink"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <Icon
                className="mt-6 size-6 text-brass"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="mt-5 font-display text-2xl leading-snug text-fg">
                {title}
              </h3>
              <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-fg-muted">
                {body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Testimonials render only once real quotes exist in listings.ts */}
        {testimonials.length > 0 && (
          <div className="mt-24 border-t border-line pt-16">
            <RevealGroup className="grid gap-10 md:grid-cols-2 lg:gap-14">
              {testimonials.map((t) => (
                <RevealItem key={t.author}>
                  <figure>
                    <blockquote className="font-display text-[1.6rem] leading-snug font-light text-fg">
                      <span aria-hidden="true" className="text-brass">
                        &ldquo;
                      </span>
                      {t.quote}
                      <span aria-hidden="true" className="text-brass">
                        &rdquo;
                      </span>
                    </blockquote>
                    <figcaption className="mt-5 text-sm text-fg-muted">
                      <span className="text-fg">{t.author}</span> · {t.context}
                    </figcaption>
                  </figure>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        )}
      </div>
    </section>
  );
}
