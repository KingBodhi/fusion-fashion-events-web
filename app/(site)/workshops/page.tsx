import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/config/site";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

export const metadata = buildMetadata({
  title: "Fashion Workshops Miami — Fusion Fashion Events",
  description:
    "Hands-on workshops for models, designers, and fashion professionals in Miami. Comp card sessions, runway coaching, and more.",
  path: "/workshops",
});

const workshops = [
  {
    id: "comp-card-workshop",
    badge: "Model Workshop",
    title: "Model Comp Card Workshop",
    tagline: "Build Your Portfolio. Book More Jobs.",
    date: "Ongoing — Rolling Enrollment",
    location: "Miami, FL",
    duration: "Half Day (4 hrs)",
    capacity: "10 Models Max",
    price: 250,
    description:
      "A hands-on session covering everything you need to build a professional model comp card from scratch — posing, styling, photography direction, and layout. Walk out with a ready-to-send comp card.",
    perks: [
      "Professional photographer on set",
      "Styling consultation included",
      "Digital comp card layout & design",
      "Up to 4 selects retouched",
      "Industry Q&A with a working booker",
    ],
    image: "/events/G47A3871.jpg",
  },
  {
    id: "runway-coaching",
    badge: "Model Intensive",
    title: "Runway Coaching Intensive",
    tagline: "Walk Like You Own It.",
    date: "Monthly — See Schedule",
    location: "Miami Beach, FL",
    duration: "3 Hours",
    capacity: "12 Models Max",
    price: 150,
    description:
      "Work directly with our runway director to refine your walk, turns, and stage presence. From basic technique to advanced runway skills — this session is for models at every level.",
    perks: [
      "Small group — maximum attention",
      "Video review of your walk",
      "Feedback from Fusion runway director",
      "Certificate of completion",
      "Priority consideration for Fusion model calls",
    ],
    image: "/events/G47A3467.jpg",
  },
  {
    id: "designer-launch",
    badge: "Designer Workshop",
    title: "From Sketch to Runway",
    tagline: "Ready Your Collection for the Stage.",
    date: "Quarterly",
    location: "Miami, FL",
    duration: "Full Day (6 hrs)",
    capacity: "8 Designers Max",
    price: 400,
    description:
      "A full-day workshop for independent designers preparing to show a collection. Covers show production basics, model casting, fitting sessions, music & staging, and backstage logistics.",
    perks: [
      "One-on-one production consultation",
      "Access to Fusion model talent pool",
      "Stage and backstage walkthrough",
      "Feedback on collection presentation",
      "Fast-track application to upcoming Fusion events",
    ],
    image: "/events/DSC07799.jpg",
  },
];

export default function WorkshopsPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 max-w-4xl mx-auto text-center">
        <p className="font-label tracking-[0.3em] text-accent text-xs uppercase mb-6">
          Education & Training
        </p>
        <h1 className="font-display font-light text-5xl md:text-7xl text-white leading-tight mb-8">
          Workshops &<br />
          <span className="text-gradient-green">Intensives</span>
        </h1>
        <p className="text-muted-dark text-sm leading-relaxed max-w-2xl mx-auto mb-10">
          Practical, hands-on sessions for models and designers who are serious
          about leveling up. Small groups, industry professionals, real results.
        </p>
        <Button href="#workshops" variant="primary">
          View Workshops
        </Button>
      </section>

      {/* Stats */}
      <section className="bg-surface border-y border-border py-12 mb-0">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8 text-center divide-x divide-border">
          {[
            { value: "200+", label: "Alumni Trained" },
            { value: "10", label: "Max Per Session" },
            { value: "Miami", label: "Based" },
          ].map((s) => (
            <div key={s.label} className="px-4">
              <div className="font-display text-3xl text-gradient-green mb-1">
                {s.value}
              </div>
              <div className="font-label tracking-widest text-[9px] text-muted-dark uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workshop Cards */}
      <section id="workshops" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <SectionHeader eyebrow="Upcoming" title="Available Workshops" />
        {workshops.map((w, i) => (
          <ScrollReveal key={w.id} delay={i * 0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border overflow-hidden">
              <div className="relative h-72 lg:h-auto">
                <Image
                  src={w.image}
                  alt={w.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              </div>
              <div className="bg-surface p-10 flex flex-col justify-between">
                <div>
                  <Badge variant="accent" className="mb-4">
                    {w.badge}
                  </Badge>
                  <h2 className="font-display font-light text-3xl text-white mb-2">
                    {w.title}
                  </h2>
                  <p className="font-display text-lg text-white/50 italic mb-6">
                    {w.tagline}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-muted-dark text-xs">
                      <Calendar size={12} className="text-accent flex-shrink-0" />
                      {w.date}
                    </div>
                    <div className="flex items-center gap-2 text-muted-dark text-xs">
                      <MapPin size={12} className="text-accent flex-shrink-0" />
                      {w.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-dark text-xs">
                      <Clock size={12} className="text-accent flex-shrink-0" />
                      {w.duration}
                    </div>
                    <div className="flex items-center gap-2 text-muted-dark text-xs">
                      <Users size={12} className="text-accent flex-shrink-0" />
                      {w.capacity}
                    </div>
                  </div>
                  <p className="text-muted-dark text-sm leading-relaxed mb-6">
                    {w.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {w.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-center gap-2 text-muted-dark text-xs"
                      >
                        <span className="text-accent">✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <span className="font-display text-3xl text-white">
                      ${w.price}
                    </span>
                    <span className="text-muted-dark text-xs ml-2">per person</span>
                  </div>
                  <Button href="/contact" variant="primary" className="flex-1">
                    Reserve a Spot
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* Private / Custom */}
      <section className="bg-surface border-y border-border py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-label tracking-[0.3em] text-accent text-xs uppercase mb-6">
            Private Sessions
          </p>
          <h2 className="font-display font-light text-4xl text-white mb-6">
            Need Something Custom?
          </h2>
          <p className="text-muted-dark text-sm leading-relaxed max-w-xl mx-auto mb-10">
            We offer private coaching sessions for individual models, group
            bookings for agencies, and tailored workshops for fashion programs
            and schools. Contact us to discuss your needs.
          </p>
          <Button href={`mailto:${siteConfig.contact.email}`} variant="ghost">
            {siteConfig.contact.email}
          </Button>
        </div>
      </section>
    </div>
  );
}
