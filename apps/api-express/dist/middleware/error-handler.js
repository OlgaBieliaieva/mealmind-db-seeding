"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const app_error_1 = require("../shared/errors/app-error");
function errorHandler(err, req, res, next) {
    if (err instanceof app_error_1.AppError) {
        return res.status(err.status).json({
            code: err.code,
            message: err.message,
        });
    }
    console.error("UNHANDLED ERROR:", err);
    return res.status(500).json({
        code: "INTERNAL_ERROR",
        message: "Something went wrong",
    });
}
