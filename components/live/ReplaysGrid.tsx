import Image from "next/image";
import { Play, Clock } from "lucide-react";
import type { RecordedVideo } from "@/lib/cloudflare-stream";

function fmtDuration(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export function ReplaysGrid({
  recordings,
  customerSubdomain,
}: {
  recordings: RecordedVideo[];
  customerSubdomain: string;
}) {
  if (recordings.length === 0) return null;

  return (
    <section className="px-6 max-w-7xl mx-auto pb-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-2">
            Replays
          </p>
          <h2 className="font-display font-light text-3xl md:text-4xl text-white leading-tight">
            Catch up on past shows
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recordings.map((r) => {
          const watchUrl = `https://${customerSubdomain}/${r.uid}/iframe`;
          return (
            <a
              key={r.uid}
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-border bg-surface hover:border-accent/60 transition-colors overflow-hidden"
            >
              <div className="relative aspect-video bg-black">
                {r.thumbnail && (
                  <Image
                    src={r.thumbnail}
                    alt={r.meta?.name ?? "Replay"}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover"
                    unoptimized
                  />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Play size={32} className="text-white drop-shadow" fill="currentColor" />
                </div>
                {r.duration > 0 && (
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white font-label tracking-widest text-[10px] uppercase px-2 py-0.5">
                    {fmtDuration(r.duration)}
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="font-display text-base text-white leading-tight truncate">
                  {r.meta?.name ?? "Recorded broadcast"}
                </p>
                <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mt-2 inline-flex items-center gap-1">
                  <Clock size={11} />{" "}
                  {new Date(r.created).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
