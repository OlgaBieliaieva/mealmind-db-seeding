"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withFamily = void 0;
const withFamily = (req, res, next) => {
    const familyId = req.headers["x-family-id"];
    if (!familyId || typeof familyId !== "string") {
        return res.status(400).json({
            message: "x-family-id header is required",
        });
    }
    // 👇 каст тільки тут — це нормально
    req.context = {
        familyId,
    };
    next();
};
exports.withFamily = withFamily;
