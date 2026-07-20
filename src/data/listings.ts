/**
 * ---------------------------------------------------------------------------
 * LISTINGS — this is the only file you edit to update your portfolio.
 * ---------------------------------------------------------------------------
 *
 * Nine sales — six seller-side (`listings pdfs/`) and three buyer-side
 * (`listings pdfs/buyer side/`) — extracted from the MLS® agent full reports
 * on 2026-07-20. Figures are transcribed verbatim; nothing was estimated.
 *
 * ⚠️  DELIBERATELY NOT PUBLISHED from those reports — they are agent-only
 *     documents and contain material that must never appear on a public site:
 *       • commission structure
 *       • owner / vendor name
 *       • REALTOR® remarks (agent-to-agent notes)
 *       • showing instructions and lockbox details
 *
 * ⚠️  COMPLIANCE — READ BEFORE CHANGING ANYTHING
 *
 *  • SOLD PRICE — GVR's Rules of Cooperation do not let you advertise a sale
 *    price without the consent of BOTH the seller and the buyer. Every entry
 *    below therefore carries `priceConsent: false` and the card shows "Sold"
 *    instead of a number. The prices ARE recorded here so they're ready to
 *    publish the moment you have consent — flip the flag per listing and note
 *    where the consent is filed in `consentNote`.
 *
 *  • SIDE — the first six are `side: "listing"` (you acted for the seller;
 *    each report names you as showing contact with the same developer as
 *    vendor). The last three are `side: "buyer"` — the buyer reports name
 *    "Buyer's Agent 1: Fateh Shergill / Sutton Group-West Coast Realty" and
 *    a different Listing Brokerage, credited in `listedBy`. Correct any that
 *    are wrong; misstating which side you acted on is misleading advertising
 *    under RESA s.41.
 *
 *  • SOLD DATE — for seller sales this is the MLS® Sold Date. For the three
 *    buyer purchases it's the Seller's-Acceptance date (when the deal went
 *    firm), which is the closest equivalent. If you'd rather show the
 *    completion/possession date, those are noted per entry — swap them in.
 *
 *  • ACCURACY — RESA s.41 prohibits advertising a licensee knows or ought to
 *    know is false or misleading. Any `note` you add is a factual claim.
 *
 * Your managing broker should sign off on this file before launch.
 * See COMPLIANCE.md for the full picture.
 */

import { site } from "./site";

export type ListingSide = "listing" | "buyer";

export type PropertyType =
  | "Detached"
  | "Townhouse"
  | "Condo"
  | "Duplex"
  | "Land";

export interface Listing {
  id: string;
  /** URL segment for the detail page: /listings/<slug> */
  slug: string;
  address: string;
  neighbourhood: string;
  city: string;
  /** Only rendered when `priceConsent` is true. */
  price?: number;
  /** Asking price at time of sale. Same consent rules apply. */
  listPrice?: number;
  /**
   * Set true ONLY when you hold consent from both seller and buyer to
   * publish the sale price, and the sale is publicly registered.
   */
  priceConsent?: boolean;
  /** Private reminder to yourself — never rendered. */
  consentNote?: string;
  /** ISO date */
  soldDate: string;
  beds: number;
  /** Total bath count, shown on cards. */
  baths: number;
  fullBaths?: number;
  halfBaths?: number;
  sqft?: number;
  yearBuilt?: number;
  /** MLS® number. Shown on the detail page as a reference. */
  mls?: string;
  propertyType: PropertyType;
  side: ListingSide;
  /** REQUIRED for buyer-side entries — the Listing Brokerage's name. */
  listedBy?: string;
  /** Card/hero image. Photos are supplied separately. */
  image?: string;
  /** Gallery images for the detail page. */
  gallery?: string[];
  /** One short, substantiable line shown on the card. */
  note?: string;
  /** Longer description for the detail page. Yours to write. */
  description?: string;
  featured?: boolean;
}

