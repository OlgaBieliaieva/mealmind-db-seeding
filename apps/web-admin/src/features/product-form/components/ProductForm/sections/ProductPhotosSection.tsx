"use client";

import { useFormContext } from "react-hook-form";

import { FormSection } from "@/shared/ui/form/FormSection";
import { usePhotoUpload } from "@/shared/media/hooks/usePhotoUpload";
import { usePhotoDelete } from "@/shared/media/hooks/usePhotoDelete";
import { Uploader } from "@/shared/media/components/PhotoUploaderInput";
import { PhotoCard } from "@/shared/media/components/PhotoCard";

import { ProductPhotoType } from "@/shared/domain/constants/product.constants";

import { ProductFormInput } from "../../../schemas/product-form.schema";

export function ProductPhotosSection() {
  const { watch, setValue } = useFormContext<ProductFormInput>();

  const photos = watch("photos") ?? [];

  const { upload, uploading } = usePhotoUpload({
    bucket: "product-photos",
    folder: "products",
  });

  const { remove } = usePhotoDelete("product-photos");

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
