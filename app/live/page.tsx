import { StreamPlayer } from "@/components/live/StreamPlayer";
import { SimulcastRail } from "@/components/live/SimulcastRail";
import { BrandCTARail } from "@/components/live/BrandCTARail";
import { Badge } from "@/components/ui/Badge";
import { buildMetadata } from "@/lib/metadata";
import { getLiveInputStatus } from "@/lib/cloudflare-stream";
import { liveConfig } from "@/config/live";

export const metadata = buildMetadata({
  title: "Live — Fusion Fashion Events",
  description:
    "Watch Fusion Fashion Events broadcasts live from Miami. Runway shows, designer drops, and the Model Pickleball series — streaming across YouTube, Instagram, Facebook, and TikTok.",
  path: "/live",
});

export const dynamic = "force-dynamic";

async function getStatus() {
  try {
    return await getLiveInputStatus(liveConfig.liveInputId);
  } catch {
    return { isLive: false, liveVideoUid: null, currentReadyToStream: false };
  }
}

export default async function LivePage() {
  const status = await getStatus();
  const liveLabel = status.isLive ? "Live Now" : "Off Air";

  return (
    <div className="bg-black">
      <section className="pt-32 pb-10 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${
              status.isLive ? "bg-accent animate-pulse" : "bg-muted-dark"
            }`}
            aria-hidden
          />
          <Badge variant={status.isLive ? "accent" : "dark"}>{liveLabel}</Badge>
        </div>

        <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-3">
          Live broadcast hub
        </p>
        <h1 className="font-display font-light text-5xl md:text-7xl text-white leading-none mb-4">
          Tonight on
          <br />
          <span className="text-gradient-green">Fusion Fashion Events</span>
        </h1>
        <p className="text-muted-dark text-sm max-w-xl leading-relaxed">
          {status.isLive
            ? "We are live from Miami. Watch the broadcast below and shop featured brands directly from the rail."
            : "The broadcast is currently off air. Catch our next scheduled show or browse featured brands."}
        </p>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-10">
        <StreamPlayer
          liveInputId={liveConfig.liveInputId}
          customerSubdomain={liveConfig.customerSubdomain}
          title="Fusion Fashion Events Live"
        />
        <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mt-3">
          Source · Cloudflare Stream · 1080p · 6 Mbps
        </p>
      </section>

      <SimulcastRail />
      <BrandCTARail />
    </div>
  );
}
