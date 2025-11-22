import { FeaturePreviewSection } from "../components/FeaturePreviewSection";
import { FooterMinimal } from "../components/FooterMinimal";
import { HeroSection } from "../components/HeroSection";
import { VisionSection } from "../components/VisionSection";

export function LandingPage() {
  return (
    <div className="space-y-10 md:space-y-14">
      <div className="max-w-5xl mx-auto px-6 md:px-8 space-y-10 md:space-y-14">
        <HeroSection />
        <VisionSection />
        <FeaturePreviewSection />
      </div>
      <FooterMinimal />
    </div>
  );
}
