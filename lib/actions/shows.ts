"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

const STATUS = z.enum(["SCHEDULED", "LIVE", "ENDED"]);

const ShowInput = z.object({
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, dashes only"),
  title: z.string().min(1).max(200),
  subtitle: z.string().max(200).optional().nullable(),
  hero_image: z.string().url().optional().nullable(),
  live_input_id: z.string().min(1),
  starts_at: z.coerce.date(),
  ends_at: z.coerce.date().optional().nullable(),
  status: STATUS.default("SCHEDULED"),
});

function readShowForm(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  return ShowInput.parse({
    slug: String(raw.slug ?? "").toLowerCase().trim(),
    title: String(raw.title ?? "").trim(),
    subtitle: (raw.subtitle ? String(raw.subtitle).trim() : null) || null,
    hero_image: (raw.hero_image ? String(raw.hero_image).trim() : null) || null,
    live_input_id: String(raw.live_input_id ?? "").trim(),
    starts_at: String(raw.starts_at ?? ""),
    ends_at: raw.ends_at ? String(raw.ends_at) : null,
    status: STATUS.parse(raw.status ?? "SCHEDULED"),
  });
}

export async function createShow(formData: FormData) {
  await requireSession();
  const data = readShowForm(formData);
  const show = await prisma.show.create({ data });
  revalidatePath("/admin/shows");
  redirect(`/admin/shows/${show.id}`);
}

export async function updateShow(id: string, formData: FormData) {
  await requireSession();
  const data = readShowForm(formData);
  await prisma.show.update({ where: { id }, data });
  revalidatePath("/admin/shows");
  revalidatePath(`/admin/shows/${id}`);
}

export async function deleteShow(id: string) {
  await requireSession();
  await prisma.show.delete({ where: { id } });
  revalidatePath("/admin/shows");
  redirect("/admin/shows");
}

export async function setShowStatus(id: string, status: "SCHEDULED" | "LIVE" | "ENDED") {
  await requireSession();
  await prisma.show.update({ where: { id }, data: { status } });
  revalidatePath("/admin/shows");
  revalidatePath(`/admin/shows/${id}`);
  revalidatePath(`/admin/shows/${id}/control`);
}

// -- Segments ---------------------------------------------------------------

const SegmentInput = z.object({
  show_id: z.string().min(1),
  brand_id: z.string().min(1),
  starts_at: z.coerce.date(),
  duration_s: z.number().int().positive().default(900),
  order: z.number().int().nonnegative(),
  notes: z.string().optional().nullable(),
});

export async function createSegment(showId: string, formData: FormData) {
  await requireSession();
  const raw = Object.fromEntries(formData.entries());
  const existingCount = await prisma.showSegment.count({ where: { show_id: showId } });
  const data = SegmentInput.parse({
    show_id: showId,
    brand_id: String(raw.brand_id ?? ""),
    starts_at: String(raw.starts_at ?? ""),
    duration_s: parseInt(String(raw.duration_s ?? "900"), 10),
    order: existingCount,
    notes: (raw.notes ? String(raw.notes).trim() : null) || null,
  });
  await prisma.showSegment.create({ data });
  revalidatePath(`/admin/shows/${showId}`);
}

export async function deleteSegment(showId: string, segmentId: string) {
  await requireSession();
  await prisma.showSegment.delete({ where: { id: segmentId } });
  // Re-pack order so there are no gaps
  const remaining = await prisma.showSegment.findMany({
    where: { show_id: showId },
    orderBy: { order: "asc" },
  });
  await Promise.all(
    remaining.map((s, i) =>
      prisma.showSegment.update({ where: { id: s.id }, data: { order: i } })
    )
  );
  revalidatePath(`/admin/shows/${showId}`);
}
