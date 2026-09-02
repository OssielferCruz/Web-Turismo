export interface CategoryDetails {
  color: string;
  accent: string;
  label: string;
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
  googleMapsQuery?: string;
  details?: SiteDetails;
}

export type AppView = "mapa" | "lista" | "galería" | "acerca";
