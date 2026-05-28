import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Plus, Radio, Trash2, Square } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ShowForm } from "@/components/admin/ShowForm";
import {
  updateShow,
  deleteShow,
  setShowStatus,
  createSegment,
  deleteSegment,
} from "@/lib/actions/shows";
import { AdminField, inputClass, selectClass } from "@/components/admin/AdminField";

export const dynamic = "force-dynamic";

export default async function EditShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [show, brands] = await Promise.all([
    prisma.show.findUnique({
      where: { id },
      include: {
        segments: {
          orderBy: { order: "asc" },
          include: { brand: true },
        },
      },
    }),
    prisma.brand.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);
  if (!show) notFound();

  const update = updateShow.bind(null, show.id);
  const remove = deleteShow.bind(null, show.id);
  const goLive = setShowStatus.bind(null, show.id, "LIVE");
  const endShow = setShowStatus.bind(null, show.id, "ENDED");
  const addSegment = createSegment.bind(null, show.id);

  return (
    <div className="p-10">
      <Link
        href="/admin/shows"
        className="inline-flex items-center gap-1 font-label tracking-widest text-[10px] text-muted-dark hover:text-accent uppercase mb-6 transition-colors"
      >
        <ChevronLeft size={12} /> Shows
      </Link>

      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-2">
            Show · {show.status}
          </p>
          <h1 className="font-display font-light text-4xl text-white leading-none">
            {show.title}
          </h1>
        </div>
        <div className="flex gap-3">
          {show.status === "SCHEDULED" && (
            <form action={goLive}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-accent text-black font-label tracking-widest text-xs uppercase px-6 py-3 hover:bg-accent-dim transition-colors"
              >
                <Radio size={14} /> Go live
              </button>
            </form>
          )}
          {show.status === "LIVE" && (
            <>
              <Link
                href={`/admin/shows/${show.id}/control`}
                className="inline-flex items-center gap-2 bg-accent text-black font-label tracking-widest text-xs uppercase px-6 py-3 hover:bg-accent-dim transition-colors"
              >
                <Radio size={14} /> Open control
              </Link>
              <form action={endShow}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 border border-border text-white/80 font-label tracking-widest text-xs uppercase px-6 py-3 hover:border-accent hover:text-accent transition-colors"
                >
                  <Square size={14} /> End show
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <section className="mb-16">
        <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mb-4">
          Show details
        </p>
        <ShowForm action={update} defaults={show} submitLabel="Save changes" />
      </section>

      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-6 max-w-2xl">
          <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase">
            Lineup ({show.segments.length} segments)
          </p>
        </div>

        {show.segments.length > 0 && (
          <div className="border border-border bg-surface divide-y divide-border max-w-2xl mb-6">
            {show.segments.map((seg, i) => {
              const remove = deleteSegment.bind(null, show.id, seg.id);
              return (
                <div
                  key={seg.id}
                  className="flex items-center justify-between gap-4 px-6 py-4"
                >
                  <div className="min-w-0">
                    <p className="font-display text-lg text-white truncate">
                      {String(i + 1).padStart(2, "0")} · {seg.brand.name}
                    </p>
                    <p className="text-muted-dark text-xs">
                      {new Date(seg.starts_at).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}{" "}
                      · {Math.round(seg.duration_s / 60)} min
                      {seg.notes ? ` · ${seg.notes}` : ""}
                    </p>
                  </div>
                  <form action={remove}>
                    <button
                      type="submit"
                      aria-label="Delete segment"
                      className="text-muted-dark hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </form>
                </div>
              );
            })}
          </div>
        )}

        <form action={addSegment} className="border border-border bg-surface p-6 max-w-2xl space-y-4">
          <p className="font-label tracking-widest text-[10px] text-accent uppercase">
            <Plus size={12} className="inline mr-1" /> Add segment
          </p>
          {brands.length === 0 ? (
            <p className="text-muted-dark text-sm">
              <Link href="/admin/brands/new" className="text-accent hover:underline">
                Create a brand
              </Link>{" "}
              first.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AdminField label="Brand">
                  <select name="brand_id" required defaultValue="" className={selectClass}>
                    <option value="" disabled>
                      Select brand…
                    </option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </AdminField>
                <AdminField label="Starts at">
                  <input type="datetime-local" name="starts_at" required className={inputClass} />
                </AdminField>
                <AdminField label="Duration (sec)" hint="15 min = 900">
                  <input
                    type="number"
                    name="duration_s"
                    defaultValue={900}
                    min={60}
                    className={inputClass}
                  />
                </AdminField>
              </div>
              <AdminField label="Notes (optional)">
                <input type="text" name="notes" className={inputClass} />
              </AdminField>
              <button
                type="submit"
                className="bg-accent text-black font-label tracking-widest text-xs uppercase px-6 py-2 hover:bg-accent-dim transition-colors"
              >
                Add segment
              </button>
            </>
          )}
        </form>
      </section>

      <div className="pt-6 border-t border-border max-w-2xl">
        <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mb-3">
          Danger zone
        </p>
        <form action={remove}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 border border-red-500/40 text-red-400 hover:bg-red-500/10 font-label tracking-widest text-[10px] uppercase px-5 py-2 transition-colors"
          >
            <Trash2 size={12} /> Delete show
          </button>
        </form>
      </div>
    </div>
  );
}
