"use client";

import { useFormContext } from "react-hook-form";

import { FormSection } from "@/domains/shared/components/form/FormSection";
import { usePhotoUpload } from "@/domains/shared/hooks/usePhotoUpload";
import { usePhotoDelete } from "@/domains/shared/hooks/usePhotoDelete";
import { Uploader } from "@/domains/shared/components/media/PhotoUploaderInput";
import { PhotoCard } from "@/domains/shared/components/media/PhotoCard";

import {
  // PRODUCT_PHOTO_TYPE_OPTIONS,
  ProductPhotoType,
} from "@/domains/product/constants/product.constants";

import { ProductFormValues } from "@/domains/product/schemas/product-form.schema";

export function ProductPhotosSection() {
  const { watch, setValue } = useFormContext<ProductFormValues>();

  const photos = watch("photos") ?? [];

  const { upload, uploading } = usePhotoUpload();
  const { remove } = usePhotoDelete();

  async function handleFile(file: File, type: ProductPhotoType) {
    const result = await upload(file);

    const next = [
      ...photos,
      {
        type,
        url: result.url,
        objectName: result.objectName,
      },
    ];

    setValue("photos", next, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  async function handleRemove(index: number) {
    const photo = photos[index];

    await remove(photo.objectName);

    const next = photos.filter((_, i) => i !== index);

    setValue("photos", next, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  return (
    <FormSection
      title="Фото продукту"
      description="Додайте фото пакування, складу або інше"
    >
      <Uploader uploading={uploading} onUpload={handleFile} />

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {photos.map((photo, i) => (
            <PhotoCard
              key={photo.objectName}
              photo={photo}
              onRemove={() => handleRemove(i)}
            />
          ))}
        </div>
      )}
    </FormSection>
  );
}
