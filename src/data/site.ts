/**
 * ---------------------------------------------------------------------------
 * SITE CONFIG — edit this file to update your details everywhere on the site.
 * ---------------------------------------------------------------------------
 * Anything marked TODO still needs your real value before launch.
 */

export const site = {
  name: "Fateh Shergill",
  role: "Real Estate Broker",
  brokerage: "Sutton Group–West Coast Realty",
  office: "Broadway Office",
  city: "Vancouver",
  province: "British Columbia",

  phone: "+1 (604) 322-6901",
  phoneDisplay: "604.322.6901",
  email: "dilfateh@hotmail.com",

  // TODO: confirm the Broadway office street address
  officeAddress: {
    line1: "301 – 1508 W Broadway",
    city: "Vancouver, BC",
    postal: "V6J 1W8",
  },

  licence: "191002",

  /**
   * When you were first licensed (YYYY-MM). Drives the "Years Licensed" stat,
   * computed at build time so it stays accurate every year instead of being a
   * hardcoded number that quietly goes stale.
   */
  licensedSince: "2022-03",

  /**
   * CREA membership. REALTOR® is a certification mark — only members may use
   * it, and any material displaying it must carry CREA's attribution
   * statement. This flag drives both together so they can never drift apart:
   * the footer statement renders if and only if this is true.
   * No PREC and no team, so no additional s.40(3)/s.40(5) naming applies.
   */
  creaMember: true,

  /**
   * Web3Forms access key. Free, no backend needed.
   * 1. Go to https://web3forms.com  2. Enter dilfateh@hotmail.com
   * 3. Paste the key you receive into .env.local as:
   *      NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here
   * Until this is set, the form shows a friendly "email me directly" fallback.
   */
  formAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",

  // TODO: add or remove as needed — empty strings are hidden automatically
  socials: {
    instagram: "",
    linkedin: "",
    facebook: "",
  },

  // Neighbourhoods you actively serve — shown in the About section
  areas: [
    "Vancouver West",
    "Vancouver East",
    "Burnaby",
    "Richmond",
    "Surrey",
    "New Westminster",
    "Coquitlam",
    "North Vancouver",
  ],

  languages: ["English", "Punjabi", "Hindi"], // TODO: confirm
} as const;

export type Site = typeof site;
