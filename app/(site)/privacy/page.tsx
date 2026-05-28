import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Fusion Fashion Events.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-label tracking-widest text-accent text-xs uppercase mb-4">Legal</p>
        <h1 className="font-display font-light text-5xl text-white mb-8">Privacy Policy</h1>
        <p className="text-muted-dark text-xs mb-10">Last updated: April 2026</p>
        <div className="prose prose-invert max-w-none space-y-8 text-muted-dark text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-2xl text-white mb-3">Information We Collect</h2>
            <p>We collect information you provide directly — including name, email, phone number, and professional details submitted through registration and contact forms. We also collect analytics data about how visitors interact with our website.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white mb-3">How We Use Your Information</h2>
            <p>We use your information to process event registrations, respond to inquiries, send event-related communications, and improve our services. We do not sell your personal information to third parties.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white mb-3">Communications</h2>
            <p>By submitting a registration or contact form, you may receive email communications related to your inquiry or event registration. You may unsubscribe at any time.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-white mb-3">Contact</h2>
            <p>For privacy-related questions, contact us at <a href={`mailto:${siteConfig.contact.email}`} className="text-accent hover:underline">{siteConfig.contact.email}</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
