"use client";

type Props = {
  value: boolean;
  onChange: (v: boolean) => void;
};

export function MultiDayToggle({ value, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-black"
      />
      Кілька днів
    </label>
  );
}
