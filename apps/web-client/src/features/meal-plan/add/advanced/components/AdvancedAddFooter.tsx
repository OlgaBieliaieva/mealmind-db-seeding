"use client";

type Props = {
  entriesCount: number;
  disabled?: boolean;
  loading?: boolean;
  onConfirm: () => void;
};

export function AdvancedAddFooter({
  entriesCount,
  disabled,
  loading,
  onConfirm,
}: Props) {
  return (
    <div className="p-4 bg-white border-t">
      <button
        disabled={disabled || loading}
        onClick={onConfirm}
        className="w-full py-3 rounded-xl bg-green-600 text-white font-medium disabled:bg-gray-300 active:scale-[0.98]"
      >
        {loading ? "Додавання..." : `Додати (${entriesCount})`}
      </button>
    </div>
  );
}
