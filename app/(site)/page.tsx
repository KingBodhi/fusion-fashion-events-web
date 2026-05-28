import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { FeaturedEventsStrip } from "@/components/home/FeaturedEventsStrip";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { HomeCTA } from "@/components/home/HomeCTA";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Fusion Fashion Events — Miami Runway Shows & Swim Week",
  description:
    "Miami's premier fashion event platform. Fusion Swim Week 2026 (May 24–31), Hollywood Couture, model casting, and designer showcases.",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturedEventsStrip />
      <GalleryPreview />
      <TestimonialsSection />
      <HomeCTA />
    </>
  );
}
