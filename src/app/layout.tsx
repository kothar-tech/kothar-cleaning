import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyBookBar } from "@/components/layout/StickyBookBar";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${site.name} | Commercial, Office, End of Lease and Home Cleaning`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "en_AU",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#076ebb",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CleaningService",
  name: site.name,
  description: site.description,
  email: site.email,
  telephone: site.phones[0].tel,
  slogan: site.tagline,
  image: "/brand/logo-lockup.png",
  knowsAbout: [
    "Commercial cleaning",
    "Office cleaning",
    "End of lease cleaning",
    "Disability house cleaning",
    "Glass cleaning",
    "Carpet cleaning",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-white font-sans text-brand-900">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-accent-500 px-5 py-3 font-bold text-brand-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <MotionProvider>
          <UtilityBar />
          <Header />
          {/* overflow-x: clip (not hidden) stops off-screen reveal offsets causing sideways scroll, and keeps sticky working */}
          <main id="main" className="overflow-x-clip">
            {children}
          </main>
          <Footer />
          <StickyBookBar />
        </MotionProvider>
      </body>
    </html>
  );
}
