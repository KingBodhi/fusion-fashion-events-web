import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";
import { updateProduct, deleteProduct } from "@/lib/actions/products";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, brands] = await Promise.all([
    prisma.product.findUnique({ where: { id }, include: { brand: true } }),
    prisma.brand.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);
  if (!product) notFound();

  const update = updateProduct.bind(null, product.id);
  const remove = deleteProduct.bind(null, product.id);

  return (
    <div className="p-10">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1 font-label tracking-widest text-[10px] text-muted-dark hover:text-accent uppercase mb-6 transition-colors"
      >
        <ChevronLeft size={12} /> Products
      </Link>

      <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-2">
        {product.brand.name} · SKU {product.sku}
      </p>
      <h1 className="font-display font-light text-4xl text-white leading-none mb-10">
        {product.name}
      </h1>

      <ProductForm
        action={update}
        brands={brands}
        defaults={product}
        submitLabel="Save changes"
      />

      <div className="mt-16 pt-6 border-t border-border max-w-2xl">
        <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mb-3">
          Danger zone
        </p>
        <form action={remove}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 border border-red-500/40 text-red-400 hover:bg-red-500/10 font-label tracking-widest text-[10px] uppercase px-5 py-2 transition-colors"
          >
            <Trash2 size={12} /> Delete product
          </button>
        </form>
      </div>
    </div>
  );
}
