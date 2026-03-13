"use client";

import { FormSection } from "@/domains/shared/components/form/FormSection";
import { useNutrientReferences } from "@/domains/product/hooks/useNutrientReferences";
import { NutrientRow } from "../nutrients/NutrientRow";

export function ProductNutrientsSection() {
  const { data, isLoading } = useNutrientReferences();

  if (isLoading) {
    return <FormSection title="Нутрієнти">Завантаження...</FormSection>;
  }

  return (
    <FormSection
      title="Нутрієнти"
      description="Введіть харчову цінність на 100г"
    >
      <div className="space-y-2">
        {data?.map((n) => (
          <NutrientRow key={n.nutrient_id} nutrient={n} />
        ))}
      </div>
    </FormSection>
  );
}
