"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, Camera, Check, ChevronDown, Loader2, Mail, MapPin, Phone, PhoneCall, TriangleAlert, X } from "lucide-react";
import { quoteConsiderations, serviceChoices, site } from "@/content/site";
import { serviceArea } from "@/content/placeholders";
import { SparkleField } from "@/components/graphics/Sparkle";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QUOTE_PREFILL_EVENT } from "@/components/sections/QuoteEstimator";
import { validateAll, validateField, visibleFields, type QuoteField } from "@/lib/validation";
import { cn } from "@/lib/cn";

const initial = {
  name: "",
  phone: "",
  email: "",
  service: "",
  method: "photos",
  message: "",
  estimate: "",
  website: "",
};
type Values = typeof initial;
type Errors = Partial<Record<QuoteField, string>>;
type Status = "idle" | "submitting" | "success" | "fallback";

const methods = [
  { value: "photos", label: "I'll email photos or a video", icon: Camera },
  { value: "site-visit", label: "Arrange a site visit", icon: MapPin },
  { value: "call", label: "Call me back", icon: PhoneCall },
] as const;

const fieldLabels: Record<string, string> = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  service: "Service",
  method: "How to continue",
  message: "Message",
};

export function Contact() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<QuoteField, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [attempts, setAttempts] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<{ service: string; summary: string }>).detail;
      if (!detail) return;
      setValues((v) => ({ ...v, service: detail.service, estimate: detail.summary }));
      setErrors((err) => ({ ...err, service: undefined }));
      setStatus("idle");
    };
    window.addEventListener(QUOTE_PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(QUOTE_PREFILL_EVENT, onPrefill);
  }, []);

  const errorEntries = visibleFields.filter((f) => errors[f]).map((f) => [f, errors[f] as string] as const);

  // Move focus to the error summary after each failed submit so keyboard and screen reader users land on it
  useEffect(() => {
    if (attempts > 0 && errorEntries.length > 0) summaryRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempts]);

  const update = <K extends keyof Values>(field: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (touched[field as QuoteField]) setErrors((e) => ({ ...e, [field]: validateField(field as QuoteField, value) }));
  };

  const blur = (field: QuoteField) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validateField(field, values[field as keyof Values]) }));
  };

  const valid = (field: QuoteField) => Boolean(touched[field]) && !errors[field] && String(values[field as keyof Values]).length > 0;

  const mailto = () => {
    const label = serviceChoices.find((s) => s.value === values.service)?.label ?? values.service;
    const body = [
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email}`,
      `Service: ${label}`,
      ...(values.estimate ? [`Estimate from website: ${values.estimate}`] : []),
      "",
      values.message,
    ].join("\n");
    return `mailto:${site.email}?subject=${encodeURIComponent("Quote request")}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validateAll(values);
    setErrors(found);
    setTouched(Object.fromEntries(visibleFields.map((f) => [f, true])));
    if (Object.keys(found).length > 0) {
      setAttempts((n) => n + 1);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      const data = (await res.json().catch(() => null)) as { errors?: Errors } | null;
      if (res.status === 422 && data?.errors) {
        setErrors(data.errors);
        setAttempts((n) => n + 1);
        setStatus("idle");
        return;
      }
      setStatus("fallback");
    } catch {
      setStatus("fallback");
    }
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-brand-600 pb-32 pt-28 text-white lg:pb-44 lg:pt-36">
      <WaveDivider fill="text-mist" flip className="absolute inset-x-0 top-0" />
      <SparkleField count={9} seed={5} xMin={46} className="-z-10 max-lg:hidden" />
      <SparkleField count={4} seed={14} yMin={1} yMax={5} className="-z-10" />
      <svg aria-hidden viewBox="0 0 900 500" className="pointer-events-none absolute -bottom-28 -right-48 -z-10 w-[820px] max-w-none" fill="none">
        <path d="M20 430C60 230 330 70 700 60C430 130 250 260 290 380C320 460 480 470 880 330C640 500 160 560 20 430Z" fill="white" fillOpacity="0.09" />
      </svg>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <div>
          <Reveal>
            <SectionHeading
              light
              title="Tell us about the space"
              intro="Photos or a short video of the bathrooms, kitchens, floors, windows and carpet let us quote accurately. Or just call; we're happy to talk it through."
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-9">
            <ul className="grid gap-3.5">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a
                    href={`tel:${p.tel}`}
                    className="group flex items-center gap-4 rounded-2xl bg-white p-3.5 pr-6 text-brand-900 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <span className="grid size-12 place-items-center rounded-xl bg-accent-500 text-brand-950 transition-transform group-hover:scale-110">
                      <Phone size={22} strokeWidth={2.4} aria-hidden />
                    </span>
                    <span className="font-display text-xl font-extrabold">{p.display}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-4 rounded-2xl bg-white p-3.5 pr-6 text-brand-900 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-500 text-brand-950 transition-transform group-hover:scale-110">
                    <Mail size={22} strokeWidth={2.4} aria-hidden />
                  </span>
                  <span className="break-all font-display text-base font-extrabold sm:text-lg">{site.email}</span>
                </a>
              </li>
              {serviceArea && (
                <li className="flex items-center gap-4 rounded-2xl bg-white/10 p-3.5 pr-6">
                  <span className="grid size-12 place-items-center rounded-xl bg-white/15 text-accent-400">
                    <MapPin size={22} aria-hidden />
                  </span>
                  <span className="font-semibold">{serviceArea}</span>
                </li>
              )}
            </ul>
          </Reveal>

          <Reveal delay={0.18} className="mt-9">
            <h3 className="font-display text-lg font-extrabold">Handy to include</h3>
            <ul className="mt-4 space-y-2.5">
              {quoteConsiderations.slice(0, 5).map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-brand-50">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-500 text-brand-950">
                    <Check size={12} strokeWidth={3.5} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal from="left" delay={0.08}>
          <div className="relative rounded-[2rem] bg-white p-6 text-brand-900 shadow-lift sm:p-9">
            {status === "success" && (
              <div className="py-8 text-center" role="status">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-500 text-white shadow-card"
                >
                  <Check size={42} strokeWidth={3.2} aria-hidden />
                </motion.span>
                <h3 className="mt-6 text-3xl font-extrabold">Thanks{values.name ? `, ${values.name.split(" ")[0]}` : ""}</h3>
                <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-brand-900/75">
                  Your request is in. We&rsquo;ll get back to you on {values.phone || "the number you gave us"}. If it&rsquo;s urgent, call{" "}
                  <a href={`tel:${site.phones[0].tel}`} className="font-bold text-brand-600 underline">
                    {site.phones[0].display}
                  </a>
                  .
                </p>
                <Button onClick={reset} variant="outlineDark" className="mt-7">
                  Send another request
                </Button>
              </div>
            )}

            {status === "fallback" && (
              <div className="py-6 text-center" role="alert">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent-100 text-accent-700">
                  <TriangleAlert size={32} aria-hidden />
                </span>
                <h3 className="mt-5 text-2xl font-extrabold">We couldn&rsquo;t send that automatically</h3>
                <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-brand-900/75">
                  Nothing has been lost. Email us with your details already filled in, or give us a call.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Button href={mailto()} size="lg" className="w-full">
                    <Mail size={19} aria-hidden /> Email us
                  </Button>
                  <Button href={`tel:${site.phones[0].tel}`} variant="secondary" size="lg" className="w-full">
                    <Phone size={19} aria-hidden /> Call us
                  </Button>
                </div>
                <button type="button" onClick={() => setStatus("idle")} className="mt-5 text-sm font-semibold text-brand-600 underline">
                  Back to the form
                </button>
              </div>
            )}

            {(status === "idle" || status === "submitting") && (
              <form onSubmit={onSubmit} noValidate aria-label="Request a quote">
                <h3 className="text-2xl font-extrabold sm:text-3xl">Request your quote</h3>
                <p className="mt-1.5 text-[15px] text-brand-900/70">Takes about a minute. No obligation.</p>

                {errorEntries.length > 0 && (
                  <div
                    ref={summaryRef}
                    role="alert"
                    tabIndex={-1}
                    aria-labelledby="form-error-title"
                    className="mt-6 rounded-2xl border-2 border-red-500 bg-red-50 p-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/30"
                  >
                    <p id="form-error-title" className="flex items-center gap-2 font-display text-base font-extrabold text-red-800">
                      <TriangleAlert size={19} aria-hidden /> Please fix {errorEntries.length === 1 ? "this" : `these ${errorEntries.length} things`}
                    </p>
                    <ul className="mt-2 space-y-1 text-sm font-semibold">
                      {errorEntries.map(([field, message]) => (
                        <li key={field}>
                          <a
                            href={`#${field}`}
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById(field)?.focus();
                            }}
                            className="text-red-800 underline"
                          >
                            {fieldLabels[field]}: {message}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {values.estimate && (
                  <div className="mt-6 flex items-start gap-3 rounded-2xl bg-accent-100 p-4 text-sm">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent-500 text-brand-950">
                      <Check size={14} strokeWidth={3.4} aria-hidden />
                    </span>
                    <p className="flex-1 leading-relaxed">
                      <span className="font-display font-bold">Your estimate is attached.</span> {values.estimate}
                    </p>
                    <button
                      type="button"
                      onClick={() => update("estimate", "")}
                      aria-label="Remove attached estimate"
                      className="grid size-8 shrink-0 place-items-center rounded-full text-brand-900 hover:bg-white/70"
                    >
                      <X size={18} aria-hidden />
                    </button>
                  </div>
                )}

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Name" error={errors.name} valid={valid("name")}>
                    {(c) => (
                      <input
                        {...c}
                        type="text"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={values.name}
                        onChange={(e) => update("name", e.target.value)}
                        onBlur={() => blur("name")}
                      />
                    )}
                  </Field>
                  <Field id="phone" label="Phone" error={errors.phone} valid={valid("phone")}>
                    {(c) => (
                      <input
                        {...c}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="0421 466 057"
                        value={values.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        onBlur={() => blur("phone")}
                      />
                    )}
                  </Field>
                  <Field id="email" label="Email" error={errors.email} valid={valid("email")}>
                    {(c) => (
                      <input
                        {...c}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={(e) => update("email", e.target.value)}
                        onBlur={() => blur("email")}
                      />
                    )}
                  </Field>
                  <Field id="service" label="Service" error={errors.service}>
                    {({ className, ...c }) => (
                      <>
                        <select
                          {...c}
                          className={cn(className, "appearance-none pr-11", values.service === "" && "text-brand-900/45")}
                          value={values.service}
                          onChange={(e) => update("service", e.target.value)}
                          onBlur={() => blur("service")}
                        >
                          <option value="" disabled>
                            Choose a service
                          </option>
                          {serviceChoices.map((s) => (
                            <option key={s.value} value={s.value} className="text-brand-900">
                              {s.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown aria-hidden size={20} className="pointer-events-none absolute right-3.5 top-3.5 text-brand-700" />
                      </>
                    )}
                  </Field>
                </div>

                <fieldset className="mt-6">
                  <legend className="mb-2 font-display text-sm font-bold">How would you like to continue?</legend>
                  <div className="grid gap-2.5 sm:grid-cols-3">
                    {methods.map(({ value, label, icon: Icon }) => (
                      <label
                        key={value}
                        className="group relative flex min-h-[4.25rem] cursor-pointer items-center gap-3 rounded-2xl border-2 border-brand-200 bg-white p-3.5 text-sm font-semibold leading-tight transition-[border-color,background-color,transform] duration-200 hover:border-brand-300 active:scale-[0.98] has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent-500/50"
                      >
                        <input
                          type="radio"
                          name="method"
                          value={value}
                          checked={values.method === value}
                          onChange={() => update("method", value)}
                          className="sr-only"
                        />
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700 transition-colors group-has-[:checked]:bg-brand-600 group-has-[:checked]:text-white">
                          <Icon size={18} aria-hidden />
                        </span>
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <Field
                  id="message"
                  label="Anything we should know?"
                  optional
                  error={errors.message}
                  hint="Rooms, bathrooms, floor types, heavily soiled areas, access or preferred times."
                  className="mt-6"
                >
                  {(c) => (
                    <textarea
                      {...c}
                      rows={4}
                      placeholder="Tell us a little about the space"
                      value={values.message}
                      onChange={(e) => update("message", e.target.value)}
                      onBlur={() => blur("message")}
                      className={cn(c.className, "resize-y")}
                    />
                  )}
                </Field>

                {/* Honeypot: hidden from people, tempting to bots */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={(e) => update("website", e.target.value)}
                    />
                  </label>
                </div>

                <Button type="submit" size="lg" className="mt-7 w-full" disabled={status === "submitting"}>
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={20} className="animate-spin" aria-hidden /> Sending&hellip;
                    </>
                  ) : (
                    <>
                      Send my request <ArrowRight size={20} aria-hidden />
                    </>
                  )}
                </Button>
                <p className="mt-4 text-center text-sm text-brand-900/65">
                  Prefer to talk? Call{" "}
                  <a href={`tel:${site.phones[0].tel}`} className="font-bold text-brand-600 underline">
                    {site.phones[0].display}
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
