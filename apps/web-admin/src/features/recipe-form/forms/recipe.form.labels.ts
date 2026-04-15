export const RECIPE_FORM_LABELS = {
  TITLE: "Назва рецепта*",
  DESCRIPTION: "Опис",
  TYPE: "Тип страви",
  PREP_TIME: "Підготовка (хв)",
  COOK_TIME: "Приготування (хв)",
  DIFFICULTY: "Складність",
  PORTIONS: {
    SERVINGS: "Порції",
    OUTPUT_WEIGHT: "Вага готової страви (г)",
    CONTAINER_WEIGHT: "в тому числі, вага контейнера (г)",
  },
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

  PORTIONS: {
    title: "Порції",
    description: "Кількість і вага страви",
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
    description: "Опишіть процес приготування",
  },

  AUTHOR: {
    title: "Автор рецепта",
    description: "Оберіть або створіть автора",
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
