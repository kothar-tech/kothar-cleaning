"use client";

import { useEffect, useState } from "react";

/** Returns the id of the section currently crossing the middle band of the viewport. */
export function useScrollSpy(ids: readonly string[], rootMargin = "-38% 0px -57% 0px") {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && window.scrollY >= 200) setActive(entry.target.id);
        }
      },
      { rootMargin, threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));

    // Clear the highlight when the visitor is back above the first tracked section
    const onScroll = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
    // ids is a stable constant at every call site
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootMargin]);

  return active;
}
