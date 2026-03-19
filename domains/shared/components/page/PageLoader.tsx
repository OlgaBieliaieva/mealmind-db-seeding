"use client";

type Props = {
  title?: string;
};

export function PageLoader({ title = "Loading..." }: Props) {
  return (
    <div className="rounded-xl border bg-white p-8">
      <div className="space-y-4">
        <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />

        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
