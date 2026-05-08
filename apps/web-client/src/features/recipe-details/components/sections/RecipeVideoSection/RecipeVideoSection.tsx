"use client";

import { SectionTitle } from "./components/SectionTitle";
import { VideoItem } from "./components/VideoItem";
import { RecipeDetailsDTO } from "@/features/recipe-details/types/recipe-details.types";

export function RecipeVideoSection({
  videos,
}: {
  videos?: RecipeDetailsDTO["videos"];
}) {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="mt-4 space-y-3">
      <SectionTitle>Відео ({videos.length})</SectionTitle>

      <div className="space-y-3">
        {videos.map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
