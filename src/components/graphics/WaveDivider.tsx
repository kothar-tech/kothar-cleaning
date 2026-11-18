import { cn } from "@/lib/cn";

interface WaveDividerProps {
  /** Tailwind text colour class that sets the wave fill, e.g. "text-white" */
  fill: string;
  flip?: boolean;
  className?: string;
}

/**
 * Wave that drifts sideways. The path is periodic over half of the 2880px viewBox, so translating
 * the SVG by -50% loops seamlessly and only uses transform.
 */
export function WaveDivider({ fill, flip, className }: WaveDividerProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none overflow-hidden leading-[0]", flip && "rotate-180", className)}>
      <svg
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        className={cn("block h-12 w-[200%] animate-wave will-change-transform sm:h-16 lg:h-20", fill)}
        fill="currentColor"
      >
        <path d="M0 62C240 112 480 12 720 62s480 50 720 0c240 50 480-50 720 0s480 50 720 0v58H0Z" />
      </svg>
    </div>
  );
}
