import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Model Application — Miami Runway Casting | Fusion Fashion Events",
  description: "Apply to walk at Fusion Fashion Events. Open model calls for Swim Week 2026, Hollywood Couture, and workshops in Miami.",
  path: "/register/model",
});

export default function ModelApplicationPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-label tracking-[0.3em] text-accent text-xs uppercase mb-4">Model Open Call</p>
        <h1 className="font-display font-light text-5xl md:text-6xl text-white leading-tight mb-4">
          Walk the
          <br />Runway
        </h1>
        <p className="text-muted-dark text-sm leading-relaxed mb-10 max-w-xl">
          We cast models of all backgrounds and experience levels. Whether you&apos;re a seasoned pro or stepping on the runway for the first time, we&apos;d love to hear from you.
        </p>

        <form
          className="space-y-6 border border-border bg-surface p-8"
          action={`mailto:${siteConfig.contact.email}`}
          method="GET"
        >
          <h2 className="font-display text-2xl text-white mb-6">Your Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">First Name *</label>
              <input type="text" name="first_name" required placeholder="Jasmine"
                className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Last Name *</label>
              <input type="text" name="last_name" required placeholder="Okafor"
                className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Email *</label>
              <input type="email" name="email" required placeholder="you@example.com"
                className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Phone *</label>
              <input type="tel" name="phone" required placeholder="+1 (305) 000-0000"
                className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Height *</label>
              <input type="text" name="height" required placeholder="5&apos;9&quot;"
                className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Age *</label>
              <input type="number" name="age" required placeholder="22" min="18"
                className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Experience</label>
              <select name="experience"
                className="w-full bg-black border border-border text-white/70 text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors">
                <option>Beginner</option>
                <option>Some experience</option>
                <option>Professional</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Instagram Handle</label>
            <input type="text" name="instagram" placeholder="@yourhandle"
              className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
          </div>

          <div>
            <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Which Event(s)? *</label>
            <select name="event" required
              className="w-full bg-black border border-border text-white/70 text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors">
              <option value="">Select an event</option>
              <option>Fusion Swim Week 2026 (May 24–31)</option>
              <option>Hollywood Couture (April 11, 2026)</option>
              <option>Model Comp Card Workshop</option>
              <option>Open to any event</option>
            </select>
          </div>

          <div>
            <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Portfolio / Comp Card Link</label>
            <input type="url" name="portfolio" placeholder="Link to your photos or comp card"
              className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
          </div>

          <div>
            <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Anything Else?</label>
            <textarea name="body" rows={4} placeholder="Tell us about yourself, your look, and what makes you a great fit for Fusion..."
              className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none" />
          </div>

          <button type="submit"
            className="w-full bg-accent text-white font-label tracking-widest text-xs uppercase py-4 hover:bg-accent-dim transition-colors">
            Submit Application
          </button>
          <p className="text-muted-dark text-xs text-center">
            All applicants will be contacted within 7 business days. We cast all backgrounds, sizes, and experience levels.
          </p>
        </form>
      </div>
    </div>
  );
}
