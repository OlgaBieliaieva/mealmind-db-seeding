import { MealDTO } from "@/shared/types/meal-plan.types";
import { MealSection } from "./MealSection";

type Props = {
  userId: string;
  meals: MealDTO[];
};

export function UserSection({ userId, meals }: Props) {
  return (
    <div className="space-y-3">
      <div className="font-semibold">{userId}</div>

      {meals.map((meal) => (
        <MealSection key={meal.mealTypeId} meal={meal} />
      ))}
    </div>
  );
}
