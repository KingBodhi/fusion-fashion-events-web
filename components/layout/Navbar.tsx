"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { CartIcon } from "@/components/cart/CartIcon";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-8 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/95 backdrop-blur-md border-b border-border shadow-lg top-0"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo-white.png"
            alt="Fusion Fashion Events"
            width={140}
            height={40}
            className="object-contain"
            style={{ height: "48px", width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "font-label tracking-widest text-xs uppercase transition-colors hover:text-accent",
                  pathname === item.href ? "text-accent" : "text-white/80"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-5">
          <CartIcon className="hidden md:inline-flex" />
          <Link
            href="/register"
            className="hidden lg:inline-flex items-center px-5 py-2 bg-accent text-black font-label tracking-widest text-xs uppercase rounded-none hover:bg-accent-dim transition-colors"
          >
            Get Tickets
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-1"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden bg-black border-t border-border">
          <ul className="flex flex-col px-6 py-8 gap-6">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-label tracking-widest text-xl uppercase text-white/80 hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/register"
                className="inline-flex items-center px-6 py-3 bg-accent text-black font-label tracking-widest text-sm uppercase"
              >
                Get Tickets
              </Link>
            </li>
          </ul>
          <div className="flex gap-5 px-6 pb-8">
            <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon size={20} className="text-white/60 hover:text-accent transition-colors" />
            </a>
            <a href={siteConfig.contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon size={20} className="text-white/60 hover:text-accent transition-colors" />
            </a>
            <a href={siteConfig.contact.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <YoutubeIcon size={20} className="text-white/60 hover:text-accent transition-colors" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
