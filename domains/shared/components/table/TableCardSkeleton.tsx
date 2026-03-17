"use client";

type Props = {
  rows?: number;
};

export function TableCardSkeleton({ rows = 8 }: Props) {
  return (
    <div className="rounded border bg-white">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between border-b px-4 py-3 last:border-b-0"
        >
          <div className="space-y-2">
            <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />

            <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
          </div>

          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
