import { AdminField, inputClass, textareaClass } from "./AdminField";
import { ImageUploader } from "./ImageUploader";

export type BrandFormDefaults = {
  slug?: string;
  name?: string;
  tagline?: string | null;
  bio?: string | null;
  hero_image?: string | null;
  logo?: string | null;
  instagram?: string | null;
  website?: string | null;
};

export function BrandForm({
  action,
  defaults,
  submitLabel = "Save",
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaults?: BrandFormDefaults;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminField label="Name" hint="The brand's display name">
          <input
            type="text"
            name="name"
            required
            defaultValue={defaults?.name ?? ""}
            className={inputClass}
          />
        </AdminField>
        <AdminField
          label="Slug"
          hint="URL: /brands/<slug>. lowercase, dashes only."
        >
          <input
            type="text"
            name="slug"
            required
            pattern="[a-z0-9-]+"
            defaultValue={defaults?.slug ?? ""}
            className={inputClass}
          />
        </AdminField>
      </div>

      <AdminField label="Tagline" hint="One-line headline shown under the brand name">
        <input
          type="text"
          name="tagline"
          maxLength={200}
          defaultValue={defaults?.tagline ?? ""}
          className={inputClass}
        />
      </AdminField>

      <AdminField label="Bio">
        <textarea
          name="bio"
          rows={5}
          defaultValue={defaults?.bio ?? ""}
          className={textareaClass}
        />
      </AdminField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageUploader
          name="hero_image"
          label="Hero image"
          hint="Full-bleed background for /brands/<slug>. Use a wide landscape shot."
          defaultUrls={defaults?.hero_image ? [defaults.hero_image] : []}
          folder="brands/hero"
        />
        <ImageUploader
          name="logo"
          label="Logo"
          hint="Square mark for brand cards. PNG with transparency preferred."
          defaultUrls={defaults?.logo ? [defaults.logo] : []}
          folder="brands/logo"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminField label="Instagram handle">
          <input
            type="text"
            name="instagram"
            placeholder="@tonyvisions"
            defaultValue={defaults?.instagram ?? ""}
            className={inputClass}
          />
        </AdminField>
        <AdminField label="Website">
          <input
            type="url"
            name="website"
            defaultValue={defaults?.website ?? ""}
            className={inputClass}
          />
        </AdminField>
      </div>

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
