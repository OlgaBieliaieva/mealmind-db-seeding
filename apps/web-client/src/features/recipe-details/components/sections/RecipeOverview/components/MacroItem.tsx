export function MacroItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-semibold text-gray-900">
        {Math.round(value)}
      </div>
      <div className="text-[11px] text-gray-400">{label}</div>
    </div>
  );
}
