"use client";

import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { SectionTitle } from "./components/SectionTitle";
import { getSourceLabel } from "./utils/getSourceLabel";
import { Card } from "./components/Card";
import {
  RecipeSourceDTO,
  OriginalRecipeDTO,
} from "@/features/recipe-details/types/recipe-details.types";

export function RecipeSourceSection({
  sources,
  originalRecipe,
}: {
  sources?: RecipeSourceDTO[];
  originalRecipe?: OriginalRecipeDTO;
}) {
  const router = useRouter();
  const hasSources = sources && sources.length > 0;

  if (!hasSources && !originalRecipe) return null;

  return (
    <div className="mt-4 space-y-3">
      <SectionTitle>Джерело</SectionTitle>

      <div className="space-y-2">
        {/* 🔹 ORIGINAL RECIPE */}
        {originalRecipe && (
          <button
            onClick={() => router.push(`/food/recipe/${originalRecipe.id}`)}
            className="w-full text-left active:scale-[0.98] transition"
          >
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400">На основі рецепта</div>
                  <div className="text-sm font-medium text-gray-900">
                    {originalRecipe.title}
                  </div>
                </div>

                <ExternalLink size={16} className="text-gray-400" />
              </div>
            </Card>
          </button>
        )}

        {/* 🔹 EXTERNAL SOURCES */}
        {hasSources &&
          sources!.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block active:scale-[0.98] transition"
            >
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400">
                      {getSourceLabel(source.platform)}
                    </div>

                    <div className="text-sm font-medium text-gray-900 line-clamp-1">
                      {source.title ?? "Переглянути рецепт"}
                    </div>
                  </div>

                  <ExternalLink size={16} className="text-gray-400" />
                </div>
              </Card>
            </a>
          ))}
      </div>
    </div>
  );
}
