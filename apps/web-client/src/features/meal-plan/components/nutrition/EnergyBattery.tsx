"use client";

type Props = {
  percent: number;
  status: "balanced" | "warning" | "critical";
  label?: string;
};

function getTone(status: Props["status"]) {
  switch (status) {
    case "balanced":
      return {
        border: "border-green-200",
        fill: "bg-green-500",
        text: "text-green-700",
        bg: "bg-green-50",
      };
    case "warning":
      return {
        border: "border-amber-200",
        fill: "bg-amber-400",
        text: "text-amber-700",
        bg: "bg-amber-50",
      };
    case "critical":
    default:
      return {
        border: "border-red-200",
        fill: "bg-red-500",
        text: "text-red-700",
        bg: "bg-red-50",
      };
  }
}

export default function EnergyBattery({
  percent,
  status,
  label = "Енергія",
}: Props) {
  const safePercent = Math.max(0, Math.min(percent, 150));
  const widthPercent = Math.min(safePercent, 100);
  const tone = getTone(status);

  return (
    <div className={`rounded-2xl border px-3 py-2 ${tone.border} ${tone.bg}`}>
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-xs font-medium text-gray-600">{label}</span>
        <span className={`text-xs font-semibold ${tone.text}`}>
          {Math.round(percent)}%
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div
          className={`relative h-4 flex-1 rounded-full border overflow-hidden bg-white ${tone.border}`}
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${tone.fill}`}
            style={{ width: `${widthPercent}%` }}
          />
        </div>

        <div className="w-1.5 h-3 rounded-sm bg-gray-300 shrink-0" />
      </div>
    </div>
  );
}
