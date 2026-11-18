"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { animate, useInView, useReducedMotion, type AnimationPlaybackControls } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
  /** Short caption shown in the corner, e.g. "Illustration" */
  caption?: string;
}

/**
 * Drag, tap or use the arrow keys to compare. A native range input sits over the image, so touch,
 * mouse and keyboard all work and screen readers announce it as a slider. Position lives in a CSS
 * variable: dragging moves the divider with transform and reveals the "before" photo with clip-path,
 * with no React re-renders and no layout work.
 */
export function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt, afterAlt, className, caption }: BeforeAfterSliderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hint = useRef<AnimationPlaybackControls | null>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const setPos = useCallback((value: number) => {
    wrapRef.current?.style.setProperty("--pos", `${value}%`);
    if (inputRef.current) inputRef.current.value = String(value);
  }, []);

  // One-time wiggle to show the slider can be dragged. Any interaction cancels it.
  useEffect(() => {
    if (!inView || reduce) return;
    hint.current = animate(0, 1, {
      duration: 2.8,
      delay: 0.6,
      ease: "easeInOut",
      onUpdate: (t) => setPos(50 + Math.sin(t * Math.PI * 2) * 30 * (1 - t * 0.6)),
      onComplete: () => setPos(50),
    });
    return () => hint.current?.stop();
  }, [inView, reduce, setPos]);

  const stopHint = () => hint.current?.stop();

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative aspect-[4/3] w-full select-none overflow-hidden rounded-[1.5rem] bg-brand-900 [--pos:50%]",
        "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent-500",
        className,
      )}
    >
      <Image src={afterSrc} alt={afterAlt} fill priority sizes="(min-width: 1024px) 560px, 92vw" className="object-cover" />

      <div className="absolute inset-0 [clip-path:inset(0_calc(100%-var(--pos))_0_0)]">
        <Image src={beforeSrc} alt={beforeAlt} fill priority sizes="(min-width: 1024px) 560px, 92vw" className="object-cover" />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-brand-950/70 px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent-500 px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-brand-950">
        After
      </span>
      {caption && (
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold text-brand-900 backdrop-blur">
          {caption}
        </span>
      )}

      <div aria-hidden className="pointer-events-none absolute inset-0 will-change-transform [transform:translate3d(var(--pos),0,0)]">
        <span className="absolute inset-y-0 left-0 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(11_47_85/0.25)]" />
        <span className="absolute left-0 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand-700 shadow-lift">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white/70" />
          <ChevronLeft size={18} strokeWidth={3} className="-mr-1.5" />
          <ChevronRight size={18} strokeWidth={3} className="-ml-1.5" />
        </span>
      </div>

      <input
        ref={inputRef}
        type="range"
        min={0}
        max={100}
        step={0.5}
        defaultValue={50}
        aria-label="Drag to compare the room before and after cleaning"
        onInput={(e) => {
          stopHint();
          setPos(Number(e.currentTarget.value));
        }}
        onPointerDown={stopHint}
        onKeyDown={stopHint}
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 [touch-action:pan-y]"
      />
    </div>
  );
}
