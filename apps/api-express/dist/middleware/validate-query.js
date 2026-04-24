"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = validateQuery;
function validateQuery(schema) {
    return (req, _res, next) => {
        try {
            schema.parse(req.query);
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
