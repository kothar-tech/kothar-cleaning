import { AdditionalServices } from "@/components/sections/AdditionalServices";
import { BrandReelBand } from "@/components/sections/BrandReelBand";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { GetAQuote } from "@/components/sections/GetAQuote";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Products } from "@/components/sections/Products";
import { QuoteEstimator } from "@/components/sections/QuoteEstimator";
import { Services } from "@/components/sections/Services";
import { StatsBar } from "@/components/sections/StatsBar";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyKothar } from "@/components/sections/WhyKothar";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Services />
      <AdditionalServices />
      <QuoteEstimator />
      <Process />
      <Products />
      <WhyKothar />
      <BrandReelBand />
      {/* <Testimonials /> */}
      <GetAQuote />
      <Faq />
      <Contact />
    </>
  );
}
