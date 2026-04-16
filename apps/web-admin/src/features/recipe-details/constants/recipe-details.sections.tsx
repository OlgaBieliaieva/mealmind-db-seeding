import { RecipeDetailsVM } from "@/features/recipe/types/recipe-details.vm";
import { RecipeDetailsMetaSection } from "../components/details/RecipeDetailsMetaSection";
import { RecipeDetailsIngredientsSection } from "../components/details/RecipeDetailsIngredientsSection";
import { RecipeDetailsStepsSection } from "../components/details/RecipeDetailsStepsSection";
import { RecipeDetailsNutrientsSection } from "../components/details/RecipeDetailsNutrientsSection";
import { RecipeDetailsTagsSection } from "../components/details/RecipeDetailsTagsSection";
import { RecipeDetailsVideosSection } from "../components/details/RecipeDetailsVideosSection";
import { RecipeDetailsAuthorSection } from "../components/details/RecipeDetailsAuthorSection";

type SectionConfig = {
  key: string;
  render: (recipe: RecipeDetailsVM) => React.ReactNode;
};

export const RECIPE_DETAILS_SECTIONS: SectionConfig[] = [
  {
    key: "meta",
    render: (r) => <RecipeDetailsMetaSection recipe={r} />,
  },
  {
    key: "ingredients",
    render: (r) => <RecipeDetailsIngredientsSection recipe={r} />,
  },
  {
    key: "steps",
    render: (r) => <RecipeDetailsStepsSection recipe={r} />,
  },
  {
    key: "nutrients",
    render: (r) => <RecipeDetailsNutrientsSection recipe={r} />,
  },
  {
    key: "tags",
    render: (r) => <RecipeDetailsTagsSection recipe={r} />,
  },
  {
    key: "author",
    render: (r) =>
      r.author ? (
        <RecipeDetailsAuthorSection
          author={{
            name: r.author.name,
            avatar: r.author.avatarUrl,
            profileUrl: r.author.profileUrl,
            type: r.author.type,
          }}
        />
      ) : null,
  },
  {
    key: "videos",
    render: (r) =>
      r.videos.length ? (
        <RecipeDetailsVideosSection
          videos={r.videos.map((v) => ({
            id: v.id,
            url: v.url,
            platform: v.platform,
            author: v.author?.name ?? null,
          }))}
        />
      ) : null,
  },
];