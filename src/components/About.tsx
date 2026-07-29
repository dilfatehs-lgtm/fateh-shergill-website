import Image from "next/image";
import { site } from "@/data/site";
import { Reveal, HairlineReveal, RevealGroup, RevealItem } from "./Reveal";

/**
 * Set this to your headshot once you have one, e.g. "/fateh.jpg" in /public.
 * Until then the portrait frame renders the brand mark (/brand/mark.png) at
 * the same aspect ratio, so dropping the photo in causes no layout shift.
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
              <div
                className={`relative overflow-hidden bg-sand ${PORTRAIT_SRC ? "aspect-[4/5]" : "aspect-square"}`}
              >
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
                  <div className="flex h-full w-full items-center justify-center bg-canvas p-4">
                    <div className="relative h-full w-full">
                      <Image
                        src="/brand/mark.png"
                        alt={`${site.name} logo mark`}
                        fill
                        sizes="(max-width: 1024px) 60vw, 24vw"
                        className="object-contain"
                        priority={false}
                        unoptimized
                      />
                    </div>
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
                Here to help
              </h2>
            </Reveal>

            <HairlineReveal className="mt-8 w-40" />

            <Reveal delay={0.06}>
              <div className="mt-8 space-y-5 text-fg-muted [&>p]:max-w-[62ch]">
                <p>
                  I&rsquo;m {site.name}, a licensed
                  {site.creaMember ? " REALTOR®" : " real estate broker"} with{" "}
                  <span className="text-fg">{site.brokerage}</span> ({site.office}
                  ). Before real estate, I worked construction sites as a
                  teenager and I&rsquo;ve since worked alongside builders
                  bringing a number of new homes to this city.
                </p>
                <p>
                  That background is why I work well with a specific kind of
                  client: people sitting on a lot with development potential
                  who are ready to sell, developers looking for their next
                  acquisition to bring new homes to market, and buyers
                  interested in a multiplex unit. I understand the numbers and
                  the timelines from the building and the marketing side of
                  things.
                </p>
                <p>
                  I work closely with many people in the industry and forge
                  personal relationships with many I work with — which is
                  exactly the kind of relationship I want with everyone I take
                  on. I&rsquo;m fluent in English, Punjabi and Hindi, and happy
                  to work with you in whichever&rsquo;s easiest. Call me today
                  and we can chat about how I can help you with your real
                  estate goals.
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
