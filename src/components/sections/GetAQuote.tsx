import { ArrowRight } from "lucide-react";
import { quoteConsiderations, quotePaths } from "@/content/site";
import { ServiceIcon } from "@/components/graphics/ServiceIcon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export function GetAQuote() {
  return (
    <section id="quote" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            title="Two easy ways to get a quote"
            intro="Most jobs are quoted from photos. Bigger or trickier ones get a visit first."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {quotePaths.map((path, i) => (
            <Reveal key={path.title} from={i === 0 ? "right" : "left"} className="h-full">
              <article
                className={cn(
                  "group flex h-full flex-col rounded-[2rem] p-8 ring-1 sm:p-10",
                  i === 0 ? "bg-tint ring-brand-200" : "bg-accent-100 ring-accent-300/60",
                )}
              >
                <ServiceIcon name={path.icon} tone={i === 0 ? "blue" : "orange"} size="lg" />
                <h3 className="mt-6 text-2xl font-extrabold text-brand-900 sm:text-3xl">{path.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-brand-900/80">{path.text}</p>
                <p className="mt-4 font-display text-base font-bold text-brand-900">{path.strong}</p>
                <a
                  href="#contact"
                  className="mt-auto inline-flex items-center gap-2 self-start pt-8 font-display font-bold text-brand-700 transition-colors hover:text-accent-700"
                >
                  {i === 0 ? "Send us your photos" : "Ask for a site visit"}
                  <ArrowRight size={19} className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8" from="up">
          <div className="grid gap-10 rounded-[2rem] bg-brand-900 p-8 text-white shadow-lift sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <h3 className="text-3xl font-extrabold leading-tight sm:text-4xl">What we look at when we quote</h3>
              <p className="mt-4 text-base leading-relaxed text-brand-200">
                Every property is different. These are the things that move a price up or down, so you can see why a quote is what it is.
              </p>
              <Button href="#contact" size="lg" className="mt-8">
                Start my quote <ArrowRight size={20} aria-hidden />
              </Button>
            </div>
            <ol className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {quoteConsiderations.map((item, i) => (
                <li key={item} className="flex items-start gap-3.5 text-[15px] leading-snug">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-500 font-display text-sm font-extrabold text-brand-950">
                    {i + 1}
                  </span>
                  <span className="pt-1">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
