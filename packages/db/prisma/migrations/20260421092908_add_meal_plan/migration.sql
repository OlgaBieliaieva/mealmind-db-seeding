-- CreateTable
CREATE TABLE "MealPlan" (
    "id" UUID NOT NULL,
    "familyId" UUID NOT NULL,
    "weekStart" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealEntry" (
    "id" UUID NOT NULL,
    "mealPlanId" UUID NOT NULL,
    "date" DATE NOT NULL,
    "userId" UUID NOT NULL,
    "mealTypeId" UUID NOT NULL,
    "recipeId" UUID,
    "productId" UUID,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MealEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MealPlan_familyId_idx" ON "MealPlan"("familyId");

-- CreateIndex
CREATE UNIQUE INDEX "MealPlan_familyId_weekStart_key" ON "MealPlan"("familyId", "weekStart");

-- CreateIndex
CREATE INDEX "MealEntry_mealPlanId_idx" ON "MealEntry"("mealPlanId");

-- CreateIndex
CREATE INDEX "MealEntry_date_idx" ON "MealEntry"("date");

-- CreateIndex
CREATE INDEX "MealEntry_userId_idx" ON "MealEntry"("userId");

-- AddForeignKey
ALTER TABLE "MealEntry" ADD CONSTRAINT "MealEntry_mealPlanId_fkey" FOREIGN KEY ("mealPlanId") REFERENCES "MealPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealEntry" ADD CONSTRAINT "MealEntry_mealTypeId_fkey" FOREIGN KEY ("mealTypeId") REFERENCES "meal_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
