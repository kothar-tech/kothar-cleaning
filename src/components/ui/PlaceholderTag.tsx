/**
 * Marks sample content while developing. Renders nothing in production builds, so it never
 * reaches visitors; `npm run build` reports outstanding placeholders instead.
 */
export function PlaceholderTag({ className = "" }: { className?: string }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span
      title="Sample content: replace in src/content/placeholders.ts"
      className={`pointer-events-none inline-flex rounded bg-fuchsia-600 px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wider text-white ${className}`}
    >
      Sample
    </span>
  );
}
