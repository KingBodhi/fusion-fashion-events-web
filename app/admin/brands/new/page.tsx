import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { BrandForm } from "@/components/admin/BrandForm";
import { createBrand } from "@/lib/actions/brands";

export default function NewBrandPage() {
  return (
    <div className="p-10">
      <Link
        href="/admin/brands"
        className="inline-flex items-center gap-1 font-label tracking-widest text-[10px] text-muted-dark hover:text-accent uppercase mb-6 transition-colors"
      >
        <ChevronLeft size={12} /> Brands
      </Link>

      <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-2">
        New brand
      </p>
      <h1 className="font-display font-light text-4xl text-white leading-none mb-10">
        Add a brand
      </h1>

      <BrandForm action={createBrand} submitLabel="Create brand" />
    </div>
  );
}
