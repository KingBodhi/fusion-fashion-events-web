import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ShowForm } from "@/components/admin/ShowForm";
import { createShow } from "@/lib/actions/shows";

export default function NewShowPage() {
  return (
    <div className="p-10">
      <Link
        href="/admin/shows"
        className="inline-flex items-center gap-1 font-label tracking-widest text-[10px] text-muted-dark hover:text-accent uppercase mb-6 transition-colors"
      >
        <ChevronLeft size={12} /> Shows
      </Link>

      <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-2">
        New show
      </p>
      <h1 className="font-display font-light text-4xl text-white leading-none mb-10">
        Schedule a show
      </h1>

      <ShowForm action={createShow} submitLabel="Create show" />
    </div>
  );
}
