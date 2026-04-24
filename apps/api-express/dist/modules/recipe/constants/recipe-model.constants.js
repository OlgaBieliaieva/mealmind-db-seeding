"use strict";
// SECTION ███ RECIPE ENUMS ███
Object.defineProperty(exports, "__esModule", { value: true });
exports.RECIPE_VIDEO_PLATFORM = exports.RECIPE_AUTHOR_TYPE = exports.RECIPE_DIFFICULTY = exports.RECIPE_VISIBILITY = exports.RECIPE_STATUS = void 0;
exports.RECIPE_STATUS = {
    DRAFT: "draft",
    READY: "ready",
    PUBLISHED: "published",
    ARCHIVED: "archived",
};
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.RECIPE_VISIBILITY = {
    PRIVATE: "private",
    PUBLIC: "public",
};
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.RECIPE_DIFFICULTY = {
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard",
};
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.RECIPE_AUTHOR_TYPE = {
    USER: "user",
    BLOGGER: "blogger",
    SYSTEM: "system",
};
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.RECIPE_VIDEO_PLATFORM = {
    YOUTUBE: "youtube",
    INSTAGRAM: "instagram",
    TIKTOK: "tiktok",
    OTHER: "other",
};
