type Props = {
  items: {
    dietary_tag_id: number;
    name: { ua: string };
  }[];
  value: number[];
  onChange: (next: number[]) => void;
};

export function DietaryTagSelector({ items, value, onChange }: Props) {
  function toggle(id: number) {
    onChange(
      value.includes(id) ? value.filter((v) => v !== id) : [...value, id],
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Дієтичні теги</h3>

      <div className="flex flex-wrap gap-2">
        {items.map((tag) => (
          <button
            key={tag.dietary_tag_id}
            type="button"
            onClick={() => toggle(tag.dietary_tag_id)}
            className={`rounded border px-3 py-1 text-sm ${
              value.includes(tag.dietary_tag_id)
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            {tag.name.ua}
          </button>
        ))}
      </div>
    </div>
  );
}
