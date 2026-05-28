import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms of Service for Fusion Fashion Events.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-label tracking-widest text-accent text-xs uppercase mb-4">Legal</p>
        <h1 className="font-display font-light text-5xl text-white mb-8">Terms of Service</h1>
        <p className="text-muted-dark text-xs mb-10">Last updated: April 2026</p>
        <div className="space-y-8 text-muted-dark text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-2xl text-white mb-3">Ticket Purchases</h2>
            <p>All ticket sales are final unless an event is cancelled by Fusion Fashion Events. In the event of cancellation, a full refund will be issued to the original payment method within 10 business days.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white mb-3">Designer & Model Applications</h2>
            <p>Submission of an application does not guarantee acceptance. Fusion Fashion Events reserves the right to accept or decline any application at its sole discretion. Application fees (where applicable) are non-refundable.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white mb-3">Event Conduct</h2>
            <p>All attendees, models, and designers are expected to conduct themselves professionally and respectfully. Fusion Fashion Events reserves the right to remove any individual from an event without refund for conduct deemed disruptive or inappropriate.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white mb-3">Photography & Media</h2>
            <p>Events may be photographed and filmed. By attending a Fusion Fashion Event, you consent to being captured in event photography and video content used for marketing purposes.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white mb-3">Contact</h2>
            <p>Questions regarding these terms? Email <a href={`mailto:${siteConfig.contact.email}`} className="text-accent hover:underline">{siteConfig.contact.email}</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
