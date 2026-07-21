# Fateh Shergill — Real Estate

Marketing site for Fateh Shergill, Real Estate Broker with Sutton Group–West Coast Realty (Broadway Office), Vancouver BC.

Next.js 16 · React 19 · Tailwind CSS v4 · TypeScript. Statically prerendered — deploys anywhere.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

### Testing on your phone

Open the **Network** URL that `npm run dev` prints on a device sharing your Wi-Fi. Always read the URL off that output rather than reusing an old one — your router hands out a new address periodically, and a stale IP just fails to connect.

Next.js blocks dev resources from other origins by default, which silently stops the JavaScript bundle loading on that device — the page renders but nothing interactive works. [next.config.ts](next.config.ts) handles this by reading your machine's current network interfaces at startup and allowing them, so it keeps working after a router reboot or a change of network. Nothing to maintain by hand.

This affects development only; production builds are unaffected.

---

## What you need to fill in

Everything you'll want to change lives in two files. Search for `TODO` to find every gap.

### 1. `src/data/site.ts` — your details

| Field | Status |
|---|---|
| `phone` / `phoneDisplay` | ✅ Set — 604.322.6901 |
| `officeAddress` | **Unverified** — confirm the Broadway office street address |
| `licence` | ✅ Set — 191002 |
| `socials` | **Empty** — Instagram / LinkedIn / Facebook. Blank entries hide themselves |
| `languages` | Assumed English, Punjabi, Hindi — confirm |
| `areas` | Edit to the neighbourhoods you actually serve |

### 2. `src/data/listings.ts` — your portfolio

Loaded with your ten real sales — seven seller-side (including one commercial office) and three buyer-side — transcribed from the MLS® agent reports in `listings pdfs/`. Each has its own page at `/listings/<slug>`, prerendered at build time and linked from its card.

**Sale prices are recorded but not displayed** — every entry carries `priceConsent: false`, so cards and detail pages read "Sold" instead of a number. Flip the flag per listing once you hold consent from both parties; the figures are already in place.

Deliberately excluded from the site, because the agent reports are agent-only documents: commission structure, vendor name, REALTOR® remarks, and showing instructions.

- `side: "listing"` → you represented the **seller** (shows under "Sold Listings")
- `side: "buyer"` → you represented the **buyer** (shows under "Buyer Represented", and requires `listedBy`)

Optional per listing: `note` (one line on the card), `description` (prose on the detail page), `featured: true`. Imagery is attached automatically from `src/data/photos.ts` by slug.

Also in this file:

- `stats` — three headline numbers, all derived: 10 Transactions Closed, $18M+ Total Volume, and Years Licensed (computed from `site.licensedSince`, so it never goes stale). Set `value: null` to hide one.
- `testimonials` — empty, so the section is hidden. Add real, attributed quotes and it appears automatically.

### 3. Photography

Six listings have imagery; four don't yet (2133 W 57th, 7247 Inverness, 815 E 56th, 7235 Fraser) and render a typographic neighbourhood tile instead — deliberate, not a broken image. The media box is a fixed aspect ratio either way, so adding photos causes **no layout shift**.

**To add more:** drop files into `listing photos/<folder>/` and re-run the optimiser, which de-duplicates, orders them (exterior first, floor plans last), resizes to 1920px and writes `public/listings/<slug>/` plus the manifest at `src/data/photos.ts`.

⚠️ **The 2023 duplexes (670, 672, 2646, 2648) have architectural renderings, not photographs.** Their alt text says so and a disclosure line appears under the gallery — required so the imagery isn't presented as photos of the finished home. If you get real photos, drop them in and the disclosure disappears automatically.

Your headshot: put it in `public/`, then set `PORTRAIT_SRC` at the top of `src/components/About.tsx`.

---

## Contact form — ACTIVE ✅

Wired to Web3Forms and tested end-to-end (2026-07-20). The access key lives in `.env.local` (gitignored). Submissions include name, email, phone, enquiry type, message, and marketing-consent state; a hidden honeypot filters basic bots.

**Delivery is set to `dilfateh@hotmail.com`** (recipient configured in the Web3Forms dashboard for this key), which matches the address shown on the site. The change is server-side on Web3Forms — the key in `.env.local` is unchanged.

**Web3Forms free plan only accepts browser (client-side) submissions** — server-side posts (curl, etc.) are rejected. That's fine; the form submits from the browser.

