import { apiFetch } from "@/src/shared/lib/api/api";
import { Category } from "@/src/shared/domain/category/category.types";

export function getCategories(): Promise<Category[]> {
  return apiFetch("/api/v1/admin/categories");
}
