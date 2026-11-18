"use client";

import type { ReactNode } from "react";
import type { ServiceId } from "@/content/site";

export const SELECT_SERVICE_EVENT = "kothar:select-service";

/** Jumps to the estimator and tells it which service the visitor picked from a card. */
export function SelectServiceLink({ id, className, children }: { id: ServiceId; className?: string; children: ReactNode }) {
  return (
    <a
      href="#estimator"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: { id } }))}
    >
      {children}
    </a>
  );
}
