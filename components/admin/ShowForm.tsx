import { AdminField, inputClass, selectClass } from "./AdminField";

export type ShowFormDefaults = {
  slug?: string;
  title?: string;
  subtitle?: string | null;
  hero_image?: string | null;
  live_input_id?: string;
  starts_at?: Date;
  ends_at?: Date | null;
  status?: "SCHEDULED" | "LIVE" | "ENDED";
};

function toLocalDateTime(d?: Date | null): string {
  if (!d) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function ShowForm({
  action,
  defaults,
  submitLabel = "Save",
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaults?: ShowFormDefaults;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminField label="Title">
          <input
            type="text"
            name="title"
            required
            defaultValue={defaults?.title ?? ""}
            className={inputClass}
          />
        </AdminField>
        <AdminField label="Slug" hint="lowercase, dashes only">
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

      <AdminField label="Subtitle" hint="Optional second-line headline">
        <input
          type="text"
          name="subtitle"
          maxLength={200}
          defaultValue={defaults?.subtitle ?? ""}
          className={inputClass}
        />
      </AdminField>

      <AdminField label="Hero image URL">
        <input
          type="url"
          name="hero_image"
          defaultValue={defaults?.hero_image ?? ""}
          className={inputClass}
        />
      </AdminField>

      <AdminField
        label="Cloudflare Live Input ID"
        hint="UID of the Live Input this show pushes to. Default seeded from CF_STREAM_LIVE_INPUT_ID."
      >
        <input
          type="text"
          name="live_input_id"
          required
          defaultValue={
            defaults?.live_input_id ??
            process.env.CF_STREAM_LIVE_INPUT_ID ??
            ""
          }
          className={inputClass}
        />
      </AdminField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminField label="Starts at">
          <input
            type="datetime-local"
            name="starts_at"
            required
            defaultValue={toLocalDateTime(defaults?.starts_at)}
            className={inputClass}
          />
        </AdminField>
        <AdminField label="Ends at (optional)">
          <input
            type="datetime-local"
            name="ends_at"
            defaultValue={toLocalDateTime(defaults?.ends_at)}
            className={inputClass}
          />
        </AdminField>
      </div>

      <AdminField label="Status">
        <select
          name="status"
          defaultValue={defaults?.status ?? "SCHEDULED"}
          className={selectClass}
        >
          <option value="SCHEDULED">Scheduled</option>
          <option value="LIVE">Live</option>
          <option value="ENDED">Ended</option>
        </select>
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
