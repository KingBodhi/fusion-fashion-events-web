import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllEvents, getEventBySlug } from "@/lib/events";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { buildMetadata } from "@/lib/metadata";
import { Calendar, MapPin, Clock, Check } from "lucide-react";

export async function generateStaticParams() {
  return getAllEvents().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return buildMetadata({
    title: event.seoTitle,
    description: event.seoDescription,
    path: `/events/${slug}`,
    image: event.heroImage,
  });
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const minPrice = Math.min(...event.ticketTiers.filter((t) => t.price > 0).map((t) => t.price));

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          <Image
            src={event.heroImage}
            alt={event.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <Badge variant={event.category === "swim-week" ? "accent" : "dark"} className="mb-4">
            {event.category.replace("-", " ")}
          </Badge>
          <h1 className="font-display font-light text-5xl md:text-7xl text-white leading-none mb-3">
            {event.name}
          </h1>
          <p className="font-display text-xl text-white/60 italic mb-6">{event.tagline}</p>
          <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
            <span className="flex items-center gap-2"><Calendar size={14} />{event.dates}</span>
            <span className="flex items-center gap-2"><MapPin size={14} />{event.venue.name}, {event.location}</span>
            {event.schedule && <span className="flex items-center gap-2"><Clock size={14} />{event.schedule.length} Shows</span>}
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-16">
          {/* About */}
          <ScrollReveal>
            <h2 className="font-display text-3xl text-white mb-4">About This Event</h2>
            <p className="text-muted-dark text-sm leading-relaxed mb-4">{event.description}</p>
            <p className="text-muted-dark text-sm leading-relaxed">{event.longDescription}</p>
          </ScrollReveal>

          {/* Schedule */}
          {event.schedule && event.schedule.length > 0 && (
            <ScrollReveal>
              <h2 className="font-display text-3xl text-white mb-8">Schedule</h2>
              <div className="space-y-6">
                {event.schedule.map((day) => (
                  <div key={day.date} className="border border-border bg-surface p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="accent">{day.label}</Badge>
                      <span className="font-label text-[10px] tracking-widest text-muted-dark uppercase">
                        {new Date(day.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {day.events.map((item) => (
                        <div key={item.title} className="flex gap-4 border-l-2 border-accent/30 pl-4">
                          <span className="font-label text-xs text-accent w-16 flex-shrink-0">{item.time}</span>
                          <div>
                            <p className="text-white text-sm">{item.title}</p>
                            {item.location && <p className="text-muted-dark text-xs">{item.location}</p>}
                            {item.description && <p className="text-white/50 text-xs mt-1">{item.description}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* Gallery */}
          {event.galleryImages.length > 0 && (
            <ScrollReveal>
              <h2 className="font-display text-3xl text-white mb-6">Gallery</h2>
              <div className="grid grid-cols-2 gap-3">
                {event.galleryImages.map((img, i) => (
                  <div key={i} className="relative h-48 overflow-hidden">
                    <Image
                      src={img}
                      alt={`${event.name} photo ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Sticky sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-4">
            <div className="border border-border bg-surface p-6">
              <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mb-1">Starting From</p>
              <p className="font-display text-4xl text-white mb-6">${minPrice}</p>

              <div className="space-y-3 mb-6">
                {event.ticketTiers.map((tier) => (
                  <div key={tier.id} className={`p-4 border ${tier.id === "vip" ? "border-accent bg-accent/5" : "border-border"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display text-white">{tier.name}</span>
                      <span className="font-label text-accent text-lg">
                        {tier.price === 0 ? "Free" : `$${tier.price}`}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {tier.perks.slice(0, 3).map((perk) => (
                        <li key={perk} className="flex items-center gap-2 text-muted-dark text-xs">
                          <Check size={10} className="text-accent flex-shrink-0" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Button href="/register" variant="primary" className="w-full mb-3">
                Get Tickets
              </Button>
              {event.registrationOpen && (
                <div className="grid grid-cols-2 gap-2">
                  {event.designerApplicationUrl && (
                    <Button href={event.designerApplicationUrl} variant="ghost" className="w-full text-[10px]">
                      Designer
                    </Button>
                  )}
                  {event.modelApplicationUrl && (
                    <Button href={event.modelApplicationUrl} variant="ghost" className="w-full text-[10px]">
                      Model
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="border border-border bg-surface p-5">
              <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mb-3">Event Details</p>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2"><Calendar size={13} className="text-accent flex-shrink-0 mt-0.5" /><span className="text-white/70">{event.dates}</span></div>
                <div className="flex gap-2"><MapPin size={13} className="text-accent flex-shrink-0 mt-0.5" /><span className="text-white/70">{event.venue.name}<br />{event.location}</span></div>
              </div>
            </div>

            <Button href="/contact" variant="ghost" className="w-full">
              Have a Question?
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
