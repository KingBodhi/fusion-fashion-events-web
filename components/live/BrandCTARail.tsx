import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ChevronRight } from "lucide-react";

export async function BrandCTARail() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
    take: 6,
    include: {
      _count: {
        select: {
          products: { where: { status: { in: ["ACTIVE", "SOLD_OUT"] } } },
        },
      },
    },
  });

  if (brands.length === 0) return null;

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-2">
            Shop the broadcast
          </p>
          <h2 className="font-display font-light text-3xl md:text-4xl text-white">
            Featured brands
          </h2>
        </div>
        <Link
          href="/brands"
          className="hidden sm:inline-flex font-label tracking-widest text-[10px] text-white/60 hover:text-accent uppercase items-center gap-1 transition-colors"
        >
          All brands <ChevronRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {brands.slice(0, 3).map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="group border border-border hover:border-accent bg-surface transition-colors block overflow-hidden"
          >
            {brand.hero_image && (
              <div className="relative aspect-[3/2] bg-black border-b border-border overflow-hidden">
                <Image
                  src={brand.hero_image}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
            )}
            <div className="p-6">
              <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mb-3">
                Brand
              </p>
              <h3 className="font-display text-2xl text-white mb-2 group-hover:text-accent transition-colors">
                {brand.name}
              </h3>
              {brand.tagline && (
                <p className="text-muted-dark text-sm leading-relaxed mb-6 line-clamp-2">
                  {brand.tagline}
                </p>
              )}
              <span className="inline-flex items-center gap-1 font-label tracking-widest text-[10px] text-accent uppercase">
                {brand._count.products > 0 ? "Shop now" : "View brand"} <ChevronRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
