import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/** Four-point star taken from the sparkle motif in the Kothar logo */
export function Sparkle({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} style={style} fill="currentColor">
      <path d="M12 0c.9 7.4 4.6 11.1 12 12-7.4.9-11.1 4.6-12 12-.9-7.4-4.6-11.1-12-12C7.4 11.1 11.1 7.4 12 0Z" />
    </svg>
  );
}

/** Deterministic pseudo-random so server and client render identical positions. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface SparkleFieldProps {
  count?: number;
  seed?: number;
  /** Tailwind text colour classes picked from at random */
  colors?: string[];
  className?: string;
  minSize?: number;
  maxSize?: number;
  /** Keep sparkles inside this part of the parent (percentages), so they stay clear of text */
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
}

/** Twinkling sparkles scattered across a positioned parent. Pure CSS animation, no JS at runtime. */
export function SparkleField({
  count = 12,
  seed = 11,
  colors = ["text-white", "text-accent-300", "text-brand-200"],
  className,
  minSize = 10,
  maxSize = 30,
  xMin = 0,
  xMax = 100,
  yMin = 0,
  yMax = 100,
}: SparkleFieldProps) {
  const rand = mulberry32(seed);
  const items = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: xMin + rand() * (xMax - xMin),
    top: yMin + rand() * (yMax - yMin),
    size: minSize + rand() * (maxSize - minSize),
    delay: rand() * 3.4,
    color: colors[Math.floor(rand() * colors.length)],
  }));

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {items.map((s) => (
        <Sparkle
          key={s.id}
          className={cn("absolute animate-twinkle will-change-[transform,opacity]", s.color)}
          style={{
            left: `${s.left.toFixed(2)}%`,
            top: `${s.top.toFixed(2)}%`,
            width: `${s.size.toFixed(1)}px`,
            height: `${s.size.toFixed(1)}px`,
            animationDelay: `${s.delay.toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
}
