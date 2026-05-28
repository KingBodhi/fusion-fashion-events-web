import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Designer Application — Show at Fusion Fashion Events Miami",
  description: "Apply to showcase your collection at Fusion Swim Week 2026 or Hollywood Couture. Open applications for independent designers.",
  path: "/register/designer",
});

export default function DesignerApplicationPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-label tracking-[0.3em] text-accent text-xs uppercase mb-4">Designer Application</p>
        <h1 className="font-display font-light text-5xl md:text-6xl text-white leading-tight mb-4">
          Showcase Your
          <br />Collection
        </h1>
        <p className="text-muted-dark text-sm leading-relaxed mb-10 max-w-xl">
          Applications are reviewed on a rolling basis. We accept swimwear, resort wear, couture, and streetwear collections. All experience levels welcome.
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
              <input type="text" name="first_name" required placeholder="Maria"
                className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Last Name *</label>
              <input type="text" name="last_name" required placeholder="Santos"
                className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
            </div>
          </div>

          <div>
            <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Brand / Label Name *</label>
            <input type="text" name="brand" required placeholder="Your brand name"
              className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Email *</label>
              <input type="email" name="email" required placeholder="you@brand.com"
                className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Phone</label>
              <input type="tel" name="phone" placeholder="+1 (305) 000-0000"
                className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Instagram Handle</label>
              <input type="text" name="instagram" placeholder="@yourbrand"
                className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Website</label>
              <input type="url" name="website" placeholder="https://yourbrand.com"
                className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
            </div>
          </div>

          <div>
            <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Which Event? *</label>
            <select name="event" required
              className="w-full bg-black border border-border text-white/70 text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors">
              <option value="">Select an event</option>
              <option>Fusion Swim Week 2026 (May 24–31)</option>
              <option>Hollywood Couture (April 11, 2026)</option>
              <option>Open to any event</option>
            </select>
          </div>

          <div>
            <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Collection Style / Category *</label>
            <select name="category" required
              className="w-full bg-black border border-border text-white/70 text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors">
              <option value="">Select a category</option>
              <option>Swimwear / Resort Wear</option>
              <option>Couture / Evening Wear</option>
              <option>Ready-to-Wear</option>
              <option>Streetwear</option>
              <option>Lingerie / Intimates</option>
              <option>Accessories</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Tell Us About Your Collection *</label>
            <textarea name="body" required rows={5} placeholder="Describe your collection, inspiration, number of looks, and why you want to show at Fusion..."
              className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none" />
          </div>

          <div>
            <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Lookbook / Portfolio Link</label>
            <input type="url" name="portfolio" placeholder="Google Drive, Dropbox, or website link"
              className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
          </div>

          <button type="submit"
            className="w-full bg-accent text-white font-label tracking-widest text-xs uppercase py-4 hover:bg-accent-dim transition-colors">
            Submit Application
          </button>
          <p className="text-muted-dark text-xs text-center">
            We review all applications within 5–7 business days and will follow up via email.
          </p>
        </form>
      </div>
    </div>
  );
}
