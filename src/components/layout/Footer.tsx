import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { additionalServices, coreServices, nav, site } from "@/content/site";
import { serviceArea } from "@/content/placeholders";
import { Logo } from "@/components/graphics/Logo";
import { SparkleField } from "@/components/graphics/Sparkle";
import { WaveDivider } from "@/components/graphics/WaveDivider";

export function Footer() {
  return (
    <footer className="relative bg-brand-950 text-brand-100">
      <WaveDivider fill="text-brand-950" className="absolute inset-x-0 top-0 -translate-y-[calc(100%-1px)]" />
      <SparkleField count={5} seed={42} yMax={9} className="opacity-70" colors={["text-brand-400", "text-accent-400", "text-white"]} />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-28 pt-16 md:pb-14 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <div className="inline-block rounded-2xl bg-white p-4 shadow-lift">
            <Logo variant="full" className="h-24 sm:h-28" />
          </div>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-brand-100">
            Professional cleaning for homes, offices and commercial premises. {site.tagline}
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold text-white">Core services</h2>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {coreServices.map((s) => (
              <li key={s.id}>
                <a href="#services" className="transition-colors hover:text-accent-400">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold text-white">Also available</h2>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {additionalServices.map((s) => (
              <li key={s.title}>
                <a href="#more" className="transition-colors hover:text-accent-400">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold text-white">Contact us today</h2>
          <ul className="mt-4 space-y-3">
            {site.phones.map((p) => (
              <li key={p.tel}>
                <a
                  href={`tel:${p.tel}`}
                  className="group inline-flex items-center gap-3 font-display text-lg font-bold text-white transition-colors hover:text-accent-400"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-accent-500 text-brand-950 transition-transform group-hover:scale-110">
                    <Phone size={16} strokeWidth={2.6} aria-hidden />
                  </span>
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-3 break-all text-[15px] font-semibold text-white transition-colors hover:text-accent-400"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-500 text-brand-950 transition-transform group-hover:scale-110">
                  <Mail size={16} strokeWidth={2.6} aria-hidden />
                </span>
                {site.email}
              </a>
            </li>
            {serviceArea && (
              <li className="flex items-start gap-3 text-[15px]">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-800 text-accent-400">
                  <MapPin size={16} aria-hidden />
                </span>
                <span className="pt-1.5">{serviceArea}</span>
              </li>
            )}
          </ul>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold text-accent-400 transition-colors hover:text-accent-300"
          >
            Send photos or arrange a site visit <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 pb-28 text-sm text-brand-300 sm:flex-row sm:items-center sm:justify-between md:pb-6 lg:px-8">
          <p>© {site.name}. All rights reserved.</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-white">
                {n.label}
              </a>
            ))}
            <a href="/images/CREDITS.md" className="transition-colors hover:text-white">
              Photo credits
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
