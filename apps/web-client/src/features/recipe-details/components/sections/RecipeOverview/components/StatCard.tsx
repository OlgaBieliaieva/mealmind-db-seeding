export function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-3 text-center shadow-sm border border-gray-100">
      <div className="text-sm font-semibold text-gray-900">{value}</div>

      {sub && <div className="text-[10px] text-gray-400 mt-0.5">{sub}</div>}

      <div className="text-[10px] text-gray-400 mt-1">{label}</div>
    </div>
  );
}