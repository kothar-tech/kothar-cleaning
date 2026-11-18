import Image from "next/image";
import { additionalServices, type AdditionalService } from "@/content/site";
import { ServiceIcon } from "@/components/graphics/ServiceIcon";
import { Sparkle } from "@/components/graphics/Sparkle";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

function Tile({ item, tone }: { item: AdditionalService; tone: "photo" | "orange" | "white" }) {
  if (item.photo && tone === "photo") {
    return (
      <article className="group relative isolate flex h-80 flex-col justify-end overflow-hidden rounded-3xl bg-brand-900 shadow-card">
        <Image
          src={item.photo.src}
          alt={item.photo.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="-z-10 object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.08]"
          style={{ objectPosition: item.photo.position }}
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-brand-950/95 via-brand-950/45 to-brand-950/5" />
        <div className="p-6">
          <ServiceIcon name={item.icon} tone="orange" size="md" />
          <h3 className="mt-4 text-xl font-extrabold text-white">{item.title}</h3>
          <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-brand-100">{item.summary}</p>
        </div>
      </article>
    );
  }

  const orange = tone === "orange";
  return (
    <article
      className={cn(
        "group relative isolate flex h-80 flex-col justify-end overflow-hidden rounded-3xl p-6 shadow-card",
        orange ? "bg-accent-500 text-brand-950" : "bg-white text-brand-900",
      )}
    >
      <Sparkle
        className={cn(
          "absolute -right-8 -top-8 -z-10 size-48 transition-transform duration-700 ease-out will-change-transform group-hover:rotate-45 group-hover:scale-110",
          orange ? "text-white/25" : "text-brand-100",
        )}
      />
      <ServiceIcon name={item.icon} tone={orange ? "navy" : "blue"} size="md" />
      <h3 className="mt-4 text-xl font-extrabold">{item.title}</h3>
      <p className={cn("mt-1.5 text-sm leading-relaxed", orange ? "text-brand-950/85" : "text-brand-900/75")}>{item.summary}</p>
    </article>
  );
}

// Tiles with a photo always show it; any without one alternate between the orange and white cards
const fallbackTones = ["orange", "white"] as const;
const toneFor = (item: AdditionalService, i: number) => (item.photo ? "photo" : fallbackTones[i % 2]);

export function AdditionalServices() {
  return (
    <section id="more" className="relative bg-brand-700 pb-28 pt-24 text-white lg:pb-36">
      <WaveDivider fill="text-white" flip className="absolute inset-x-0 top-0" />

      <div className="relative mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            light
            title="Plus the jobs that usually get missed"
            intro="Grout lines, driveways, shared corridors and event venues all need different tools and different products. We cover those too."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {additionalServices.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.08} from={i % 2 ? "scale" : "up"}>
              <Tile item={item} tone={toneFor(item, i)} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Orange tape ribbon */}
      <div className="absolute inset-x-0 bottom-0 z-10 translate-y-1/2 overflow-hidden py-6" aria-hidden>
        <Marquee className="-rotate-1 scale-[1.04] bg-accent-500 py-3.5 text-brand-950 shadow-cta">
          {[...additionalServices, ...additionalServices].map((s, i) => (
            <span key={i} className="flex items-center gap-6 whitespace-nowrap pr-6 font-display text-base font-extrabold uppercase tracking-wider sm:text-lg">
              {s.title}
              <Sparkle className="size-5 text-brand-950" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
