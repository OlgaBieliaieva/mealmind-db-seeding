"use client";

type Props = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export function PageError({
  title = "Failed to load",
  description = "Something went wrong",
  onRetry,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-8 space-y-4">
      <div className="text-lg font-semibold">{title}</div>

      <div className="text-sm text-muted-foreground">{description}</div>

      {onRetry && (
        <button onClick={onRetry} className="text-sm underline">
          Retry
        </button>
      )}
    </div>
  );
}
