export function normalizeCountryCode(country?: string | null): string | null {
  if (!country) return null;

  const map: Record<string, string> = {
    // 🇺🇦 Україна
    ua: "UA",
    ukraine: "UA",
    україна: "UA",

    // 🇺🇸 США
    us: "US",
    usa: "US",
    "united states": "US",
    "united states of america": "US",
    сша: "US",

    // 🇵🇱 Польща
    pl: "PL",
    poland: "PL",
    польща: "PL",

    // 🇫🇷 Франція
    fr: "FR",
    france: "FR",
    франція: "FR",

    // 🇪🇸 Іспанія
    es: "ES",
    spain: "ES",
    іспанія: "ES",

    // 🇮🇹 Італія
    it: "IT",
    italy: "IT",
    італія: "IT",

    // 🇨🇿 Чехія
    cz: "CZ",
    czechia: "CZ",
    "czech republic": "CZ",
    чехія: "CZ",

    // 🇩🇪 Німеччина
    de: "DE",
    germany: "DE",
    німеччина: "DE",
  };

  const normalized = country.trim().toLowerCase();

  return map[normalized] ?? normalized.toUpperCase();
}

export function getFlagEmoji(countryCode?: string | null): string {
  if (!countryCode || countryCode.length !== 2) return "🌍";

  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}
