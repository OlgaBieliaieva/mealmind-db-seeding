"use client";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  isPending?: boolean;
};

export function Pagination({ page, totalPages, onChange, isPending }: Props) {
  if (totalPages <= 1) return null;

  function go(p: number) {
    if (p < 1 || p > totalPages) return;
    onChange(p);
  }

  const pages = [];

  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <button
        disabled={page === 1 || isPending}
        onClick={() => go(page - 1)}
        className="rounded border px-3 py-1 text-sm disabled:opacity-50"
      >
        ←
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => go(1)}
            className="rounded border px-3 py-1 text-sm"
          >
            1
          </button>

          {start > 2 && <span className="px-1 text-sm">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          disabled={isPending}
          onClick={() => go(p)}
          className={`rounded border px-3 py-1 text-sm ${
            p === page ? "bg-black text-white" : "bg-white hover:bg-gray-50"
          }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-1 text-sm">…</span>}

          <button
            onClick={() => go(totalPages)}
            className="rounded border px-3 py-1 text-sm"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        disabled={page === totalPages || isPending}
        onClick={() => go(page + 1)}
        className="rounded border px-3 py-1 text-sm disabled:opacity-50"
      >
        →
      </button>
    </div>
  );
}
