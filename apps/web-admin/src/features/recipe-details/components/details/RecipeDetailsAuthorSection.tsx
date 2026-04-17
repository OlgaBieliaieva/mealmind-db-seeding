import Image from "next/image";
import { DetailsSectionCard } from "@/features/product-details/components/details/DetailsSectionCard";

type Props = {
  author: {
    name: string;
    avatar?: string | null;
    profileUrl?: string | null;
    type?: string | null;
  } | null;
};

export function RecipeDetailsAuthorSection({ author }: Props) {
  if (!author) return null;

  return (
    <DetailsSectionCard title="Автор">
      <div className="flex items-center gap-3">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-xs">
            👤
          </div>
        )}

        <div className="text-sm">
          {author.profileUrl ? (
            <a
              href={author.profileUrl}
              target="_blank"
              className="underline font-medium"
            >
              {author.name}
            </a>
          ) : (
            <span className="font-medium">{author.name}</span>
          )}

          {author.type === "system" && (
            <div className="text-xs text-gray-400">MealMind</div>
          )}
        </div>
      </div>
    </DetailsSectionCard>
  );
}
