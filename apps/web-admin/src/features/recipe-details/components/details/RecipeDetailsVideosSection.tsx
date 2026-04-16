import { DetailsSectionCard } from "@/features/product-details/components/details/DetailsSectionCard";

type Video = {
  id: string;
  url: string;
  platform: string;
  author?: string | null;
};

type Props = {
  videos: Video[];
};

export function RecipeDetailsVideosSection({ videos }: Props) {
  if (!videos.length) return null;

  return (
    <DetailsSectionCard title="Відео">
      <ul className="space-y-2 text-sm">
        {videos.map((v) => (
          <li key={v.id}>
            <a href={v.url} target="_blank" className="underline">
              {v.platform}
            </a>

            {v.author && (
              <span className="text-gray-500 ml-2">— {v.author}</span>
            )}
          </li>
        ))}
      </ul>
    </DetailsSectionCard>
  );
}
