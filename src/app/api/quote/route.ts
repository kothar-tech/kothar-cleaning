import { serviceChoices } from "@/content/site";
import { quoteSchema } from "@/lib/validation";

/**
 * Quote requests from the contact form.
 *
 * Delivery uses Resend when RESEND_API_KEY and QUOTE_TO_EMAIL are set (optionally QUOTE_FROM_EMAIL).
 * Without them: in development the request is logged and reported as accepted; in production the route
 * answers 503 so the form can fall back to a pre-filled mailto link instead of claiming it was sent.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Best-effort limiter: per server instance only. Use an edge or KV limiter for stronger protection.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many requests. Please call us instead." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request" },
      { status: 400 },
    );
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] ??= issue.message;
    }
    // A filled honeypot means a bot: pretend it worked and drop it
    if ("website" in errors) return Response.json({ ok: true });
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[quote] Not emailed (no RESEND_API_KEY/QUOTE_TO_EMAIL set):",
        data,
      );
      return Response.json({ ok: true, delivered: false });
    }
    return Response.json({ ok: false, fallback: true }, { status: 503 });
  }

  const label =
    serviceChoices.find((s) => s.value === data.service)?.label ?? data.service;
  const methodLabel = {
    photos: "Will email photos or video",
    "site-visit": "Wants a site visit",
    call: "Wants a call back",
  }[data.method];
  const text = [
    "New quote request from the website",
    "",
    `Name: ${oneLine(data.name)}`,
    `Phone: ${oneLine(data.phone)}`,
    `Email: ${data.email}`,
    `Service: ${label}`,
    `Preference: ${methodLabel}`,
    ...(data.estimate ? [`Website estimate: ${oneLine(data.estimate)}`] : []),
    "",
    data.message || "(no message)",
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.QUOTE_FROM_EMAIL ??
        "Kothar Cleaning <quotes@kotharcleaning.com>",
      to: [to],
      reply_to: data.email,
      subject: `Quote request: ${label} (${oneLine(data.name)})`,
      text,
    }),
  });

  if (!response.ok) {
    console.error(
      "[quote] Resend rejected the email:",
      response.status,
      await response.text(),
    );
    return Response.json({ ok: false, fallback: true }, { status: 502 });
  }

  return Response.json({ ok: true, delivered: true });
}
