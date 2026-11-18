import { Camera, Mail, Phone } from "lucide-react";
import { site } from "@/content/site";

/** Always-visible contact strip above the sticky header (desktop). */
export function UtilityBar() {
  return (
    <div className="hidden bg-brand-900 text-sm text-white md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 lg:px-8">
        <p className="flex items-center gap-2 text-brand-100">
          <Camera size={16} className="text-accent-400" aria-hidden />
          Send photos or a short video for a fast, tailored quote
        </p>
        <div className="flex items-center gap-1">
          {site.phones.map((p) => (
            <a
              key={p.tel}
              href={`tel:${p.tel}`}
              className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 font-semibold transition-colors hover:bg-white/10"
            >
              <span className="grid size-6 place-items-center rounded-full bg-accent-500 text-brand-950 transition-transform group-hover:scale-110">
                <Phone size={13} strokeWidth={2.6} aria-hidden />
              </span>
              {p.display}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold transition-colors hover:bg-white/10"
          >
            <span className="grid size-6 place-items-center rounded-full bg-accent-500 text-brand-950 transition-transform group-hover:scale-110">
              <Mail size={13} strokeWidth={2.6} aria-hidden />
            </span>
            {site.email}
          </a>
        </div>
      </div>
    </div>
  );
}
