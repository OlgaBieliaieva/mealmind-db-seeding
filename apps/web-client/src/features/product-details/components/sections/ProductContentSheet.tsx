"use client";

export function ProductContentSheet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 -mt-16 flex flex-1 min-h-0 flex-col rounded-t-3xl bg-white shadow-lg">
      <div className="flex flex-1 min-h-0 flex-col px-4 pt-4">{children}</div>
    </div>
  );
}
