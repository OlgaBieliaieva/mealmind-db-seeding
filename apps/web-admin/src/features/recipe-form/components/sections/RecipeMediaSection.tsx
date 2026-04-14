"use client";

import { useFormContext, useFieldArray } from "react-hook-form";

import { RecipeCreateInput } from "../../schemas/recipe.create.schema";
import { FormSection } from "@/shared/ui/form/FormSection";

import { usePhotoUpload } from "@/shared/media/hooks/usePhotoUpload";
import { usePhotoDelete } from "@/shared/media/hooks/usePhotoDelete";

import { Uploader } from "@/shared/media/components/PhotoUploaderInput";
import { PhotoCard } from "@/shared/media/components/PhotoCard";

import { generateUUID } from "@/shared/lib/utils/uuid";

export function RecipeMediaSection() {
  const { watch, setValue, control } = useFormContext<RecipeCreateInput>();

  // ===== PHOTOS =====
  const photos = watch("recipe.photos") ?? [];
  const cover = watch("recipe.photo_url");

  const { upload, uploading } = usePhotoUpload({
    bucket: "recipe-photos",
    folder: "recipes",
  });

  const { remove } = usePhotoDelete("recipe-photos");

  async function handleUpload(file: File) {
    const result = await upload(file);

    const next = [
      ...photos,
      {
        url: result.url,
        objectName: result.objectName,
      },
    ];

    setValue("recipe.photos", next, {
      shouldDirty: true,
    });

    // 👉 якщо перше фото → cover
    if (photos.length === 0) {
      setValue("recipe.photo_url", result.url, {
        shouldDirty: true,
      });
    }
  }

  async function handleRemove(index: number) {
    const photo = photos[index];

    await remove(photo.objectName);

    const next = photos.filter((_, i) => i !== index);

    setValue("recipe.photos", next, {
      shouldDirty: true,
    });

    // 👉 якщо видалили cover
    if (index === 0) {
      setValue("recipe.photo_url", next[0]?.url ?? undefined);
    }
  }

  // ===== VIDEOS =====
  const {
    fields,
    append,
    remove: removeVideo,
  } = useFieldArray({
    control,
    name: "videos",
  });

  function addVideo() {
    append({
      id: generateUUID(),
      platform: "youtube",
      url: "",
      recipe_author_id: undefined,
    });
  }

  return (
    <FormSection title="Медіа" description="Фото та відео рецепта">
      <div className="space-y-6">
        {/* ===== PHOTOS ===== */}
        <div className="space-y-3">
          <div className="text-sm font-medium">Фото</div>

          <Uploader uploading={uploading} onUpload={handleUpload} />

          {photos.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {photos.map((photo, i) => (
                <div key={photo.objectName} className="relative">
                  <PhotoCard photo={photo} onRemove={() => handleRemove(i)} />

                  {photo.url === cover && (
                    <span className="absolute left-1 top-1 rounded bg-black/70 px-1 text-xs text-white">
                      cover
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===== VIDEOS ===== */}
        <div className="space-y-3">
          <div className="text-sm font-medium">Відео</div>

          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-4 gap-2">
              <select
                {...control.register(`videos.${index}.platform`)}
                className="rounded border px-2 py-1"
              >
                <option value="youtube">YouTube</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="other">Інше</option>
              </select>

              <input
                {...control.register(`videos.${index}.url`)}
                className="col-span-2 rounded border px-2 py-1"
                placeholder="Посилання на відео"
              />

              <button
                type="button"
                onClick={() => removeVideo(index)}
                className="text-sm text-red-500"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addVideo}
            className="rounded border px-3 py-1 text-sm"
          >
            + Додати відео
          </button>
        </div>
      </div>
    </FormSection>
  );
}
