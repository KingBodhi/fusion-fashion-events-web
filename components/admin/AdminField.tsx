import { ReactNode } from "react";

export function AdminField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-label tracking-widest text-[10px] text-muted-dark uppercase">
        {label}
      </span>
      {children}
      {hint && <span className="text-xs text-muted-dark mt-1 block">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "mt-2 w-full bg-black border border-border px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors";

export const textareaClass = `${inputClass} font-body min-h-[120px] resize-y`;
export const selectClass = `${inputClass} appearance-none`;
