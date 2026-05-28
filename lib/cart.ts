import "server-only";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const CART_COOKIE = "ffe_cart_id";
const CART_MAX_AGE_S = 60 * 60 * 24 * 30; // 30 days

export type CartLineItem = {
  id: string;
  product_id: string;
  quantity: number;
  unit_price_cents: number;
  currency: string;
  product: {
    id: string;
    name: string;
    sku: string;
    price_cents: number;
    currency: string;
    status: string;
    inventory: number | null;
    image_urls: string[];
    brand: { id: string; name: string; slug: string };
  };
};

export type CartContents = {
  id: string;
  items: CartLineItem[];
  subtotal_cents: number;
  currency: string;
  item_count: number;
} | null;

async function readCookie(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(CART_COOKIE)?.value ?? null;
}

async function writeCookie(cartId: string): Promise<void> {
  const jar = await cookies();
  jar.set(CART_COOKIE, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: CART_MAX_AGE_S,
  });
}

export async function getCart(): Promise<CartContents> {
  const id = await readCookie();
  if (!id) return null;

  const cart = await prisma.cart.findUnique({
    where: { id },
    include: {
      items: {
        orderBy: { created_at: "asc" },
        include: { product: { include: { brand: true } } },
      },
    },
  });
  if (!cart) return null;

  const items: CartLineItem[] = cart.items.map((item) => ({
    id: item.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price_cents: item.price_cents_snapshot,
    currency: item.currency_snapshot,
    product: {
      id: item.product.id,
      name: item.product.name,
      sku: item.product.sku,
      price_cents: item.product.price_cents,
      currency: item.product.currency,
      status: item.product.status,
      inventory: item.product.inventory,
      image_urls: item.product.image_urls,
      brand: {
        id: item.product.brand.id,
        name: item.product.brand.name,
        slug: item.product.brand.slug,
      },
    },
  }));

  const subtotal = items.reduce((sum, i) => sum + i.unit_price_cents * i.quantity, 0);
  const currency = items[0]?.currency ?? "USD";

  return {
    id: cart.id,
    items,
    subtotal_cents: subtotal,
    currency,
    item_count: items.reduce((n, i) => n + i.quantity, 0),
  };
}

async function getOrCreateCart(): Promise<string> {
  const existing = await readCookie();
  if (existing) {
    const found = await prisma.cart.findUnique({ where: { id: existing } });
    if (found) return found.id;
  }
  const created = await prisma.cart.create({ data: {} });
  await writeCookie(created.id);
  return created.id;
}

export async function addItem(productId: string, quantity = 1): Promise<void> {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Product not found");
  if (product.status !== "ACTIVE") throw new Error("Product is not available");

  const cartId = await getOrCreateCart();

  const existing = await prisma.cartItem.findUnique({
    where: { cart_id_product_id: { cart_id: cartId, product_id: productId } },
  });

  if (existing) {
    const nextQty = existing.quantity + quantity;
    if (product.inventory !== null && nextQty > product.inventory) {
      throw new Error(`Only ${product.inventory} in stock`);
    }
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: nextQty },
    });
  } else {
    if (product.inventory !== null && quantity > product.inventory) {
      throw new Error(`Only ${product.inventory} in stock`);
    }
    await prisma.cartItem.create({
      data: {
        cart_id: cartId,
        product_id: productId,
        quantity,
        price_cents_snapshot: product.price_cents,
        currency_snapshot: product.currency,
      },
    });
  }
}

export async function updateQuantity(itemId: string, quantity: number): Promise<void> {
  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: itemId } });
    return;
  }
  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: { product: true },
  });
  if (!item) return;
  if (item.product.inventory !== null && quantity > item.product.inventory) {
    throw new Error(`Only ${item.product.inventory} in stock`);
  }
  await prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });
}

export async function removeItem(itemId: string): Promise<void> {
  await prisma.cartItem.delete({ where: { id: itemId } }).catch(() => null);
}
