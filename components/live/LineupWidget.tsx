import type { LiveShow } from "@/lib/live-state";
import { Radio, Check, Clock } from "lucide-react";

type Segment = NonNullable<LiveShow>["segments"][number];

function segmentState(
  seg: Segment,
  now: number
): "DONE" | "LIVE" | "NEXT" {
  const start = new Date(seg.starts_at).getTime();
  const end = start + seg.duration_s * 1000;
  if (now >= end) return "DONE";
  if (now >= start && now < end) return "LIVE";
  return "NEXT";
}

export function LineupWidget({ show, now }: { show: LiveShow; now: number }) {
  if (!show || show.segments.length === 0) return null;

  return (
    <section className="border border-border bg-surface p-6">
      <p className="font-label tracking-[0.3em] text-[10px] text-accent uppercase mb-4">
        Tonight's lineup
      </p>
      <ol className="space-y-2">
        {show.segments.map((seg, i) => {
          const state = segmentState(seg, now);
          const time = new Date(seg.starts_at).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          });
          return (
            <li
              key={seg.id}
              className={`flex items-center gap-3 px-3 py-2 ${
                state === "LIVE"
                  ? "bg-accent/10 border-l-2 border-accent"
                  : state === "DONE"
                  ? "opacity-50"
                  : ""
              }`}
            >
              <span className="font-label tracking-widest text-[10px] text-muted-dark w-12">
                {time}
              </span>
              <span className="flex-1 font-display text-base text-white">
                {seg.brand.name}
              </span>
              {state === "LIVE" && (
                <span className="inline-flex items-center gap-1 font-label tracking-widest text-[9px] uppercase text-accent">
                  <Radio size={10} className="animate-pulse" /> Live
                </span>
              )}
              {state === "DONE" && (
                <Check size={12} className="text-muted-dark" />
              )}
              {state === "NEXT" && i > 0 && (
                <Clock size={12} className="text-muted-dark" />
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
