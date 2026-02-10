"use client";

import { useState } from "react";
import { RecipeAuthor, RecipeAuthorType } from "@/types/recipe-author";
import { AvatarUploader } from "@/components/common/AvatarUploader";

type Props = {
  onCreated: (author: RecipeAuthor) => void;
  onCancel: () => void;
};

export function CreateAuthorInline({ onCreated, onCancel }: Props) {
  const [type, setType] = useState<RecipeAuthorType>("blogger");
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState("");

  async function handleCreate() {
    const res = await fetch("/api/recipes-authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        display_name: displayName,
        avatar_url: avatarUrl,
        profile_url: profileUrl || null,
      }),
    });

    const data = await res.json();

    if (!data.ok) {
      alert("Не вдалося створити автора");
      return;
    }

    onCreated(data.author);
  }

  return (
    <div className="space-y-2 rounded border bg-gray-50 p-3">
      <p className="text-sm font-medium">Новий автор</p>

      <select
        className="w-full rounded border px-2 py-1"
        value={type}
        onChange={(e) => setType(e.target.value as RecipeAuthorType)}
      >
        <option value="blogger">Блогер</option>
        <option value="user">Користувач</option>
        <option value="system">System / Admin</option>
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

      <AvatarUploader value={avatarUrl} onChange={setAvatarUrl} />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleCreate}
          className="rounded bg-black px-3 py-1 text-sm text-white"
        >
          Зберегти
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
