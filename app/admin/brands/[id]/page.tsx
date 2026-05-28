import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { BrandForm } from "@/components/admin/BrandForm";
import { updateBrand, deleteBrand } from "@/lib/actions/brands";

export const dynamic = "force-dynamic";

export default async function EditBrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brand = await prisma.brand.findUnique({
    where: { id },
    include: { _count: { select: { products: true } } },
  });
  if (!brand) notFound();

  const update = updateBrand.bind(null, brand.id);
  const remove = deleteBrand.bind(null, brand.id);

  return (
    <div className="p-10">
      <Link
        href="/admin/brands"
        className="inline-flex items-center gap-1 font-label tracking-widest text-[10px] text-muted-dark hover:text-accent uppercase mb-6 transition-colors"
      >
        <ChevronLeft size={12} /> Brands
      </Link>

      <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-2">
        Brand · {brand._count.products} product
        {brand._count.products === 1 ? "" : "s"}
      </p>
      <h1 className="font-display font-light text-4xl text-white leading-none mb-10">
        {brand.name}
      </h1>

      <BrandForm action={update} defaults={brand} submitLabel="Save changes" />

      <div className="mt-16 pt-6 border-t border-border max-w-2xl">
        <p className="font-label tracking-widest text-[10px] text-muted-dark uppercase mb-3">
          Danger zone
        </p>
        <form action={remove}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 border border-red-500/40 text-red-400 hover:bg-red-500/10 font-label tracking-widest text-[10px] uppercase px-5 py-2 transition-colors"
          >
            <Trash2 size={12} /> Delete brand
          </button>
        </form>
        <p className="text-xs text-muted-dark mt-2">
          Permanently removes the brand and all its products. Cannot be undone.
        </p>
      </div>
    </div>
  );
}
