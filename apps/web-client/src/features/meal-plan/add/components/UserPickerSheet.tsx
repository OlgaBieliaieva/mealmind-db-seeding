"use client";

type Props = {
  open: boolean;
  users: { id: string; name: string }[];
  selectedUserId: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
};

export function UserPickerSheet({
  open,
  users,
  selectedUserId,
  onSelect,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* SHEET */}
      <div className="absolute bottom-0 w-full bg-white rounded-t-2xl p-4 pb-20">
        <div className="mb-3 text-sm text-gray-500">Оберіть користувача</div>

        <div className="space-y-2">
          {users.map((u) => {
            const active = u.id === selectedUserId;

            return (
              <button
                key={u.id}
                onClick={() => onSelect(u.id)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg
                  ${active ? "bg-green-100 text-green-700" : "bg-gray-100"}
                `}
              >
                {u.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
