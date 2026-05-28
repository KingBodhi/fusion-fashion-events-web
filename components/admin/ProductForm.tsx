import { AdminField, inputClass, textareaClass, selectClass } from "./AdminField";
import { ImageUploader } from "./ImageUploader";

export type ProductFormDefaults = {
  brand_id?: string;
  sku?: string;
  name?: string;
  description?: string | null;
  price_cents?: number;
  currency?: string;
  image_urls?: string[];
  inventory?: number | null;
  external_url?: string | null;
  status?: "DRAFT" | "ACTIVE" | "SOLD_OUT" | "ARCHIVED";
};

export function ProductForm({
  action,
  brands,
  defaults,
  submitLabel = "Save",
}: {
  action: (formData: FormData) => void | Promise<void>;
  brands: { id: string; name: string }[];
  defaults?: ProductFormDefaults;
  submitLabel?: string;
}) {
  const dollars = defaults?.price_cents ? (defaults.price_cents / 100).toFixed(2) : "";

  return (
    <form action={action} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminField label="Brand" hint="Designer or label this product belongs to">
          <select
            name="brand_id"
            required
            defaultValue={defaults?.brand_id ?? ""}
            className={selectClass}
          >
            <option value="" disabled>
              Select brand…
            </option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Status">
          <select
            name="status"
            defaultValue={defaults?.status ?? "DRAFT"}
            className={selectClass}
          >
            <option value="DRAFT">Draft (hidden)</option>
            <option value="ACTIVE">Active (shoppable)</option>
            <option value="SOLD_OUT">Sold out</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </AdminField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminField label="Name">
          <input
            type="text"
            name="name"
            required
            defaultValue={defaults?.name ?? ""}
            className={inputClass}
          />
        </AdminField>
        <AdminField label="SKU" hint="Unique per brand">
          <input
            type="text"
            name="sku"
            required
            defaultValue={defaults?.sku ?? ""}
            className={inputClass}
          />
        </AdminField>
      </div>

      <AdminField label="Description">
        <textarea
          name="description"
          rows={4}
          defaultValue={defaults?.description ?? ""}
          className={textareaClass}
        />
      </AdminField>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminField label="Price">
          <input
            type="text"
            name="price"
            required
            placeholder="185.00"
            defaultValue={dollars}
            className={inputClass}
          />
        </AdminField>
        <AdminField label="Currency">
          <select
            name="currency"
            defaultValue={defaults?.currency ?? "USD"}
            className={selectClass}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </AdminField>
        <AdminField label="Inventory" hint="Blank = unlimited / MTO">
          <input
            type="number"
            name="inventory"
            min={0}
            defaultValue={defaults?.inventory ?? ""}
            className={inputClass}
          />
        </AdminField>
      </div>

      <ImageUploader
        name="image_urls"
        label="Product images"
        hint="Drag in one or more files. First is the primary used in product cards and the shopping rail."
        multiple
        defaultUrls={defaults?.image_urls ?? []}
        folder="products"
      />

      <AdminField
        label="External URL"
        hint="Phase 1.5: link out to a designer's existing store (Shopify/IG shop). Will be replaced by native checkout in Phase 3."
      >
        <input
          type="url"
          name="external_url"
          defaultValue={defaults?.external_url ?? ""}
          className={inputClass}
        />
      </AdminField>

      <div className="pt-4">
        <button
          type="submit"
          className="bg-accent text-black font-label tracking-widest text-xs uppercase px-8 py-3 hover:bg-accent-dim transition-colors"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
