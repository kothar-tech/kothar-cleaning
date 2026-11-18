import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Run the strip right to left (default) or left to right */
  reverse?: boolean;
}

/** CSS-only infinite strip: the content is duplicated and translated by exactly half its width. */
export function Marquee({ children, className, reverse }: MarqueeProps) {
  return (
    <div className={cn("group/marquee flex overflow-hidden", className)}>
      <div
        className={cn(
          "marquee-track flex min-w-full shrink-0 animate-marquee items-center will-change-transform group-hover/marquee:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
