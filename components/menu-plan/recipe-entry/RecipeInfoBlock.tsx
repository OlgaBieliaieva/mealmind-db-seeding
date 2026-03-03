"use client";

import Image from "next/image";
import { RecipeFull } from "@/types/recipe-views";

type Props = {
  recipeFull: RecipeFull;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export default function RecipeInfoBlock({
  recipeFull,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const { author, cuisines, dietary_tags, recipe } = recipeFull;

  return (
    <div className="px-4 py-4 space-y-3 bg-white">
      <div className="grid grid-cols-[1fr_240px] gap-6 items-start">
        {/* Left */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{recipe.title}</h1>

            <button onClick={onToggleFavorite} className="text-2xl">
              {isFavorite ? "⭐" : "☆"}
            </button>
          </div>
          <p className="text-gray-600">{recipe.description}</p>

          {/* Meta tags */}
          <div className="flex flex-wrap gap-2">
            {cuisines.map((c) => (
              <span
                key={c.cuisine_id}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs"
              >
                {c.name}
              </span>
            ))}

            {dietary_tags.map((d) => (
              <span
                key={d.dietary_tag_id}
                className="rounded-full bg-green-100 px-3 py-1 text-xs"
              >
                {d.name}
              </span>
            ))}
          </div>

          {/* Author */}
          {author && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {author.avatar_url ? (
                <Image
                  src={author.avatar_url}
                  alt={author.display_name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                  👤
                </div>
              )}

              <span>
                {author.profile_url ? (
                  <a
                    href={author.profile_url}
                    target="_blank"
                    className="underline"
                  >
                    {author.display_name}
                  </a>
                ) : (
                  <span className="font-medium">{author.display_name}</span>
                )}
              </span>

              {author.type === "system" && (
                <span className="text-xs text-gray-400">(MealMind)</span>
              )}
            </div>
          )}
        </div>

        {/* Right */}
        <div className="w-[240px] h-[240px] rounded overflow-hidden bg-gray-100 flex items-center justify-center">
          {recipe.photo_url ? (
            <Image
              src={recipe.photo_url}
              alt={recipe.title}
              width={240}
              height={240}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <span className="text-4xl">🍽️</span>
              <span className="text-xs mt-2">Без фото</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
