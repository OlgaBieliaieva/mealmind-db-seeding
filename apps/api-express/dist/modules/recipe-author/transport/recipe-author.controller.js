"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeAuthorController = void 0;
class RecipeAuthorController {
    service;
    constructor(service) {
        this.service = service;
    }
    getAll = async (req, res, next) => {
        try {
            const authors = await this.service.getAll();
            res.json(authors.map((a) => ({
                id: a.id,
                display_name: a.displayName,
                type: a.type,
                avatar_url: a.avatarUrl,
                profile_url: a.profileUrl,
            })));
        }
        catch (e) {
            next(e);
        }
    };
    create = async (req, res, next) => {
        try {
            const author = await this.service.create(req.body);
            res.status(201).json({
                id: author.id,
                display_name: author.displayName,
                type: author.type,
                avatar_url: author.avatarUrl,
                profile_url: author.profileUrl,
            });
        }
        catch (e) {
            next(e);
        }
    };
}
exports.RecipeAuthorController = RecipeAuthorController;
