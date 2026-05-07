import Image from "next/image";
import { ChefHat } from "lucide-react";

import { Card } from "./Card";
import { ExpandableText } from "./ExpandableText";
import { getPlatformIcon } from "../utils/getPlatformIcon";
import { RecipeDetailsDTO } from "@/features/recipe-details/types/recipe-details.types";

export function RecipeAuthorCard({
  author,
}: {
  author: RecipeDetailsDTO["author"];
}) {
  if (!author) return null;

  return (
    <Card>
      <div className="flex gap-3">
        {/* AVATAR */}
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center">
          {author.avatarUrl ? (
            <Image
              src={author.avatarUrl}
              alt={author.name}
              width={40}
              height={40}
              className="object-cover"
            />
          ) : (
            <ChefHat size={18} className="text-gray-400" />
          )}
        </div>

        {/* INFO */}
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-900">
            {author.name}
          </div>

          {author.bio && <ExpandableText text={author.bio} lines={2} />}

          {author.profileUrl && (
            <a
              href={author.profileUrl}
              target="_blank"
              className="text-xs text-gray-400 hover:text-gray-600 transition"
            >
              Переглянути профіль
            </a>
          )}
        </div>
      </div>

      {/* LINKS */}
      {author.links && author.links?.length > 0 && (
        <div className="flex gap-3 mt-3">
          {author.links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              className="hover:scale-110 transition"
            >
              {getPlatformIcon(l.type)}
            </a>
          ))}
        </div>
      )}
    </Card>
  );
}
