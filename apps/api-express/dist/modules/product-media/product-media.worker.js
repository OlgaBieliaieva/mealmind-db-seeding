"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductPhotoVariants = generateProductPhotoVariants;
const sharp_1 = __importDefault(require("sharp"));
const supabase_admin_1 = require("../../infra/supabase/supabase.admin");
const VARIANTS = [
    { folder: "thumb", width: 80, quality: 60 },
    { folder: "list", width: 160, quality: 70 },
    { folder: "card", width: 320, quality: 75 },
    { folder: "detail", width: 720, quality: 82 },
];
async function generateProductPhotoVariants(productId, objectName) {
    const supabaseAdmin = (0, supabase_admin_1.getSupabaseAdmin)();
    const { data } = await supabaseAdmin.storage
        .from("product-photos")
        .download(objectName);
    if (!data)
        return;
    const buffer = Buffer.from(await data.arrayBuffer());
    const filename = objectName.split("/").pop();
    for (const variant of VARIANTS) {
        const resized = await (0, sharp_1.default)(buffer)
            .rotate()
            .resize({ width: variant.width, withoutEnlargement: true })
            .jpeg({ quality: variant.quality ?? 75, mozjpeg: true })
            .toBuffer();
        await supabaseAdmin.storage
            .from("product-photos")
            .upload(`products/${productId}/${variant.folder}/${filename}`, resized, {
            contentType: "image/jpeg",
            upsert: true,
        });
    }
}
