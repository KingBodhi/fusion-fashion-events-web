import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BrandsListPage() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-2">
            Brands
          </p>
          <h1 className="font-display font-light text-4xl text-white leading-none">
            {brands.length} brand{brands.length === 1 ? "" : "s"}
          </h1>
        </div>
        <Link
          href="/admin/brands/new"
          className="inline-flex items-center gap-2 bg-accent text-black font-label tracking-widest text-xs uppercase px-6 py-3 hover:bg-accent-dim transition-colors"
        >
          <Plus size={14} /> New brand
        </Link>
      </div>

      {brands.length === 0 ? (
        <div className="border border-border bg-surface p-12 text-center">
          <p className="font-display text-2xl text-white mb-2">No brands yet</p>
          <p className="text-muted-dark text-sm mb-6">
            Create the first brand to start adding products.
          </p>
          <Link
            href="/admin/brands/new"
            className="inline-flex items-center gap-2 bg-accent text-black font-label tracking-widest text-xs uppercase px-6 py-3 hover:bg-accent-dim transition-colors"
          >
            <Plus size={14} /> Create brand
          </Link>
        </div>
      ) : (
        <div className="border border-border bg-surface divide-y divide-border">
          {brands.map((b) => (
            <Link
              key={b.id}
              href={`/admin/brands/${b.id}`}
              className="flex items-center justify-between px-6 py-5 hover:bg-black transition-colors"
            >
              <div className="min-w-0">
                <p className="font-display text-xl text-white truncate">{b.name}</p>
                <p className="text-muted-dark text-xs mt-1">
                  /brands/{b.slug} · {b._count.products} product
                  {b._count.products === 1 ? "" : "s"}
                  {b.tagline ? ` · ${b.tagline}` : ""}
                </p>
              </div>
              <ChevronRight size={16} className="text-muted-dark" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
