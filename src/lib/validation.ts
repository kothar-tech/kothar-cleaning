import { z } from "zod";
import { serviceChoices } from "@/content/site";

const serviceValues = serviceChoices.map((s) => s.value) as [string, ...string[]];

/** Australian landline or mobile, with optional +61 and spaces or dashes */
const AU_PHONE = /^(?:\+?61[ -]?|0)[2-478](?:[ -]?\d){8}$/;

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80, "That name is a bit long"),
  phone: z
    .string()
    .trim()
    .regex(AU_PHONE, "Enter an Australian phone number, like 0421 466 057"),
  email: z.email("Enter a valid email address, like name@example.com").max(120),
  service: z.enum(serviceValues, { error: "Choose the service you need" }),
  method: z.enum(["photos", "site-visit", "call"], { error: "Pick how you would like to continue" }),
  message: z.string().trim().max(1200, "Please keep this under 1,200 characters").default(""),
  estimate: z.string().max(500).default(""),
  /** Honeypot: real visitors never see or fill this */
  website: z.string().max(0).default(""),
});

export type QuoteValues = z.input<typeof quoteSchema>;
export type QuoteField = keyof typeof quoteSchema.shape;

export const visibleFields = ["name", "phone", "email", "service", "method", "message"] as const satisfies readonly QuoteField[];

export function validateField(field: QuoteField, value: unknown): string | undefined {
  const result = quoteSchema.shape[field].safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function validateAll(values: Record<string, unknown>) {
  const errors: Partial<Record<QuoteField, string>> = {};
  for (const field of visibleFields) {
    const message = validateField(field, values[field]);
    if (message) errors[field] = message;
  }
  return errors;
}
