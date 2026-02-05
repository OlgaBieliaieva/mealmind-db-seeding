import { AuthorLink } from "@/types/author-link";

type Props = {
  value: AuthorLink[];
  onChange: (next: AuthorLink[]) => void;
};

const PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "website", label: "Website" },
  { value: "other", label: "Other" },
] as const;

export function AuthorLinksEditor({ value, onChange }: Props) {
  function update(index: number, patch: Partial<AuthorLink>) {
    onChange(
      value.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  }

  function add() {
    onChange([...value, { platform: "instagram", url: "" }]);
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Посилання на автора</h3>

      {value.map((link, index) => (
        <div key={index} className="flex gap-2">
          <select
            value={link.platform}
            onChange={(e) =>
              update(index, {
                platform: e.target.value as AuthorLink["platform"],
              })
            }
            className="rounded border px-2 py-1"
          >
            {PLATFORMS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>

          <input
            type="url"
            placeholder="https://…"
            value={link.url}
            onChange={(e) => update(index, { url: e.target.value })}
            className="flex-1 rounded border px-2 py-1"
          />

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-sm text-red-600"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="rounded border px-3 py-1 text-sm"
      >
        + Додати посилання
      </button>
    </div>
  );
}
