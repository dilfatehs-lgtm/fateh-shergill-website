import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects personal information, in accordance with British Columbia's Personal Information Protection Act.`,
  robots: { index: true, follow: true },
};

/**
 * Privacy policy required by BC's Personal Information Protection Act (PIPA),
 * which obliges organizations to publish their practices and name a privacy
 * officer. This is a working draft written for this site's actual behaviour —
 * have your managing broker confirm it against your brokerage's own policy,
 * since the brokerage is typically the entity accountable for client records.
 */
export default function PrivacyPage() {
  const updated = "July 2026"; // TODO: bump when you revise this page

  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-32 pb-24 lg:pt-40">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] font-light">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-fg-muted">Last updated {updated}</p>

          <div className="hairline mt-10 mb-12" aria-hidden="true" />

          <div className="space-y-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-fg [&_p]:mt-3 [&_p]:text-fg-muted [&_li]:text-fg-muted">
            <section>
              <h2>Who this covers</h2>
              <p>
                This policy explains how {site.name}, a licensed real estate
                broker with {site.brokerage} ({site.office}), handles personal
                information collected through this website. It is written to
                meet British Columbia&rsquo;s Personal Information Protection
                Act (PIPA).
              </p>
              <p>
                Where you become a client, your personal information is also
                handled under {site.brokerage}&rsquo;s brokerage privacy policy
                and the record-keeping duties imposed on brokerages by the Real
                Estate Services Act. Ask for a copy at any time.
              </p>
            </section>

            <section>
              <h2>What this site collects</h2>
              <p>
                Only what you type into the contact form: your name, email
                address, an optional phone number, the nature of your enquiry,
                and your message.
              </p>
              <p>
                This site sets no advertising or tracking cookies and runs no
                third-party analytics. Your message is delivered by Web3Forms,
                a form-delivery service, and arrives in the email inbox listed
                below.
              </p>
            </section>

            <section>
              <h2>Why it is collected, and your consent</h2>
              <p>
                Your information is used for one purpose: to respond to the
                enquiry you sent. Submitting the form is your consent to be
                contacted about that enquiry.
              </p>
              <p>
                Marketing email — market updates, new listings — is separate.
                You will only receive it if you explicitly opt in, and every
                such message will identify the sender and carry a working
                unsubscribe link, as Canada&rsquo;s Anti-Spam Legislation
                (CASL) requires. You can withdraw consent at any time.
              </p>
            </section>

            <section>
              <h2>What is never done with it</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>It is not sold, rented, or traded.</li>
                <li>
                  It is not shared with third parties for their own marketing.
                </li>
                <li>
                  It is disclosed only where the law requires it, or where you
                  ask for a referral (to a mortgage broker, inspector, or
                  lawyer) and agree to the introduction.
                </li>
              </ul>
            </section>

            <section>
              <h2>How long it is kept</h2>
              <p>
                Enquiries that do not become a working relationship are kept
                only as long as needed to answer them and are then deleted.
                Where a transaction proceeds, records are retained for the
                period the Real Estate Services Act requires brokerages to keep
                them.
              </p>
            </section>

            <section>
              <h2>Your rights</h2>
              <p>
                Under PIPA you may ask what personal information is held about
                you, ask for a correction, or withdraw consent to further
                contact. Requests are answered within the statutory timeline.
              </p>
              <p>
                If a concern is not resolved to your satisfaction, you may
                contact the Office of the Information and Privacy Commissioner
                for British Columbia.
              </p>
            </section>

            <section>
              <h2>Privacy officer</h2>
              <p>
                Direct any privacy question or request to {site.name} at{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="cursor-pointer text-brass-ink underline underline-offset-4"
                >
                  {site.email}
                </a>
                , or by phone at {site.phoneDisplay}.
              </p>
            </section>
          </div>

          <div className="mt-16 border-t border-line pt-8">
            <Link
              href="/"
              className="inline-flex min-h-[48px] cursor-pointer items-center text-sm text-fg-muted transition-colors hover:text-fg"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
