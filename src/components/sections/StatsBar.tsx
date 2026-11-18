import { stats } from "@/content/placeholders";
import { CountUp } from "@/components/ui/CountUp";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { Reveal } from "@/components/ui/Reveal";

export function StatsBar() {
  return (
    <section aria-label="Kothar at a glance" className="relative z-10 -mt-16 px-4 sm:px-6 lg:-mt-24 lg:px-8">
      <Reveal className="mx-auto max-w-6xl" from="up" distance={36}>
        <dl className="grid grid-cols-2 overflow-hidden rounded-[2rem] bg-white shadow-lift ring-1 ring-brand-100 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="relative flex flex-col items-center justify-center px-4 py-7 text-center sm:px-6 sm:py-9 [&:nth-child(n+3)]:border-t [&:nth-child(n+3)]:border-brand-100 lg:[&:nth-child(n+3)]:border-t-0 [&:nth-child(even)]:border-l [&:nth-child(even)]:border-brand-100 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-brand-100"
            >
              {s.placeholder && <PlaceholderTag className="absolute right-3 top-3" />}
              <dd className="order-1 font-display text-[2.5rem] font-extrabold leading-none text-brand-600 sm:text-5xl lg:text-[3.5rem]">
                <CountUp value={s.value} suffix={s.suffix} duration={1.8 + i * 0.25} />
              </dd>
              <dt className="order-2 mt-2.5 text-[13px] font-semibold leading-snug text-brand-900/70 sm:text-sm">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
