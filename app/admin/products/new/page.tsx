import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "@/lib/actions/products";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  if (brands.length === 0) redirect("/admin/brands/new");

  return (
    <div className="p-10">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1 font-label tracking-widest text-[10px] text-muted-dark hover:text-accent uppercase mb-6 transition-colors"
      >
        <ChevronLeft size={12} /> Products
      </Link>

      <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-2">
        New product
      </p>
      <h1 className="font-display font-light text-4xl text-white leading-none mb-10">
        Add a product
      </h1>

      <ProductForm action={createProduct} brands={brands} submitLabel="Create product" />
    </div>
  );
}
