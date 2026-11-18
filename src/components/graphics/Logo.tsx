import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoProps {
  /** nav: house, name and "Cleaning Services"; full: also the tagline */
  variant?: "nav" | "full";
  className?: string;
  priority?: boolean;
}

/** The client's own logo artwork, cut out with a transparent background. */
export function Logo({ variant = "nav", className, priority }: LogoProps) {
  const full = variant === "full";
  return (
    <Image
      src={full ? "/brand/logo-lockup.png" : "/brand/logo-nav.png"}
      alt="Kothar Cleaning Services"
      width={full ? 1000 : 800}
      height={full ? 676 : 508}
      priority={priority}
      className={cn("w-auto select-none", className)}
    />
  );
}
