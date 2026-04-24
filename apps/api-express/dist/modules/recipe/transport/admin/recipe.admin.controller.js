"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeAdminController = void 0;
const recipe_admin_presenter_1 = require("./presenters/recipe.admin.presenter");
const map_recipe_search_query_1 = require("../shared/mappers/map-recipe-search-query");
class RecipeAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    create = async (req, res, next) => {
        try {
            const recipe = await this.service.create(req.body);
            res.status(201).json({
                recipe_id: recipe.id,
            });
        }
        catch (err) {
            next(err);
        }
    };
    search = async (req, res, next) => {
        try {
            const query = (0, map_recipe_search_query_1.mapRecipeSearchQuery)(req.query);
            const result = await this.service.searchRecipes(query);
            res.json(result);
        }
        catch (e) {
            next(e);
        }
    };
    getDetails = async (req, res, next) => {
        try {
            const { id } = req.params;
            const recipe = await this.service.getDetails(id);
            res.json((0, recipe_admin_presenter_1.presentRecipeDetails)(recipe));
        }
        catch (err) {
            next(err);
        }
    };
    publish = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.service.publish(id);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    };
    archive = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.service.archive(id);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    };
    restore = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.service.restore(id);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    };
    deleteHard = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.service.deleteHard(id);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    };
    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.service.update(id, req.body);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    };
}
exports.RecipeAdminController = RecipeAdminController;
