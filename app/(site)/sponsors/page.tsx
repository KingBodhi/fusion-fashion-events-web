import sponsorsData from "@/data/sponsors.json";
import { buildMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Check } from "lucide-react";

export const metadata = buildMetadata({
  title: "Sponsor Fusion Fashion Events — Miami Fashion Week Partnerships",
  description: "Partner with Miami's premier fashion event platform. Sponsorship tiers from $5,000 to $25,000+. Reach fashion-forward audiences.",
  path: "/sponsors",
});

export default function SponsorsPage() {
  const { tiers } = sponsorsData;

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 max-w-4xl mx-auto text-center">
        <p className="font-label tracking-[0.3em] text-accent text-xs uppercase mb-6">Partnerships</p>
        <h1 className="font-display font-light text-5xl md:text-7xl text-white leading-tight mb-8">
          Put Your Brand
          <br />
          on <span className="text-gradient-green">Miami&apos;s Runway</span>
        </h1>
        <p className="text-muted-dark text-sm leading-relaxed max-w-2xl mx-auto mb-10">
          Fusion Fashion Events delivers direct access to Miami&apos;s most fashion-forward, affluent, and engaged audiences. From intimate VIP experiences to title sponsorships, we build partnerships that deliver real ROI.
        </p>
        <div className="grid grid-cols-3 gap-8 border border-border bg-surface p-8 mb-12">
          {[
            { value: "5K+", label: "Annual Attendees" },
            { value: "50+", label: "Shows & Events" },
            { value: "Miami", label: "Fashion Capital" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl text-gradient-green mb-1">{s.value}</div>
              <div className="font-label tracking-widest text-[9px] text-muted-dark uppercase">{s.label}</div>
            </div>
          ))}
        </div>
        <Button href="/contact" variant="primary" className="glow-green-sm">Inquire About Sponsorship</Button>
      </section>

      {/* Tiers */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="Packages" title="Sponsorship Tiers" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.id} delay={i * 0.1}>
                <div className={`border p-8 flex flex-col h-full ${tier.id === "platinum" ? "border-gold bg-gold/5" : "border-border bg-black"}`}>
                  <div
                    className="font-label tracking-widest text-xs uppercase mb-2"
                    style={{ color: tier.color }}
                  >
                    {tier.name}
                  </div>
                  {tier.price > 0 ? (
                    <div className="font-display text-3xl text-white mb-6">
                      ${tier.price.toLocaleString()}
                      <span className="text-muted-dark text-base font-body">/season</span>
                    </div>
                  ) : (
                    <div className="font-display text-2xl text-white mb-6">By Application</div>
                  )}
                  <ul className="flex-1 flex flex-col gap-3 mb-8">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-muted-dark text-xs">
                        <Check size={12} className="text-accent mt-0.5 flex-shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href="/contact"
                    variant={tier.id === "platinum" ? "gold" : "ghost"}
                    className="w-full"
                  >
                    Inquire
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <h2 className="font-display font-light text-4xl text-white mb-6">Ready to Talk?</h2>
        <p className="text-muted-dark text-sm mb-8">
          Custom packages available. We&apos;ll work with you to build a partnership that meets your brand goals and budget.
        </p>
        <Button href="/contact" variant="primary">Get in Touch</Button>
      </section>
    </div>
  );
}
