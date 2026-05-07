import { FaInstagram, FaYoutube, FaTiktok, FaGlobe } from "react-icons/fa";

export function getPlatformIcon(type: string) {
  const cls = "w-5 h-5 text-gray-600";

  switch (type) {
    case "instagram":
      return <FaInstagram className={cls} />;
    case "youtube":
      return <FaYoutube className={cls} />;
    case "tiktok":
      return <FaTiktok className={cls} />;
    case "website":
      return <FaGlobe className={cls} />;
    default:
      return <FaGlobe className={cls} />;
  }
}
