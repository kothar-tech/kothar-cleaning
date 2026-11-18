import {
  extras,
  frequencyDiscount,
  rangeSpread,
  rates,
  type RateKey,
} from "@/content/placeholders";
import type { ServiceId } from "@/content/site";

export type Frequency = keyof typeof frequencyDiscount;
export type ExtraKey = keyof typeof extras;

export interface EstimateInput {
  service: ServiceId;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  rooms: number;
  panes: number;
  frequency: Frequency;
  extras: ExtraKey[];
}

export interface Estimate {
  low: number;
  high: number;
  mid: number;
}

export interface SizeField {
  key: "bedrooms" | "bathrooms" | "sqm" | "rooms" | "panes";
  label: string;
  hint?: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
}

const homeFields: SizeField[] = [
  { key: "bedrooms", label: "Bedrooms", min: 1, max: 8, step: 1 },
  { key: "bathrooms", label: "Bathrooms", min: 1, max: 6, step: 1 },
];

const areaField: SizeField = {
  key: "sqm",
  label: "Floor area",
  hint: "Roughly how big is the space?",
  min: 40,
  max: 1500,
  step: 10,
  unit: "m²",
};

/** Which size controls each service shows */
export const sizeFields: Record<ServiceId, SizeField[]> = {
  "disability-home": homeFields,
  "end-of-lease": homeFields,
  office: [areaField],
  commercial: [areaField],
  carpet: [{ key: "rooms", label: "Rooms to clean", min: 1, max: 12, step: 1 }],
  glass: [
    {
      key: "panes",
      label: "Windows and glass panels",
      hint: "Count each pane, door and mirror",
      min: 1,
      max: 60,
      step: 1,
    },
  ],
};

export const defaultInput: EstimateInput = {
  service: "disability-home",
  bedrooms: 3,
  bathrooms: 2,
  sqm: 200,
  rooms: 3,
  panes: 10,
  frequency: "fortnightly",
  extras: [],
};

export const isRecurring = (service: ServiceId) => rates[service].recurring;

const roundTo5 = (n: number) => Math.round(n / 5) * 5;

const unitKeys: Array<[RateKey, keyof EstimateInput]> = [
  ["perBedroom", "bedrooms"],
  ["perBathroom", "bathrooms"],
  ["perSqm", "sqm"],
  ["perRoom", "rooms"],
  ["perPane", "panes"],
];

export function estimate(input: EstimateInput): Estimate {
  const rate = rates[input.service];

  let clean = rate.base;
  for (const [rateKey, inputKey] of unitKeys) {
    const unitRate = rate[rateKey];
    if (unitRate) clean += unitRate * (input[inputKey] as number);
  }

  const discount = rate.recurring ? frequencyDiscount[input.frequency] : 0;
  const extrasTotal = input.extras.reduce((sum, key) => sum + extras[key].price, 0);
  const total = clean * (1 - discount) + extrasTotal;

  return {
    low: roundTo5(total * (1 - rangeSpread)),
    high: roundTo5(total * (1 + rangeSpread)),
    mid: roundTo5(total),
  };
}

export const frequencyLabels: Record<Frequency, string> = {
  once: "One-off",
  weekly: "Weekly",
  fortnightly: "Fortnightly",
  monthly: "Monthly",
};

/** Plain-language summary used to pre-fill the contact form */
export function summarise(input: EstimateInput, serviceTitle: string, range: Estimate): string {
  const parts: string[] = [serviceTitle];
  for (const field of sizeFields[input.service]) {
    parts.push(`${input[field.key]}${field.unit ? ` ${field.unit}` : ""} ${field.label.toLowerCase()}`);
  }
  if (isRecurring(input.service)) parts.push(frequencyLabels[input.frequency].toLowerCase());
  if (input.extras.length) parts.push(`plus ${input.extras.map((k) => extras[k].label.toLowerCase()).join(", ")}`);
  return `${parts.join(", ")}. Website estimate: $${range.low}-$${range.high} (indicative only).`;
}
