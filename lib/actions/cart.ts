"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addItem, updateQuantity, removeItem } from "@/lib/cart";

const AddSchema = z.object({
  product_id: z.string().min(1),
  quantity: z.number().int().positive().max(99).default(1),
});

export async function addToCartAction(
  prevState: { error?: string; ok?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; ok?: boolean }> {
  try {
    const data = AddSchema.parse({
      product_id: String(formData.get("product_id") ?? ""),
      quantity: parseInt(String(formData.get("quantity") ?? "1"), 10),
    });
    await addItem(data.product_id, data.quantity);
    revalidatePath("/cart");
    revalidatePath(`/brands`);
    return { ok: true };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Failed to add to cart",
    };
  }
}

export async function updateQuantityAction(itemId: string, quantity: number) {
  await updateQuantity(itemId, quantity);
  revalidatePath("/cart");
}

export async function removeFromCartAction(itemId: string) {
  await removeItem(itemId);
  revalidatePath("/cart");
}
