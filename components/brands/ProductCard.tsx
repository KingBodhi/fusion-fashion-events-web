import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

export type ProductCardData = {
  id: string;
  name: string;
  price_cents: number;
  currency: string;
  status: string;
  image_urls: string[];
  brand: { slug: string };
};

function fmtPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function ProductCard({ product }: { product: ProductCardData }) {
  const img = product.image_urls[0];
  const soldOut = product.status === "SOLD_OUT";

  return (
    <Link
      href={`/brands/${product.brand.slug}/${product.id}`}
      className="group block border border-border bg-surface hover:border-accent/60 transition-colors"
    >
      <div className="relative aspect-[3/4] bg-black border-b border-border overflow-hidden">
        {img ? (
          <Image
            src={img}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-dark">
            <ShoppingBag size={32} />
          </div>
        )}
        {soldOut && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="font-label tracking-widest text-xs uppercase text-red-400 border border-red-400 px-3 py-1">
              Sold out
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="font-display text-base text-white leading-tight truncate group-hover:text-accent transition-colors">
          {product.name}
        </p>
        <p className="font-label tracking-widest text-[10px] text-accent uppercase mt-2">
          {fmtPrice(product.price_cents, product.currency)}
        </p>
      </div>
    </Link>
  );
}
