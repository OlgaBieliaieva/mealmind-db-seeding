"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.BadRequestError = void 0;
const app_error_1 = require("./app-error");
class BadRequestError extends app_error_1.AppError {
    constructor(code, message) {
        super(code, 400, message);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends app_error_1.AppError {
    constructor(code, message) {
        super(code, 404, message);
    }
}
exports.NotFoundError = NotFoundError;
