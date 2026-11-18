"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { SparkleField } from "@/components/graphics/Sparkle";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Looping brand reel rendered with HyperFrames (see /video). It plays only while on screen, stays on
 * its poster frame for visitors who prefer reduced motion, and has a pause button because it loops.
 */
export function BrandReelBand() {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(frame, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);

  // The `playing` flag follows the element's own play/pause events, so the button always matches reality
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (inView && !reduce && !pausedByUser) {
      el.play().catch(() => {});
    } else if (!inView) {
      el.pause();
    }
  }, [inView, reduce, pausedByUser]);

  const toggle = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      setPausedByUser(false);
      el.play().catch(() => {});
    } else {
      setPausedByUser(true);
      el.pause();
    }
  };

  return (
    <section id="reel" aria-label="Kothar brand reel" className="relative isolate overflow-hidden bg-brand-600 pb-32 pt-28 text-white lg:pb-40 lg:pt-36">
      <WaveDivider fill="text-white" flip className="absolute inset-x-0 top-0" />
      <SparkleField count={9} seed={63} className="-z-10 max-lg:hidden" xMax={22} />
      <SparkleField count={9} seed={64} className="-z-10 max-lg:hidden" xMin={78} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            light
            title="See a clean come together"
            intro="From a grimy room to a spotless one, then through the offices, windows and carpets we look after."
          />
        </Reveal>

        <Reveal from="scale" className="mt-12">
          <div
            ref={frame}
            className="relative aspect-video overflow-hidden rounded-[2rem] bg-brand-900 shadow-lift ring-8 ring-white/15 sm:rounded-[2.5rem]"
          >
            <video
              ref={video}
              className="h-full w-full object-cover"
              poster="/video/reel-poster.jpg"
              muted
              loop
              playsInline
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              aria-label="Looping brand reel: a swoosh wipes a grimy room clean, then office, glass and carpet cleaning, ending on the Kothar logo"
            >
              <source src="/video/reel.mp4" type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause video" : "Play video"}
              className="absolute bottom-4 right-4 grid size-12 place-items-center rounded-full bg-white/90 text-brand-800 shadow-lift backdrop-blur transition-[transform,background-color] hover:scale-105 hover:bg-white active:scale-95"
            >
              {playing ? <Pause size={20} fill="currentColor" aria-hidden /> : <Play size={20} fill="currentColor" aria-hidden />}
            </button>
          </div>
          <p className="mt-4 text-center text-sm text-brand-100">Illustrative footage, made from stock photography.</p>
        </Reveal>
      </div>

      <WaveDivider fill="text-tint" className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
