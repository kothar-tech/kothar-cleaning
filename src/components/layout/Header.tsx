"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { Logo } from "@/components/graphics/Logo";
import { Button } from "@/components/ui/Button";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/cn";

const ids = nav.map((n) => n.href.slice(1));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "glass sticky top-0 z-50 border-b transition-[box-shadow,border-color] duration-300",
        scrolled || open ? "border-brand-100 shadow-card" : "border-white/40",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" aria-label="Kothar Cleaning Services, back to top" className="shrink-0">
          <Logo className="h-12 sm:h-14" priority />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[15px] font-semibold transition-colors",
                  isActive ? "text-white" : "text-brand-900 hover:text-brand-600",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-brand-600"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phones[0].tel}`}
            aria-label={`Call ${site.phones[0].display}`}
            className="grid size-11 place-items-center rounded-full bg-accent-500 text-brand-950 shadow-cta transition-transform hover:scale-105 active:scale-95 lg:hidden"
          >
            <Phone size={20} strokeWidth={2.4} aria-hidden />
          </a>
          <Button href="#estimator" size="md" className="max-sm:hidden">
            Get a Quote <ArrowRight size={18} aria-hidden />
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full bg-brand-600 text-white transition-transform active:scale-95 lg:hidden"
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-brand-100 bg-white px-4 pb-6 pt-3 shadow-lift lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                  className="flex min-h-14 items-center justify-between border-b border-brand-100 font-display text-xl font-bold text-brand-900"
                >
                  {item.label}
                  <ArrowRight size={20} className="text-accent-600" aria-hidden />
                </motion.a>
              ))}
            </nav>
            <div className="mt-5 grid gap-3">
              <Button href="#estimator" size="lg" onClick={() => setOpen(false)} className="w-full">
                Get an Instant Quote
              </Button>
              <Button href={`tel:${site.phones[0].tel}`} variant="secondary" size="lg" className="w-full">
                <Phone size={18} aria-hidden /> Call {site.phones[0].display}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
