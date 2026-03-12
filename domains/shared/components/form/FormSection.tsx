"use client";

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function FormSection({ title, description, children }: Props) {
  return (
    <section className="space-y-4 rounded-2xl border bg-white p-5 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>

        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>

      {children}
    </section>
  );
}
