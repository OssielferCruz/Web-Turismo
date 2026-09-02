import { Language } from "../types/site";

export const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  es: {
    // Nav
    viewMapa: "Mapa",
    viewLista: "Lista",
    viewGaleria: "Galería",
    viewAcerca: "Acerca de",
    searchPlaceholder: "Buscar atracción o tag...",
    categoriesTitle: "Categorías de Sitios",
    filterNotice: "Haz clic para filtrar marcadores",
    toggleLangBtn: "🇬🇧 EN",
    
    // Sidebar / List
    totalPlaces: "6 Lugares Históricos de León",
    noResults: "No se encontraron sitios con esa búsqueda.",

    // Detail Panel
    audioTitle: "Audioguía Narrada",
    audioSubtitle: "Recorrido Auditivo",
    audioPlaying: "Reproduciendo",
    audioPaused: "Pausado",
    tabFicha: "🏛️ Ficha Arquitectónica",
    tabResumen: "📖 Resumen Histórico",
    fieldBuilding: "Nombre del Edificio",
    fieldYear: "Año / Época",
    fieldArchitect: "Arquitecto / Constructor",
    fieldStyle: "Estilo Arquitectónico",
    fieldFunction: "Uso y Función (Original vs Actual)",
    fieldImportance: "Importancia Histórica y Arquitectónica",
    fieldDistinctive: "Elementos Distintivos",
    fieldOverview: "Resumen de la Atracción",
    fieldHistoryContext: "Contexto Histórico",
    fieldGPS: "Coordenadas GPS · WGS84",
    fieldLat: "Latitud",
    fieldLng: "Longitud",
    btnMaps: "Ver pin exacto en Google Maps",
    btnClose: "Cerrar detalles",

    // Gallery
    galleryTitle: "Galería Fotográfica",
    gallerySubtitle: "Explora la riqueza visual de los 6 monumentos de León",

    // Footer
    footerBadge: "Google Maps · León, Nicaragua"
  },
  en: {
    // Nav
    viewMapa: "Map",
    viewLista: "List",
    viewGaleria: "Gallery",
    viewAcerca: "About",
    searchPlaceholder: "Search site or tag...",
    categoriesTitle: "Site Categories",
    filterNotice: "Click to filter markers",
    toggleLangBtn: "🇪🇸 ES",

    // Sidebar / List
    totalPlaces: "6 Historic Sites of León",
    noResults: "No sites match your search.",

    // Detail Panel
    audioTitle: "Narrated Audio Guide",
    audioSubtitle: "Audio Tour",
    audioPlaying: "Playing",
    audioPaused: "Paused",
    tabFicha: "🏛️ Architectural Sheet",
    tabResumen: "📖 Historical Overview",
    fieldBuilding: "Building Name",
    fieldYear: "Year / Era",
    fieldArchitect: "Architect / Builder",
    fieldStyle: "Architectural Style",
    fieldFunction: "Use & Function (Original vs Current)",
    fieldImportance: "Historical & Architectural Significance",
    fieldDistinctive: "Distinctive Elements",
    fieldOverview: "Attraction Overview",
    fieldHistoryContext: "Historical Context",
    fieldGPS: "GPS Coordinates · WGS84",
    fieldLat: "Latitude",
    fieldLng: "Longitude",
    btnMaps: "View exact pin on Google Maps",
    btnClose: "Close details",

    // Gallery
    galleryTitle: "Photo Gallery",
    gallerySubtitle: "Explore the visual heritage of León's 6 historic monuments",

    // Footer
    footerBadge: "Google Maps · León, Nicaragua"
  }
};
