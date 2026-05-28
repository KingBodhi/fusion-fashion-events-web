"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

const STATUS = z.enum(["DRAFT", "ACTIVE", "SOLD_OUT", "ARCHIVED"]);

const ProductInput = z.object({
  brand_id: z.string().min(1),
  sku: z.string().min(1).max(64),
  name: z.string().min(1).max(200),
  description: z.string().optional().nullable(),
  price_cents: z.number().int().nonnegative(),
  currency: z.string().length(3).default("USD"),
  image_urls: z.array(z.string().url()).default([]),
  inventory: z.number().int().nonnegative().nullable(),
  external_url: z.string().url().optional().nullable(),
  status: STATUS.default("DRAFT"),
});

function parsePrice(input: string | undefined): number {
  if (!input) return 0;
  const cleaned = input.replace(/[^0-9.]/g, "");
  const dollars = parseFloat(cleaned);
  if (Number.isNaN(dollars)) return 0;
  return Math.round(dollars * 100);
}

function parseImages(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function readForm(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const inventoryRaw = raw.inventory ? String(raw.inventory).trim() : "";
  return ProductInput.parse({
    brand_id: String(raw.brand_id ?? ""),
    sku: String(raw.sku ?? "").trim(),
    name: String(raw.name ?? "").trim(),
    description: (raw.description ? String(raw.description).trim() : null) || null,
    price_cents: parsePrice(raw.price ? String(raw.price) : undefined),
    currency: String(raw.currency ?? "USD").toUpperCase(),
    image_urls: parseImages(raw.image_urls ? String(raw.image_urls) : undefined),
    inventory: inventoryRaw === "" ? null : parseInt(inventoryRaw, 10),
    external_url: (raw.external_url ? String(raw.external_url).trim() : null) || null,
    status: STATUS.parse(raw.status ?? "DRAFT"),
  });
}

export async function createProduct(formData: FormData) {
  await requireSession();
  const data = readForm(formData);
  const product = await prisma.product.create({ data });
  revalidatePath("/admin/products");
  redirect(`/admin/products/${product.id}`);
}

export async function updateProduct(id: string, formData: FormData) {
  await requireSession();
  const data = readForm(formData);
  await prisma.product.update({ where: { id }, data });
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
}

export async function deleteProduct(id: string) {
  await requireSession();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  redirect("/admin/products");
}
