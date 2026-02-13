"use client";

import { useRouter } from "next/navigation";
import { FamilyMember } from "@/lib/families/family-members.read";

type Props = {
  mealName: string;
  members: FamilyMember[];
  selectedUserId: string | null;
  onUserChange: (id: string | null) => void;
  selectedCount: number;
  onConfirm: () => void;
};

export default function EntryPickerHeader({
  mealName,
  members,
  selectedUserId,
  onUserChange,
  selectedCount,
  onConfirm,
}: Props) {
  const router = useRouter();

  const isConfirmMode = selectedCount > 0;

  return (
    <div className="sticky top-0 z-10 bg-white border-b">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Back + Meal */}
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-gray-500">
            ←
          </button>

          <span className="font-medium text-gray-800">{mealName}</span>
        </div>

        {/* User Select */}
        <select
          value={selectedUserId ?? ""}
          onChange={(e) => onUserChange(e.target.value || null)}
          className="text-sm border rounded-lg px-2 py-1"
        >
          <option value="">Оберіть користувача</option>

          {members.map((member) => (
            <option key={member.user_id} value={member.user_id}>
              {member.first_name}
            </option>
          ))}
        </select>

        {/* Action button */}
        <button
          onClick={onConfirm}
          className={`font-medium ${
            isConfirmMode ? "text-green-600" : "text-gray-400"
          }`}
        >
          {isConfirmMode ? "✓" : "✕"}
        </button>
      </div>

      {selectedCount > 0 && (
        <div className="px-4 pb-2 text-xs text-gray-500">
          Обрано: {selectedCount}
        </div>
      )}
    </div>
  );
}
