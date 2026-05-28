import Link from "next/link";
import Image from "next/image";
import { getCart } from "@/lib/cart";
import { updateQuantityAction, removeFromCartAction } from "@/lib/actions/cart";
import { buildMetadata } from "@/lib/metadata";
import { Minus, Plus, X, ShoppingBag, ChevronRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "Cart — Fusion Fashion Events",
  description: "Review your selections before checkout.",
  path: "/cart",
});

export const dynamic = "force-dynamic";

function fmtPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export default async function CartPage() {
  const cart = await getCart();
  const items = cart?.items ?? [];
  const subtotal = cart?.subtotal_cents ?? 0;
  const currency = cart?.currency ?? "USD";

  return (
    <div className="bg-black min-h-screen">
      <section className="pt-32 pb-12 px-6 max-w-6xl mx-auto">
        <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-3">
          Cart
        </p>
        <h1 className="font-display font-light text-5xl md:text-6xl text-white leading-none mb-2">
          {items.length === 0 ? "Your cart is empty" : `${cart?.item_count ?? 0} item${(cart?.item_count ?? 0) === 1 ? "" : "s"}`}
        </h1>
      </section>

      {items.length === 0 ? (
        <section className="px-6 max-w-3xl mx-auto pb-24">
          <div className="border border-border bg-surface p-12 text-center">
            <ShoppingBag size={32} className="text-muted-dark mx-auto mb-4" />
            <p className="font-display text-2xl text-white mb-2">Nothing in here yet</p>
            <p className="text-muted-dark text-sm mb-6">
              Browse the brands or wait for the next live broadcast to drop looks
              into your cart.
            </p>
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 bg-accent text-black font-label tracking-widest text-xs uppercase px-6 py-3 hover:bg-accent-dim transition-colors"
            >
              Shop brands <ChevronRight size={14} />
            </Link>
          </div>
        </section>
      ) : (
        <section className="px-6 max-w-6xl mx-auto pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
            <div className="border border-border bg-surface divide-y divide-border">
              {items.map((item) => {
                const dec = updateQuantityAction.bind(
                  null,
                  item.id,
                  item.quantity - 1
                );
                const inc = updateQuantityAction.bind(
                  null,
                  item.id,
                  item.quantity + 1
                );
                const remove = removeFromCartAction.bind(null, item.id);
                const img = item.product.image_urls[0];
                const lineTotal = item.unit_price_cents * item.quantity;
                const stock = item.product.inventory;
                const maxedOut = stock !== null && item.quantity >= stock;

                return (
                  <div key={item.id} className="flex gap-4 p-5">
                    <Link
                      href={`/brands/${item.product.brand.slug}/${item.product.id}`}
                      className="relative w-24 h-32 bg-black border border-border flex-shrink-0 overflow-hidden block"
                    >
                      {img ? (
                        <Image
                          src={img}
                          alt={item.product.name}
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
                    </Link>

                    <div className="flex-1 min-w-0">
                      <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase">
                        {item.product.brand.name}
                      </p>
                      <Link
                        href={`/brands/${item.product.brand.slug}/${item.product.id}`}
                        className="font-display text-lg text-white leading-tight mt-1 hover:text-accent transition-colors block"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-muted-dark text-xs mt-1">
                        SKU {item.product.sku}
                      </p>

                      <div className="flex items-center gap-4 mt-3">
                        <div className="inline-flex items-center border border-border">
                          <form action={dec}>
                            <button
                              type="submit"
                              aria-label="Decrease quantity"
                              className="px-2 py-1 text-white hover:bg-black"
                            >
                              <Minus size={12} />
                            </button>
                          </form>
                          <span className="px-3 text-white text-sm font-label tracking-widest">
                            {item.quantity}
                          </span>
                          <form action={inc}>
                            <button
                              type="submit"
                              aria-label="Increase quantity"
                              disabled={maxedOut}
                              className="px-2 py-1 text-white hover:bg-black disabled:opacity-40"
                            >
                              <Plus size={12} />
                            </button>
                          </form>
                        </div>
                        {maxedOut && stock !== null && (
                          <span className="text-[10px] text-red-300">
                            Only {stock} in stock
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <form action={remove}>
                        <button
                          type="submit"
                          aria-label="Remove from cart"
                          className="text-muted-dark hover:text-red-400 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </form>
                      <p className="font-display text-lg text-white whitespace-nowrap">
                        {fmtPrice(lineTotal, item.currency)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <aside className="border border-border bg-surface p-6 lg:sticky lg:top-24">
              <p className="font-label tracking-[0.3em] text-[10px] text-accent uppercase mb-4">
                Order summary
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-dark">Subtotal</span>
                  <span className="text-white">{fmtPrice(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-dark">Shipping</span>
                  <span className="text-muted-dark">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-4 border-t border-border mb-6">
                <span className="font-label tracking-widest text-[10px] text-muted-dark uppercase">
                  Total
                </span>
                <span className="font-display text-2xl text-white">
                  {fmtPrice(subtotal, currency)}
                </span>
              </div>

              <button
                type="button"
                disabled
                className="w-full bg-surface-2 border border-border text-muted-dark font-label tracking-widest text-xs uppercase px-8 py-4 cursor-not-allowed"
              >
                Checkout · Coming soon
              </button>
              <p className="text-[10px] text-muted-dark text-center mt-3 leading-relaxed">
                Native checkout via Stripe ships in Phase 3.2. Until then, click into
                each product and use the brand&apos;s external Shop link to purchase.
              </p>
            </aside>
          </div>
        </section>
      )}
    </div>
  );
}
