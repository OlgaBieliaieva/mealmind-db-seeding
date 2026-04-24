"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlanController = void 0;
class MealPlanController {
    service;
    constructor(service) {
        this.service = service;
    }
    getPlan = async (req, res, next) => {
        try {
            const { date } = req.query;
            const { familyId } = req.context;
            const result = await this.service.getPlanEntries(familyId, String(date));
            res.json(result);
        }
        catch (e) {
            next(e);
        }
    };
    createEntry = async (req, res, next) => {
        try {
            const { familyId } = req.context;
            const entry = await this.service.addEntry({
                familyId,
                ...req.body,
            });
            res.json(entry);
        }
        catch (e) {
            next(e);
        }
    };
    deleteEntry = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.service.removeEntry(id);
            res.json({ success: true });
        }
        catch (e) {
            next(e);
        }
    };
    toggleStatus = async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await this.service.toggleEntryStatus(id);
            res.json(result);
        }
        catch (e) {
            next(e);
        }
    };
    toggleBulk = async (req, res, next) => {
        try {
            const { ids } = req.body;
            await this.service.toggleEntries(ids);
            res.json({ success: true });
        }
        catch (e) {
            next(e);
        }
    };
}
exports.MealPlanController = MealPlanController;
