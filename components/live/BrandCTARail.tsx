import Link from "next/link";
import { featuredBrands } from "@/config/live";
import { ChevronRight } from "lucide-react";

export function BrandCTARail() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-2">
            Shop the broadcast
          </p>
          <h2 className="font-display font-light text-3xl md:text-4xl text-white">
            Featured brands tonight
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
        {featuredBrands.map((brand) => (
          <Link
            key={brand.slug}
            href={brand.href}
            className="group border border-border hover:border-accent bg-surface p-6 transition-colors block"
          >
            <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mb-3">
              Brand
            </p>
            <h3 className="font-display text-2xl text-white mb-2 group-hover:text-accent transition-colors">
              {brand.name}
            </h3>
            <p className="text-muted-dark text-sm leading-relaxed mb-6">{brand.tagline}</p>
            <span className="inline-flex items-center gap-1 font-label tracking-widest text-[10px] text-accent uppercase">
              Shop now <ChevronRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
