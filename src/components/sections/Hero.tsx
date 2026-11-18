import {
  ArrowRight,
  Camera,
  Check,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { site } from "@/content/site";
import { trustBadge } from "@/content/placeholders";
import { HouseSwoosh } from "@/components/graphics/HouseSwoosh";
import { SparkleField } from "@/components/graphics/Sparkle";
import { WaveDivider } from "@/components/graphics/WaveDivider";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Button } from "@/components/ui/Button";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

const facts = [
  "Quotes from photos or video",
  "One-off or recurring",
  "Homes, offices and commercial",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-brand-700 text-white [background-image:radial-gradient(1100px_560px_at_88%_-8%,rgb(21_128_203/0.9),transparent_62%),linear-gradient(162deg,#0a5a9b_0%,#076ebb_52%,#0b467a_100%)]"
    >
      {/* Orange sweep taken from the logo's swoosh */}
      <svg
        aria-hidden
        viewBox="0 0 900 500"
        className="pointer-events-none absolute -bottom-64 -left-96 -z-10 w-[820px] max-w-none animate-float-slow will-change-transform"
        fill="none"
      >
        <path
          d="M20 430C60 230 330 70 700 60C430 130 250 260 290 380C320 460 480 470 880 330C640 500 160 560 20 430Z"
          fill="#f37b0b"
        />
      </svg>
      <SparkleField
        count={14}
        seed={7}
        xMin={54}
        className="-z-10 max-lg:hidden"
      />
      <SparkleField
        count={4}
        seed={19}
        xMin={78}
        yMin={4}
        yMax={30}
        className="-z-10 lg:hidden"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 pb-40 pt-14 sm:px-6 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:px-8 lg:pb-44 lg:pt-20">
        <div>
          <div className="inline-flex animate-rise items-center gap-3 rounded-full border border-white/25 bg-white/10 py-1.5 pl-4 pr-5 backdrop-blur [animation-delay:0.05s]">
            <span className="flex gap-0.5 text-accent-400" aria-hidden>
              {Array.from({ length: trustBadge.rating }, (_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span className="text-sm font-semibold">{trustBadge.label}</span>
            {/* <PlaceholderTag /> */}
          </div>

          <h1 className="mt-7 animate-rise text-[2.75rem] font-extrabold leading-[1.02] [animation-delay:0.15s] sm:text-6xl lg:text-[4.35rem]">
            Clean spaces.
            <br />
            <span className="relative inline-block">
              Healthier lives.
              <svg
                aria-hidden
                viewBox="0 0 420 22"
                preserveAspectRatio="none"
                className="absolute -bottom-3 left-0 h-3.5 w-full overflow-visible"
                fill="none"
              >
                <path
                  pathLength={1}
                  d="M4 15C90 4 210 2 416 10"
                  stroke="#f37b0b"
                  strokeWidth={8}
                  strokeLinecap="round"
                  className="draw-path animate-draw [animation-delay:0.9s]"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-9 max-w-xl animate-rise text-lg leading-relaxed text-brand-50 [animation-delay:0.3s] sm:text-xl">
            Reliable cleaning for homes, offices and commercial premises. Send
            us photos or a short video of the space and we&rsquo;ll come back
            with a clear, tailored quote.
          </p>

          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:0.42s] sm:flex-row sm:items-center">
            <Button href="#estimator" size="lg" className="w-full sm:w-auto">
              Get an Instant Quote <ArrowRight size={20} aria-hidden />
            </Button>
            <Button
              href={`tel:${site.phones[0].tel}`}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Phone size={19} aria-hidden /> {site.phones[0].display}
            </Button>
          </div>

          <ul className="mt-9 flex animate-rise flex-wrap gap-x-6 gap-y-2.5 text-[15px] font-medium text-brand-50 [animation-delay:0.54s]">
            {facts.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-accent-500 text-brand-950">
                  <Check size={13} strokeWidth={3.4} aria-hidden />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl animate-rise [animation-delay:0.3s] lg:max-w-none">
          <HouseSwoosh
            className="absolute right-2 -top-28 -z-10 h-[22rem] w-[31rem] lg:right-2 lg:-top-32 lg:h-[24rem] lg:w-[34rem]"
            roofClass="text-white/20"
            swooshClass="text-accent-500/60"
            delay={0.5}
          />
          <div className="relative rotate-[1.2deg] rounded-[2rem] bg-white p-2.5 shadow-lift">
            <BeforeAfterSlider
              beforeSrc="/images/hero-room-before.jpg"
              afterSrc="/images/hero-room.jpg"
              beforeAlt="A neglected room with a grimy floor, smudged walls and a hazy window"
              afterAlt="The same room spotless, with a clean bright window and a fresh floor"
              caption="Illustration of a typical clean"
            />
          </div>

          <div className="absolute -bottom-7 left-4 z-10 animate-float rounded-2xl bg-white p-3.5 pr-5 shadow-lift will-change-transform sm:-left-6 sm:bottom-16">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-accent-500 text-brand-950">
                <Camera size={22} aria-hidden />
              </span>
              <div className="leading-tight text-brand-900">
                <p className="font-display text-sm font-bold">
                  Quote from a photo
                </p>
                <p className="text-xs text-brand-900/65">or a short video</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-1 top-24 z-10 hidden animate-float-slow rounded-2xl bg-brand-900 p-3.5 pr-5 text-white shadow-lift will-change-transform sm:block lg:-right-5">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-white/12 text-accent-400">
                <ShieldCheck size={22} aria-hidden />
              </span>
              <div className="leading-tight">
                <p className="font-display text-sm font-bold">
                  Professional-grade
                </p>
                <p className="text-xs text-brand-200">
                  products, matched to the surface
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WaveDivider fill="text-white" className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
