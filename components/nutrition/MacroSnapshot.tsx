"use client";

type Props = {
  protein: number;
  fat: number;
  carbs: number;
};

export default function MacroSnapshot({ protein, fat, carbs }: Props) {
  return (
    <div className="flex gap-4 text-sm">
      <div>
        <span className="text-base">🥩</span> {protein.toFixed(0)}%
      </div>
      <div>
        <span className="text-base">🧈</span> {fat.toFixed(0)}%
      </div>
      <div>
        <span className="text-base">🍞</span> {carbs.toFixed(0)}%
      </div>
    </div>
  );
}
