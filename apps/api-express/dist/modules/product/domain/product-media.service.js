"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalizeProductPhotos = finalizeProductPhotos;
const supabase_admin_1 = require("../../../infra/supabase/supabase.admin");
async function finalizeProductPhotos(productId, photos) {
    const finalized = [];
    const supabaseAdmin = (0, supabase_admin_1.getSupabaseAdmin)();
    for (const photo of photos) {
        const filename = photo.objectName.split("/").pop();
        const newObjectName = `products/${productId}/${filename}`;
        const { error: copyError } = await supabaseAdmin.storage
            .from("product-photos")
            .copy(photo.objectName, newObjectName);
        if (copyError) {
            throw new Error(copyError.message);
        }
        await supabaseAdmin.storage
            .from("product-photos")
            .remove([photo.objectName]);
        const { data } = supabaseAdmin.storage
            .from("product-photos")
            .getPublicUrl(newObjectName);
        const publicUrl = data?.publicUrl;
        if (!publicUrl) {
            throw new Error("Failed to resolve public URL");
        }
        finalized.push({
            type: photo.type,
            objectName: newObjectName,
            url: publicUrl,
        });
    }
    return finalized;
}
