"use client";

import { useActionState, useEffect } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { addToCartAction } from "@/lib/actions/cart";

export const CART_EVENT = "ffe:cart-changed";

export function AddToCartButton({
  productId,
  disabled,
  fullWidth = false,
  label = "Add to cart",
}: {
  productId: string;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: string;
}) {
  const [state, formAction, pending] = useActionState(addToCartAction, null);

  useEffect(() => {
    if (state?.ok && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(CART_EVENT));
    }
  }, [state]);

  const sold = disabled;

  return (
    <form action={formAction} className={fullWidth ? "w-full" : "inline-block"}>
      <input type="hidden" name="product_id" value={productId} />
      <input type="hidden" name="quantity" value="1" />
      <button
        type="submit"
        disabled={pending || sold}
        className={`inline-flex items-center justify-center gap-2 font-label tracking-widest text-xs uppercase px-8 py-4 transition-colors ${
          fullWidth ? "w-full" : ""
        } ${
          sold
            ? "border border-border text-muted-dark cursor-not-allowed"
            : state?.ok
            ? "bg-green-500 text-black"
            : "bg-accent text-black hover:bg-accent-dim"
        } disabled:opacity-60`}
      >
        {state?.ok ? (
          <>
            <Check size={14} /> Added
          </>
        ) : pending ? (
          "Adding…"
        ) : (
          <>
            <ShoppingBag size={14} /> {sold ? "Sold out" : label}
          </>
        )}
      </button>
      {state?.error && (
        <p className="text-xs text-red-400 mt-2">{state.error}</p>
      )}
    </form>
  );
}
