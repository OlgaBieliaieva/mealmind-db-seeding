import { apiFetch } from "@/shared/lib/api/api";
import { DietaryTag } from "@/shared/domain/dietary-tag/dietary-tag.types";

export function getDietaryTags(): Promise<DietaryTag[]> {
  return apiFetch("/dietary-tags");
}
