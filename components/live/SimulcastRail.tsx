import { simulcastDestinations } from "@/config/live";
import { ExternalLink } from "lucide-react";

export function SimulcastRail() {
  return (
    <section className="border-y border-border bg-surface py-8">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-label tracking-[0.3em] text-[10px] text-muted-dark uppercase mb-5">
          Also broadcasting on
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {simulcastDestinations.map((d) => (
            <a
              key={d.id}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-border hover:border-accent/60 bg-black p-4 flex items-center justify-between transition-colors"
              style={{ borderLeft: `3px solid ${d.color}` }}
            >
              <div className="min-w-0">
                <p className="font-label tracking-widest text-[10px] text-white uppercase">
                  {d.name}
                </p>
                <p className="text-muted-dark text-xs truncate">{d.handle}</p>
              </div>
              <ExternalLink
                size={14}
                className="text-muted-dark group-hover:text-accent transition-colors flex-shrink-0 ml-3"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
