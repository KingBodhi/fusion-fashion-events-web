import Image from "next/image";
import Link from "next/link";
import { getAllEvents } from "@/lib/events";
import { Badge } from "@/components/ui/Badge";
import { buildMetadata } from "@/lib/metadata";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Calendar, MapPin } from "lucide-react";

export const metadata = buildMetadata({
  title: "Fashion Events — Miami Runway Shows, Swim Week & More",
  description: "Browse all Fusion Fashion Events in Miami — Swim Week 2026, Hollywood Couture, model workshops, and more.",
  path: "/events",
});

export default function EventsPage() {
  const events = getAllEvents();

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="All Events"
          title="The Full Lineup"
          description="Every Fusion event — from Swim Week to intimate couture nights and professional workshops."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <ScrollReveal key={event.id} delay={i * 0.08}>
              <Link
                href={`/events/${event.slug}`}
                className="group block bg-surface border border-border hover:border-accent/40 transition-all duration-300 h-full"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={event.heroImage}
                    alt={event.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant={event.category === "swim-week" ? "accent" : event.category === "workshop" ? "gold" : "dark"}>
                      {event.category.replace("-", " ")}
                    </Badge>
                    {event.featured && <Badge variant="outline">Featured</Badge>}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-muted-dark text-xs mb-2">
                    <Calendar size={11} />
                    <span className="font-label tracking-wider">{event.dates}</span>
                  </div>
                  <h2 className="font-display text-xl font-light text-white mb-1 group-hover:text-accent transition-colors">
                    {event.name}
                  </h2>
                  <p className="text-white/50 text-xs italic mb-3">{event.tagline}</p>
                  <div className="flex items-center gap-2 text-muted-dark text-xs mb-4">
                    <MapPin size={11} />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-2 flex-1 mb-5">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <span className="font-label text-xs tracking-wider text-accent">
                      {event.ticketTiers.some(t => t.price === 0 && t.available)
                        ? "Free Entry Available"
                        : `From $${Math.min(...event.ticketTiers.filter(t => t.price > 0).map(t => t.price))}`}
                    </span>
                    <span className="font-label text-[10px] tracking-widest text-white/30 group-hover:text-accent transition-colors uppercase">
                      Details →
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
