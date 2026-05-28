"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { CART_EVENT } from "./AddToCartButton";

export function CartIcon({ className }: { className?: string }) {
  const [count, setCount] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  async function refresh() {
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      const data = (await res.json()) as { item_count?: number } | null;
      setCount(data?.item_count ?? 0);
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    setMounted(true);
    refresh();
    const handler = () => refresh();
    window.addEventListener(CART_EVENT, handler);
    return () => window.removeEventListener(CART_EVENT, handler);
  }, []);

  return (
    <Link
      href="/cart"
      aria-label="Cart"
      className={`relative inline-flex items-center justify-center text-white/80 hover:text-accent transition-colors ${className ?? ""}`}
    >
      <ShoppingBag size={18} />
      {mounted && count > 0 && (
        <span className="absolute -top-1 -right-2 bg-accent text-black font-label tracking-widest text-[9px] min-w-[16px] h-4 px-1 flex items-center justify-center">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
