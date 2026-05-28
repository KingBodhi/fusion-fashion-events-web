import { NextResponse, type NextRequest } from "next/server";
import { put } from "@vercel/blob";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
]);

function safeFilename(name: string): string {
  const dot = name.lastIndexOf(".");
  const ext = dot >= 0 ? name.slice(dot).toLowerCase() : "";
  const base = name
    .slice(0, dot >= 0 ? dot : undefined)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "upload";
  return `${base}-${Date.now()}${ext}`;
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const type = file.type;
  if (!ALLOWED.has(type)) {
    return NextResponse.json({ error: `Unsupported type: ${type}` }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 8 MB)" }, { status: 413 });
  }

  const original = "name" in file ? (file as File).name : "image";
  const folder = String(form.get("folder") ?? "uploads").replace(/[^a-z0-9-/]/gi, "");
  const path = `${folder}/${safeFilename(original)}`;

  const blob = await put(path, file, {
    access: "public",
    contentType: type,
  });

  return NextResponse.json({ url: blob.url, path: blob.pathname });
}
