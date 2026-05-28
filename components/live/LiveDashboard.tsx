"use client";

import { useEffect, useState } from "react";
import { StreamPlayer } from "./StreamPlayer";
import { ShoppingRail } from "./ShoppingRail";
import { LineupWidget } from "./LineupWidget";
import type { LiveState } from "@/lib/live-state";
import { Radio } from "lucide-react";

export function LiveDashboard({
  initialState,
  customerSubdomain,
  fallbackLiveInputId,
}: {
  initialState: LiveState;
  customerSubdomain: string;
  fallbackLiveInputId: string;
}) {
  const [state, setState] = useState<LiveState>(initialState);
  const [now, setNow] = useState<number>(Date.now());
  const [connected, setConnected] = useState(false);

  // SSE subscription
  useEffect(() => {
    const source = new EventSource("/api/live/stream");
    source.addEventListener("state", (e) => {
      try {
        const next = JSON.parse((e as MessageEvent).data) as LiveState;
        setState(next);
      } catch {
        /* ignore parse errors */
      }
    });
    source.addEventListener("ping", () => setConnected(true));
    source.addEventListener("open", () => setConnected(true));
    source.onerror = () => setConnected(false);
    return () => source.close();
  }, []);

  // Tick clock once per second so lineup state updates without server roundtrip
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const show = state.show;
  const isLive = show?.status === "LIVE";
  const liveInputId = show?.live_input_id ?? fallbackLiveInputId;
  const currentSegmentBrand = show?.segments.find((s) => {
    const start = new Date(s.starts_at).getTime();
    const end = start + s.duration_s * 1000;
    return now >= start && now < end;
  })?.brand.name;

  return (
    <div className="bg-black">
      <section className="pt-32 pb-8 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${
              isLive ? "bg-accent animate-pulse" : "bg-muted-dark"
            }`}
            aria-hidden
          />
          <span
            className={`font-label tracking-widest text-[10px] uppercase px-3 py-1 ${
              isLive ? "bg-accent text-black" : "bg-surface-2 text-white border border-border"
            }`}
          >
            {isLive ? "Live Now" : "Off Air"}
          </span>
          {connected && (
            <span className="font-label tracking-widest text-[9px] uppercase text-muted-dark">
              · Updates live
            </span>
          )}
        </div>

        <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-3">
          Live broadcast hub
        </p>
        <h1 className="font-display font-light text-5xl md:text-7xl text-white leading-none mb-4">
          {show ? (
            <>
              <span className="block">{show.title}</span>
              {show.subtitle && (
                <span className="block text-gradient-green mt-2 text-3xl md:text-5xl">
                  {show.subtitle}
                </span>
              )}
            </>
          ) : (
            <>
              Tonight on
              <br />
              <span className="text-gradient-green">Fusion Fashion Events</span>
            </>
          )}
        </h1>

        <p className="text-muted-dark text-sm max-w-xl leading-relaxed">
          {isLive
            ? `We're live from Miami. ${
                currentSegmentBrand ? `On the runway now: ${currentSegmentBrand}. ` : ""
              }Looks drop into the shopping rail as designers walk.`
            : "The broadcast is currently off air. Catch our next scheduled show or browse the replays below."}
        </p>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          <div>
            <StreamPlayer
              liveInputId={liveInputId}
              customerSubdomain={customerSubdomain}
              title={show?.title ?? "Fusion Fashion Events Live"}
            />
            <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mt-3">
              Source · Cloudflare Stream · 1080p · 6 Mbps
            </p>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <p className="font-label tracking-[0.3em] text-[10px] text-accent uppercase">
              Shop the broadcast
            </p>
            <ShoppingRail pinned={state.pinned} brandName={currentSegmentBrand} />
          </aside>
        </div>
      </section>

      {show && show.segments.length > 0 && (
        <section className="px-6 max-w-7xl mx-auto pb-12">
          <LineupWidget show={show} now={now} />
        </section>
      )}
    </div>
  );
}
