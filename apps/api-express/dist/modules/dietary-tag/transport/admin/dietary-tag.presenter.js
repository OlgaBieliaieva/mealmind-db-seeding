"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentDietaryTag = presentDietaryTag;
exports.presentDietaryTagList = presentDietaryTagList;
function presentDietaryTag(tag) {
    return {
        id: tag.id,
        code: tag.code,
        name: {
            en: tag.nameEn,
            ua: tag.nameUa,
        },
    };
}
function presentDietaryTagList(tags) {
    return tags.map(presentDietaryTag);
}
