import Image from "next/image";
import { Check, Receipt } from "lucide-react";
import { whyKothar } from "@/content/site";
import { Sparkle } from "@/components/graphics/Sparkle";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyKothar() {
  return (
    <section id="why" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal from="left">
          <div className="relative mx-auto h-[26rem] w-full max-w-xl sm:h-[34rem]">
            <div className="absolute left-0 top-0 h-[76%] w-[84%] overflow-hidden rounded-[2rem] shadow-lift">
              <Image
                src="/images/home-living.jpg"
                alt="Cleaner vacuuming a bright living room"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 h-[46%] w-[62%] overflow-hidden rounded-[2rem] shadow-lift ring-[10px] ring-white">
              <Image
                src="/images/living-mop.jpg"
                alt="Cleaner mopping a bright modern living room floor"
                fill
                sizes="(min-width: 1024px) 26vw, 55vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -left-1 bottom-10 flex animate-float items-center gap-3 rounded-2xl bg-brand-900 p-4 pr-6 text-white shadow-lift will-change-transform sm:-left-5">
              <span className="grid size-12 place-items-center rounded-xl bg-accent-500 text-brand-950">
                <Receipt size={24} aria-hidden />
              </span>
              <p className="font-display text-sm font-bold leading-tight">
                Clear scope.
                <br />
                Transparent quotes.
              </p>
            </div>
            <Sparkle className="absolute -right-2 top-4 size-14 animate-twinkle text-accent-500" />
            <Sparkle className="absolute right-12 top-24 size-7 animate-twinkle text-brand-600 [animation-delay:1.2s]" />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              title="Reliable, flexible and upfront"
              intro="You should know what you are getting, when we are coming and what it costs before anyone picks up a cloth."
            />
          </Reveal>
          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {whyKothar.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={(i % 2) * 0.06} from="right" distance={20}>
                  <div className="flex gap-4">
                    <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-accent-500 text-brand-950">
                      <Check size={17} strokeWidth={3.4} aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-[17px] font-extrabold leading-snug text-brand-900">{item.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-brand-900/75">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
