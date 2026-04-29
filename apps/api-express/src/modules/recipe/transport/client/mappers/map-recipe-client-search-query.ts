import { RecipeClientSearchQuery } from "../schemas/recipe-client-search.query.schema";

type RawQuery = {
  query?: string;
  page?: string;
  limit?: string;
  
};

export function mapRecipeClientSearchQuery(
  query: RawQuery,
): RecipeClientSearchQuery {
  return {
    query: query.query,
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 20,
  };
}
