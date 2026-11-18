"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

type From = "up" | "down" | "left" | "right" | "scale" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: From;
  distance?: number;
  duration?: number;
}

/**
 * Scroll-triggered entrance. Only opacity and transform are animated, so it stays on the GPU and
 * never shifts layout. Reduced motion is handled globally by MotionProvider (`reducedMotion="user"`),
 * which skips the transform and keeps a plain fade.
 */
export function Reveal({ children, className, delay = 0, from = "up", distance = 28, duration = 0.75 }: RevealProps) {
  const offset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: -distance },
    right: { x: distance },
    scale: { scale: 0.94 },
    none: {},
  }[from];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
