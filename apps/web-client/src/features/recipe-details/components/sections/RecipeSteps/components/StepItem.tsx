import { RecipeDetailsDTO } from "@/features/recipe-details/types/recipe-details.types";
import { Card } from "./Card";
import { StepNumber } from "./StepNumber";
import { TimerBadge } from "./TimerBadge";

export function StepItem({
  step,
}: {
  step: RecipeDetailsDTO["steps"][number];
}) {
  return (
    <Card>
      <div className="flex gap-3">
        {/* STEP NUMBER */}
        <div className="flex-shrink-0">
          <StepNumber number={step.stepNumber} />
        </div>

        {/* CONTENT */}
        <div className="flex-1 space-y-2">
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
            {step.instruction}
          </p>

          {/* TIMER */}
          {step.timerSec && step.timerSec > 0 && (
            <TimerBadge seconds={step.timerSec} />
          )}
        </div>
      </div>
    </Card>
  );
}