const rawListings: Listing[] = [
  {
    id: "670-e-52",
    slug: "670-e-52nd-avenue",
    address: "670 E 52nd Avenue",
    neighbourhood: "South Vancouver",
    city: "Vancouver",
    price: 1460000,
    listPrice: 1498000,
    priceConsent: false,
    soldDate: "2023-11-19",
    beds: 5,
    baths: 4,
    fullBaths: 3,
    halfBaths: 1,
    sqft: 1442,
    yearBuilt: 2023,
    mls: "R2758774",
    propertyType: "Duplex",
    side: "listing",
    featured: true,
  },
  {
    id: "672-e-52",
    slug: "672-e-52nd-avenue",
    address: "672 E 52nd Avenue",
    neighbourhood: "South Vancouver",
    city: "Vancouver",
    price: 1534000,
    listPrice: 1598000,
    priceConsent: false,
    soldDate: "2023-06-07",
    beds: 5,
    baths: 4,
    fullBaths: 3,
    halfBaths: 1,
    sqft: 1430,
    yearBuilt: 2023,
    mls: "R2758672",
    propertyType: "Duplex",
    side: "listing",
  },
  {
    id: "2646-e-56",
    slug: "2646-e-56th-avenue",
    address: "2646 E 56th Avenue",
    neighbourhood: "Fraserview",
    city: "Vancouver",
    price: 2018000,
    listPrice: 2125000,
    priceConsent: false,
    soldDate: "2023-06-28",
    beds: 4,
    baths: 4,
    fullBaths: 3,
    halfBaths: 1,
    sqft: 2064,
    yearBuilt: 2023,
    mls: "R2763744",
    propertyType: "Duplex",
    side: "listing",
    featured: true,
  },
  {
    id: "2648-e-56",
    slug: "2648-e-56th-avenue",
    address: "2648 E 56th Avenue",
    neighbourhood: "Fraserview",
    city: "Vancouver",
    price: 2018000,
    listPrice: 2125000,
    priceConsent: false,
    soldDate: "2023-07-29",
    beds: 4,
    baths: 4,
    fullBaths: 3,
    halfBaths: 1,
    sqft: 2046,
    yearBuilt: 2023,
    mls: "R2763750",
    propertyType: "Duplex",
    side: "listing",
  },
  {
    id: "1748-e-15",
    slug: "1748-e-15th-avenue",
    address: "1748 E 15th Avenue",
    neighbourhood: "Grandview-Woodland",
    city: "Vancouver",
    price: 1607500,
    listPrice: 1648800,
    priceConsent: false,
    soldDate: "2023-04-17",
    beds: 3,
    baths: 4,
    fullBaths: 3,
    halfBaths: 1,
    sqft: 1596,
    yearBuilt: 2022,
    mls: "R2752956",
    propertyType: "Duplex",
    side: "listing",
  },
  {
    id: "1750-e-15",
    slug: "1750-e-15th-avenue",
    address: "1750 E 15th Avenue",
    neighbourhood: "Grandview-Woodland",
    city: "Vancouver",
    price: 1552380,
    listPrice: 1698800,
    priceConsent: false,
    soldDate: "2022-08-09",
    beds: 3,
    baths: 4,
    fullBaths: 3,
    halfBaths: 1,
    sqft: 1533,
    yearBuilt: 2022,
    mls: "R2666462",
    propertyType: "Duplex",
    side: "listing",
  },

  // ─── BUYER REPRESENTED ────────────────────────────────────────────────────
  // Each buyer report names "Buyer's Agent 1: Fateh Shergill / Sutton Group–
  // West Coast Realty" and a separate Listing Brokerage, credited in `listedBy`.
  {
    id: "2133-w-57",
    slug: "2133-w-57th-avenue",
    address: "2133 W 57th Avenue",
    neighbourhood: "S.W. Marine",
    city: "Vancouver",
    price: 3600000,
    listPrice: 3398000,
    priceConsent: false,
    // Seller's-Acceptance date. Completion was 2025-02-03.
    soldDate: "2024-10-04",
    beds: 4,
    baths: 3,
    fullBaths: 3,
    halfBaths: 0,
    sqft: 2464,
    yearBuilt: 1949,
    mls: "R2925947",
    propertyType: "Detached",
    side: "buyer",
    listedBy: "Macdonald Realty",
    featured: true,
  },
  {
    id: "7247-inverness",
    slug: "7247-inverness-street",
    address: "7247 Inverness Street",
    neighbourhood: "South Vancouver",
    city: "Vancouver",
    price: 1920000,
    listPrice: 1950000,
    priceConsent: false,
    // Seller's-Acceptance date. Completion was 2024-11-04.
    soldDate: "2024-07-23",
    beds: 6,
    baths: 4,
    fullBaths: 3,
    halfBaths: 1,
    sqft: 2450,
    yearBuilt: 1967,
    mls: "R2899593",
    propertyType: "Detached",
    side: "buyer",
    listedBy: "eXp Realty",
  },
  {
    id: "815-e-56",
    slug: "815-e-56th-avenue",
    address: "815 E 56th Avenue",
    neighbourhood: "South Vancouver",
    city: "Vancouver",
    price: 1625000,
    listPrice: 1680000,
    priceConsent: false,
    // Seller's-Acceptance date. Completion was 2023-11-07.
    soldDate: "2023-08-15",
    beds: 5,
    baths: 2,
    fullBaths: 2,
    halfBaths: 0,
    sqft: 2108,
    yearBuilt: 1962,
    mls: "R2804901",
    propertyType: "Detached",
    side: "buyer",
    listedBy: "Dexter Realty",
  },
];

