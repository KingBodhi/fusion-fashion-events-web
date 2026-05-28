import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Palette, User, Ticket } from "lucide-react";

export const metadata = buildMetadata({
  title: "Register — Designers, Models & Attendees",
  description: "Apply to show as a designer, walk as a model, or get tickets for Fusion Fashion Events in Miami.",
  path: "/register",
});

const options = [
  {
    icon: Palette,
    title: "I'm a Designer",
    description: "Showcase your collection on Miami's premier runway. Applications reviewed on a rolling basis.",
    perks: ["Shared or solo runway slot", "Professional production", "Press & buyer invitations", "Social media coverage"],
    cta: "Apply as Designer",
    href: "/register/designer",
    accent: true,
  },
  {
    icon: User,
    title: "I'm a Model",
    description: "Walk the runway at Swim Week, Hollywood Couture, and more. Open calls throughout the year.",
    perks: ["Open to all experience levels", "Professional direction", "Portfolio opportunities", "Agency exposure"],
    cta: "Apply as Model",
    href: "/register/model",
    accent: false,
  },
  {
    icon: Ticket,
    title: "I Want Tickets",
    description: "Attend Miami's most electric fashion events. General admission through full VIP packages.",
    perks: ["Multiple ticket tiers", "VIP packages available", "After-party access", "Early bird pricing"],
    cta: "Browse Tickets",
    href: "/events",
    accent: false,
  },
];

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-label tracking-[0.3em] text-accent text-xs uppercase mb-4">Join Fusion</p>
          <h1 className="font-display font-light text-5xl md:text-7xl text-white mb-6">
            Find Your Place
            <br />on the Runway
          </h1>
          <p className="text-muted-dark text-sm max-w-xl mx-auto">
            Whether you&apos;re creating, walking, or watching — there&apos;s a Fusion experience built for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((opt, i) => (
            <ScrollReveal key={opt.title} delay={i * 0.1}>
              <div className={`border p-8 flex flex-col h-full transition-colors hover:border-accent/50 ${opt.accent ? "border-accent bg-accent/5" : "border-border bg-surface"}`}>
                <opt.icon size={28} className="text-accent mb-6" />
                <h2 className="font-display text-2xl text-white mb-3">{opt.title}</h2>
                <p className="text-muted-dark text-sm leading-relaxed mb-6">{opt.description}</p>
                <ul className="flex-1 flex flex-col gap-2 mb-8">
                  {opt.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm text-white/70">
                      <span className="text-accent mt-0.5 text-xs">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <Button href={opt.href} variant={opt.accent ? "primary" : "ghost"} className="w-full">
                  {opt.cta}
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 text-center border border-border bg-surface p-10">
          <p className="font-label tracking-widest text-xs text-muted-dark uppercase mb-4">Interested in Sponsorship?</p>
          <h3 className="font-display text-3xl text-white mb-4">Put Your Brand on Miami&apos;s Runway</h3>
          <p className="text-muted-dark text-sm mb-8 max-w-xl mx-auto">
            Corporate sponsorship packages available from $5,000. Reach fashion-forward audiences across Miami, South Florida, and beyond.
          </p>
          <Button href="/sponsors" variant="gold">View Sponsorship Tiers</Button>
        </div>
      </div>
    </div>
  );
}
