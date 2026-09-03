import { CategoryDetails } from "../types/site";

export const CATEGORIES: Record<string, CategoryDetails> = {
  "Gobierno":           { color: "#d97706", accent: "#fffbeb", label: "Gobierno Municipal", labelEn: "Municipal Government" },
  "Patrimonio UNESCO":  { color: "#c2622a", accent: "#fff4ee", label: "Patrimonio UNESCO", labelEn: "UNESCO Heritage" },
  "Volcán":             { color: "#4b5563", accent: "#f3f4f6", label: "Volcán / Naturaleza", labelEn: "Volcano / Nature" },
  "Arqueología":        { color: "#7c5c38", accent: "#fdf8f2", label: "Arqueología", labelEn: "Archaeology" },
  "Museo":              { color: "#1d4ed8", accent: "#eff6ff", label: "Museo", labelEn: "Museum" },
  "Playa":              { color: "#0e7490", accent: "#ecfeff", label: "Playa / Ecoturismo", labelEn: "Beach / Ecotourism" },
  "Iglesia":            { color: "#b45309", accent: "#fffbeb", label: "Templo", labelEn: "Temple" },
  "Teatro":             { color: "#7c3aed", accent: "#f5f3ff", label: "Teatro", labelEn: "Theater" },
  "Arte / Cultura":     { color: "#be185d", accent: "#fdf2f8", label: "Arte & Cultura", labelEn: "Art & Culture" },
  "Salud / Historia":   { color: "#be185d", accent: "#fdf2f8", label: "Arte & Cultura", labelEn: "Art & Culture" },
  "Universidad":        { color: "#15803d", accent: "#f0fdf4", label: "Universidad", labelEn: "University" },
  "Parque":             { color: "#16a34a", accent: "#f0fdf4", label: "Parque / Plaza", labelEn: "Park / Plaza" },
};

export function getCategoryColor(category: string): string {
  return CATEGORIES[category]?.color ?? "#be185d";
}

export function getCategoryAccent(category: string): string {
  return CATEGORIES[category]?.accent ?? "#fdf2f8";
}

export function getCategoryLabel(category: string, lang: "es" | "en" = "es"): string {
  const item = CATEGORIES[category];
  if (!item) return category;
  return lang === "en" ? (item.labelEn || item.label) : item.label;
}