/**
 * Compliance gate. A buyer-side entry with no Listing Brokerage credit is
 * withheld rather than published unattributed — the safe failure direction.
 */
export const listings: Listing[] = rawListings.filter((l) => {
  if (l.side === "buyer" && !l.listedBy?.trim()) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[compliance] Listing "${l.id}" (${l.address}) is buyer-side but has no ` +
          `\`listedBy\`. It is hidden until the Listing Brokerage is credited.`,
      );
    }
    return false;
  }
  return true;
});

export function getListing(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

/** True when a sale price may be shown for this listing. */
export function canShowPrice(listing: Listing): boolean {
  return listing.priceConsent === true && typeof listing.price === "number";
}

/** Whole years since `site.licensedSince` (YYYY-MM), computed at build time. */
function yearsLicensed(): number {
  const [y, m] = site.licensedSince.split("-").map(Number);
  const now = new Date();
  let years = now.getFullYear() - y;
  if (now.getMonth() + 1 < m) years -= 1; // haven't hit the anniversary yet
  return Math.max(0, years);
}

/**
 * Headline stats. These are advertising claims under RESA s.41, so they must
 * be substantiable from your transaction record.
 *
 * Values are derived from the nine sales in this file plus your licence date:
 *   • Homes Closed  = 9 (6 seller-side + 3 buyer-side). "Closed" not "Sold",
 *     because on the three buyer deals you represented the purchaser.
 *   • Total Volume  = sum of all nine sale prices = $17,334,880 → "$17M+"
 *     (an aggregate; it discloses no individual property's price, so it is
 *     not subject to the per-listing price-consent rule).
 *   • Years Licensed = computed from site.licensedSince, so it stays current.
 *
 * If you have done more deals than the nine here, update these to your full
 * record. Leave `value` as null to hide a stat entirely.
 */
export const stats: { value: string | null; label: string }[] = [
  { value: "9", label: "Homes Closed" },
  { value: "$17M+", label: "Total Volume" },
  { value: String(yearsLicensed()), label: "Years Licensed" },
];

/**
 * Client testimonials. Must be genuine, from real clients, published with
 * their permission. An empty array hides the whole section.
 */
export const testimonials: {
  quote: string;
  author: string;
  context: string;
}[] = [
  // TODO: replace with real, consented client quotes, or leave empty.
];
