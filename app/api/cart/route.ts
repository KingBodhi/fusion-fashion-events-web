import { NextResponse } from "next/server";
import { getCart } from "@/lib/cart";

export const dynamic = "force-dynamic";

export async function GET() {
  const cart = await getCart();
  return NextResponse.json(cart ?? { item_count: 0, items: [], subtotal_cents: 0, currency: "USD" }, {
    headers: { "Cache-Control": "no-store" },
  });
}
