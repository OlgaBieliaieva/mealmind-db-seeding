import { Request, Response, NextFunction } from "express";
import { MealPlanService } from "../../application/meal-plan.service";

export class MealPlanController {
  constructor(private service: MealPlanService) {}

  getPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { date } = req.query;

      const { familyId } = req.context;

      const result = await this.service.getPlanEntries(familyId, String(date));

      res.json(result);
    } catch (e) {
      next(e);
    }
  };

  createEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { familyId } = req.context;

      const entry = await this.service.addEntry({
        familyId,
        ...req.body,
      });

      res.json(entry);
    } catch (e) {
      next(e);
    }
  };

  deleteEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      await this.service.removeEntry(id);
      res.json({ success: true });
    } catch (e) {
      next(e);
    }
  };
}
