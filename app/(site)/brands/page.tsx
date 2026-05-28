import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { ChevronRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "Brands — Fusion Fashion Events",
  description:
    "Independent designers, swimwear labels, and crossover brands featured on Fusion Fashion Events broadcasts. Shop the collections behind the runway.",
  path: "/brands",
});

export const dynamic = "force-dynamic";

export default async function BrandsDirectoryPage() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          products: { where: { status: { in: ["ACTIVE", "SOLD_OUT"] } } },
        },
      },
    },
  });

  return (
    <div className="bg-black">
      <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-3">
          Brands
        </p>
        <h1 className="font-display font-light text-5xl md:text-7xl text-white leading-none mb-6">
          The brands
          <br />
          <span className="text-gradient-green">behind the runway</span>
        </h1>
        <p className="text-muted-dark text-sm max-w-xl leading-relaxed">
          Independent designers, swimwear labels, and crossover brands featured on Fusion
          Fashion Events broadcasts. Each label is shoppable directly from the live rail
          or here.
        </p>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-24">
        {brands.length === 0 ? (
          <div className="border border-border bg-surface p-12 text-center max-w-xl mx-auto">
            <p className="font-display text-2xl text-white mb-2">Brands coming soon</p>
            <p className="text-muted-dark text-sm">
              The first crop of designers is being onboarded. Check back ahead of the
              next broadcast.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brands.map((b) => (
              <Link
                key={b.id}
                href={`/brands/${b.slug}`}
                className="group block border border-border bg-surface hover:border-accent/60 transition-colors overflow-hidden"
              >
                <div className="relative aspect-[4/3] bg-black border-b border-border overflow-hidden">
                  {b.hero_image ? (
                    <Image
                      src={b.hero_image}
                      alt={b.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      {b.logo ? (
                        <Image
                          src={b.logo}
                          alt={b.name}
                          width={120}
                          height={120}
                          className="object-contain opacity-80"
                          unoptimized
                        />
                      ) : (
                        <p className="font-display text-3xl text-muted-dark">{b.name}</p>
                      )}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase">
                        Brand
                      </p>
                      <p className="font-display text-2xl text-white leading-tight mt-1 group-hover:text-accent transition-colors">
                        {b.name}
                      </p>
                      {b.tagline && (
                        <p className="text-muted-dark text-sm mt-2 line-clamp-2">
                          {b.tagline}
                        </p>
                      )}
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-muted-dark group-hover:text-accent transition-colors mt-1 flex-shrink-0"
                    />
                  </div>
                  <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mt-4">
                    {b._count.products} product{b._count.products === 1 ? "" : "s"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
