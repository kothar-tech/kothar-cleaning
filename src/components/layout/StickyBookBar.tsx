"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Mobile-only bar pinned to the bottom. It appears after the hero scrolls away and tucks itself
 * out of the way while the contact form is on screen, so it never covers the form.
 */
export function StickyBookBar() {
  const [pastHero, setPastHero] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const form = document.getElementById("contact");
    const observer = form ? new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting), { threshold: 0.12 }) : null;
    if (form) observer?.observe(form);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const visible = pastHero && !formInView;

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 md:hidden",
        "transition-transform duration-300 ease-out will-change-transform",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="glass flex gap-3 border-t border-brand-100 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-lift">
        <a
          href={`tel:${site.phones[0].tel}`}
          tabIndex={visible ? 0 : -1}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 font-display text-[15px] font-bold text-white active:scale-[0.98]"
        >
          <Phone size={18} aria-hidden /> Call now
        </a>
        <a
          href="#contact"
          tabIndex={visible ? 0 : -1}
          className="inline-flex min-h-12 flex-[1.4] items-center justify-center gap-2 rounded-full bg-accent-500 font-display text-[15px] font-bold text-brand-950 shadow-cta active:scale-[0.98]"
        >
          Get a Quote <ArrowRight size={18} aria-hidden />
        </a>
      </div>
    </div>
  );
}
