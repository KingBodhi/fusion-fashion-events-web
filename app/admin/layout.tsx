import Link from "next/link";
import { getSession } from "@/lib/session";
import { logoutAction } from "./login/actions";
import { LayoutDashboard, Users, Tag, CalendarDays, Radio } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/shows", label: "Shows", icon: CalendarDays },
  { href: "/admin/brands", label: "Brands", icon: Users },
  { href: "/admin/products", label: "Products", icon: Tag },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-black text-white flex">
      {session && (
        <aside className="w-60 border-r border-border bg-surface flex flex-col">
          <div className="p-6 border-b border-border">
            <p className="font-label tracking-[0.3em] text-[10px] text-accent uppercase mb-1">
              FFE
            </p>
            <p className="font-display text-lg leading-tight">Admin</p>
          </div>

          <nav className="flex-1 py-4">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-6 py-3 text-white/70 hover:text-accent hover:bg-black transition-colors"
              >
                <Icon size={16} />
                <span className="font-label tracking-widest text-[10px] uppercase">
                  {label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="p-6 border-t border-border">
            <p className="text-xs text-muted-dark mb-1 truncate">
              {session.role}
            </p>
            <form action={logoutAction}>
              <button
                type="submit"
                className="font-label tracking-widest text-[10px] uppercase text-white/60 hover:text-accent transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </aside>
      )}

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
