/**
 * SAMPLE CONTENT: every value in this file is a placeholder that is NOT confirmed by the client.
 *
 * Publishing invented ratings, customer counts, reviews or prices on a live business site can
 * mislead customers (and breach Australian consumer law). Replace each item, then delete its
 * `placeholder: true` flag. `npm run build` prints what is still outstanding;
 * run with STRICT_PLACEHOLDERS=1 to make the build fail until this file is clean.
 */
import type { ServiceId } from "./site";

export interface Placeholder {
  placeholder: true;
}

/** TODO(client): replace with a real rating or accreditation, or remove the badge. */
export const trustBadge: Placeholder & { label: string; rating: number } = {
  placeholder: true,
  label: "5-Star Rated & Inspected",
  rating: 5,
};

/** TODO(client): confirm the two sample numbers; the last two stats are true brochure facts. */
export const stats: Array<{
  value: number;
  suffix?: string;
  label: string;
  placeholder?: true;
}> = [
  {
    value: 500,
    suffix: "+",
    label: "Homes and offices cleaned",
  },
  { value: 99, suffix: "%", label: "Satisfaction rate" },
  { value: 12, label: "Cleaning services offered" },
  { value: 5, label: "Step process on every job" },
];

/** TODO(client): replace with real customer reviews (with permission), or remove the section. */
export const testimonials: Array<
  Placeholder & { quote: string; name: string; role: string }
> = [
  {
    placeholder: true,
    quote:
      "They turned up on time, worked through the checklist and the place was ready for the final inspection. Nothing to chase.",
    name: "Sample reviewer",
    role: "Tenant, end of lease",
  },
  {
    placeholder: true,
    quote:
      "Our office kitchen and bathrooms have never looked this good on a Monday morning. Simple to arrange and easy to deal with.",
    name: "Sample reviewer",
    role: "Office manager",
  },
  {
    placeholder: true,
    quote:
      "Careful, respectful and flexible with our schedule. It made a real difference to how comfortable the house feels.",
    name: "Sample reviewer",
    role: "Family of a support client",
  },
  {
    placeholder: true,
    quote:
      "The windows looked invisible and the carpet came up far better than I expected. I would book again.",
    name: "Sample reviewer",
    role: "Homeowner",
  },
];

/**
 * TODO(client): indicative rates in AUD for the estimator. These are NOT real Kothar prices.
 * The estimator always presents a range and tells visitors the final quote follows photos or a site visit.
 */
export const ratesArePlaceholder = true;

export type RateKey =
  | "base"
  | "perBedroom"
  | "perBathroom"
  | "perSqm"
  | "perRoom"
  | "perPane";

export const rates: Record<
  ServiceId,
  Partial<Record<RateKey, number>> & { base: number; recurring: boolean }
> = {
  "disability-home": {
    base: 70,
    perBedroom: 25,
    perBathroom: 35,
    recurring: true,
  },
  "end-of-lease": {
    base: 150,
    perBedroom: 60,
    perBathroom: 55,
    recurring: false,
  },
  office: { base: 70, perSqm: 1.1, recurring: true },
  commercial: { base: 90, perSqm: 1.4, recurring: true },
  carpet: { base: 55, perRoom: 48, recurring: false },
  glass: { base: 45, perPane: 9, recurring: false },
};

export const frequencyDiscount = {
  once: 0,
  weekly: 0.15,
  fortnightly: 0.1,
  monthly: 0.05,
} as const;

export const extras = {
  tileGrout: { label: "Tile & grout deep clean", price: 85 },
  pressure: { label: "High-pressure exterior clean", price: 140 },
  sanitise: { label: "Sanitisation & disinfection", price: 65 },
  rubbish: { label: "Rubbish removal (light waste)", price: 110 },
} as const;

/** Estimate range is the midpoint plus or minus this fraction. */
export const rangeSpread = 0.15;

/** TODO(client): suburbs or regions served. The footer and contact block hide this line while empty. */
export const serviceArea = "";
