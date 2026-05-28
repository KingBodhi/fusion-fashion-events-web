import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Radio, CalendarDays, Tag, Users } from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const [brands, products, shows, liveShows] = await Promise.all([
      prisma.brand.count(),
      prisma.product.count(),
      prisma.show.count(),
      prisma.show.count({ where: { status: "LIVE" } }),
    ]);
    return { brands, products, shows, liveShows };
  } catch {
    return { brands: 0, products: 0, shows: 0, liveShows: 0 };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "Live shows", value: stats.liveShows, icon: Radio, href: "/admin/shows", accent: stats.liveShows > 0 },
    { label: "Shows", value: stats.shows, icon: CalendarDays, href: "/admin/shows" },
    { label: "Brands", value: stats.brands, icon: Users, href: "/admin/brands" },
    { label: "Products", value: stats.products, icon: Tag, href: "/admin/products" },
  ];

  return (
    <div className="p-10">
      <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-2">
        Dashboard
      </p>
      <h1 className="font-display font-light text-4xl text-white mb-10 leading-none">
        Tonight at FFE
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {cards.map(({ label, value, icon: Icon, href, accent }) => (
          <Link
            key={label}
            href={href}
            className={`block border p-6 transition-colors ${
              accent
                ? "border-accent bg-accent/10 hover:bg-accent/20"
                : "border-border bg-surface hover:border-accent/40"
            }`}
          >
            <Icon size={18} className={accent ? "text-accent" : "text-muted-dark"} />
            <p className="font-display text-4xl text-white mt-3 leading-none">{value}</p>
            <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mt-2">
              {label}
            </p>
          </Link>
        ))}
      </div>

      <section className="border border-border bg-surface p-6">
        <p className="font-label tracking-[0.3em] text-[10px] text-accent uppercase mb-2">
          Phase 1.5 build
        </p>
        <h2 className="font-display text-2xl text-white mb-3 leading-tight">
          Live shopping platform
        </h2>
        <p className="text-muted-dark text-sm leading-relaxed mb-4 max-w-xl">
          Auth + schema scaffolded. Next: brands + products CRUD, then the shows timeline editor, then the live pinning dashboard at <code className="text-accent">/admin/shows/[id]/control</code>.
        </p>
        <p className="text-muted-dark text-xs">
          Full plan in <code className="text-accent">planning/SESSION-HANDOFF.md</code>.
        </p>
      </section>
    </div>
  );
}
