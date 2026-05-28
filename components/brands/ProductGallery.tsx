"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-surface border border-border flex items-center justify-center">
        <ShoppingBag size={48} className="text-muted-dark" />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <div className="relative aspect-[3/4] bg-surface border border-border overflow-hidden">
        <Image
          src={images[active]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className="object-cover"
          unoptimized
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-square border overflow-hidden transition-colors ${
                i === active ? "border-accent" : "border-border hover:border-accent/40"
              }`}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
