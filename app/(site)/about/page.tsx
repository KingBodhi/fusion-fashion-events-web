import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Button } from "@/components/ui/Button";

export const metadata = buildMetadata({
  title: "About Fusion Fashion Events — Miami's Runway Platform",
  description: "Learn about Fusion Fashion Events, Miami's leading fashion event producer. Our story, mission, and the team behind the runway.",
  path: "/about",
});

const milestones = [
  { year: "2021", label: "First Runway Show", description: "Fusion launched its inaugural runway show in Miami, debuting 5 designers to a sold-out crowd." },
  { year: "2023", label: "Swim Week Debut", description: "Fusion Swim Week launched as Miami's independent alternative to the big swim week platforms." },
  { year: "2024", label: "Hollywood Couture", description: "A brand-new event format — couture nights with supercars, live music, and South Florida's top designers." },
  { year: "2025", label: "200+ Designers", description: "Fusion crossed 200 featured designers and 5,000 cumulative event attendees." },
  { year: "2026", label: "Next Chapter", description: "Fusion Swim Week 2026 expands with 7 nights of shows and a new VIP experience program." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-label tracking-[0.3em] text-accent text-xs uppercase mb-6">Our Story</p>
          <h1 className="font-display font-light text-5xl md:text-7xl text-white leading-tight mb-8">
            Miami&apos;s
            <br />
            Runway
            <br />
            <span className="text-gradient-green">Platform</span>
          </h1>
          <p className="text-muted-dark text-sm leading-relaxed mb-6">
            Fusion Fashion Events was born from a simple belief: Miami&apos;s fashion community deserves a world-class stage that reflects the city&apos;s energy, diversity, and creativity.
          </p>
          <p className="text-muted-dark text-sm leading-relaxed mb-8">
            From our first runway show in 2021 to Fusion Swim Week 2026, we&apos;ve built a platform where independent designers get the production quality of the major fashion capitals — without losing the Miami soul that makes every show unique.
          </p>
          <Button href="/register" variant="primary">Get Involved</Button>
        </div>
        <ScrollReveal>
          <div className="relative h-[500px] w-full overflow-hidden">
            <Image
              src="/events/G47A3871.jpg"
              alt="Fusion Fashion Events runway show"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Mission */}
      <section className="bg-surface border-y border-border py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-label tracking-[0.3em] text-accent text-xs uppercase mb-6">Our Mission</p>
          <blockquote className="font-display font-light text-3xl md:text-5xl text-white leading-tight">
            &ldquo;To create a stage where Miami&apos;s most exciting fashion talent can shine on their own terms — with production, exposure, and community they deserve.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <p className="font-label tracking-[0.3em] text-accent text-xs uppercase text-center mb-16">Milestones</p>
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          {milestones.map((m, i) => (
            <ScrollReveal key={m.year} delay={i * 0.1}>
              <div className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="flex-1 md:text-right pl-16 md:pl-0">
                  {i % 2 === 0 && (
                    <>
                      <div className="font-label text-4xl text-gradient-green mb-2">{m.year}</div>
                      <h3 className="font-display text-xl text-white mb-2">{m.label}</h3>
                      <p className="text-muted-dark text-sm">{m.description}</p>
                    </>
                  )}
                </div>
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-accent rounded-full border-2 border-black" />
                <div className="flex-1 pl-16 md:pl-8">
                  {i % 2 !== 0 && (
                    <>
                      <div className="font-label text-4xl text-gradient-green mb-2">{m.year}</div>
                      <h3 className="font-display text-xl text-white mb-2">{m.label}</h3>
                      <p className="text-muted-dark text-sm">{m.description}</p>
                    </>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
