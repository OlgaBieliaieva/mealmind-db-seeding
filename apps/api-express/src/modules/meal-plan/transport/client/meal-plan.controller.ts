import { Request, Response, NextFunction } from "express";
import { MealPlanService } from "../../application/meal-plan.service";
import { RequestWithContext } from "../../../../shared/types/request-with-context";

export class MealPlanController {
  constructor(private service: MealPlanService) {}

  getPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { date, days } = req.query;

      const { familyId } = (req as RequestWithContext).context;

      const result = await this.service.getPlanEntries(
        familyId,
        String(date),
        days ? String(days) : undefined,
      );

      res.json(result);
    } catch (e) {
      next(e);
    }
  };

  createEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { familyId } = (req as RequestWithContext).context;

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

  toggleStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };

      const result = await this.service.toggleEntryStatus(id);

      res.json(result);
    } catch (e) {
      next(e);
    }
  };

  toggleBulk = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ids } = req.body as { ids: string[] };

      await this.service.toggleEntries(ids);

      res.json({ success: true });
    } catch (e) {
      next(e);
    }
  };
}
