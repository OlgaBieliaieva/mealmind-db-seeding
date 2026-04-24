"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = validateParams;
function validateParams(schema) {
    return (req, _res, next) => {
        try {
            schema.parse(req.params);
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
