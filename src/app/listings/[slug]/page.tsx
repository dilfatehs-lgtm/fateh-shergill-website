import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, BedDouble, Bath, Ruler, CalendarDays, Home, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal, HairlineReveal } from "@/components/Reveal";
import {
  listings,
  getListing,
  canShowPrice,
  type PropertyType,
} from "@/data/listings";
import { formatPrice, formatSoldDate, formatSqft } from "@/lib/format";
import { site } from "@/data/site";

/**
 * Natural noun for the auto-generated description, so it reads "a detached
 * home in…" rather than the ungrammatical "a detached in…".
 */
const propertyNoun: Record<PropertyType, string> = {
  Detached: "detached home",
  Duplex: "duplex",
  Condo: "condo",
  Townhouse: "townhouse",
  Land: "lot",
};

/** Prerender every listing at build time. */
export async function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) return { title: "Listing not found" };

  const title = `${listing.address} — ${listing.neighbourhood}`;
  const description = `${listing.propertyType} in ${listing.neighbourhood}, ${listing.city}. ${listing.beds} bed, ${listing.baths} bath${
    listing.sqft ? `, ${formatSqft(listing.sqft)}` : ""
  }. Sold ${formatSoldDate(listing.soldDate)}, represented by ${site.name}.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
  };
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();

  const sqft = formatSqft(listing.sqft);
  const showPrice = canShowPrice(listing);

  const facts = [
    { icon: BedDouble, label: "Bedrooms", value: String(listing.beds) },
    {
      icon: Bath,
      label: "Bathrooms",
      value:
        listing.fullBaths !== undefined && listing.halfBaths !== undefined
          ? `${listing.baths} (${listing.fullBaths} full, ${listing.halfBaths} half)`
          : String(listing.baths),
    },
    ...(sqft ? [{ icon: Ruler, label: "Interior", value: sqft }] : []),
    ...(listing.yearBuilt
      ? [{ icon: Home, label: "Year Built", value: String(listing.yearBuilt) }]
      : []),
    {
      icon: CalendarDays,
      label: "Sold",
      value: formatSoldDate(listing.soldDate),
    },
    { icon: MapPin, label: "Type", value: listing.propertyType },
  ];

  // Other listings to offer at the foot of the page
  const more = listings.filter((l) => l.slug !== listing.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-32 pb-24 lg:pt-40">
        <article className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal>
            <Link
              href="/#portfolio"
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
              All transactions
            </Link>
          </Reveal>

          {/* ── Title ─────────────────────────────────────────────── */}
          <Reveal delay={0.04}>
            <p className="eyebrow mt-10">
              {listing.neighbourhood} · {listing.city}
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.06] font-light">
              {listing.address}
            </h1>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="border border-brass/40 px-3 py-1.5 text-[0.62rem] tracking-[0.16em] text-fg uppercase">
                {listing.side === "listing" ? "Sold" : "Buyer Represented"}
              </span>
              {/* The status chip already reads "Sold" — only add a price line
                  when there's an actual figure to show. */}
              {showPrice && (
                <p className="tnum text-xl text-fg">
                  {formatPrice(listing.price)}
                </p>
              )}
              {listing.mls && (
                <p className="tnum text-sm text-fg-muted">
                  MLS® {listing.mls}
                </p>
              )}
            </div>
          </Reveal>

          <HairlineReveal className="mt-10 w-full max-w-md" />

          {/* ── Media ─────────────────────────────────────────────── */}
          <Reveal delay={0.06}>
            <div className="mt-12 aspect-[16/9] w-full overflow-hidden bg-sand">
              {listing.image ? (
                <div className="relative h-full w-full">
                  <Image
                    src={listing.image}
                    alt={`${listing.address}, ${listing.neighbourhood}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1152px"
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div
                  className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #211c17 0%, #2a2219 52%, #1b1713 100%)",
                  }}
                >
                  <MapPin
                    className="size-6 text-brass"
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                  <span className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-tight text-fg/85">
                    {listing.neighbourhood}
                  </span>
                  <span className="text-[0.62rem] tracking-[0.22em] text-fg-muted uppercase">
                    Photography to come
                  </span>
                </div>
              )}
            </div>
          </Reveal>

          {/* ── Facts + description ───────────────────────────────── */}
          <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal delay={0.04} className="lg:col-span-7">
              <h2 className="font-display text-3xl font-light">
                About this home
              </h2>
              {listing.description ? (
                <p className="mt-6 max-w-[62ch] text-fg-muted">
                  {listing.description}
                </p>
              ) : (
                <p className="mt-6 max-w-[62ch] text-fg-muted">
                  A {propertyNoun[listing.propertyType]} in{" "}
                  {listing.neighbourhood}
                  {listing.yearBuilt ? `, built in ${listing.yearBuilt}` : ""}.{" "}
                  {listing.beds} bedrooms and {listing.baths} bathrooms across{" "}
                  {sqft ?? "the main floors"}.{" "}
                  {listing.side === "listing"
                    ? "Listed and sold on behalf of the seller."
                    : "Purchased on behalf of the buyer."}
                </p>
              )}

              <p className="mt-6 text-sm text-fg-muted/80">
                {/* TODO: replace the paragraph above with your own description
                    of this property — what made it sell, who it suited. */}
                Interested in something similar?{" "}
                <Link
                  href="/#contact"
                  className="cursor-pointer text-brass-ink underline underline-offset-4 transition-colors hover:text-brass"
                >
                  Get in touch
                </Link>
                .
              </p>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-5">
              <h2 className="sr-only">Property details</h2>
              <dl className="divide-y divide-line border-y border-line">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-6 py-4"
                  >
                    <dt className="flex items-center gap-3 text-sm text-fg-muted">
                      <Icon
                        className="size-4 text-brass"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      {label}
                    </dt>
                    <dd className="tnum text-right text-sm text-fg">{value}</dd>
                  </div>
                ))}
              </dl>

              {listing.listedBy && (
                <p className="mt-5 text-xs text-fg-muted">
                  Listed by {listing.listedBy}
                </p>
              )}
            </Reveal>
          </div>

          {/* ── Disclosure ────────────────────────────────────────── */}
          <p className="mt-16 max-w-3xl border-t border-line pt-6 text-xs leading-relaxed text-fg-muted">
            {listing.side === "listing"
              ? "This property was listed and sold by me on behalf of the seller."
              : "I acted for the buyer on this purchase; the property was listed by another brokerage, credited above."}{" "}
            {showPrice
              ? "The sale price is published with the consent of the parties."
              : "The sale price is not published."}{" "}
            Details are shown for illustration of past work and were accurate at
            the time of sale. Past results do not guarantee future outcomes. All
            information is deemed reliable but is not guaranteed and should be
            independently verified.
          </p>

          {/* ── More work ─────────────────────────────────────────── */}
          {more.length > 0 && (
            <section className="mt-24 border-t border-line pt-14">
              <h2 className="font-display text-3xl font-light">Other work</h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                {more.map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={`/listings/${l.slug}`}
                      className="group flex min-h-[92px] cursor-pointer flex-col justify-center border border-line bg-surface p-5 transition-colors duration-300 hover:border-brass/45"
                    >
                      <span className="text-[0.62rem] tracking-[0.16em] text-brass-ink uppercase">
                        {l.neighbourhood}
                      </span>
                      <span className="mt-2 font-display text-xl leading-snug text-fg">
                        {l.address}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
