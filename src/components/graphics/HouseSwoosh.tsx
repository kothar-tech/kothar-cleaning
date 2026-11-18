import { cn } from "@/lib/cn";
import { Sparkle } from "./Sparkle";

interface HouseSwooshProps {
  className?: string;
  /** Stroke colour for the roof and window (defaults to white) */
  roofClass?: string;
  /** Colour class for the orange swoosh stroke */
  swooshClass?: string;
  /** Replay the draw-on animation: delay in seconds */
  delay?: number;
}

/**
 * Line drawing of the logo's house, swoosh and sparkles. Each path draws on once using
 * stroke-dashoffset (pathLength normalised to 1), then holds.
 */
export function HouseSwoosh({ className, roofClass = "text-white", swooshClass = "text-accent-500", delay = 0.2 }: HouseSwooshProps) {
  const draw = (extraDelay: number) => ({
    animationDelay: `${(delay + extraDelay).toFixed(2)}s`,
  });
  return (
    // The caller positions this (e.g. `absolute`); its sparkles are placed relative to it
    <div aria-hidden className={className}>
      <svg viewBox="0 0 600 420" className="h-full w-full overflow-visible" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g className={roofClass} stroke="currentColor" strokeWidth={22}>
          <path pathLength={1} className="draw-path animate-draw" style={draw(0)} d="M96 238 L300 82 L504 238" />
          <path pathLength={1} className="draw-path animate-draw" style={draw(0.5)} strokeWidth={20} d="M178 168 V112 H218 V140" />
        </g>
        <g className={roofClass} stroke="currentColor" strokeWidth={12}>
          <path pathLength={1} className="draw-path animate-draw" style={draw(0.9)} d="M268 170 h26 v26 h-26 Z M306 170 h26 v26 h-26 Z M268 206 h26 v26 h-26 Z M306 206 h26 v26 h-26 Z" />
        </g>
        <path
          pathLength={1}
          className={cn("draw-path animate-draw", swooshClass)}
          style={draw(0.4)}
          stroke="currentColor"
          strokeWidth={26}
          d="M44 268 C 52 188, 138 132, 246 112"
        />
        <path
          pathLength={1}
          className="draw-path animate-draw text-brand-300"
          style={draw(1.1)}
          stroke="currentColor"
          strokeWidth={14}
          d="M70 292 C 140 372, 380 392, 556 256"
        />
      </svg>
      <Sparkle className="absolute right-[6%] top-[0%] h-[13%] w-[13%] animate-twinkle text-white" />
      <Sparkle className="absolute right-[1%] top-[22%] h-[8%] w-[8%] animate-twinkle text-accent-400 [animation-delay:0.9s]" />
      <Sparkle className="absolute right-[13%] top-[34%] h-[6%] w-[6%] animate-twinkle text-brand-200 [animation-delay:1.8s]" />
    </div>
  );
}
