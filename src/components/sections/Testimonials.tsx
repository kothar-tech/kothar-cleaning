"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/content/placeholders";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkle } from "@/components/graphics/Sparkle";
import { cn } from "@/lib/cn";

export function Testimonials() {
  const track = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const arrow =
    "grid size-12 place-items-center rounded-full border-2 border-brand-600 bg-white text-brand-700 transition-[transform,background-color,color,opacity] hover:bg-brand-600 hover:text-white active:scale-90 disabled:pointer-events-none disabled:opacity-30";

  return (
    <section id="reviews" className="relative isolate overflow-hidden bg-tint py-24 lg:py-32">
      <Sparkle className="absolute -left-10 top-10 -z-10 size-56 text-white" />
      <Sparkle className="absolute -right-16 bottom-4 -z-10 size-72 text-white" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <SectionHeading title="What customers say" intro="Straight from the people we clean for." />
          </Reveal>
          <div className="hidden gap-3 sm:flex">
            <button type="button" onClick={() => scrollByCard(-1)} disabled={!canPrev} aria-label="Previous reviews" className={arrow}>
              <ChevronLeft size={22} strokeWidth={2.8} aria-hidden />
            </button>
            <button type="button" onClick={() => scrollByCard(1)} disabled={!canNext} aria-label="Next reviews" className={arrow}>
              <ChevronRight size={22} strokeWidth={2.8} aria-hidden />
            </button>
          </div>
        </div>

        <ul
          ref={track}
          tabIndex={0}
          aria-label="Customer reviews"
          className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory scroll-pl-4 gap-6 overflow-x-auto px-4 pb-8 sm:mx-0 sm:scroll-pl-0 sm:px-0"
        >
          {testimonials.map((t, i) => (
            <li
              key={`${t.role}-${i}`}
              className={cn("shrink-0 basis-[86%] snap-start sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]")}
            >
              <Reveal from="right" delay={i * 0.07} distance={44} className="h-full">
                <figure className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-card ring-1 ring-brand-100">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-accent-500 text-brand-950">
                      <Quote size={22} fill="currentColor" strokeWidth={0} aria-hidden />
                    </span>
                    <span className="flex gap-0.5 text-accent-500" role="img" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }, (_, s) => (
                        <Star key={s} size={18} fill="currentColor" strokeWidth={0} />
                      ))}
                    </span>
                  </div>
                  <blockquote className="mt-5 flex-1 text-[17px] leading-relaxed text-brand-900">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-100 pt-5">
                    <span className="grid size-11 place-items-center rounded-full bg-brand-600 font-display text-lg font-extrabold text-white">
                      {t.name.charAt(0)}
                    </span>
                    <span className="leading-tight">
                      <span className="block font-display text-[15px] font-bold text-brand-900">{t.name}</span>
                      <span className="text-sm text-brand-900/65">{t.role}</span>
                    </span>
                    <PlaceholderTag className="ml-auto" />
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
