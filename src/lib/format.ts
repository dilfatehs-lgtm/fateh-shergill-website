/** Locale-aware formatters — en-CA throughout, consistent across server and client. */

const cad = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

const monthYear = new Intl.DateTimeFormat("en-CA", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatPrice(price?: number): string {
  if (price === undefined) return "Price on request";
  return cad.format(price);
}

export function formatSoldDate(iso: string): string {
  // Parse as UTC so the label never shifts a month across timezones.
  return monthYear.format(new Date(`${iso}T00:00:00Z`));
}

export function formatSqft(sqft?: number): string | null {
  if (!sqft) return null;
  return `${new Intl.NumberFormat("en-CA").format(sqft)} sq ft`;
}
