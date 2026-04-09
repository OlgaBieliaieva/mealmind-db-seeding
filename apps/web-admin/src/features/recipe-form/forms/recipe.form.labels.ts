export const RECIPE_FORM_LABELS = {
  TITLE: "Назва рецепта*",
  DESCRIPTION: "Опис",
  TYPE: "Тип страви",
  PREP_TIME: "Підготовка (хв)",
  COOK_TIME: "Приготування (хв)",
  DIFFICULTY: "Складність",
  CUISINE: "Кухні",
  DIETARY: "Дієтичні теги",
} as const;

export const RECIPE_FORM_SECTION_CONTENT = {
  BASIC: {
    title: "Основна інформація",
    description: "Назва, опис і тип рецепта",
  },

  META: {
    title: "Додаткова інформація",
    description: "Час приготування та складність",
  },

  CLASSIFICATION: {
    title: "Класифікація",
    description: "Кухні та дієтичні обмеження",
  },

  INGREDIENTS: {
    title: "Інгредієнти",
    description: "Склад рецепта та кількість",
  },

  STEPS: {
    title: "Кроки приготування",
    description: "Покрокова інструкція",
  },

  MEDIA: {
    title: "Фото",
    description: "Зображення рецепта",
  },

  VIDEOS: {
    title: "Відео",
    description: "Відео рецепта (опціонально)",
  },
} as const;
