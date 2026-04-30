"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withFamily = void 0;
const withFamily = (req, res, next) => {
    const familyId = req.headers["x-family-id"];
    const userId = req.headers["x-user-id"]; // 👈 додаємо
    if (!familyId || typeof familyId !== "string") {
        return res.status(400).json({
            message: "x-family-id header is required",
        });
    }
    if (!userId || typeof userId !== "string") {
        return res.status(400).json({
            message: "x-user-id header is required",
        });
    }
    req.context = {
        familyId,
        userId,
    };
    next();
};
exports.withFamily = withFamily;
