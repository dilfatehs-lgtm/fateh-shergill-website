import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Ruler, MapPin, Building2 } from "lucide-react";
import { canShowPrice, isCommercial, type Listing } from "@/data/listings";
import { formatPrice, formatSoldDate, formatSqft } from "@/lib/format";

/**
 * A single transaction card.
 *
 * A plain element, not a motion component. The tab transition is owned by the
 * grid container in Portfolio; keeping cards free of their own layout/exit
 * animation is what stopped removed cards lingering as zombies when the tab
 * filter changed.
 *
 * Media area is a fixed 4:3 aspect-ratio box whether or not a photo exists,
 * so swapping placeholders for real photography causes zero layout shift.
 */
export default function ListingCard({ listing }: { listing: Listing }) {
  const sqft = formatSqft(listing.sqft);
  const cover = listing.photos?.[0];
  // Commercial (office/land) has no bed or bath count to show.
  const commercial = isCommercial(listing);

  return (
    <article
      /*
        On a dark page the card sits lighter than its background, so a drop
        shadow reads as nothing. Elevation comes from the border warming to
        brass and the fill lifting a step instead.
      */
      className="group relative flex flex-col overflow-hidden border border-line bg-surface transition-[border-color,background-color] duration-300 hover:border-brass/45 hover:bg-[#221d18] focus-within:border-brass/60"
    >
      {/* Media */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        {cover ? (
          <Image
            src={cover.src}
            alt={`${cover.alt} — ${listing.address}, ${listing.neighbourhood}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] motion-reduce:transform-none motion-reduce:transition-none"
          />
        ) : (
          /* Typographic tile — deliberate, not a broken-image placeholder */
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center"
            style={{
              background:
                "linear-gradient(135deg, #211c17 0%, #2a2219 52%, #1b1713 100%)",
            }}
          >
            <MapPin
              className="size-5 text-brass"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="font-display text-2xl leading-tight text-fg/85">
              {listing.neighbourhood}
            </span>
            <span className="text-[0.62rem] tracking-[0.2em] text-fg-muted uppercase">
              {listing.city}
            </span>
          </div>
        )}

        {/* Status chip — text label, never colour alone */}
        <span className="absolute top-4 left-4 border border-brass/30 bg-ink/75 px-3 py-1.5 text-[0.62rem] tracking-[0.16em] text-fg uppercase backdrop-blur-sm">
          {listing.side === "listing" ? "Sold" : "Buyer Represented"}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.68rem] tracking-[0.18em] text-brass-ink uppercase">
          {listing.neighbourhood} · {listing.city}
        </p>

        {/*
          The whole card is the click target, via a stretched overlay link.
          Doing it this way rather than wrapping the card keeps the layout
          animation intact and leaves one clean link in the accessibility
          tree instead of several competing ones.
        */}
        <h3 className="mt-2.5 font-display text-[1.6rem] leading-snug text-fg">
          <Link
            href={`/listings/${listing.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {listing.address}
            <span className="sr-only">
              {" "}
              — view details for this {listing.propertyType.toLowerCase()} in{" "}
              {listing.neighbourhood}
            </span>
          </Link>
        </h3>

        {/* Price appears only where consent to publish it is recorded. */}
        <p className="tnum mt-3 text-lg text-fg">
          {canShowPrice(listing) ? formatPrice(listing.price) : "Sold"}
        </p>

        {listing.note && (
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">
            {listing.note}
          </p>
        )}

        {/* Specs — commercial has no bed/bath counts, so show building type */}
        <dl className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-sm text-fg-muted">
          {commercial ? (
            <div className="flex items-center gap-1.5">
              <Building2
                className="size-4 text-brass"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <dt className="sr-only">Property type</dt>
              <dd>{listing.propertyType}</dd>
            </div>
          ) : (
            <>
              {listing.beds !== undefined && (
                <div className="flex items-center gap-1.5">
                  <BedDouble
                    className="size-4 text-brass"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <dt className="sr-only">Bedrooms</dt>
                  <dd className="tnum">{listing.beds}</dd>
                </div>
              )}
              {listing.baths !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Bath
                    className="size-4 text-brass"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <dt className="sr-only">Bathrooms</dt>
                  <dd className="tnum">{listing.baths}</dd>
                </div>
              )}
            </>
          )}
          {sqft && (
            <div className="flex items-center gap-1.5">
              <Ruler
                className="size-4 text-brass"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <dt className="sr-only">Interior size</dt>
              <dd className="tnum">{sqft}</dd>
            </div>
          )}
        </dl>

        <p className="mt-4 text-xs tracking-wide text-fg-muted">
          {listing.propertyType} · {formatSoldDate(listing.soldDate)}
        </p>

        {/* Cooperating-brokerage credit, required when advertising a sale
            on a property listed by another brokerage. */}
        {listing.listedBy && (
          <p className="mt-2 text-xs text-fg-muted/85">
            Listed by {listing.listedBy}
          </p>
        )}
      </div>
    </article>
  );
}
