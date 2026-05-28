import Image from "next/image";
import { CountdownTimer } from "@/components/shared/CountdownTimer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { buildMetadata } from "@/lib/metadata";
import { getEventBySlug } from "@/lib/events";
import { Calendar, MapPin, Clock, ChevronRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "Fusion Swim Week 2026 — Miami Swimwear Fashion Show | May 24–31",
  description:
    "Experience Miami's most electrifying swimwear runway event. 7 nights of designer showcases, VIP parties & industry networking. May 24–31, 2026.",
  path: "/swim-week",
});

export default function SwimWeekPage() {
  const event = getEventBySlug("fusion-swim-week-2026")!;

  return (
    <div className="bg-black">
      {/* Hero */}
      <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          <Image
            src="/events/aerial_shot_swim_week.png"
            alt="Fusion Swim Week 2026 — Miami Beach aerial"
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-6">Swim Week 2026</Badge>
            <h1 className="font-display font-light text-6xl md:text-8xl text-white leading-none mb-4">
              Fusion
              <br />
              <span className="text-gradient-green">Swim Week</span>
            </h1>
            <p className="font-label tracking-[0.3em] text-white/60 text-sm mb-8">
              MAY 24–31 · 2026 · MIAMI BEACH, FLORIDA
            </p>
            <p className="text-white/70 text-base leading-relaxed max-w-xl mb-10">
              Seven nights of world-class swimwear runway shows, VIP parties, and industry networking in the heart of Miami Beach. The event Miami&apos;s fashion community has been waiting for.
            </p>
            <div className="mb-10">
              <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mb-4">
                Countdown to Opening Night
              </p>
              <CountdownTimer targetDate="2026-05-24T20:00:00" variant="hero" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/register" variant="primary" className="glow-green-sm">
                Get VIP Tickets
              </Button>
              <Button href="/register/designer" variant="ghost">
                Apply as Designer
              </Button>
              <Button href="/register/model" variant="ghost">
                Model Open Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="bg-surface border-y border-border py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-border">
          {[
            { icon: Calendar, label: "Dates", value: "May 24–31, 2026" },
            { icon: MapPin, label: "Location", value: "Miami Beach, FL" },
            { icon: Clock, label: "Duration", value: "7 Nights of Shows" },
            { icon: ChevronRight, label: "Applications", value: "Open Now" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center md:px-8">
              <Icon size={18} className="text-accent mx-auto mb-3" />
              <p className="font-label tracking-widest text-[9px] text-muted-dark uppercase mb-1">{label}</p>
              <p className="font-display text-lg text-white">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About the Event */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <ScrollReveal>
          <div className="relative h-[500px] w-full overflow-hidden">
            <Image
              src="/events/G47A3467.jpg"
              alt="Fusion Swim Week runway show"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6">
              <Badge variant="dark">Fusion Swim Week 2025</Badge>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="font-label tracking-[0.3em] text-accent text-xs uppercase mb-4">About the Event</p>
          <h2 className="font-display font-light text-4xl md:text-5xl text-white leading-tight mb-6">
            Miami&apos;s Most Electrifying Swimwear Stage
          </h2>
          <p className="text-muted-dark text-sm leading-relaxed mb-4">
            Fusion Swim Week brings together the most exciting independent swimwear designers for seven electric nights on the Miami Beach runway. From emerging talent to established brands, our curated lineup delivers production quality that rivals the biggest stages in fashion.
          </p>
          <p className="text-muted-dark text-sm leading-relaxed mb-8">
            With Miami&apos;s energy as your backdrop — ocean breezes, electric nightlife, and the most fashion-forward crowd in the Southeast — Fusion Swim Week is the platform that launches careers and brands.
          </p>
          <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { value: "7", label: "Nights" },
              { value: "20+", label: "Designers" },
              { value: "1K+", label: "Attendees" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl text-gradient-green">{s.value}</div>
                <div className="font-label tracking-widest text-[9px] text-muted-dark uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Schedule */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="The Schedule" title="7 Nights. One Stage." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {event.schedule?.map((day, i) => (
              <ScrollReveal key={day.date} delay={i * 0.1}>
                <div className="bg-black border border-border hover:border-accent/40 transition-colors p-6">
                  <Badge variant="accent" className="mb-4">{day.label}</Badge>
                  <p className="font-label tracking-widest text-[9px] text-muted-dark uppercase mb-4">
                    {new Date(day.date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                  </p>
                  {day.events.map((e) => (
                    <div key={e.title} className="mb-3 border-l-2 border-accent/30 pl-3">
                      <p className="font-label text-[10px] tracking-wider text-accent">{e.time}</p>
                      <p className="text-white text-sm font-light">{e.title}</p>
                      {e.location && (
                        <p className="text-muted-dark text-[11px]">{e.location}</p>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            ))}
            {/* Placeholder days */}
            {[...Array(4)].map((_, i) => (
              <ScrollReveal key={`tba-${i}`} delay={(i + 3) * 0.1}>
                <div className="bg-black border border-border/50 p-6 opacity-60">
                  <Badge variant="dark" className="mb-4">Night {i + 4}</Badge>
                  <p className="font-label tracking-widest text-[9px] text-muted-dark uppercase mb-4">
                    May {25 + i}, 2026
                  </p>
                  <p className="font-display text-white/40 text-sm">Schedule Coming Soon</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ticket Tiers */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Tickets"
          title="Choose Your Experience"
          description="From general admission runway access to full VIP packages — find the Swim Week experience that fits you."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {event.ticketTiers.map((tier) => (
            <ScrollReveal key={tier.id}>
              <div className={`border p-8 flex flex-col h-full ${tier.id === "vip" ? "border-accent bg-accent/5" : "border-border bg-surface"}`}>
                {tier.id === "vip" && (
                  <Badge variant="accent" className="self-start mb-4">Most Popular</Badge>
                )}
                <h3 className="font-display text-2xl text-white mb-2">{tier.name}</h3>
                <div className="mb-6">
                  {tier.price === 0 ? (
                    <span className="font-label text-3xl text-accent">Free</span>
                  ) : (
                    <span className="font-label text-3xl text-white">${tier.price}</span>
                  )}
                  {tier.earlyBirdPrice && (
                    <p className="font-label text-xs text-accent tracking-wider mt-1">
                      Early Bird: ${tier.earlyBirdPrice} until {tier.earlyBirdDeadline}
                    </p>
                  )}
                </div>
                <ul className="flex-1 flex flex-col gap-2 mb-8">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-muted-dark text-sm">
                      <span className="text-accent mt-0.5">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <Button
                  href="/register"
                  variant={tier.id === "vip" ? "primary" : "ghost"}
                  className="w-full"
                >
                  {tier.price === 0 ? "Apply Now" : "Get Tickets"}
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <SectionHeader eyebrow="FAQ" title="Common Questions" />
        {[
          { q: "Who can apply as a designer?", a: "We welcome independent swimwear, resort wear, and lingerie designers at all stages of their career. Applications are reviewed on a rolling basis." },
          { q: "Is there a model open call?", a: "Yes — model applications are open year-round. Submit your comp card and measurements through our model registration page." },
          { q: "Can I attend as a member of the press?", a: "Media credentials are available for qualified press and content creators. Apply through our contact form with your publication details." },
          { q: "How do I become a sponsor?", a: "Sponsorship packages start at $5,000. Visit our sponsors page to view tier details and submit an inquiry." },
          { q: "Is there an age requirement?", a: "General admission events are 18+. Family events during Swim Week may have different policies — see individual event pages for details." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="border-b border-border py-6">
              <h3 className="font-display text-lg text-white mb-3">{item.q}</h3>
              <p className="text-muted-dark text-sm leading-relaxed">{item.a}</p>
            </div>
          </ScrollReveal>
        ))}
      </section>
    </div>
  );
}
