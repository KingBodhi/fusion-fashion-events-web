import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductGallery } from "@/components/brands/ProductGallery";
import { ProductCard } from "@/components/brands/ProductCard";
import { buildMetadata } from "@/lib/metadata";
import { ChevronLeft, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; productId: string }>;
}) {
  const { productId } = await params;
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { brand: true },
  });
  if (!product) return buildMetadata({ title: "Product not found", description: "" });
  return buildMetadata({
    title: `${product.name} — ${product.brand.name}`,
    description: product.description?.slice(0, 160) ?? product.name,
    path: `/brands/${product.brand.slug}/${product.id}`,
    image: product.image_urls[0],
  });
}

function fmtPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; productId: string }>;
}) {
  const { slug, productId } = await params;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { brand: true },
  });

  if (!product || product.brand.slug !== slug) notFound();
  if (product.status === "DRAFT" || product.status === "ARCHIVED") notFound();

  const related = await prisma.product.findMany({
    where: {
      brand_id: product.brand_id,
      id: { not: product.id },
      status: { in: ["ACTIVE", "SOLD_OUT"] },
    },
    orderBy: { name: "asc" },
    take: 4,
  });

  const soldOut = product.status === "SOLD_OUT";

  return (
    <div className="bg-black">
      <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <Link
          href={`/brands/${product.brand.slug}`}
          className="inline-flex items-center gap-1 font-label tracking-widest text-[10px] text-muted-dark hover:text-accent uppercase mb-6 transition-colors"
        >
          <ChevronLeft size={12} /> {product.brand.name}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <ProductGallery images={product.image_urls} alt={product.name} />

          <div className="md:sticky md:top-24">
            <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-3">
              {product.brand.name}
            </p>
            <h1 className="font-display font-light text-4xl md:text-5xl text-white leading-tight mb-4">
              {product.name}
            </h1>
            <p className="font-display text-3xl text-accent mb-2">
              {fmtPrice(product.price_cents, product.currency)}
            </p>
            {soldOut && (
              <p className="font-label tracking-widest text-xs uppercase text-red-400 mb-4">
                Sold out
              </p>
            )}
            {!soldOut && product.inventory !== null && product.inventory <= 5 && (
              <p className="font-label tracking-widest text-xs uppercase text-red-300 mb-4">
                Only {product.inventory} left
              </p>
            )}

            {product.description && (
              <div className="mt-8 mb-8">
                <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mb-3">
                  Details
                </p>
                <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            <div className="mt-8 space-y-3">
              {product.external_url ? (
                <a
                  href={product.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 w-full font-label tracking-widest text-xs uppercase px-8 py-4 transition-colors ${
                    soldOut
                      ? "border border-border text-muted-dark pointer-events-none opacity-60"
                      : "bg-accent text-black hover:bg-accent-dim"
                  }`}
                >
                  {soldOut ? "Sold out" : "Shop now"}
                  {!soldOut && <ExternalLink size={14} />}
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full font-label tracking-widest text-xs uppercase px-8 py-4 border border-border text-muted-dark cursor-not-allowed"
                >
                  Inquiry only
                </button>
              )}
              <p className="font-label tracking-widest text-[9px] text-muted-dark uppercase text-center">
                Native checkout shipping in Phase 3
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-6 max-w-7xl mx-auto pb-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-2">
                More from {product.brand.name}
              </p>
              <h2 className="font-display font-light text-3xl md:text-4xl text-white">
                The rest of the collection
              </h2>
            </div>
            <Link
              href={`/brands/${product.brand.slug}`}
              className="font-label tracking-widest text-[10px] text-white/60 hover:text-accent uppercase transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={{ ...p, brand: { slug: product.brand.slug } }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
