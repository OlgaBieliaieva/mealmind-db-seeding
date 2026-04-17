"use client";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  open,
  title = "Підтвердження",
  description = "Ви впевнені, що хочете виконати цю дію?",
  confirmText = "Підтвердити",
  cancelText = "Скасувати",
  isLoading,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-lg">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">{title}</h2>

          <p className="text-sm text-gray-600">{description}</p>

          <div className="flex justify-end gap-2 pt-3">
            <button
              onClick={onCancel}
              className="text-sm px-3 py-2 rounded border"
              disabled={isLoading}
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              className="text-sm px-3 py-2 rounded bg-red-100 text-red-700"
              disabled={isLoading}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
