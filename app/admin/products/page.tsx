import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  DRAFT: "Draft",
  ACTIVE: "Live",
  SOLD_OUT: "Sold out",
  ARCHIVED: "Archived",
};

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export default async function ProductsListPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const params = await searchParams;
  const products = await prisma.product.findMany({
    where: params.brand ? { brand_id: params.brand } : undefined,
    orderBy: [{ updated_at: "desc" }],
    include: { brand: true },
  });

  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-2">
            Products
          </p>
          <h1 className="font-display font-light text-4xl text-white leading-none">
            {products.length} product{products.length === 1 ? "" : "s"}
          </h1>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-accent text-black font-label tracking-widest text-xs uppercase px-6 py-3 hover:bg-accent-dim transition-colors"
        >
          <Plus size={14} /> New product
        </Link>
      </div>

      {brands.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <Link
            href="/admin/products"
            className={`font-label tracking-widest text-[10px] uppercase px-3 py-1 border transition-colors ${
              !params.brand
                ? "border-accent text-accent"
                : "border-border text-muted-dark hover:border-accent/40"
            }`}
          >
            All
          </Link>
          {brands.map((b) => (
            <Link
              key={b.id}
              href={`/admin/products?brand=${b.id}`}
              className={`font-label tracking-widest text-[10px] uppercase px-3 py-1 border transition-colors ${
                params.brand === b.id
                  ? "border-accent text-accent"
                  : "border-border text-muted-dark hover:border-accent/40"
              }`}
            >
              {b.name}
            </Link>
          ))}
        </div>
      )}

      {products.length === 0 ? (
        <div className="border border-border bg-surface p-12 text-center">
          <p className="font-display text-2xl text-white mb-2">No products yet</p>
          <p className="text-muted-dark text-sm mb-6">
            {brands.length === 0
              ? "Create a brand first, then add products."
              : "Add a product to start building the catalog."}
          </p>
          {brands.length === 0 ? (
            <Link
              href="/admin/brands/new"
              className="inline-flex items-center gap-2 bg-accent text-black font-label tracking-widest text-xs uppercase px-6 py-3 hover:bg-accent-dim transition-colors"
            >
              Create brand first
            </Link>
          ) : (
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 bg-accent text-black font-label tracking-widest text-xs uppercase px-6 py-3 hover:bg-accent-dim transition-colors"
            >
              <Plus size={14} /> Create product
            </Link>
          )}
        </div>
      ) : (
        <div className="border border-border bg-surface divide-y divide-border">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/admin/products/${p.id}`}
              className="flex items-center justify-between gap-4 px-6 py-5 hover:bg-black transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-display text-lg text-white truncate">{p.name}</p>
                  <span
                    className={`font-label tracking-widest text-[9px] uppercase px-2 py-0.5 ${
                      p.status === "ACTIVE"
                        ? "bg-accent text-black"
                        : p.status === "SOLD_OUT"
                        ? "bg-red-500/20 text-red-300 border border-red-500/40"
                        : "border border-border text-muted-dark"
                    }`}
                  >
                    {STATUS_LABEL[p.status]}
                  </span>
                </div>
                <p className="text-muted-dark text-xs">
                  {p.brand.name} · SKU {p.sku} ·{" "}
                  {p.inventory === null ? "Unlimited" : `${p.inventory} in stock`}
                </p>
              </div>
              <p className="font-display text-lg text-white whitespace-nowrap">
                {formatPrice(p.price_cents, p.currency)}
              </p>
              <ChevronRight size={16} className="text-muted-dark" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
