"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function FoodSearchInput({ value, onChange }: Props) {
  return (
    <div className="pt-3">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Пошук страв або продуктів..."
        className="
          w-full
          rounded-xl
          border
          px-3 py-2
          text-sm
          outline-none
          focus:ring-2 focus:ring-green-500
        "
      />
    </div>
  );
}
