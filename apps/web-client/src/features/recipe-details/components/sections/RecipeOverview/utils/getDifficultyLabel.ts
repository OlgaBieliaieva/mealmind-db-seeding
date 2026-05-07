export function getDifficultyLabel(level: "easy" | "medium" | "hard") {
  return {
    easy: "Легко",
    medium: "Середньо",
    hard: "Складно",
  }[level];
}
