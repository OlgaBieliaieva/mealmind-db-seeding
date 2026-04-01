type Props = {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export function DetailsSectionCard({ title, children, actions }: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-base font-semibold">{title}</div>

        {actions && <div>{actions}</div>}
      </div>

      <div>{children}</div>
    </div>
  );
}
