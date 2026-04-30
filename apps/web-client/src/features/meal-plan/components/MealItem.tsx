"use client";

import Image from "next/image";
import { RecipeMealItem } from "./RecipeMealItem";
import { ProductMealItem } from "./ProductMealItem";
import { useToggleMealItem } from "../hooks/useToggleMealItem";
import { AggregatedMealItemDTO } from "@/shared/types/meal-plan.types";

type Props = {
  item: AggregatedMealItemDTO;
};

export function MealItem({ item }: Props) {
  const { mutate } = useToggleMealItem();

  const visibleUsers = item.users.slice(0, 3);
  const extraCount = item.users.length - visibleUsers.length;

  return (
    <div
      onClick={() => console.log("open", item.id)}
      className="bg-white rounded-2xl p-3 flex gap-3 border shadow-sm active:scale-[0.98] hover:bg-gray-50 transition"
    >
      {/* IMAGE */}
      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
        {item.photoUrl ? (
          <Image
            src={item.photoUrl}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-lg">
            🍽
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between">
        {/* MAIN CONTENT */}
        <div>
          {item.type === "recipe" ? (
            <RecipeMealItem item={item} />
          ) : (
            <ProductMealItem item={item} />
          )}
        </div>

        {/* USERS */}
        {item.users.length > 0 && (
          <div className="flex items-center mt-2">
            <div className="flex -space-x-2">
              {visibleUsers.map((u) => {
                const defaultAvatar =
                  u.sex === "female"
                    ? "/avatars/default-female.jpg"
                    : "/avatars/default-male.jpg";

                return (
                  <div
                    key={u.id}
                    className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-white bg-gray-100"
                  >
                    <Image
                      src={u.avatarUrl || defaultAvatar}
                      alt={u.firstName}
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  </div>
                );
              })}

              {/* +N */}
              {extraCount > 0 && (
                <div className="w-6 h-6 rounded-full bg-gray-200 text-[10px] flex items-center justify-center border-2 border-white text-gray-600 font-medium">
                  +{extraCount}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CHECK */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          mutate(item.entryIds);
        }}
        className={`
          self-center
          w-6 h-6 rounded-full border-2 flex items-center justify-center
          transition
          ${
            item.isPrepared
              ? "bg-green-500 border-green-500"
              : "border-gray-300 bg-white"
          }
        `}
      >
        {item.isPrepared && (
          <span className="text-white text-sm leading-none">✓</span>
        )}
      </div>
    </div>
  );
}
