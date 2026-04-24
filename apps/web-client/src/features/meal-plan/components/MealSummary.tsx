type Props = {
  total: number;
  prepared: number;
};

export function MealSummary({ total, prepared }: Props) {
  const progress = total === 0 ? 0 : prepared / total;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">Готовність</span>
        <span className="text-sm font-semibold">
          {prepared}/{total}
        </span>
      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
