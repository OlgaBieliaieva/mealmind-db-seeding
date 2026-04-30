"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProductSearchWhere = buildProductSearchWhere;
function buildProductSearchWhere(base, query) {
    if (!query || query.trim().length < 2) {
        return base;
    }
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return {
        ...base,
        AND: tokens.map((token) => ({
            OR: [
                {
                    nameUa: {
                        contains: token,
                        mode: "insensitive",
                    },
                },
                {
                    nameEn: {
                        contains: token,
                        mode: "insensitive",
                    },
                },
                {
                    brand: {
                        nameUa: {
                            contains: token,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    brand: {
                        nameEn: {
                            contains: token,
                            mode: "insensitive",
                        },
                    },
                },
            ],
        })),
    };
}
