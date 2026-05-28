import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const metadata = buildMetadata({
  title: "Fashion Show Gallery — Miami Runway Photos",
  description: "Photos from Fusion Fashion Events' runway shows, Swim Week, and model showcases in Miami.",
  path: "/gallery",
});

const images = [
  { src: "/events/G47A3871.jpg", alt: "Fusion Fashion runway show — model on stage", event: "Swim Week 2025" },
  { src: "/events/aerial_shot_swim_week.png", alt: "Aerial view of Fusion Swim Week at Miami Beach pool", event: "Swim Week 2025" },
  { src: "/events/G47A3467.jpg", alt: "Fusion Fashion designer showcase runway", event: "Swim Week 2025" },
  { src: "/events/G47A3597.jpg", alt: "Backstage at Fusion Fashion Events", event: "Swim Week 2025" },
  { src: "/events/DSC07799.jpg", alt: "Fusion Fashion model backstage preparation", event: "Hollywood Couture 2025" },
  { src: "/events/IMG_2537.jpg", alt: "Fusion Fashion Events VIP crowd", event: "Hollywood Couture 2025" },
  { src: "/events/0E0A66D6.jpg", alt: "Hollywood Couture designer collection debut", event: "Hollywood Couture 2025" },
  { src: "/events/2026-2.jpg", alt: "Fusion Fashion Events 2026 promotional image", event: "Upcoming 2026" },
  { src: "/events/2026-4.png", alt: "Fusion Fashion Events 2026 season preview", event: "Upcoming 2026" },
  { src: "/events/7B25F2C4.png", alt: "Fusion Fashion VIP event attendees", event: "Swim Week 2025" },
  { src: "/events/A1B0955D.png", alt: "Fusion Fashion Miami runway atmosphere", event: "Swim Week 2025" },
  { src: "/events/6132681A.png", alt: "Fusion Fashion event production setup", event: "Swim Week 2025" },
  { src: "/events/62F7E5B3.png", alt: "Fusion Fashion Events Miami showcase", event: "Swim Week 2025" },
  { src: "/events/7F548621.png", alt: "Fusion Fashion runway model close-up", event: "Hollywood Couture 2025" },
  { src: "/events/ModelCompCard.jpg", alt: "Model comp card professional photo session", event: "Workshop" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Gallery"
          title="The Look of Fusion"
          description="A visual journey through Miami's most electric fashion moments."
        />
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <div key={i} className="break-inside-avoid relative overflow-hidden group border border-border hover:border-accent/40 transition-colors">
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                <p className="font-label tracking-wider text-[10px] text-white/0 group-hover:text-white/70 uppercase px-4 py-3 transition-colors">
                  {img.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
