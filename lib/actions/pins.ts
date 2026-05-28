"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

const PinInput = z.object({
  show_id: z.string().min(1),
  product_id: z.string().min(1),
  look_number: z.number().int().positive().nullable(),
});

export async function pinProduct(formData: FormData) {
  const session = await requireSession();
  const data = PinInput.parse({
    show_id: String(formData.get("show_id") ?? ""),
    product_id: String(formData.get("product_id") ?? ""),
    look_number: formData.get("look_number")
      ? parseInt(String(formData.get("look_number")), 10)
      : null,
  });

  await prisma.pinnedProduct.create({
    data: {
      show_id: data.show_id,
      product_id: data.product_id,
      look_number: data.look_number,
      pinned_by_id: session.sub,
    },
  });

  revalidatePath(`/admin/shows/${data.show_id}/control`);
  revalidatePath("/live");
}

export async function unpinProduct(showId: string, pinId: string) {
  await requireSession();
  await prisma.pinnedProduct.update({
    where: { id: pinId },
    data: { unpinned_at: new Date() },
  });
  revalidatePath(`/admin/shows/${showId}/control`);
  revalidatePath("/live");
}

export async function unpinAll(showId: string) {
  await requireSession();
  await prisma.pinnedProduct.updateMany({
    where: { show_id: showId, unpinned_at: null },
    data: { unpinned_at: new Date() },
  });
  revalidatePath(`/admin/shows/${showId}/control`);
  revalidatePath("/live");
}

export async function markProductSoldOut(showId: string, productId: string) {
  await requireSession();
  await prisma.product.update({
    where: { id: productId },
    data: { status: "SOLD_OUT" },
  });
  revalidatePath(`/admin/shows/${showId}/control`);
  revalidatePath("/admin/products");
  revalidatePath("/live");
}

export async function markProductActive(showId: string, productId: string) {
  await requireSession();
  await prisma.product.update({
    where: { id: productId },
    data: { status: "ACTIVE" },
  });
  revalidatePath(`/admin/shows/${showId}/control`);
  revalidatePath("/admin/products");
  revalidatePath("/live");
}
