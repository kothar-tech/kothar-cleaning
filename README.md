# Kothar Cleaning Services website

Marketing site for Kothar Cleaning Services. Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, Motion, Lucide.
Content comes from the company brochure; the logo and colours are taken from the logo artwork.

```bash
npm install
npm run dev -- -p 3100   # http://localhost:3100
npm run build            # also prints the list of placeholder content still to replace
```

## Before this goes live

Everything invented lives in **`src/content/placeholders.ts`**, each item marked `TODO(client)`:

| Item                                     | What to do                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------ |
| Trust badge ("5-Star Rated & Inspected") | Replace with a real rating or accreditation, or remove                   |
| Stats (100+ homes, 99% satisfaction)     | Replace with real numbers; the other two stats are true brochure facts   |
| Testimonials                             | Replace with real reviews (with permission), or remove the section       |
| Estimator rates                          | Replace with real indicative prices (the estimator always shows a range) |
| Service area                             | Add suburbs or regions; hidden while empty                               |

In development a pink **SAMPLE** tag marks these on the page. `npm run build` lists what is outstanding;
`STRICT_PLACEHOLDERS=1 npm run build` fails until the file is clean.

Phone numbers are confirmed as `0421 466 057` and `0424 344 135` (from the brochure text, set in `src/content/site.ts`).
The original logo artwork prints a different landline, so do not paste the uncropped logo onto the site.

## Quote form

`POST /api/quote` validates with zod (same schema as the browser form), drops honeypot hits and rate limits per IP.
Delivery uses [Resend](https://resend.com) when these are set:

```bash
RESEND_API_KEY=...
QUOTE_TO_EMAIL=kotharcleaning@gmail.com
QUOTE_FROM_EMAIL="Kothar website <quotes@your-verified-domain>"   # optional
NEXT_PUBLIC_SITE_URL=https://your-domain.example                  # for social cards
```

Without keys: development logs the request and reports success; production answers 503 and the form falls back to a
pre-filled `mailto:` draft, so it never claims a message was sent when it was not.

## Structure

```
src/content/      site.ts (real facts) and placeholders.ts (flagged samples)
src/components/   layout/ sections/ ui/ graphics/
src/lib/          pricing.ts (estimate) and validation.ts (zod)
video/            HyperFrames project for the hero reel
docs/             architecture.html (open in a browser) and its source JSON
public/images/    Unsplash photos, see CREDITS.md
```

Open `docs/architecture.html` for a diagram of how the pieces connect.

## Brand reel

`video/` is a [HyperFrames](https://hyperframes.heygen.com) project (HTML rendered to video, needs FFmpeg).

```bash
cd video
npx hyperframes@0.8.214 check
npx hyperframes@0.8.214 render --quality looks --output renders/reel-source.mp4
ffmpeg -i renders/reel-source.mp4 -an -vf scale=1280:720 -c:v libx264 -preset slow -crf 29 \
  -pix_fmt yuv420p -g 60 -movflags +faststart ../public/video/reel.mp4
```

The loop starts and ends on brand blue so it repeats without a visible seam.

## Notes

- Photos are free-licence Unsplash images; swap in Kothar's own job photos when available.
- The before/after slider and the reel are labelled as illustrations: they are not photos of Kothar's work.
- Animations use only `transform` and `opacity`, and respect `prefers-reduced-motion`.