To change delivery later (e.g. to `fateh@fatehshergill.com`): create a new key for that address at [web3forms.com](https://web3forms.com), replace the value in `.env.local`, restart the dev server.

> ⚠️ **On deploy:** set `NEXT_PUBLIC_WEB3FORMS_KEY` in your host's env vars (Vercel/Netlify) — `.env.local` never leaves your machine, so without this the live form won't send.

---

## Compliance

Read **[COMPLIANCE.md](COMPLIANCE.md)** before you put real transactions on this site. Short version: sale prices are hidden by default and only appear where you record consent, and buyer-side listings are hidden until you credit the Listing Brokerage. Your managing broker should review the site before launch.

## Before launch

- [ ] Decide on sale-price consent (see COMPLIANCE.md)
- [ ] Confirm the Broadway office street address (phone and licence are set)
- [x] Web3Forms key added locally & tested — **still TODO: set it on the host at deploy**
- [ ] Set your real domain in `metadataBase` (`src/app/layout.tsx`)
- [ ] Add a headshot; photography for 2133 W 57th, 7247 Inverness, 815 E 56th, 7235 Fraser (and real photos for the 4 duplexes currently shown as renderings)
- [ ] Rewrite the About copy in `src/components/About.tsx` — it's written to be plausible, not to be *you*
- [ ] Work through [COMPLIANCE.md](COMPLIANCE.md): price consents and Listing Brokerage credits
- [ ] Have your managing broker review the live site and the privacy policy

---

## How the animations work

Worth understanding before you edit anything, because the design is deliberate.

**Content is visible by default.** Elements only start hidden once an inline script confirms JavaScript is alive (it adds `.js-reveal` to `<html>`). `RevealObserver` then adds `.is-visible` as each element scrolls in, and CSS does the animating.

**There's a watchdog behind that**, and it matters. The inline script also starts a 4-second timer that removes `.js-reveal` and shows everything un-animated. `RevealObserver` cancels the timer when it mounts. So if the JavaScript bundle never arrives — blocked, 404'd, a flaky connection, an old browser — the page unhides itself instead of staying blank.

This was found the hard way: testing on a phone over the LAN, Next.js dev-mode blocked the bundle, and whole sections sat invisible while still occupying height. Visible-but-static always beats invisible.

The hero is stronger still: it ships `is-visible` from the server and animates with pure CSS on first paint, with **zero** JavaScript. Above-the-fold content should never wait on a script.

Everything animates `opacity` and `transform` only — no layout, no cumulative layout shift. All motion respects `prefers-reduced-motion`, which disables movement entirely rather than merely shortening it.

To add a reveal anywhere: wrap it in `<Reveal>`, or put `data-reveal="up"` on any element.

## The hero skyline

[Skyline.tsx](src/components/Skyline.tsx) is a hand-drawn SVG of the Vancouver skyline — North Shore ridge, Lions Gate Bridge, Canada Place, Harbour Centre, the downtown cluster, Science World. It draws itself in on load.

**3.2 KB inline.** No network request, no loading state, no licence, and no other site has it.

Every stroke carries `pathLength="1"`, which normalises paths of wildly different lengths so a single CSS keyframe draws them all at the same rate. The `--d` custom property on each stagger group controls order — back layers first, so it reads as depth assembling rather than 28 lines appearing at once.

A mask fades the upper strokes, so the mountains dissolve into the dark instead of cutting hard lines across the headline. Under `prefers-reduced-motion` it arrives fully drawn — the global duration override isn't enough on its own there, because the per-path delays would still hold strokes invisible for over a second.

### If you'd rather have video

The skyline is a drop-in replacement for a video background, not a permanent decision. Both [Pexels](https://www.pexels.com/license/) and [Coverr](https://coverr.co/license) license Vancouver footage for commercial use at no cost. If you go that route it needs, at minimum: a poster frame so the hero isn't empty while it buffers, `muted` + `playsinline` + `autoplay` (iOS won't autoplay otherwise), a static image fallback under `prefers-reduced-motion`, and a hard look at the file size on cellular. Ask and I'll wire it up properly.

## Design tokens

Colours, type, and spacing are defined once in `src/app/globals.css` under `@theme` — change a value there and it updates everywhere.

The theme is **dark**: a warm near-black (`#12100d`) carrying warm off-white text and brass accents. The warmth is deliberate — a neutral black makes the brass look like a glowing accent instead of part of the same family.

Contrast is verified, not estimated: body text is 7.3:1, headings 16.3:1, and `--color-brass-ink` (8.4:1) is the text-safe brass, while `--color-brass` is reserved for rules and icons. A pass over all 156 text elements on the page returns zero WCAG AA failures.

Two values are load-bearing and shouldn't be darkened for tidiness:

- `--color-field-line` (`#665c50`) — form field fills are only 1.05:1 against the contact section, so this border is the only thing that makes an input findable. It's set to clear WCAG 1.4.11's 3:1.
- The hero's secondary button uses `border-brass/70`, not `--color-line`, because `--color-line` is 1.25:1 on the canvas — fine for dividers, too faint to read as a control.
