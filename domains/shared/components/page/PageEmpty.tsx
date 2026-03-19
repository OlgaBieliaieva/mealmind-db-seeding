"use client";

type Props = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function PageEmpty({ title, description, action }: Props) {
  return (
    <div className="rounded-xl border bg-white p-8 text-center space-y-3">
      <div className="text-base font-semibold">{title}</div>

      {description && (
        <div className="text-sm text-muted-foreground">{description}</div>
      )}

      {action}
    </div>
  );
}
