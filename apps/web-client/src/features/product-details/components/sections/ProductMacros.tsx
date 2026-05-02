"use client";

type Props = {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
};

export function ProductMacros({ calories, proteins, fats, carbs }: Props) {
  const total = proteins + fats + carbs || 1;

  const pPct = (proteins / total) * 100;
  const fPct = (fats / total) * 100;
  const cPct = (carbs / total) * 100;

  return (
    <div className="space-y-4">
      {/* 🔥 Calories highlight */}
      <div className="bg-yellow-50 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-yellow-700">Калорії</div>
          <div className="text-2xl font-semibold text-yellow-800">
            {Math.round(calories)}
          </div>
        </div>
        <div className="text-sm text-yellow-600">ккал / 100г</div>
      </div>

      {/* 🧩 Macro cards */}
      <div className="grid grid-cols-3 gap-2">
        <MacroCard label="Білки" value={proteins} color="blue" />
        <MacroCard label="Жири" value={fats} color="orange" />
        <MacroCard label="Вугл." value={carbs} color="green" />
      </div>

      {/* 📊 Bars */}
      <div className="space-y-2">
        <MacroBar label="Білки" value={proteins} percent={pPct} color="blue" />
        <MacroBar label="Жири" value={fats} percent={fPct} color="orange" />
        <MacroBar
          label="Вуглеводи"
          value={carbs}
          percent={cPct}
          color="green"
        />
      </div>
    </div>
  );
}

function MacroCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "blue" | "orange" | "green";
}) {
  const map = {
    blue: "bg-blue-50 text-blue-700",
    orange: "bg-orange-50 text-orange-700",
    green: "bg-green-50 text-green-700",
  };

  return (
    <div className={`rounded-xl p-3 text-center ${map[color]}`}>
      <div className="text-xs">{label}</div>
      <div className="text-lg font-semibold">{Math.round(value)}г</div>
    </div>
  );
}

function MacroBar({
  label,
  value,
  percent,
  color,
}: {
  label: string;
  value: number;
  percent: number;
  color: "blue" | "orange" | "green";
}) {
  const map = {
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    green: "bg-green-500",
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-600">
        <span>{label}</span>
        <span>{Math.round(value)}г</span>
      </div>

      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${map[color]}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
