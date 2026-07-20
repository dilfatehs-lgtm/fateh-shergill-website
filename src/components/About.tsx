import Image from "next/image";
import { site } from "@/data/site";
import { Reveal, HairlineReveal, RevealGroup, RevealItem } from "./Reveal";

/**
 * Set this to your headshot once you have one, e.g. "/fateh.jpg" in /public.
 * Until then the portrait frame renders a typographic monogram at the same
 * aspect ratio, so dropping the photo in causes no layout shift.
 */
const PORTRAIT_SRC: string | null = null; // TODO: "/fateh.jpg"

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Portrait */}
          <Reveal direction="right" className="lg:col-span-5">
            <div className="relative">
              {/* Brass frame offset — pure decoration, sits behind the portrait */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -left-4 hidden h-full w-full border border-brass-soft sm:block"
              />
              <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                {PORTRAIT_SRC ? (
                  <Image
                    src={PORTRAIT_SRC}
                    alt={`Portrait of ${site.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority={false}
                  />
                ) : (
                  <div
                    className="flex h-full w-full flex-col items-center justify-center gap-5"
                    style={{
                      background:
                        "linear-gradient(150deg, #221d17 0%, #2b2319 55%, #1a1613 100%)",
                    }}
                  >
                    <span className="font-display text-[clamp(4rem,12vw,7rem)] leading-none font-light text-fg/40">
                      FS
                    </span>
                    <span className="text-[0.62rem] tracking-[0.22em] text-fg-muted uppercase">
                      Portrait to come
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">About</p>
              <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] font-light">
                Straight answers, and the patience to get it right
              </h2>
            </Reveal>

            <HairlineReveal className="mt-8 w-40" />

            <Reveal delay={0.06}>
              {/* TODO: replace this copy with your own story — it currently
                  describes a generalist broker and should be specific to you. */}
              <div className="mt-8 space-y-5 text-fg-muted [&>p]:max-w-[62ch]">
                <p>
                  I&rsquo;m {site.name}, a licensed real estate broker
                  {site.creaMember && " and REALTOR®"} with{" "}
                  <span className="text-fg">{site.brokerage}</span> out of the{" "}
                  {site.office} in {site.city}. I work with a deliberately
                  small number of clients at a time, which means the person you
                  meet at the first showing is the same person negotiating your
                  contract and standing beside you at completion.
                </p>
                <p>
                  A home is rarely just a transaction. It&rsquo;s a school
                  catchment, a commute, a mortgage renewal five years out, and
                  often the largest single decision a family will make. My job
                  is to give you an honest read on all of it — including when
                  the right advice is to wait.
                </p>
              </div>
            </Reveal>

            {/* Areas served */}
            <Reveal delay={0.12}>
              <div className="mt-12">
                <p className="text-[0.68rem] tracking-[0.18em] text-fg-muted uppercase">
                  Areas Served
                </p>
                <RevealGroup as="ul" className="mt-5 flex flex-wrap gap-2.5">
                  {site.areas.map((area) => (
                    <RevealItem
                      as="li"
                      key={area}
                      className="border border-line bg-surface px-4 py-2 text-sm text-fg-muted"
                    >
                      {area}
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </Reveal>

            {site.languages.length > 0 && (
              <Reveal delay={0.16}>
                <p className="mt-8 text-sm text-fg-muted">
                  <span className="text-fg">Languages:</span>{" "}
                  {site.languages.join(", ")}
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
