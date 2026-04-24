import { AggregatedMealItemDTO } from "@/shared/types/meal-plan.types";
import { MealSection } from "./MealSection";

type Props = {
  userId: string;
  meals: AggregatedMealItemDTO[];
};

export function UserSection({ userId, meals }: Props) {
  return (
    <div className="space-y-3">
      <div className="font-semibold">{userId}</div>

      {meals.map((item) => (
        <MealSection key={item.id} item={item} />
      ))}
    </div>
  );
}
