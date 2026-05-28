import { LiveDashboard } from "@/components/live/LiveDashboard";
import { OffAirHero } from "@/components/live/OffAirHero";
import { ReplaysGrid } from "@/components/live/ReplaysGrid";
import { SimulcastRail } from "@/components/live/SimulcastRail";
import { BrandCTARail } from "@/components/live/BrandCTARail";
import { getLiveState } from "@/lib/live-state";
import { listRecordings } from "@/lib/cloudflare-stream";
import { liveConfig } from "@/config/live";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Live — Fusion Fashion Events",
  description:
    "Watch Fusion Fashion Events live from Miami. Runway shows, designer drops, and the Model Pickleball series — with looks dropping into the shopping rail as designers walk.",
  path: "/live",
});

export const dynamic = "force-dynamic";

async function safeListRecordings(liveInputId: string) {
  try {
    return await listRecordings(liveInputId, 8);
  } catch {
    return [];
  }
}

export default async function LivePage() {
  const [state, recordings] = await Promise.all([
    getLiveState(),
    safeListRecordings(liveConfig.liveInputId),
  ]);

  const hasLiveShow = state.show?.status === "LIVE";

  return (
    <>
      {hasLiveShow ? (
        <LiveDashboard
          initialState={state}
          customerSubdomain={liveConfig.customerSubdomain}
          fallbackLiveInputId={liveConfig.liveInputId}
        />
      ) : (
        <OffAirHero nextShow={state.next_show} />
      )}

      <SimulcastRail />

      <ReplaysGrid
        recordings={recordings}
        customerSubdomain={liveConfig.customerSubdomain}
      />

      {!hasLiveShow && <BrandCTARail />}
    </>
  );
}
