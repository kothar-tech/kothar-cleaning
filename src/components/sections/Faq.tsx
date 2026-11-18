"use client";

import { useState } from "react";
import { Phone, Plus } from "lucide-react";
import { faqs, site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-mist py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading title="Questions we hear a lot" intro="Quick answers about quotes, products and how a clean works." />
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-brand-100">
              <p className="font-display text-lg font-extrabold text-brand-900">Still not sure?</p>
              <p className="mt-1.5 text-[15px] text-brand-900/75">Call and we&rsquo;ll talk it through.</p>
              <div className="mt-4 flex flex-col gap-2.5">
                {site.phones.map((p) => (
                  <a
                    key={p.tel}
                    href={`tel:${p.tel}`}
                    className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-brand-600 px-5 font-display font-bold text-white transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-brand-700"
                  >
                    <Phone size={18} aria-hidden /> {p.display}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <ul className="space-y-3.5">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <Reveal delay={i * 0.04} distance={18}>
                  <div
                    className={cn(
                      "rounded-3xl bg-white ring-1 transition-shadow duration-300",
                      isOpen ? "shadow-card ring-brand-200" : "ring-brand-100 hover:shadow-card",
                    )}
                  >
                    <h3>
                      <button
                        type="button"
                        id={`faq-q-${i}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-a-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex min-h-16 w-full items-center justify-between gap-5 rounded-3xl px-6 py-4 text-left font-display text-[17px] font-bold text-brand-900 sm:text-lg"
                      >
                        {item.q}
                        <span
                          aria-hidden
                          className={cn(
                            "grid size-9 shrink-0 place-items-center rounded-full transition-[transform,background-color] duration-300",
                            isOpen ? "rotate-45 bg-accent-500 text-brand-950" : "bg-brand-100 text-brand-700",
                          )}
                        >
                          <Plus size={20} strokeWidth={2.8} />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-base leading-relaxed text-brand-900/80">{item.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
