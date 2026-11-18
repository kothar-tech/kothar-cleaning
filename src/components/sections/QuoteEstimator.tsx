"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import { ArrowRight, Camera, Check, Minus, Plus } from "lucide-react";
import { coreServices, type ServiceId } from "@/content/site";
import { extras as extraCatalog, ratesArePlaceholder } from "@/content/placeholders";
import { ServiceIcon } from "@/components/graphics/ServiceIcon";
import { Sparkle } from "@/components/graphics/Sparkle";
import { Button } from "@/components/ui/Button";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SELECT_SERVICE_EVENT } from "@/components/ui/SelectServiceLink";
import {
  defaultInput,
  estimate,
  frequencyLabels,
  isRecurring,
  sizeFields,
  summarise,
  type EstimateInput,
  type ExtraKey,
  type Frequency,
  type SizeField,
} from "@/lib/pricing";
import { cn } from "@/lib/cn";

export const QUOTE_PREFILL_EVENT = "kothar:quote-prefill";

/** Tweens a dollar amount straight into the DOM node: no re-render per frame. */
function Money({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const previous = useRef(value);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const from = previous.current;
    previous.current = value;
    if (reduce || from === value) {
      node.textContent = `$${value.toLocaleString("en-AU")}`;
      return;
    }
    const controls = animate(from, value, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => {
        node.textContent = `$${Math.round(n).toLocaleString("en-AU")}`;
      },
    });
    return () => controls.stop();
  }, [value, reduce]);

  return (
    <span ref={ref} aria-hidden className={cn("tabular-nums", className)}>
      ${value.toLocaleString("en-AU")}
    </span>
  );
}

function Stepper({ field, value, onChange }: { field: SizeField; value: number; onChange: (n: number) => void }) {
  const dec = () => onChange(Math.max(field.min, value - field.step));
  const inc = () => onChange(Math.min(field.max, value + field.step));
  const btn =
    "grid size-12 place-items-center rounded-full border-2 border-brand-200 bg-white text-brand-700 transition-[transform,background-color,border-color] hover:border-brand-600 hover:bg-brand-50 active:scale-90 disabled:pointer-events-none disabled:opacity-35";
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-mist p-3 pl-5">
      <div>
        <p className="font-display text-[15px] font-bold text-brand-900">{field.label}</p>
        {field.hint && <p className="text-xs text-brand-900/65">{field.hint}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={dec} disabled={value <= field.min} aria-label={`Fewer ${field.label.toLowerCase()}`} className={btn}>
          <Minus size={18} strokeWidth={3} aria-hidden />
        </button>
        <span className="min-w-8 text-center font-display text-2xl font-extrabold tabular-nums text-brand-900" aria-live="polite">
          {value}
        </span>
        <button type="button" onClick={inc} disabled={value >= field.max} aria-label={`More ${field.label.toLowerCase()}`} className={btn}>
          <Plus size={18} strokeWidth={3} aria-hidden />
        </button>
      </div>
    </div>
  );
}

function AreaSlider({ field, value, onChange }: { field: SizeField; value: number; onChange: (n: number) => void }) {
  const pct = ((value - field.min) / (field.max - field.min)) * 100;
  return (
    <div className="rounded-2xl bg-mist p-5">
      <div className="flex items-end justify-between">
        <label htmlFor={`size-${field.key}`} className="font-display text-[15px] font-bold text-brand-900">
          {field.label}
          {field.hint && <span className="block text-xs font-normal text-brand-900/65">{field.hint}</span>}
        </label>
        <p className="font-display text-3xl font-extrabold tabular-nums text-brand-600">
          {value.toLocaleString("en-AU")}
          <span className="ml-1 text-base text-brand-900/60">{field.unit}</span>
        </p>
      </div>
      <input
        id={`size-${field.key}`}
        type="range"
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full accent-accent-500"
        style={{ background: `linear-gradient(to right, var(--color-brand-600) ${pct}%, var(--color-brand-100) ${pct}%)` }}
      />
    </div>
  );
}

function StepTitle({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h3 className="mb-4 flex items-center gap-3 font-display text-lg font-extrabold text-brand-900">
      <span className="grid size-8 place-items-center rounded-full bg-accent-500 text-sm font-extrabold text-brand-950">{n}</span>
      {children}
    </h3>
  );
}

