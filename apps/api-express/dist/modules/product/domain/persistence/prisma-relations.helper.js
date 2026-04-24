"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRelation = connectRelation;
function connectRelation(id) {
    return id ? { connect: { id } } : undefined;
}
