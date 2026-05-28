"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/login/actions";
import { LayoutDashboard, Users, Tag, CalendarDays } from "lucide-react";
import type { SessionPayload } from "@/lib/auth";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/shows", label: "Shows", icon: CalendarDays },
  { href: "/admin/brands", label: "Brands", icon: Users },
  { href: "/admin/products", label: "Products", icon: Tag },
];

function isFocusRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  // Full-bleed (no sidebar) on the live pinning cockpit and the login page.
  return /\/admin\/shows\/[^/]+\/control(\/|$)/.test(pathname) || pathname.startsWith("/admin/login");
}

export function AdminShell({
  session,
  children,
}: {
  session: SessionPayload | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const focus = isFocusRoute(pathname);

  if (focus || !session) {
    return <div className="min-h-screen bg-black text-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-60 border-r border-border bg-surface flex flex-col">
        <div className="p-6 border-b border-border">
          <p className="font-label tracking-[0.3em] text-[10px] text-accent uppercase mb-1">
            FFE
          </p>
          <p className="font-display text-lg leading-tight">Admin</p>
        </div>

        <nav className="flex-1 py-4">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/admin"
                ? pathname === "/admin"
                : pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                  active
                    ? "text-accent bg-black border-l-2 border-accent"
                    : "text-white/70 hover:text-accent hover:bg-black"
                }`}
              >
                <Icon size={16} />
                <span className="font-label tracking-widest text-[10px] uppercase">
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-border">
          <p className="text-xs text-muted-dark mb-1 truncate">{session.role}</p>
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

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
