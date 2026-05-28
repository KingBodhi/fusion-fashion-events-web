import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

export const metadata = buildMetadata({
  title: "Contact Fusion Fashion Events — Miami",
  description: "Get in touch with Fusion Fashion Events. Questions about tickets, designer applications, model casting, or sponsorship — we're here.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left */}
        <div>
          <p className="font-label tracking-[0.3em] text-accent text-xs uppercase mb-6">Contact</p>
          <h1 className="font-display font-light text-5xl md:text-6xl text-white leading-tight mb-8">
            Let&apos;s
            <br />
            Connect
          </h1>
          <p className="text-muted-dark text-sm leading-relaxed mb-10">
            Questions about tickets, designer applications, model casting, press credentials, or sponsorship? Reach out and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="flex flex-col gap-4 mb-10">
            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors text-sm">
              <Mail size={16} className="text-accent" />
              {siteConfig.contact.email}
            </a>
            <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors text-sm">
              <InstagramIcon size={16} className="text-accent" />
              @fusionfashionevents
            </a>
            <a href={siteConfig.contact.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors text-sm">
              <FacebookIcon size={16} className="text-accent" />
              Fusion Fashion Events
            </a>
            <a href={siteConfig.contact.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors text-sm">
              <YoutubeIcon size={16} className="text-accent" />
              YouTube Channel
            </a>
          </div>
          <div className="border border-border bg-surface p-6">
            <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mb-3">Based In</p>
            <p className="text-white text-sm">Miami, Florida</p>
            <p className="text-muted-dark text-xs mt-1">Serving South Florida & Beyond</p>
          </div>
        </div>

        {/* Form */}
        <div className="border border-border bg-surface p-8">
          <h2 className="font-display text-2xl text-white mb-8">Send a Message</h2>
          <form className="flex flex-col gap-5" action={`mailto:${siteConfig.contact.email}`} method="GET">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">First Name</label>
                <input
                  type="text"
                  name="first"
                  required
                  className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Maria"
                />
              </div>
              <div>
                <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Last Name</label>
                <input
                  type="text"
                  name="last"
                  required
                  className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Santos"
                />
              </div>
            </div>
            <div>
              <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Inquiry Type</label>
              <select className="w-full bg-black border border-border text-white/70 text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors">
                <option>General Inquiry</option>
                <option>Designer Application</option>
                <option>Model Casting</option>
                <option>Sponsorship</option>
                <option>Press / Media</option>
                <option>Tickets</option>
              </select>
            </div>
            <div>
              <label className="font-label tracking-widest text-[9px] text-muted-dark uppercase block mb-2">Message</label>
              <textarea
                name="body"
                required
                rows={5}
                className="w-full bg-black border border-border text-white text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Tell us how we can help..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-black font-label tracking-widest text-xs uppercase py-4 hover:bg-accent-dim transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
