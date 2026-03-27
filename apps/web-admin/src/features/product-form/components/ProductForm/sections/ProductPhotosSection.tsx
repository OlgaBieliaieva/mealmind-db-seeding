"use client";

import { useFormContext } from "react-hook-form";

import { FormSection } from "@/src/shared/ui/form/FormSection";
import { usePhotoUpload } from "@/src/shared/media/hooks/usePhotoUpload";
import { usePhotoDelete } from "@/src/shared/media/hooks/usePhotoDelete";
import { Uploader } from "@/src/shared/media/components/PhotoUploaderInput";
import { PhotoCard } from "@/src/shared/media/components/PhotoCard";

import { ProductPhotoType } from "@/src/shared/domain/constants/product.constants";

import { ProductFormValues } from "../../../schemas/product-form.schema";

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
