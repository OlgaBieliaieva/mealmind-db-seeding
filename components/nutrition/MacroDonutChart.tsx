"use client";

import { BalanceResult } from "@/types/nutrition-balance";

type Props = {
  balance: BalanceResult;
};

export default function MacroDonutChart({ balance }: Props) {
  const { protein, fat, carbs } = balance.macroPercents;

  const radius = 50;
  const stroke = 20;
  const normalizedRadius = radius - stroke;
  const circumference = 2 * Math.PI * normalizedRadius;

  const segments = [
    { value: protein, color: "#3b82f6" }, // blue
    { value: fat, color: "#f59e0b" }, // amber
    { value: carbs, color: "#10b981" }, // green
  ];

  let accumulatedLength = 0;

  return (
    <div className="flex flex-col items-center mb-6">
      <svg height={radius * 2} width={radius * 2}>
        {/* Background */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {segments.map((segment, index) => {
          const segmentLength = (segment.value / 100) * circumference;

          const circle = (
            <circle
              key={index}
              stroke={segment.color}
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={`${segmentLength} ${circumference}`}
              strokeDashoffset={-accumulatedLength}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
              }}
            />
          );

          accumulatedLength += segmentLength;

          return circle;
        })}
      </svg>

      <div className="mt-3 text-sm space-y-1">
        <div>🥩 Білки — {protein.toFixed(1)}%</div>
        <div>🧈 Жири — {fat.toFixed(1)}%</div>
        <div>🍞 Вуглеводи — {carbs.toFixed(1)}%</div>
      </div>
    </div>
  );
}
