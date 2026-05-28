import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/brands/ProductCard";
import { buildMetadata } from "@/lib/metadata";
import { ChevronLeft, Globe } from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = await prisma.brand.findUnique({ where: { slug } });
  if (!brand) return buildMetadata({ title: "Brand not found", description: "" });
  return buildMetadata({
    title: `${brand.name} — Fusion Fashion Events`,
    description:
      brand.tagline ??
      brand.bio?.slice(0, 160) ??
      `Shop ${brand.name} on Fusion Fashion Events.`,
    path: `/brands/${brand.slug}`,
    image: brand.hero_image ?? undefined,
  });
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = await prisma.brand.findUnique({
    where: { slug },
    include: {
      products: {
        where: { status: { in: ["ACTIVE", "SOLD_OUT"] } },
        orderBy: [{ status: "asc" }, { name: "asc" }],
      },
    },
  });

  if (!brand) notFound();

  return (
    <div className="bg-black">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          {brand.hero_image ? (
            <>
              <Image
                src={brand.hero_image}
                alt={brand.name}
                fill
                sizes="100vw"
                priority
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-surface to-black" />
          )}
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32">
          <Link
            href="/brands"
            className="inline-flex items-center gap-1 font-label tracking-widest text-[10px] text-white/70 hover:text-accent uppercase mb-6 transition-colors"
          >
            <ChevronLeft size={12} /> All brands
          </Link>
          <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-3">
            Brand
          </p>
          <h1 className="font-display font-light text-6xl md:text-8xl text-white leading-none mb-4">
            {brand.name}
          </h1>
          {brand.tagline && (
            <p className="font-label tracking-[0.3em] text-white/70 text-sm max-w-2xl">
              {brand.tagline}
            </p>
          )}

          {(brand.instagram || brand.website) && (
            <div className="flex gap-5 mt-8">
              {brand.instagram && (
                <a
                  href={
                    brand.instagram.startsWith("http")
                      ? brand.instagram
                      : `https://instagram.com/${brand.instagram.replace(/^@/, "")}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-label tracking-widest text-[10px] text-white/80 hover:text-accent uppercase transition-colors"
                >
                  <InstagramIcon size={14} /> Instagram
                </a>
              )}
              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-label tracking-widest text-[10px] text-white/80 hover:text-accent uppercase transition-colors"
                >
                  <Globe size={14} /> Website
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Bio */}
      {brand.bio && (
        <section className="py-16 px-6 max-w-3xl mx-auto">
          <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-4">
            About
          </p>
          <p className="text-white/80 text-base leading-relaxed whitespace-pre-line">
            {brand.bio}
          </p>
        </section>
      )}

      {/* Product grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-2">
              The collection
            </p>
            <h2 className="font-display font-light text-3xl md:text-4xl text-white">
              {brand.products.length} piece{brand.products.length === 1 ? "" : "s"}
            </h2>
          </div>
        </div>

        {brand.products.length === 0 ? (
          <div className="border border-border bg-surface p-12 text-center">
            <p className="font-display text-xl text-white mb-2">
              Collection coming soon
            </p>
            <p className="text-muted-dark text-sm">
              {brand.name}&apos;s pieces will surface here during the next broadcast.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {brand.products.map((p) => (
              <ProductCard
                key={p.id}
                product={{ ...p, brand: { slug: brand.slug } }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
