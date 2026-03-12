import { useCreateProduct } from "./useCreateProduct";
import { useCreateBrand } from "./useCreateBrand";
import { ProductFormValues } from "../schemas/product-form.schema";
import { mapProductFormToProductInput } from "../mappers/productFormToProductInput.mapper";

export function useProductFormSubmit() {
  const createProduct = useCreateProduct();
  const createBrand = useCreateBrand();

  const isSubmitting = createProduct.isPending || createBrand.isPending;

  const isError = createProduct.isError || createBrand.isError;

  const isSuccess = createProduct.isSuccess;

  async function submit(values: ProductFormValues) {
    let brandId = values.brand_id;

    if (values.type === "branded" && brandId === "__new__") {
      const created = await createBrand.mutateAsync({
        name: {
          en: values.new_brand_name_en!.trim(),
          ua: values.new_brand_name_ua!.trim(),
        },
        country: values.new_brand_country?.trim(),
      });

      brandId = created.brand_id;
    }

    const payload = mapProductFormToProductInput({
      ...values,
      brand_id: brandId,
    });

    await createProduct.mutateAsync(payload);
  }

  return {
    submit,
    isSubmitting,
    isError,
    isSuccess,
  };
}
