"use client";

import { useState } from "react";

type Props = {
  isLoading?: boolean;
  onCreate: (data: {
    display_name: string;
    type: "user" | "blogger" | "system";
    avatar_url?: string | null;
    profile_url?: string | null;
  }) => void;
  onCancel: () => void;
};

export function CreateAuthorInline({ onCreate, onCancel, isLoading }: Props) {
  const [type, setType] = useState<"user" | "blogger" | "system">("blogger");
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState("");

  function handleSubmit() {
    const name = displayName.trim();
    if (!name) return;

    onCreate({
      type,
      display_name: name,
      avatar_url: avatarUrl,
      profile_url: profileUrl || null,
    });
  }

  return (
    <div className="space-y-2 rounded border bg-gray-50 p-3">
      <p className="text-sm font-medium">Новий автор</p>

      <select
        className="w-full rounded border px-2 py-1"
        value={type}
        onChange={(e) =>
          setType(e.target.value as "user" | "blogger" | "system")
        }
      >
        <option value="blogger">Блогер</option>
        <option value="user">Користувач</option>
        <option value="system">System</option>
      </select>

      <input
        className="w-full rounded border px-2 py-1"
        placeholder="Імʼя автора"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />

      <input
        className="w-full rounded border px-2 py-1"
        placeholder="Profile URL (optional)"
        value={profileUrl}
        onChange={(e) => setProfileUrl(e.target.value)}
      />

      {/* 👉 тут можна підключити свій AvatarUploader назад */}
      {/* <AvatarUploader value={avatarUrl} onChange={setAvatarUrl} /> */}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !displayName.trim()}
          className="rounded bg-black px-3 py-1 text-sm text-white disabled:opacity-50"
        >
          {isLoading ? "Створення..." : "Зберегти"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-gray-500"
        >
          Скасувати
        </button>
      </div>
    </div>
  );
}
