import type { ReactNode } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { cn } from "@/lib/cn";

const control =
  "min-h-12 w-full rounded-xl border-2 bg-white px-4 py-2.5 text-base text-brand-900 placeholder:text-brand-900/40 transition-[border-color,box-shadow] duration-200";

export interface ControlProps {
  id: string;
  name: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
  className: string;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  /** Show a green tick when the value passed validation */
  valid?: boolean;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: (control: ControlProps) => ReactNode;
}

/**
 * Label, control, hint and error message wired together with aria-describedby.
 * The control is passed through a render prop so inputs, selects and textareas share one pattern.
 */
export function Field({ id, label, error, valid, hint, optional, className, children }: FieldProps) {
  const describedBy = [error && `${id}-error`, hint && !error && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  const state = error
    ? "border-red-500 hover:border-red-600"
    : valid
      ? "border-emerald-500"
      : "border-brand-200 hover:border-brand-300 focus:border-brand-600";

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-center justify-between font-display text-sm font-bold text-brand-900">
        {label}
        {optional && <span className="text-xs font-medium text-brand-900/55">Optional</span>}
      </label>
      <div className="relative">
        {children({
          id,
          name: id,
          "aria-invalid": Boolean(error),
          "aria-describedby": describedBy,
          className: cn(control, state, valid && !error && "pr-11"),
        })}
        {valid && !error && (
          <CircleCheck aria-hidden size={22} className="pointer-events-none absolute right-3.5 top-3.5 text-emerald-600" />
        )}
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-brand-900/65">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-semibold text-red-700">
          <CircleAlert aria-hidden size={17} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
