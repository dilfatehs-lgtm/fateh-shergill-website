import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import ContactForm from "./ContactForm";
import { Reveal } from "./Reveal";

const telHref = `tel:${site.phone.replace(/[^+\d]/g, "")}`;

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-ink py-24 text-fg lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Intro + direct details */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[0.75rem] tracking-[0.18em] text-brass uppercase">
                Get in touch
              </p>
              <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] font-light text-fg">
                Let&rsquo;s talk
              </h2>
              <p className="mt-6 max-w-[52ch] text-fg-muted">
                Whether you&rsquo;re a few weeks or a few years out, I am here
                to listen.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-12 space-y-7">
                <li>
                  <a
                    href={telHref}
                    className="group flex cursor-pointer items-start gap-4"
                  >
                    <Phone
                      className="mt-1 size-5 shrink-0 text-brass"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-[0.62rem] tracking-[0.2em] text-fg-muted uppercase">
                        Phone
                      </span>
                      <span className="tnum mt-1 block text-lg text-fg transition-colors group-hover:text-brass">
                        {site.phoneDisplay}
                      </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="group flex cursor-pointer items-start gap-4"
                  >
                    <Mail
                      className="mt-1 size-5 shrink-0 text-brass"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className="min-w-0">
                      <span className="block text-[0.62rem] tracking-[0.2em] text-fg-muted uppercase">
                        Email
                      </span>
                      <span className="mt-1 block break-words text-lg text-fg transition-colors group-hover:text-brass">
                        {site.email}
                      </span>
                    </span>
                  </a>
                </li>

                <li className="flex items-start gap-4">
                  <MapPin
                    className="mt-1 size-5 shrink-0 text-brass"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-[0.62rem] tracking-[0.2em] text-fg-muted uppercase">
                      Office
                    </span>
                    <address className="mt-1 text-lg leading-relaxed text-fg not-italic">
                      {site.brokerage}
                      <span className="block text-base text-fg-muted">
                        {site.officeAddress.line1}
                        <br />
                        {site.officeAddress.city} {site.officeAddress.postal}
                      </span>
                    </address>
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal direction="left" delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
