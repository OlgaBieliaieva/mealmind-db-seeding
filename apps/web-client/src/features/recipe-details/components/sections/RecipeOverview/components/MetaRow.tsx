export function MetaRow({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | null;
  icon?: string;
}) {
  if (!value) return null;

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="text-gray-500">
        {icon} {label}
      </div>
      <div className="text-gray-900 font-medium">{value}</div>
    </div>
  );
}