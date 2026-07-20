import Link from "next/link";
import { site } from "@/data/site";

const socialLinks = [
  { key: "instagram", label: "Instagram", href: site.socials.instagram },
  { key: "linkedin", label: "LinkedIn", href: site.socials.linkedin },
  { key: "facebook", label: "Facebook", href: site.socials.facebook },
].filter((s) => s.href);

export default function Footer() {
  return (
    <footer className="border-t border-line-invert bg-ink text-fg-muted">
      <div
        className="mx-auto max-w-7xl px-6 py-14 lg:px-10"
        style={{ paddingBottom: "max(3.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex flex-col gap-10 border-b border-line-invert pb-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl text-fg">{site.name}</p>
            <p className="mt-2 text-sm">
              {site.role} · {site.brokerage}
            </p>
          </div>

          {socialLinks.length > 0 && (
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {socialLinks.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] cursor-pointer items-center text-sm transition-colors hover:text-brass"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/*
          Regulatory disclosure. RESA s.40(2) requires the brokerage's licensee
          name to appear prominently and legibly in all real estate
          advertising, and s.40(4) requires any office address shown to be the
          brokerage's. Both are satisfied here and in the site header.
        */}
        <div className="mt-8 space-y-3 text-xs leading-relaxed">
          <p>
            <span className="text-fg">{site.name}</span> is a licensed
            real estate broker in British Columbia
            {site.creaMember && " and a REALTOR®"}, licensed with{" "}
            <span className="text-fg">{site.brokerage}</span>,{" "}
            {site.office}
            {site.licence && ` · Licence ${site.licence}`}.
          </p>
          <address className="not-italic">
            {site.officeAddress.line1}, {site.officeAddress.city}{" "}
            {site.officeAddress.postal}
          </address>
          <p>
            This website is not intended to solicit properties already listed
            for sale, or buyers already under contract with another brokerage.
            Property details and completed transactions are shown for
            illustration of past work; past results do not guarantee future
            outcomes. All information is deemed reliable but is not guaranteed
            and should be independently verified.
          </p>
          {/*
            CREA trademark attribution. Required wherever the REALTOR® mark
            is displayed; rendered only when site.creaMember is true so the
            mark and its attribution can never appear without each other.
          */}
          {site.creaMember && (
            <p>
              The trademarks REALTOR®, REALTORS®, and the REALTOR® logo are
              controlled by The Canadian Real Estate Association (CREA) and
              identify real estate professionals who are members of CREA. Not
              every real estate agent is a REALTOR®.
            </p>
          )}

          <p>
            <Link
              href="/privacy"
              className="cursor-pointer underline underline-offset-4 transition-colors hover:text-brass"
            >
              Privacy Policy
            </Link>
          </p>
          <p className="pt-2">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
