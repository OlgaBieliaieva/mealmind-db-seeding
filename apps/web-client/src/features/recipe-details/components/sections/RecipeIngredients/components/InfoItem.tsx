export function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-semibold text-gray-900">{value}</div>
      <div className="text-[11px] text-gray-400 mt-0.5">{label}</div>
    </div>
  );
}
