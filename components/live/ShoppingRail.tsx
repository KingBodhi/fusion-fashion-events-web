import Image from "next/image";
import { ShoppingBag, ExternalLink } from "lucide-react";
import type { LivePinnedProduct } from "@/lib/live-state";

function fmtPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function ShoppingRail({
  pinned,
  brandName,
}: {
  pinned: LivePinnedProduct[];
  brandName?: string;
}) {
  if (pinned.length === 0) {
    return (
      <div className="border border-dashed border-border bg-surface p-8 text-center">
        <ShoppingBag size={20} className="text-muted-dark mx-auto mb-3" />
        <p className="font-display text-lg text-white mb-1">No looks pinned yet</p>
        <p className="text-muted-dark text-xs">
          Shop drops live as designers walk the runway. Stay tuned.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {brandName && (
        <p className="font-label tracking-[0.3em] text-[10px] text-accent uppercase">
          {brandName} · On the runway
        </p>
      )}
      {pinned.map((p) => {
        const img = p.product.image_urls[0];
        const soldOut = p.product.status === "SOLD_OUT";
        return (
          <article
            key={p.pin_id}
            className="border border-border bg-surface flex gap-4 p-4 group hover:border-accent/60 transition-colors"
          >
            <div className="relative w-24 h-24 flex-shrink-0 bg-black border border-border overflow-hidden">
              {img ? (
                <Image
                  src={img}
                  alt={p.product.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-muted-dark">
                  <ShoppingBag size={20} />
                </div>
              )}
              {soldOut && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <span className="font-label tracking-widest text-[9px] uppercase text-red-400 border border-red-400 px-2 py-0.5">
                    Sold out
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase">
                {p.look_number ? `Look ${p.look_number} · ` : ""}
                {p.product.brand.name}
              </p>
              <p className="font-display text-base text-white leading-tight mt-1 truncate">
                {p.product.name}
              </p>
              <p className="font-label tracking-widest text-xs text-accent uppercase mt-2">
                {fmtPrice(p.product.price_cents, p.product.currency)}
              </p>

              {!soldOut && p.product.inventory !== null && p.product.inventory <= 5 && (
                <p className="text-[10px] text-red-300 mt-1">
                  Only {p.product.inventory} left
                </p>
              )}

              <div className="mt-3">
                {p.product.external_url ? (
                  <a
                    href={p.product.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 font-label tracking-widest text-[10px] uppercase px-3 py-1.5 transition-colors ${
                      soldOut
                        ? "border border-border text-muted-dark pointer-events-none opacity-60"
                        : "bg-accent text-black hover:bg-accent-dim"
                    }`}
                  >
                    {soldOut ? "Sold out" : "Shop"}
                    {!soldOut && <ExternalLink size={11} />}
                  </a>
                ) : (
                  <span className="font-label tracking-widest text-[10px] uppercase text-muted-dark">
                    Inquiry-only
                  </span>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
