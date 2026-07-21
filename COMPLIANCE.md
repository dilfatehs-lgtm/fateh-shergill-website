# Advertising & Privacy Compliance

**This is a build checklist, not legal advice.** I am not a lawyer and cannot certify this site as compliant. Compliance turns on facts only you hold — what consents you've obtained, whether you have a PREC, whether you're on a team. Have your **managing broker review this document and the live site before launch**; under RESA the brokerage is accountable for its licensees' advertising.

Rules referenced: the [Real Estate Services Rules](https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/209_2021) (sections cited below), [BCFSA Advertising Guidelines](https://www.bcfsa.ca/industry-resources/real-estate-professional-resources/knowledge-base/guidelines/advertising-guidelines), Greater Vancouver REALTORS® Rules of Cooperation, [CREA's trademark rules](https://www.crea.ca/standards-programs/trademark-protection-competition/), BC's Personal Information Protection Act, and CASL.

---

## Built in

| Requirement | Source | How it's handled |
|---|---|---|
| Brokerage licensee name displayed prominently and legibly | RESA s.40(2) | Site header (every page) and footer |
| Licensee identified by licensee name | RESA s.40(3) | Header, hero, footer |
| Any office address shown must be the brokerage's | RESA s.40(4) | Footer address is the Broadway office — **verify the street address** |
| All ten sales were done under Sutton | confirmed by Fateh 2026-07-20 | He has never been with another brokerage, so no prior-brokerage attribution issue |
| Sale price not published without consent | GVR Rules of Cooperation | Price is hidden unless `priceConsent: true` is set on that listing. Default is off, so forgetting the flag withholds data rather than leaking it |
| Listing Brokerage credited when advertising a co-operative sale | GVR Rules of Cooperation | `listedBy` renders as "Listed by …" on buyer-side cards. Buyer-side entries **without** it are filtered out of the site entirely |
| No false or misleading advertising | RESA s.41 | Fabricated performance claims removed from placeholder data; `stats`, `note`, and `testimonials` all carry warnings in-file |
| Not soliciting other brokerages' clients | Industry standard | Footer disclosure + portfolio disclosure |
| Past results disclaimer | Industry standard | Footer + below the portfolio grid |
| Privacy policy published, privacy officer named | BC PIPA | `/privacy`, linked from footer and contact form |
| Purpose of collection disclosed before collecting | BC PIPA | Notice under the contact form, linking to the policy |
| Express opt-in for marketing email, never pre-checked | CASL s.6 | Separate unchecked checkbox; consent state and timestamp are sent with each submission so you have a record |
| Correct trademark usage | CREA | REALTOR® used sparingly with CREA's attribution statement; MLS® only as a listing-number reference. Neither appears in meta tags — see below |

---

## You must resolve before launch

### 1. Sale prices — the big one

Every price is currently hidden. Cards and detail pages read "Sold" instead of a number. **The real figures from all ten MLS® reports are recorded in `listings.ts`** and will appear the moment you set `priceConsent: true` on a listing — nothing needs re-entering.

Greater Vancouver REALTORS® rules do not permit advertising a sale price without consent from **both the seller and the buyer**, and not before the sale is publicly registered. To show a price, set `priceConsent: true` on that listing in `src/data/listings.ts` and note where the consent is filed in `consentNote`.

If getting consent for older transactions is impractical, the site reads perfectly well without prices — the portfolio still demonstrates neighbourhoods, property types, and volume of work. **That is the safer default and I'd suggest starting there.**

### 2. Buyer-represented listings — done

The three buyer purchases (2133 W 57th, 7247 Inverness, 815 E 56th) are credited to their Listing Brokerages — Macdonald Realty, eXp Realty, and Dexter Realty respectively — read from the buyer reports. Each report names you as Buyer's Agent under Sutton Group–West Coast Realty. Confirm your board requires nothing further before advertising involvement in a co-operative sale.

### 3. Imagery

The four 2023 new-build duplexes are shown with **architectural renderings**, not photographs. Alt text reads "Exterior rendering" and a disclosure line appears under each gallery, so nothing implies a photo of the completed home — presenting a rendering as a photograph would be misleading under RESA s.41. This is applied automatically wherever a listing's imagery is flagged as a rendering.

### 4. Source documents

The ten PDFs in `listings pdfs/` (including the commercial report for 7235 Fraser) are MLS® **agent full reports**. They contain material that must never be published: commission structure, vendor name, REALTOR® remarks, and showing instructions. Only public-facing facts were transcribed — address, neighbourhood, type, beds, baths, floor area, year built, MLS® number, and sale date. The published pages were checked against a leak list to confirm none of the agent-only fields made it through.

Keep the PDFs out of `public/` — anything in that folder is served to the open internet.

### 5. Questions I couldn't answer for you

- ~~**Personal Real Estate Corporation?**~~ **Resolved 2026-07-20: no PREC.** Fateh trades as an individual licensee, so RESA s.40(3) is satisfied by advertising under his licensee name alone — which the header, hero, and footer already do. Nothing further required. *If you incorporate a PREC later, this changes: the PREC's licensee name must then appear in advertising, and the site would need updating.*
- ~~**Part of a team?**~~ **Resolved 2026-07-20: not on a team.** RESA s.40(5) does not apply. *If you join or form one, the team name must appear in all advertising.*
- ~~**CREA member?**~~ **Resolved 2026-07-20: yes.** REALTOR® is now used in the About section and footer, with CREA's attribution statement in the footer. See "Trademark usage" below.
- ~~**Licence number**~~ **Resolved 2026-07-20: 191002**, now shown in the footer disclosure.

### 6. Copy you need to make true

The About section is written to be *plausible*, not to be *you*. The line about working with "a deliberately small number of clients at a time" is a claim about your service. Under RESA s.41 it needs to be accurate. Rewrite it in your own words.

Same for the four headline stats — they're advertising claims and must be substantiable from your transaction record.

### 7. Ongoing duties

- Listing information must be kept **current**. If you later add active listings, expired ones must come down promptly.
- You need the owner's consent before advertising any property that **is** offered for sale (RESA s.42). This matters the moment you add current listings — the present portfolio is past sales only.
- If you start sending market updates, every message needs sender identification and a working unsubscribe link.

---

## Trademark usage

You're a CREA member, so REALTOR® is used — but deliberately sparingly, in two places only: the About paragraph and the footer credential line. It is a certification mark, not a job title, and scattering it through the copy reads as branding rather than qualification.

Rules being followed:

- Always fully capitalised, always followed by ®.
- Never used in a business or trade name.
- **Never in meta tags.** CREA's policy explicitly covers page title, description, and keywords. The Next.js scaffold's default keywords contained "Vancouver realtor" — that's been removed.
- CREA's attribution statement appears in the footer: *"The trademarks REALTOR®, REALTORS®, and the REALTOR® logo are controlled by The Canadian Real Estate Association (CREA) and identify real estate professionals who are members of CREA. Not every real estate agent is a REALTOR®."*

The mark and its attribution are wired to a single flag, `creaMember` in `src/data/site.ts`. Set it to `false` and both disappear together — they can't drift apart. If your membership ever lapses, flip that one flag.

MLS® appears only on the listing detail pages, as a reference to the listing number ("MLS® R2763744") — capitalised, with ®, identifying a specific listing rather than standing in for "database". It is not used in any business name, headline, or meta tag.

## Note on IDX / MLS® feeds

This site has **no MLS® data feed** and pulls no board data — the portfolio is a hand-maintained file. That deliberately avoids the whole IDX/DDF compliance surface (data licensing, attribution, refresh frequency, trademark statements on data pages).

If you ever want live listings pulled from the board, that's a separate agreement with Greater Vancouver REALTORS® / CREA and brings its own display rules. Don't bolt it on without that authorization.
