import { buildMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/config/site";
import { ExternalLink } from "lucide-react";

export const metadata = buildMetadata({
  title: "Press & Media — Fusion Fashion Events Miami",
  description:
    "Press coverage, media assets, and credentials for Fusion Fashion Events. Miami's premier fashion runway platform.",
  path: "/press",
});

const coverage = [
  {
    publication: "Miami Herald",
    headline: "Fusion Swim Week Is the Independent Alternative Miami Fashion Has Been Waiting For",
    date: "June 2025",
    href: "#",
  },
  {
    publication: "Ocean Drive Magazine",
    headline: "The Designers Turning Heads at Fusion Fashion Events",
    date: "May 2025",
    href: "#",
  },
  {
    publication: "WWD",
    headline: "Miami's Independent Runway Scene Is Having a Moment",
    date: "June 2024",
    href: "#",
  },
  {
    publication: "South Florida Business Journal",
    headline: "Fusion Fashion Events Crosses 200 Designers and 5,000 Attendees",
    date: "September 2025",
    href: "#",
  },
];

const assets = [
  { label: "Brand Logos (PNG & SVG)", description: "Full color, white, and dark variants on transparent backgrounds." },
  { label: "Event Photography", description: "High-resolution runway, backstage, and event photography from past shows." },
  { label: "Founder Headshots", description: "Professional portraits for editorial use." },
  { label: "Event Fact Sheets", description: "One-page summaries for Fusion Swim Week 2026 and Hollywood Couture." },
];

const facts = [
  { value: "2021", label: "Founded" },
  { value: "5,000+", label: "Annual Attendees" },
  { value: "200+", label: "Featured Designers" },
  { value: "Miami", label: "Headquarters" },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 max-w-4xl mx-auto">
        <p className="font-label tracking-[0.3em] text-accent text-xs uppercase mb-6">
          Press & Media
        </p>
        <h1 className="font-display font-light text-5xl md:text-7xl text-white leading-tight mb-8">
          Media
          <br />
          Resources
        </h1>
        <p className="text-muted-dark text-sm leading-relaxed max-w-2xl mb-10">
          Fusion Fashion Events is Miami&apos;s leading independent runway platform.
          For press credentials, asset requests, interviews, and media inquiries,
          contact our communications team.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href={`mailto:${siteConfig.contact.email}`} variant="primary">
            Press Inquiry
          </Button>
          <Button href="#assets" variant="ghost">
            Download Assets
          </Button>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="bg-surface border-y border-border py-12">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
          {facts.map((f) => (
            <div key={f.label} className="py-4 md:py-0 md:px-8">
              <div className="font-display text-3xl text-gradient-green mb-1">{f.value}</div>
              <div className="font-label tracking-widest text-[9px] text-muted-dark uppercase">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Coverage */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <SectionHeader eyebrow="In the News" title="Recent Coverage" />
        <div className="space-y-0 divide-y divide-border border border-border">
          {coverage.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <a
                href={item.href}
                className="flex items-start justify-between gap-6 p-6 hover:bg-surface transition-colors group"
              >
                <div>
                  <p className="font-label tracking-widest text-[10px] text-accent uppercase mb-2">
                    {item.publication} · {item.date}
                  </p>
                  <h3 className="font-display text-lg text-white group-hover:text-accent transition-colors leading-snug">
                    {item.headline}
                  </h3>
                </div>
                <ExternalLink
                  size={16}
                  className="text-muted-dark group-hover:text-accent transition-colors flex-shrink-0 mt-1"
                />
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Boilerplate */}
      <section className="bg-surface border-y border-border py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-label tracking-[0.3em] text-accent text-xs uppercase mb-6">
            About Fusion Fashion Events
          </p>
          <h2 className="font-display font-light text-3xl text-white mb-6">Boilerplate</h2>
          <blockquote className="text-muted-dark text-sm leading-relaxed border-l-2 border-accent pl-6 italic">
            &ldquo;Fusion Fashion Events is Miami&apos;s premier independent fashion event
            platform, producing runway shows, workshops, and industry events that
            connect emerging designers, professional models, and fashion-forward
            audiences. Founded in 2021, Fusion has featured over 200 independent
            designers and produced more than 50 shows across Fusion Swim Week,
            Hollywood Couture, and its growing workshop series. Fusion Fashion
            Events is headquartered in Miami, Florida.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Assets */}
      <section id="assets" className="py-24 px-6 max-w-5xl mx-auto">
        <SectionHeader eyebrow="Press Kit" title="Media Assets" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {assets.map((a, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="border border-border bg-surface p-6">
                <h3 className="font-display text-lg text-white mb-2">{a.label}</h3>
                <p className="text-muted-dark text-sm">{a.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <p className="text-muted-dark text-sm text-center">
          To request the press kit or specific assets, email{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-accent hover:underline"
          >
            {siteConfig.contact.email}
          </a>{" "}
          with your publication and intended use.
        </p>
      </section>

      {/* Credentials CTA */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <h2 className="font-display font-light text-4xl text-white mb-6">
          Covering Our Events?
        </h2>
        <p className="text-muted-dark text-sm leading-relaxed mb-8">
          Media credentials are available for qualified press, photographers, and
          content creators. Submit your credentials request at least two weeks
          before the event date.
        </p>
        <Button href={`mailto:${siteConfig.contact.email}`} variant="primary">
          Request Credentials
        </Button>
      </section>
    </div>
  );
}
