import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Radio, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  SCHEDULED: "Scheduled",
  LIVE: "Live",
  ENDED: "Ended",
};

export default async function ShowsListPage() {
  const shows = await prisma.show.findMany({
    orderBy: [{ status: "asc" }, { starts_at: "desc" }],
    include: { _count: { select: { segments: true } } },
  });

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-2">
            Shows
          </p>
          <h1 className="font-display font-light text-4xl text-white leading-none">
            {shows.length} show{shows.length === 1 ? "" : "s"}
          </h1>
        </div>
        <Link
          href="/admin/shows/new"
          className="inline-flex items-center gap-2 bg-accent text-black font-label tracking-widest text-xs uppercase px-6 py-3 hover:bg-accent-dim transition-colors"
        >
          <Plus size={14} /> New show
        </Link>
      </div>

      {shows.length === 0 ? (
        <div className="border border-border bg-surface p-12 text-center">
          <p className="font-display text-2xl text-white mb-2">No shows yet</p>
          <p className="text-muted-dark text-sm mb-6">
            Create a show to schedule designer segments and run live pinning.
          </p>
          <Link
            href="/admin/shows/new"
            className="inline-flex items-center gap-2 bg-accent text-black font-label tracking-widest text-xs uppercase px-6 py-3 hover:bg-accent-dim transition-colors"
          >
            <Plus size={14} /> Create show
          </Link>
        </div>
      ) : (
        <div className="border border-border bg-surface divide-y divide-border">
          {shows.map((s) => (
            <Link
              key={s.id}
              href={`/admin/shows/${s.id}`}
              className="flex items-center justify-between gap-4 px-6 py-5 hover:bg-black transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-display text-xl text-white truncate">{s.title}</p>
                  {s.status === "LIVE" && (
                    <span className="inline-flex items-center gap-1 font-label tracking-widest text-[9px] uppercase bg-accent text-black px-2 py-0.5">
                      <Radio size={10} /> Live
                    </span>
                  )}
                  {s.status !== "LIVE" && (
                    <span className="font-label tracking-widest text-[9px] uppercase border border-border text-muted-dark px-2 py-0.5">
                      {STATUS_LABEL[s.status]}
                    </span>
                  )}
                </div>
                <p className="text-muted-dark text-xs">
                  {new Date(s.starts_at).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}{" "}
                  · {s._count.segments} segment
                  {s._count.segments === 1 ? "" : "s"}
                </p>
              </div>
              {s.status === "LIVE" && (
                <Link
                  href={`/admin/shows/${s.id}/control`}
                  className="font-label tracking-widest text-[10px] uppercase bg-accent text-black px-4 py-2 hover:bg-accent-dim transition-colors"
                >
                  Open control
                </Link>
              )}
              <ChevronRight size={16} className="text-muted-dark" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
