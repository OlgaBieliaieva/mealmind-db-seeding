export function getSourceLabel(platform?: string) {
  switch (platform) {
    case "youtube":
      return "Відео (YouTube)";
    case "instagram":
      return "Instagram";
    case "tiktok":
      return "TikTok";
    case "website":
      return "Сайт";
    default:
      return "Джерело";
  }
}
