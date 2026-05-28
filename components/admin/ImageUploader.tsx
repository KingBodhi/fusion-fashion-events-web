"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";

export function ImageUploader({
  name,
  defaultUrls = [],
  multiple = false,
  folder = "uploads",
  hint,
  label,
}: {
  name: string;
  defaultUrls?: string[];
  multiple?: boolean;
  folder?: string;
  hint?: string;
  label: string;
}) {
  const [urls, setUrls] = useState<string[]>(defaultUrls);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadOne(file: File): Promise<string> {
    const body = new FormData();
    body.append("file", file);
    body.append("folder", folder);
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      throw new Error(j.error ?? `Upload failed (${res.status})`);
    }
    const data = (await res.json()) as { url: string };
    return data.url;
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      const incoming = Array.from(files);
      const next: string[] = [];
      for (const f of incoming) {
        const url = await uploadOne(f);
        next.push(url);
      }
      setUrls((prev) => (multiple ? [...prev, ...next] : next.slice(-1)));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeAt(idx: number) {
    setUrls((prev) => prev.filter((_, i) => i !== idx));
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div className="space-y-3">
      <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase">
        {label}
      </p>

      {/* Hidden input carries the URLs back to the parent form. */}
      <input type="hidden" name={name} value={urls.join("\n")} />

      <label
        htmlFor={`uploader-${name}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`block border-2 border-dashed bg-black px-6 py-8 text-center cursor-pointer transition-colors ${
          dragOver
            ? "border-accent bg-accent/5"
            : "border-border hover:border-accent/40"
        }`}
      >
        <Upload size={20} className="text-muted-dark mx-auto mb-2" />
        <p className="text-sm text-white">
          {uploading ? "Uploading…" : "Drop image"}
          {multiple ? "s" : ""}{" "}
          <span className="text-muted-dark">or click to browse</span>
        </p>
        <p className="text-xs text-muted-dark mt-1">JPG / PNG / WebP / AVIF · max 8 MB</p>
        <input
          ref={inputRef}
          id={`uploader-${name}`}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          multiple={multiple}
          className="hidden"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)}
          disabled={uploading}
        />
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {urls.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {urls.map((url, i) => (
            <div
              key={url + i}
              className="relative aspect-square border border-border bg-surface overflow-hidden group"
            >
              <Image
                src={url}
                alt={`${label} ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
                unoptimized
              />
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label="Remove image"
                className="absolute top-1 right-1 bg-black/80 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
              >
                <X size={12} />
              </button>
              {multiple && i === 0 && (
                <span className="absolute bottom-1 left-1 font-label tracking-widest text-[8px] uppercase bg-accent text-black px-1.5 py-0.5">
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {hint && <p className="text-xs text-muted-dark">{hint}</p>}
    </div>
  );
}
