"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FamilyMember } from "@/lib/families/family-members.read";

type Props = {
  mealName: string;
  members: FamilyMember[];
  initialUserId: string | null;
};

export default function EntryPickerHeader({
  mealName,
  members,
  initialUserId,
}: Props) {
  const router = useRouter();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    initialUserId,
  );

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
        <div>
          <select
            value={selectedUserId ?? ""}
            onChange={(e) => setSelectedUserId(e.target.value || null)}
            className="text-sm border rounded-lg px-2 py-1"
          >
            <option value="">Оберіть користувача</option>

            {members.map((member) => (
              <option key={member.user_id} value={member.user_id}>
                {member.first_name}
              </option>
            ))}
          </select>
        </div>

        {/* Action button (temporary ✕) */}
        <button
          onClick={() => router.back()}
          className="text-gray-500 font-medium"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
