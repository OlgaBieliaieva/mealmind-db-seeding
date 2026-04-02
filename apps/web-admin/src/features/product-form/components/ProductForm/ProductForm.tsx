"use client";

import { useState } from "react";
import { useForm, FormProvider, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ProductFormSchema,
  ProductFormInput,
} from "@/features/product-form/schemas/product-form.schema";

import { ProductFormContext } from "../../forms/product-form.context";

import { useProductFormFlow } from "../../hooks/useProductFormFlow";
import { useDirtyGuard } from "../../hooks/useDirtyGuard";

import { FormStatus } from "@/shared/ui/form/FormStatus";
import { PRODUCT_FORM_SECTIONS } from "../../forms/productForm.registry";
import { ProductEditNavigation } from "@/features/product-details/components/ProductEditNavigation";

type Props = {
  mode?: "create" | "edit";
  initialValues?: Partial<ProductFormInput>;
  productId?: string;
};

const defaultValues: ProductFormInput = {
  name_en: "",
  name_ua: "",
  type: "generic",
  unit: "g",
  raw_or_cooked_default: "raw",
  category_id: "",
  notes: "",
  is_verified: false,
  source: "",
  brand_id: undefined,
  parent_product_id: undefined,
  barcode: undefined,
  cooking_loss_pct: "",
  edible_part_pct: "",
  yield_factor: "",
  nutrients: {},
  photos: [],
};

export function ProductForm({
  mode = "create",
  initialValues = defaultValues,
  productId,
}: Props) {
  const [manualParentLock, setManualParentLock] = useState(false);
  const [allowParentEdit, setAllowParentEdit] = useState(false);

  const parentLocked =
    mode === "edit" && !allowParentEdit ? true : manualParentLock;

  const methods = useForm<ProductFormInput>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
  });

  const {
    handleSubmit,
    formState,
    formState: { isDirty },
  } = methods;

  useDirtyGuard({
    enabled: mode === "edit" && isDirty,
  });

  const { submit, isSubmitting, isError, isSuccess } = useProductFormFlow(
    mode,
    productId,
    initialValues // 🔥 важливо для diff
  );

  function onInvalid(errors: FieldErrors<ProductFormInput>) {
    console.log("FORM ERRORS", errors);
  }

  const onSubmit = async (values: ProductFormInput) => {
    const validated = ProductFormSchema.parse(values);

    console.log("FORM VALUES", validated);

    await submit(validated); // 🔥 без mapper
  };

  return (
    <FormProvider {...methods}>
      <ProductFormContext.Provider
        value={{
          parentLocked,
          setParentLocked: setManualParentLock,
          mode,
          allowParentEdit,
          setAllowParentEdit,
        }}
      >
        {mode === "edit" && <ProductEditNavigation />}

        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="flex flex-col"
        >
          <FormStatus
            loading={isSubmitting}
            error={isError}
            success={isSuccess}
          />

          {PRODUCT_FORM_SECTIONS.map((Section, i) => (
            <Section key={i} />
          ))}

          {Object.keys(formState.errors).length > 0 && (
            <div className="text-sm text-red-500">
              Заповніть обовʼязкові поля
            </div>
          )}

          <button
            type="submit"
            disabled={(mode === "edit" && !formState.isDirty) || isSubmitting}
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {isSubmitting ? "Збереження..." : "Зберегти"}
          </button>
        </form>
      </ProductFormContext.Provider>
    </FormProvider>
  );
}

// "use client";

// // SECTION ███ PRODUCT FORM ███

// import { useState } from "react";
// import { useForm, FormProvider, FieldErrors } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   ProductFormSchema,
//   ProductFormInput,
// } from "@/features/product-form/schemas/product-form.schema";

// import { ProductFormContext } from "../../forms/product-form.context";

// import { useProductFormFlow } from "../../hooks/useProductFormFlow";
// import { useDirtyGuard } from "../../hooks/useDirtyGuard";

// import { FormStatus } from "@/shared/ui/form/FormStatus";
// import { mapProductFormToProductInput } from "../../mappers/productFormToProductInput.mapper";
// import { PRODUCT_FORM_SECTIONS } from "../../forms/productForm.registry";
// import { ProductEditNavigation } from "@/features/product-details/components/ProductEditNavigation";

// type Props = {
//   mode?: "create" | "edit";
//   initialValues?: Partial<ProductFormInput>;
//   productId?: string;
// };

// const defaultValues: ProductFormInput = {
//   name_en: "",
//   name_ua: "",
//   type: "generic",
//   unit: "g",
//   raw_or_cooked_default: "raw",
//   category_id: "",
//   notes: "",
//   is_verified: false,
//   source: "",
//   brand_id: undefined,
//   parent_product_id: undefined,
//   barcode: undefined,
//   cooking_loss_pct: "",
//   edible_part_pct: "",
//   yield_factor: "",
//   nutrients: {},
//   photos: [],
// };

// export function ProductForm({
//   mode = "create",
//   initialValues = defaultValues,
//   productId,
// }: Props) {
//   const [manualParentLock, setManualParentLock] = useState(false);

//   const [allowParentEdit, setAllowParentEdit] = useState(false);

//   const parentLocked =
//     mode === "edit" && !allowParentEdit ? true : manualParentLock;

//   const methods = useForm<ProductFormInput>({
//     resolver: zodResolver(ProductFormSchema),
//     defaultValues: {
//       ...defaultValues,
//       ...initialValues,
//     },
//   });

//   function onInvalid(errors: FieldErrors<ProductFormInput>) {
//     console.log("FORM ERRORS", errors);
//   }

//   const {
//     handleSubmit,
//     formState,
//     formState: { isDirty },
//   } = methods;

//   useDirtyGuard({
//     enabled: mode === "edit" && isDirty,
//   });

//   const { submit, isSubmitting, isError, isSuccess } = useProductFormFlow(
//     mode,
//     productId,
//   );

//   const onSubmit = async (values: ProductFormInput) => {
//     const validated = ProductFormSchema.parse(values);

//     const payload = mapProductFormToProductInput(validated);
//     console.log({ values: values });
//     console.log({ validated: validated });
//     console.log({ payload: payload });

//     await submit(payload);
//   };

//   return (
//     <FormProvider {...methods}>
//       <ProductFormContext.Provider
//         value={{
//           parentLocked,
//           setParentLocked: setManualParentLock,
//           mode,
//           allowParentEdit,
//           setAllowParentEdit,
//         }}
//       >
//         {mode === "edit" && <ProductEditNavigation />}
//         <form
//           onSubmit={handleSubmit(onSubmit, onInvalid)}
//           className="flex flex-col"
//         >
//           <FormStatus
//             loading={isSubmitting}
//             error={isError}
//             success={isSuccess}
//           />

//           {PRODUCT_FORM_SECTIONS.map((Section, i) => (
//             <Section key={i} />
//           ))}
//           {Object.keys(formState.errors).length > 0 && (
//             <div className="text-sm text-red-500">
//               Заповніть обовʼязкові поля
//             </div>
//           )}
//           <button
//             type="submit"
//             disabled={(mode === "edit" && !formState.isDirty) || isSubmitting}
//             className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
//           >
//             {isSubmitting ? "Збереження..." : "Зберегти"}
//           </button>
//         </form>
//       </ProductFormContext.Provider>
//     </FormProvider>
//   );
// }
