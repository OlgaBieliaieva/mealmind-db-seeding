"use client";

type Props = {
  percent: number; // 0–200+
  status: "balanced" | "warning" | "critical";
};

export default function EnergyBattery({ percent, status }: Props) {
  // обмежуємо для UI
  const safePercent = Math.max(0, Math.min(percent, 150));

  // градієнт від червоного до зеленого
  const getColor = () => {
    if (safePercent < 60) return "bg-red-500";
    if (safePercent < 90) return "bg-yellow-400";
    if (safePercent <= 110) return "bg-green-500";
    return "bg-red-600"; // якщо перебір
  };

  const borderColor =
    status === "critical"
      ? "border-red-600"
      : status === "warning"
        ? "border-yellow-500"
        : "border-green-500";

  return (
    <div className="flex items-center gap-2">
      <div className={`relative w-18 h-6 border-2 rounded-sm ${borderColor}`}>
        <div
          className={`h-full ${getColor()} transition-all duration-500`}
          style={{ width: `${Math.min(safePercent, 100)}%` }}
        />

        <div className="absolute -right-1.5 top-0.5 w-1.5 h-3.5 bg-gray-400 rounded-sm" />
      </div>

      <span className="text-xs font-medium">{Math.round(percent)}%</span>
    </div>
  );
}
