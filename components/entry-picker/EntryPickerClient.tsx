"use client";

import { useState } from "react";
import EntryPickerHeader from "./EntryPickerHeader";
import EntryTabs, { EntryTab } from "./EntryTabs";
import { FamilyMember } from "@/lib/families/family-members.read";

type Props = {
  mealName: string;
  members: FamilyMember[];
  initialUserId: string | null;
};

export default function EntryPickerClient({
  mealName,
  members,
  initialUserId,
}: Props) {
  const [activeTab, setActiveTab] = useState<EntryTab>("cookbook");

  return (
    <div className="min-h-screen bg-gray-50">
      <EntryPickerHeader
        mealName={mealName}
        members={members}
        initialUserId={initialUserId}
      />

      <EntryTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* Temporary content placeholder */}
      <div className="p-4 text-sm text-gray-400">Active tab: {activeTab}</div>
    </div>
  );
}
