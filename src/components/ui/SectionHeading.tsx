import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  /** For use on dark or saturated backgrounds */
  light?: boolean;
  as?: "h2" | "h3";
  className?: string;
}

export function SectionHeading({ title, intro, align = "left", light, as: Tag = "h2", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <Tag
        className={cn(
          "text-balance text-3xl font-extrabold leading-[1.08] sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-brand-900",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p className={cn("mt-4 text-pretty text-base leading-relaxed sm:text-lg", light ? "text-brand-100" : "text-brand-900/75")}>
          {intro}
        </p>
      )}
    </div>
  );
}
