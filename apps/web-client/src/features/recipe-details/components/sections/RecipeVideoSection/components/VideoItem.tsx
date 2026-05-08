import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { PlatformBadge } from "@/features/recipe-details/components/sections/RecipeVideoSection/components/PlatformBadge";
import { Card } from "./Card";
import { formatDuration } from "../utils/formatDuration";
import { RecipeDetailsDTO } from "@/features/recipe-details/types/recipe-details.types";

export function VideoItem({
  video,
}: {
  video: RecipeDetailsDTO["videos"][number];
}) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block active:scale-[0.98] transition"
    >
      <Card>
        <div className="flex gap-3">
          {/* THUMBNAIL */}
          <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            {video.thumbnailUrl ? (
              <Image
                src={video.thumbnailUrl}
                alt={video.title ?? "video"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl">
                🎬
              </div>
            )}

            {/* duration */}
            {video.durationSec && (
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                {formatDuration(video.durationSec)}
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 line-clamp-2">
              {video.title ?? "Відео рецепт"}
            </div>

            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
              <PlatformBadge platform={video.platform} />

              {video.author?.name && (
                <span className="truncate">{video.author.name}</span>
              )}
            </div>
          </div>

          {/* external icon */}
          <div className="flex items-center text-gray-400">
            <ExternalLink size={16} />
          </div>
        </div>
      </Card>
    </a>
  );
}
