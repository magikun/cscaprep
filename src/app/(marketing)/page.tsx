import { HeroSection } from "@/components/blocks/hero-section";
import { GenzySection } from "@/components/blocks/genzy-section";
import { CoreFeatures } from "@/components/blocks/core-features";
import { HowItWorks } from "@/components/blocks/how-it-works";
import { WhyUsSection } from "@/components/blocks/why-us-section";
import { MaterialsPreview } from "@/components/blocks/materials-preview";
import { StatsSection } from "@/components/blocks/stats-section";
import { PricingSection } from "@/components/blocks/pricing-section";
import { Testimonials } from "@/components/blocks/testimonials";
import { FaqSection } from "@/components/blocks/faq-section";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { GetInTouchSection } from "@/components/blocks/get-in-touch-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GenzySection />
      <CoreFeatures />
      <HowItWorks />
      <WhyUsSection />
      <MaterialsPreview />
      <StatsSection />
      <PricingSection />
      <Testimonials />
      <FaqSection />
      <CtaBanner />
      <GetInTouchSection />
    </>
  );
}
