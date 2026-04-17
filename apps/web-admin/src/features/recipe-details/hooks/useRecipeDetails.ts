import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getRecipeDetails } from "@/shared/api/recipes/recipes.api";
import { mapRecipeDtoToVM } from "@/features/recipe/mappers/recipe.mapper";

export function useRecipeDetails() {
  const params = useParams();
  const id = params.id as string;

  return useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const dto = await getRecipeDetails(id);

      return mapRecipeDtoToVM(dto);
    },
  });
}
