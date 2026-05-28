import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Radio, X, ShoppingBag, Pin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  pinProduct,
  unpinProduct,
  unpinAll,
  markProductSoldOut,
  markProductActive,
} from "@/lib/actions/pins";
import { setShowStatus } from "@/lib/actions/shows";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function fmtPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export default async function ShowControlPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const show = await prisma.show.findUnique({
    where: { id },
    include: {
      segments: {
        orderBy: { order: "asc" },
        include: {
          brand: {
            include: {
              products: {
                where: { status: { in: ["ACTIVE", "SOLD_OUT", "DRAFT"] } },
                orderBy: { name: "asc" },
              },
            },
          },
        },
      },
      pinned_products: {
        where: { unpinned_at: null },
        orderBy: { pinned_at: "desc" },
        include: { product: { include: { brand: true } } },
      },
    },
  });

  if (!show) notFound();

  const isLive = show.status === "LIVE";
  const goLive = setShowStatus.bind(null, show.id, "LIVE");
  const endShow = setShowStatus.bind(null, show.id, "ENDED");
  const clearAll = unpinAll.bind(null, show.id);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-black border-b border-border px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href={`/admin/shows/${show.id}`}
            className="text-muted-dark hover:text-white"
            aria-label="Back to show"
          >
            <ChevronLeft size={18} />
          </Link>
          <div className="min-w-0">
            <p className="font-label tracking-widest text-[9px] text-muted-dark uppercase">
              Live control
            </p>
            <p className="font-display text-lg leading-none truncate">{show.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {isLive ? (
            <>
              <span className="inline-flex items-center gap-1.5 font-label tracking-widest text-[10px] uppercase bg-accent text-black px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
                On air
              </span>
              <form action={endShow}>
                <button
                  type="submit"
                  className="font-label tracking-widest text-[10px] uppercase border border-border text-white/80 hover:border-accent hover:text-accent px-4 py-1.5 transition-colors"
                >
                  End show
                </button>
              </form>
            </>
          ) : (
            <form action={goLive}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 font-label tracking-widest text-[10px] uppercase bg-accent text-black px-4 py-1.5 hover:bg-accent-dim transition-colors"
              >
                <Radio size={12} /> Go live
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px]">
        {/* Brand blocks (left) */}
        <div className="p-6 lg:p-10">
          <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-6">
            Lineup
          </p>

          {show.segments.length === 0 ? (
            <div className="border border-border bg-surface p-8 text-center">
              <p className="font-display text-xl text-white mb-2">No segments scheduled</p>
              <p className="text-muted-dark text-sm mb-4">
                Add segments on the show page to pin products from those brands here.
              </p>
              <Link
                href={`/admin/shows/${show.id}`}
                className="font-label tracking-widest text-[10px] uppercase text-accent hover:underline"
              >
                Edit show →
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {show.segments.map((seg, i) => (
                <section key={seg.id} className="border border-border bg-surface">
                  <header className="px-5 py-4 border-b border-border flex items-center justify-between">
                    <div>
                      <p className="font-label tracking-widest text-[9px] text-muted-dark uppercase">
                        Block {String(i + 1).padStart(2, "0")} ·{" "}
                        {new Date(seg.starts_at).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="font-display text-xl text-white leading-tight">
                        {seg.brand.name}
                      </p>
                    </div>
                    <span className="font-label tracking-widest text-[10px] text-muted-dark uppercase">
                      {seg.brand.products.length} product
                      {seg.brand.products.length === 1 ? "" : "s"}
                    </span>
                  </header>

                  {seg.brand.products.length === 0 ? (
                    <div className="p-5 text-muted-dark text-sm">
                      No products for this brand.{" "}
                      <Link
                        href="/admin/products/new"
                        className="text-accent hover:underline"
                      >
                        Add one →
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                      {seg.brand.products.map((p) => {
                        const pinForm = pinProduct.bind(null);
                        const soldOut = markProductSoldOut.bind(null, show.id, p.id);
                        const restock = markProductActive.bind(null, show.id, p.id);
                        const primaryImg = p.image_urls[0];
                        const isSoldOut = p.status === "SOLD_OUT";
                        return (
                          <div key={p.id} className="p-4 flex gap-4">
                            <div className="w-20 h-20 bg-black border border-border flex-shrink-0 overflow-hidden relative">
                              {primaryImg ? (
                                <Image
                                  src={primaryImg}
                                  alt={p.name}
                                  fill
                                  sizes="80px"
                                  className="object-cover"
                                  unoptimized
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-muted-dark">
                                  <ShoppingBag size={20} />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-display text-base text-white leading-tight truncate">
                                {p.name}
                              </p>
                              <p className="font-label tracking-widest text-[9px] text-muted-dark uppercase mt-1">
                                {fmtPrice(p.price_cents, p.currency)}
                                {isSoldOut && " · Sold out"}
                                {p.inventory !== null && !isSoldOut
                                  ? ` · ${p.inventory} left`
                                  : ""}
                              </p>
                              <form
                                action={pinForm}
                                className="mt-3 flex items-center gap-2"
                              >
                                <input type="hidden" name="show_id" value={show.id} />
                                <input type="hidden" name="product_id" value={p.id} />
                                <input
                                  type="number"
                                  name="look_number"
                                  placeholder="Look #"
                                  min={1}
                                  className="w-20 bg-black border border-border px-2 py-1 text-xs text-white focus:outline-none focus:border-accent"
                                />
                                <button
                                  type="submit"
                                  className="inline-flex items-center gap-1 bg-accent text-black font-label tracking-widest text-[10px] uppercase px-3 py-1.5 hover:bg-accent-dim transition-colors"
                                >
                                  <Pin size={11} /> Pin
                                </button>
                                {isSoldOut ? (
                                  <button
                                    type="submit"
                                    formAction={restock}
                                    className="font-label tracking-widest text-[10px] uppercase border border-border text-muted-dark hover:text-accent px-3 py-1.5 transition-colors"
                                  >
                                    Restock
                                  </button>
                                ) : (
                                  <button
                                    type="submit"
                                    formAction={soldOut}
                                    className="font-label tracking-widest text-[10px] uppercase border border-border text-muted-dark hover:text-red-400 px-3 py-1.5 transition-colors"
                                  >
                                    Sold out
                                  </button>
                                )}
                              </form>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              ))}
            </div>
          )}
        </div>

        {/* Currently pinned (right rail) */}
        <aside className="border-t lg:border-t-0 lg:border-l border-border bg-surface min-h-screen p-6 lg:p-8">
          <div className="flex items-center justify-between mb-4">
            <p className="font-label tracking-[0.3em] text-xs text-accent uppercase">
              On screen
            </p>
            {show.pinned_products.length > 0 && (
              <form action={clearAll}>
                <button
                  type="submit"
                  className="font-label tracking-widest text-[10px] uppercase text-muted-dark hover:text-red-400 transition-colors"
                >
                  Clear all
                </button>
              </form>
            )}
          </div>

          {show.pinned_products.length === 0 ? (
            <div className="border border-dashed border-border p-8 text-center">
              <Pin size={20} className="text-muted-dark mx-auto mb-3" />
              <p className="text-muted-dark text-sm">
                Pin a product to surface it on the /live shopping rail.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {show.pinned_products.map((pin) => {
                const remove = unpinProduct.bind(null, show.id, pin.id);
                const primaryImg = pin.product.image_urls[0];
                return (
                  <div
                    key={pin.id}
                    className="border border-accent bg-black p-3 flex gap-3"
                  >
                    <div className="w-14 h-14 bg-surface border border-border flex-shrink-0 overflow-hidden relative">
                      {primaryImg ? (
                        <Image
                          src={primaryImg}
                          alt={pin.product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted-dark">
                          <ShoppingBag size={16} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-dark truncate">
                        {pin.look_number ? `Look ${pin.look_number} · ` : ""}
                        {pin.product.brand.name}
                      </p>
                      <p className="font-display text-sm text-white leading-tight truncate">
                        {pin.product.name}
                      </p>
                      <p className="font-label tracking-widest text-[9px] text-accent uppercase mt-1">
                        {fmtPrice(pin.product.price_cents, pin.product.currency)}
                      </p>
                    </div>
                    <form action={remove}>
                      <button
                        type="submit"
                        aria-label="Unpin"
                        className="text-muted-dark hover:text-red-400 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </form>
                  </div>
                );
              })}
            </div>
          )}

          {!isLive && (
            <div className="mt-8 border border-border bg-black p-4">
              <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mb-2">
                Preview mode
              </p>
              <p className="text-xs text-muted-dark">
                Show is not live. Pins are saved but won't surface to viewers until you press
                Go live.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
