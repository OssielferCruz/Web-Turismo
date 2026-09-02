export interface CategoryDetails {
  color: string;
  accent: string;
  label: string;
  labelEn?: string;
}

export type CategoryName =
  | "Gobierno"
  | "Patrimonio UNESCO"
  | "Volcán"
  | "Arqueología"
  | "Museo"
  | "Playa"
  | "Iglesia"
  | "Teatro"
  | "Salud / Historia"
  | "Universidad"
  | "Parque";

export interface SiteDetails {
  officialName?: string;
  constructionDate?: string;
  architect?: string;
  functionInfo?: string;
  architecturalStyle?: string;
  historicalImportance?: string;
  distinctiveElements?: string;
  // English translations
  officialNameEn?: string;
  constructionDateEn?: string;
  architectEn?: string;
  functionInfoEn?: string;
  architecturalStyleEn?: string;
  historicalImportanceEn?: string;
  distinctiveElementsEn?: string;
}

export interface Site {
  id: number;
  name: string;
  shortName: string;
  category: CategoryName | string;
  emoji: string;
  lat: number;
  lng: number;
  description: string;
  history?: string;
  tips?: string;
  schedule?: string;
  rating?: number;
  reviews?: number;
  visitors?: string;
  entrance?: string;
  duration?: string;
  difficulty?: string;
  images: string[];
  tags: string[];
  audioUrl?: string;
  audioUrlEn?: string;
  googleMapsQuery?: string;
  details?: SiteDetails;
  // English translations
  nameEn?: string;
  shortNameEn?: string;
  categoryEn?: string;
  descriptionEn?: string;
  historyEn?: string;
  tipsEn?: string;
  scheduleEn?: string;
  entranceEn?: string;
  durationEn?: string;
  difficultyEn?: string;
  tagsEn?: string[];
}

export type Language = "es" | "en";
export type AppView = "mapa" | "lista" | "galería" | "acerca";
