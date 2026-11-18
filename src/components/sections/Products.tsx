import { ShieldCheck } from "lucide-react";
import { productTypes, safetyRules } from "@/content/site";
import { ServiceIcon } from "@/components/graphics/ServiceIcon";
import { SparkleField } from "@/components/graphics/Sparkle";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Products() {
  return (
    <section id="products" className="relative isolate overflow-hidden bg-brand-900 py-24 text-white lg:py-32">
      <SparkleField count={9} seed={91} xMin={50} className="-z-10 opacity-40" colors={["text-brand-400", "text-accent-400", "text-white"]} />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading
              light
              title="The right product for each surface"
              intro="We use professional-grade products that are readily available in Australia, chosen for the surface, the task and the site. Never one chemical for everything."
            />
          </Reveal>

          <Reveal from="scale" delay={0.1}>
            <div className="mt-10 rounded-[2rem] bg-accent-500 p-7 text-brand-950 shadow-cta sm:p-9">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-900 text-accent-400">
                  <ShieldCheck size={26} aria-hidden />
                </span>
                <h3 className="text-2xl font-extrabold">Safety on every job</h3>
              </div>
              <ul className="mt-6 space-y-3.5">
                {safetyRules.map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-[15px] font-semibold leading-snug">
                    <span className="mt-1.5 size-2 shrink-0 rotate-45 bg-brand-900" aria-hidden />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {productTypes.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={(i % 2) * 0.07} from={i % 2 ? "right" : "up"} className="h-full">
                  <article className="group h-full rounded-3xl bg-white/[0.07] p-6 ring-1 ring-white/12 transition-[background-color,transform] duration-300 hover:-translate-y-1 hover:bg-white/[0.13]">
                    <ServiceIcon name={p.icon} tone="orange" size="md" />
                    <h3 className="mt-4 text-lg font-extrabold leading-snug text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-200">{p.text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-brand-300">
            Product names and availability change by store and location. Professional chemical suppliers also offer specialised
            contractor-grade products and SDS support.
          </p>
        </div>
      </div>
    </section>
  );
}
