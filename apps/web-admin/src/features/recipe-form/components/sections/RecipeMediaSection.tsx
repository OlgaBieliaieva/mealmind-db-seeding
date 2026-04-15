"use client";

import { useFormContext, useFieldArray } from "react-hook-form";

import { RecipeCreateInput } from "../../schemas/recipe.create.schema";
import { FormSection } from "@/shared/ui/form/FormSection";

import { usePhotoUpload } from "@/shared/media/hooks/usePhotoUpload";
import { Uploader } from "@/shared/media/components/PhotoUploaderInput";
import { PhotoCard } from "@/shared/media/components/PhotoCard";

import { generateUUID } from "@/shared/lib/utils/uuid";

export function RecipeMediaSection() {
  const { watch, setValue, control, register } =
    useFormContext<RecipeCreateInput>();

  const cover = watch("recipe.photo_url");

  const { upload, uploading } = usePhotoUpload({
    bucket: "recipe-photos",
    folder: "recipes",
  });

  async function handleUpload(file: File) {
    const result = await upload(file);

    setValue("recipe.photo_url", result.url, {
      shouldDirty: true,
    });
  }

  function handleRemove() {
    setValue("recipe.photo_url", undefined, {
      shouldDirty: true,
    });
  }

  // ===== VIDEOS =====
  const { fields, append, remove } = useFieldArray({
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
        {/* PHOTO */}
        <div className="space-y-3">
          <div className="text-sm font-medium">Фото</div>

          <Uploader uploading={uploading} onUpload={handleUpload} />

          {cover && (
            <div className="w-40">
              <PhotoCard
                photo={{ url: cover, type: "recipe" }}
                onRemove={handleRemove}
              />
            </div>
          )}
        </div>

        {/* VIDEOS */}
        <div className="space-y-3">
          <div className="text-sm font-medium">Відео</div>

          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-4 gap-2">
              <select
                {...register(`videos.${index}.platform`)}
                className="rounded border px-2 py-1"
              >
                <option value="youtube">YouTube</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="other">Інше</option>
              </select>

              <input
                {...register(`videos.${index}.url`)}
                className="col-span-2 rounded border px-2 py-1"
                placeholder="Посилання на відео"
              />

              <button
                type="button"
                onClick={() => remove(index)}
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
