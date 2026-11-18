import {
  AppWindow,
  Bath,
  BadgeCheck,
  Briefcase,
  Brush,
  Building2,
  Camera,
  DoorOpen,
  FlaskConical,
  Grid3x3,
  HeartHandshake,
  KeyRound,
  Layers,
  ListChecks,
  MapPin,
  PartyPopper,
  ScanSearch,
  ShieldCheck,
  Sofa,
  Sparkles,
  SprayCan,
  Trash2,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { IconKey } from "@/content/site";

const icons: Record<IconKey, LucideIcon> = {
  building: Building2,
  office: Briefcase,
  key: KeyRound,
  heart: HeartHandshake,
  window: AppWindow,
  sofa: Sofa,
  tile: Grid3x3,
  pressure: Waves,
  shield: ShieldCheck,
  trash: Trash2,
  party: PartyPopper,
  door: DoorOpen,
  assess: ScanSearch,
  select: FlaskConical,
  prepare: ListChecks,
  clean: Sparkles,
  inspect: BadgeCheck,
  spray: SprayCan,
  flask: FlaskConical,
  bath: Bath,
  mop: Brush,
  layers: Layers,
  camera: Camera,
  map: MapPin,
};

type Tone = "orange" | "blue" | "white" | "navy";
type Size = "sm" | "md" | "lg";

const tones: Record<Tone, string> = {
  orange: "bg-accent-500 text-brand-950 shadow-cta",
  blue: "bg-brand-600 text-white shadow-card",
  white: "bg-white text-brand-700 shadow-card",
  navy: "bg-brand-900 text-accent-400",
};

const sizes: Record<Size, { box: string; icon: number }> = {
  sm: { box: "size-10 rounded-xl", icon: 20 },
  md: { box: "size-12 rounded-2xl", icon: 24 },
  lg: { box: "size-16 rounded-2xl", icon: 32 },
};

interface ServiceIconProps {
  name: IconKey;
  tone?: Tone;
  size?: Size;
  className?: string;
}

/** Filled icon badge. The glyph tilts and the badge pops when an ancestor with class `group` is hovered. */
export function ServiceIcon({ name, tone = "orange", size = "md", className }: ServiceIconProps) {
  const Icon = icons[name];
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center transition-transform duration-300 ease-out will-change-transform group-hover:-translate-y-0.5 group-hover:scale-110",
        tones[tone],
        sizes[size].box,
        className,
      )}
    >
      <Icon
        size={sizes[size].icon}
        strokeWidth={2.2}
        className="transition-transform duration-500 ease-out group-hover:-rotate-12 group-hover:scale-110"
      />
    </span>
  );
}
