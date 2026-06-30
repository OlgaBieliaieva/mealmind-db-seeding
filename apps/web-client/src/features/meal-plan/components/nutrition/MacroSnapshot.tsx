"use client";

type Props = {
  protein: number;
  fat: number;
  carbs: number;
};

type MacroItemProps = {
  emoji: string;
  label: string;
  value: number;
  tone: string;
};

function MacroItem({ emoji, label, value, tone }: MacroItemProps) {
  return (
    <div className="rounded-xl border bg-white px-3 py-2 min-w-[88px]">
      <div className="flex items-center gap-2">
        <span className="text-base leading-none">{emoji}</span>
        <span className="text-xs text-gray-500">{label}</span>
      </div>

      <div className={`mt-1 text-sm font-semibold ${tone}`}>
        {value.toFixed(0)}%
      </div>
    </div>
  );
}

export default function MacroSnapshot({ protein, fat, carbs }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <MacroItem emoji="🥩" label="Білки" value={protein} tone="text-sky-700" />
      <MacroItem emoji="🧈" label="Жири" value={fat} tone="text-amber-700" />
      <MacroItem
        emoji="🍞"
        label="Вуглеводи"
        value={carbs}
        tone="text-emerald-700"
      />
    </div>
  );
}
