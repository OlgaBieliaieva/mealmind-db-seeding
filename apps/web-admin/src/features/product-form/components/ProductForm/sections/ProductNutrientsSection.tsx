"use client";

import { useFormContext } from "react-hook-form";
import { ProductFormInput } from "../../../schemas/product-form.schema";
import { FormSection } from "@/shared/ui/form/FormSection";
import { useNutrientReferences } from "@/shared/hooks/useNutrientReferences";
import { NutrientRow } from "../nutrients/NutrientRow";
import { isMacroNutrient } from "@/features/product-nutrients/lib/isMacroNutrient";

export function ProductNutrientsSection() {
  const { data, isLoading } = useNutrientReferences();
  const { watch } = useFormContext<ProductFormInput>();

  const type = watch("type");
  const parentId = watch("parent_product_id");

  const macrosRequired = type === "generic" || !parentId;

  if (isLoading) {
    return <FormSection title="Нутрієнти">Завантаження...</FormSection>;
  }

  return (
    <FormSection
      title="Нутрієнти"
      description={
        macrosRequired
          ? "Макронутрієнти обовʼязкові. Введіть харчову цінність на 100г"
          : "Макронутрієнти можуть бути успадковані від базового продукту. Можна ввести власні дані харчової цінності на 100г"
      }
    >
      <div className="space-y-2">
        {data?.map((n) => (
          <NutrientRow
            key={n.nutrient_id}
            nutrient={n}
            isRequired={macrosRequired && isMacroNutrient(n.code)}
          />
        ))}
      </div>
    </FormSection>
  );
}
