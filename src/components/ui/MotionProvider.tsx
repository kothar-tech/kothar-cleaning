"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * Honours prefers-reduced-motion for every Motion animation in one place. Transforms and layout
 * animations are skipped (elements simply appear), while opacity fades stay. Because the markup is
 * identical on the server and the client, there is no hydration mismatch.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