export function QuoteEstimator() {
  const [input, setInput] = useState<EstimateInput>(defaultInput);
  const set = <K extends keyof EstimateInput>(key: K, value: EstimateInput[K]) => setInput((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<{ id: ServiceId }>).detail?.id;
      if (id) setInput((prev) => ({ ...prev, service: id }));
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  const service = coreServices.find((s) => s.id === input.service)!;
  const range = useMemo(() => estimate(input), [input]);
  const recurring = isRecurring(input.service);
  const fields = sizeFields[input.service];

  const toggleExtra = (key: ExtraKey) =>
    set("extras", input.extras.includes(key) ? input.extras.filter((k) => k !== key) : [...input.extras, key]);

  const requestQuote = () => {
    window.dispatchEvent(
      new CustomEvent(QUOTE_PREFILL_EVENT, {
        detail: { service: input.service, summary: summarise(input, service.title, range) },
      }),
    );
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const summaryLines = [
    service.title,
    ...fields.map((f) => `${input[f.key].toLocaleString("en-AU")}${f.unit ? ` ${f.unit}` : ""} ${f.label.toLowerCase()}`),
    recurring ? frequencyLabels[input.frequency] : "One-off job",
    ...input.extras.map((k) => extraCatalog[k].label),
  ];

  return (
    <section id="estimator" className="relative bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            title="Work out a ballpark price in a few taps"
            intro="Choose the service, the size and how often you need us. You'll see an indicative range straight away; the firm quote follows once we've seen your photos or visited."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-start gap-7 lg:grid-cols-[1.4fr_1fr]">
          <Reveal from="right">
            <div className="rounded-[2rem] bg-white p-5 shadow-card ring-1 ring-brand-100 sm:p-8">
              <fieldset>
                <legend className="sr-only">Service</legend>
                <StepTitle n={1}>What needs cleaning?</StepTitle>
                <div role="radiogroup" aria-label="Service" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {coreServices.map((s) => {
                    const selected = s.id === input.service;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => set("service", s.id)}
                        className={cn(
                          "group relative flex min-h-[5.5rem] flex-col items-start gap-2 rounded-2xl border-2 p-3.5 text-left transition-[transform,border-color,background-color,box-shadow] duration-200 active:scale-[0.97]",
                          selected ? "border-brand-600 bg-brand-50 shadow-card" : "border-brand-100 bg-white hover:border-brand-300 hover:bg-brand-50/60",
                        )}
                      >
                        <ServiceIcon name={s.icon} tone={selected ? "blue" : "orange"} size="sm" />
                        <span className="font-display text-[14px] font-bold leading-tight text-brand-900">{s.shortTitle}</span>
                        {selected && (
                          <span className="absolute right-2.5 top-2.5 grid size-5 place-items-center rounded-full bg-brand-600 text-white">
                            <Check size={12} strokeWidth={3.5} aria-hidden />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-9">
                <StepTitle n={2}>How big is it?</StepTitle>
                <div className="grid gap-3 sm:grid-cols-2">
                  {fields.map((f) =>
                    f.key === "sqm" ? (
                      <div key={f.key} className="sm:col-span-2">
                        <AreaSlider field={f} value={input[f.key]} onChange={(n) => set(f.key, n)} />
                      </div>
                    ) : (
                      <Stepper key={f.key} field={f} value={input[f.key]} onChange={(n) => set(f.key, n)} />
                    ),
                  )}
                </div>
              </div>

              <fieldset className="mt-9">
                <legend className="sr-only">Frequency</legend>
                <StepTitle n={3}>How often?</StepTitle>
                <div role="radiogroup" aria-label="Frequency" className="grid grid-cols-2 gap-2 rounded-2xl bg-mist p-1.5 sm:grid-cols-4">
                  {(Object.keys(frequencyLabels) as Frequency[]).map((f) => {
                    const selected = recurring ? input.frequency === f : f === "once";
                    return (
                      <button
                        key={f}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        disabled={!recurring}
                        onClick={() => set("frequency", f)}
                        className={cn(
                          "min-h-11 rounded-xl px-3 font-display text-sm font-bold transition-[background-color,color,box-shadow,transform] duration-200 active:scale-95",
                          selected ? "bg-brand-600 text-white shadow-card" : "text-brand-900 hover:bg-white",
                          !recurring && !selected && "cursor-not-allowed opacity-40 hover:bg-transparent",
                        )}
                      >
                        {frequencyLabels[f]}
                      </button>
                    );
                  })}
                </div>
                {!recurring && <p className="mt-2.5 text-sm text-brand-900/70">{service.shortTitle} jobs are quoted as a one-off visit.</p>}
              </fieldset>

              <fieldset className="mt-9">
                <legend className="sr-only">Extras</legend>
                <StepTitle n={4}>Anything extra?</StepTitle>
                <div className="flex flex-wrap gap-2.5">
                  {(Object.keys(extraCatalog) as ExtraKey[]).map((k) => {
                    const on = input.extras.includes(k);
                    return (
                      <button
                        key={k}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleExtra(k)}
                        className={cn(
                          "inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-4 text-sm font-semibold transition-[background-color,border-color,transform] duration-200 active:scale-95",
                          on ? "border-accent-500 bg-accent-500 text-brand-950" : "border-brand-200 bg-white text-brand-900 hover:border-accent-500",
                        )}
                      >
                        {on ? <Check size={16} strokeWidth={3} aria-hidden /> : <Plus size={16} strokeWidth={3} aria-hidden />}
                        {extraCatalog[k].label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          </Reveal>

          <Reveal from="left" delay={0.1} className="lg:sticky lg:top-28">
            <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-900 p-7 text-white shadow-lift sm:p-9">
              <Sparkle className="absolute -bottom-12 -right-12 -z-10 size-56 text-white/[0.06]" />
              <div className="flex items-center gap-2">
                <p className="font-display text-sm font-bold uppercase tracking-wider text-brand-200">Indicative estimate</p>
                {ratesArePlaceholder && <PlaceholderTag />}
              </div>

              <p className="mt-4 font-display text-5xl font-extrabold leading-none sm:text-[3.4rem]">
                <Money value={range.low} />
                <span className="px-1.5 text-accent-400">&ndash;</span>
                <Money value={range.high} />
              </p>
              <p className="mt-2 text-sm text-brand-200">{recurring ? "per visit" : "one-off job"}</p>
              <p className="sr-only" aria-live="polite" aria-atomic>
                Estimated price between ${range.low} and ${range.high}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-white/15 pt-6 text-[15px]">
                {summaryLines.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-500 text-brand-950">
                      <Check size={12} strokeWidth={3.5} aria-hidden />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>

              <p className="mt-6 rounded-2xl bg-white/10 p-4 text-sm leading-relaxed text-brand-100">
                This is a guide only. We confirm a firm price after seeing photos or videos of the space, or after a site visit.
              </p>

              <div className="mt-6 grid gap-3">
                <Button onClick={requestQuote} size="lg" className="w-full">
                  Request this quote <ArrowRight size={20} aria-hidden />
                </Button>
                <Button href="#quote" variant="outline" size="md" className="w-full">
                  <Camera size={18} aria-hidden /> How to send photos
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
