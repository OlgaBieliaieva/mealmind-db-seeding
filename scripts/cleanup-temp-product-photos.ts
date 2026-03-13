import { supabaseAdmin } from "@/lib/supabase/admin";

const BUCKET = "product-photos";
const TEMP_PREFIX = "products/temp/";

const MAX_AGE_HOURS = 24;

export async function cleanupTempProductPhotos() {
  console.log("🧹 Starting temp photo cleanup...");

  const { data: files, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .list(TEMP_PREFIX, {
      limit: 1000,
    });

  if (error) {
    console.error("❌ list error", error);
    return;
  }

  if (!files?.length) {
    console.log("✅ no temp files");
    return;
  }

  const now = Date.now();

  const toDelete = files
    .filter((file) => {
      if (!file.created_at) return false;

      const ageHours =
        (now - new Date(file.created_at).getTime()) / (1000 * 60 * 60);

      return ageHours > MAX_AGE_HOURS;
    })
    .map((file) => `${TEMP_PREFIX}${file.name}`);

  if (!toDelete.length) {
    console.log("✅ nothing to delete");
    return;
  }

  console.log("🗑 deleting", toDelete.length, "files");

  const { error: removeError } = await supabaseAdmin.storage
    .from(BUCKET)
    .remove(toDelete);

  if (removeError) {
    console.error("❌ remove error", removeError);
  } else {
    console.log("✅ cleanup done");
  }
}
