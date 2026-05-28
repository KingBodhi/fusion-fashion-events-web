"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

const BrandInput = z.object({
  slug: z
    .string()
    .min(2)
    .max(64)
    .regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, dashes only"),
  name: z.string().min(1).max(120),
  tagline: z.string().max(200).optional().nullable(),
  bio: z.string().optional().nullable(),
  hero_image: z.string().url().optional().nullable(),
  logo: z.string().url().optional().nullable(),
  instagram: z.string().optional().nullable(),
  website: z.string().url().optional().nullable(),
});

function readForm(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  return BrandInput.parse({
    slug: String(raw.slug ?? "").toLowerCase().trim(),
    name: String(raw.name ?? "").trim(),
    tagline: (raw.tagline ? String(raw.tagline).trim() : null) || null,
    bio: (raw.bio ? String(raw.bio).trim() : null) || null,
    hero_image: (raw.hero_image ? String(raw.hero_image).trim() : null) || null,
    logo: (raw.logo ? String(raw.logo).trim() : null) || null,
    instagram: (raw.instagram ? String(raw.instagram).trim() : null) || null,
    website: (raw.website ? String(raw.website).trim() : null) || null,
  });
}

export async function createBrand(formData: FormData) {
  await requireSession();
  const data = readForm(formData);
  const brand = await prisma.brand.create({ data });
  revalidatePath("/admin/brands");
  redirect(`/admin/brands/${brand.id}`);
}

export async function updateBrand(id: string, formData: FormData) {
  await requireSession();
  const data = readForm(formData);
  await prisma.brand.update({ where: { id }, data });
  revalidatePath("/admin/brands");
  revalidatePath(`/admin/brands/${id}`);
}

export async function deleteBrand(id: string) {
  await requireSession();
  await prisma.brand.delete({ where: { id } });
  revalidatePath("/admin/brands");
  redirect("/admin/brands");
}
