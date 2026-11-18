import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { coreServices, type CoreService } from "@/content/site";
import { ServiceIcon } from "@/components/graphics/ServiceIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SelectServiceLink } from "@/components/ui/SelectServiceLink";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/cn";

/** Zigzag 7/5, 5/7, 7/5 layout on large screens; wide cards lay out image-left. */
const layout = [
  { span: "lg:col-span-7", wide: true },
  { span: "lg:col-span-5", wide: false },
  { span: "lg:col-span-5", wide: false },
  { span: "lg:col-span-7", wide: true },
  { span: "lg:col-span-7", wide: true },
  { span: "lg:col-span-5", wide: false },
] as const;

function ServiceCard({ service, wide, index }: { service: CoreService; wide: boolean; index: number }) {
  const tone = index % 2 === 0 ? "blue" : "orange";
  return (
    <TiltCard className="rounded-[1.75rem]" max={3.5}>
      <article
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-card ring-1 ring-brand-100 transition-shadow duration-300 hover:shadow-lift",
          wide && "lg:flex-row",
        )}
      >
        <div className={cn("relative h-56 shrink-0 overflow-hidden sm:h-64", wide ? "lg:h-auto lg:w-[42%]" : "lg:h-48")}>
          <Image
            src={service.photo.src}
            alt={service.photo.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.07]"
            style={{ objectPosition: service.photo.position }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-950/55 via-transparent to-transparent" />
          <ServiceIcon name={service.icon} tone={tone} size="lg" className="absolute left-5 top-5 z-10 ring-4 ring-white/90" />
        </div>

        <div className={cn("flex flex-1 flex-col p-6 sm:p-7", wide && "lg:justify-center lg:p-10")}>
          <h3 className={cn("text-2xl font-extrabold leading-tight text-brand-900", wide && "lg:text-[1.9rem]")}>{service.title}</h3>
          <p className={cn("mt-2 text-[15px] leading-relaxed text-brand-900/75", wide && "lg:text-base")}>{service.summary}</p>

          <ul className={cn("mt-5 grid gap-x-5 gap-y-2.5 text-[14.5px] font-medium text-brand-900 sm:grid-cols-2", wide && "lg:mt-7 lg:gap-y-3.5 lg:text-[15.5px]")}>
            {service.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                  <Check size={12} strokeWidth={3.5} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <SelectServiceLink
            id={service.id}
            className={cn(
              "inline-flex items-center gap-2 self-start pt-6 font-display text-[15px] font-bold text-brand-600 transition-colors hover:text-accent-700",
              wide ? "lg:pt-8" : "mt-auto",
            )}
          >
            Estimate this service
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
          </SelectServiceLink>
        </div>
      </article>
    </TiltCard>
  );
}

export function Services() {
  return (
    <section id="services" className="relative bg-white pb-24 pt-28 lg:pb-32 lg:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              title="Six core services, tailored to the property"
              intro="From a single bedroom to a whole workplace, each job follows a clear scope so you know exactly what is included."
            />
          </Reveal>
          <Reveal from="left" delay={0.1} className="max-w-sm">
            <p className="border-l-4 border-accent-500 pl-5 text-[15px] leading-relaxed text-brand-900/80">
              Not sure which one fits? Send photos or a short video of the space and we&rsquo;ll recommend the right clean.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-7">
          {coreServices.map((service, i) => (
            <Reveal key={service.id} className={cn("h-full", layout[i].span)} delay={(i % 2) * 0.08} from={i % 2 === 0 ? "up" : "scale"}>
              <ServiceCard service={service} wide={layout[i].wide} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
