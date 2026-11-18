"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { processSteps } from "@/content/site";
import { ServiceIcon } from "@/components/graphics/ServiceIcon";
import { Sparkle } from "@/components/graphics/Sparkle";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export function Process() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  // The orange rail fills as the visitor scrolls down the list
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 62%", "end 58%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const step = processSteps[active];

  return (
    <section id="process" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading
              title="Five steps on every single job"
              intro="Whether it is a bathroom or a whole building, the same routine keeps the result consistent and the products safe."
            />
          </Reveal>

          <Reveal delay={0.1} from="scale" className="mt-10 hidden lg:block">
            <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-600 text-white shadow-lift">
              <div className="relative h-56">
                <Image
                  src="/images/floor-suds.jpg"
                  alt="Gloved hands scrubbing a floor with soapy water"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-600 via-brand-600/30 to-transparent" />
                <Sparkle className="absolute right-6 top-6 size-9 animate-twinkle text-white" />
              </div>
              <div className="relative -mt-8 px-8 pb-8">
                <p className="font-display text-sm font-bold uppercase tracking-wider text-brand-200">
                  Step {active + 1} of {processSteps.length}
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="mt-1 font-display text-5xl font-extrabold">{step.title}</p>
                    <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-brand-50">{step.text}</p>
                  </motion.div>
                </AnimatePresence>
                <div className="mt-6 flex gap-2" aria-hidden>
                  {processSteps.map((s, i) => (
                    <span
                      key={s.title}
                      className={cn("h-1.5 flex-1 rounded-full transition-colors duration-300", i <= active ? "bg-accent-500" : "bg-white/25")}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative space-y-6 lg:space-y-10">
          <div aria-hidden className="absolute bottom-6 left-[1.35rem] top-6 w-1 rounded-full bg-brand-100">
            <motion.div style={{ scaleY: progress }} className="h-full origin-top rounded-full bg-accent-500 will-change-transform" />
          </div>

          {processSteps.map((s, i) => {
            const isActive = i === active;
            const isPast = i < active;
            return (
              <li
                key={s.title}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                data-index={i}
                className="relative pl-[4.5rem]"
              >
                <span
                  className={cn(
                    "absolute left-0 top-5 grid size-11 place-items-center rounded-full font-display text-lg font-extrabold ring-4 ring-white transition-[background-color,color,transform] duration-300",
                    isActive && "scale-110 bg-accent-500 text-brand-950",
                    isPast && "bg-brand-600 text-white",
                    !isActive && !isPast && "bg-brand-100 text-brand-700",
                  )}
                >
                  {i + 1}
                </span>
                <Reveal from="left" delay={0.05}>
                  <div
                    className={cn(
                      "group rounded-3xl p-6 transition-[background-color,box-shadow,transform,opacity] duration-300 sm:p-8",
                      isActive ? "bg-white opacity-100 shadow-lift ring-1 ring-brand-100 lg:translate-x-1.5" : "bg-mist opacity-100 lg:opacity-60",
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <ServiceIcon name={s.icon} tone={isActive ? "orange" : "blue"} size="md" />
                      <h3 className="text-2xl font-extrabold text-brand-900 sm:text-[1.75rem]">{s.title}</h3>
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-brand-900/80 sm:text-lg">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
