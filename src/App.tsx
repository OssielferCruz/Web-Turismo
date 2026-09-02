import { useState, useMemo } from "react";
import { Site, AppView, Language } from "./types/site";
import { SITES } from "./data/sites";
import { CATEGORIES } from "./data/categories";

import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import ListView from "./components/ListView";
import GalleryView from "./components/GalleryView";
import AboutView from "./components/AboutView";
import DetailPanel from "./components/DetailPanel";

export default function App() {
  const [view, setView] = useState<AppView>("mapa");
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [flyToTarget, setFlyToTarget] = useState<[number, number] | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    new Set(Object.keys(CATEGORIES))
  );

  // Language state (persisted in localStorage)
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("turismo_leon_lang");
    return saved === "en" || saved === "es" ? saved : "es";
  });

  const handleToggleLang = () => {
    setLang((prev) => {
      const next = prev === "es" ? "en" : "es";
      localStorage.setItem("turismo_leon_lang", next);
      return next;
    });
  };

  // Filter sites based on category and search query (bilingual search)
  const filteredSites = useMemo(() => {
    return SITES.filter((site) => {
      const categoryMatch = activeCategories.has(site.category);
      const q = searchQuery.toLowerCase().trim();
      if (!q) return categoryMatch;

      const nameMatch =
        site.name.toLowerCase().includes(q) ||
        site.shortName.toLowerCase().includes(q) ||
        (site.nameEn && site.nameEn.toLowerCase().includes(q)) ||
        (site.shortNameEn && site.shortNameEn.toLowerCase().includes(q));

      const catMatch =
        site.category.toLowerCase().includes(q) ||
        (site.categoryEn && site.categoryEn.toLowerCase().includes(q));

      const tagMatch =
        (site.tags ?? []).some((t) => t.toLowerCase().includes(q)) ||
        (site.tagsEn ?? []).some((t) => t.toLowerCase().includes(q));

      return categoryMatch && (nameMatch || catMatch || tagMatch);
    });
  }, [searchQuery, activeCategories]);

  // Handle selecting a site
  const handleSelectSite = (site: Site) => {
    setSelectedSite(site);
    setFlyToTarget([site.lat, site.lng]);
    if (view !== "mapa") {
      setView("mapa");
    }
  };

  // Toggle category filtering
  const handleToggleCategory = (cat: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f5f0eb] font-['Inter',sans-serif] text-[#1a1612]">
      {/* Top Header Bar */}
      <Header
        currentView={view}
        onViewChange={setView}
        siteCount={filteredSites.length}
        totalSites={SITES.length}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* Main Body Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Non-Map Views */}
        {view === "lista" && (
          <ListView sites={filteredSites} onSelectSite={handleSelectSite} lang={lang} />
        )}
        {view === "galería" && (
          <GalleryView sites={filteredSites} onSelectSite={handleSelectSite} lang={lang} />
        )}
        {view === "acerca" && <AboutView lang={lang} />}

        {/* Map View Layout */}
        {view === "mapa" && (
          <>
            {/* Sidebar (Desktop & Mobile Drawer) */}
            <Sidebar
              sites={filteredSites}
              totalSitesCount={SITES.length}
              selectedSite={selectedSite}
              onSelectSite={handleSelectSite}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              isOpen={sidebarOpen}
              onToggleOpen={() => setSidebarOpen((p) => !p)}
              lang={lang}
            />

            {/* Interactive Leaflet Map */}
            <div className="flex-1 relative overflow-hidden">
              <MapView
                sites={filteredSites}
                selectedSite={selectedSite}
                flyToTarget={flyToTarget}
                onSelectSite={handleSelectSite}
                activeCategories={activeCategories}
                onToggleCategory={handleToggleCategory}
                lang={lang}
              />
            </div>

            {/* Desktop Detail Panel */}
            {selectedSite && (
              <div className="hidden md:block w-[350px] lg:w-[380px] h-full flex-shrink-0 z-30 transition-all duration-300">
                <DetailPanel
                  site={selectedSite}
                  onClose={() => setSelectedSite(null)}
                  lang={lang}
                />
              </div>
            )}

            {/* Mobile Slide-Up Bottom Sheet Detail Panel */}
            {selectedSite && (
              <div className="md:hidden fixed inset-0 z-[1000] flex flex-col justify-end bg-black/50 backdrop-blur-xs animate-fade-in">
                <div className="bg-white rounded-t-3xl max-h-[85vh] h-[80vh] overflow-hidden shadow-2xl flex flex-col animate-slide-up">
                  {/* Drawer Handle */}
                  <div className="w-12 h-1.5 bg-[#d4c9be] rounded-full mx-auto my-2 flex-shrink-0" />
                  <div className="flex-1 overflow-y-auto">
                    <DetailPanel
                      site={selectedSite}
                      onClose={() => setSelectedSite(null)}
                      lang={lang}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileNav
        currentView={view}
        onViewChange={setView}
        lang={lang}
        onToggleLang={handleToggleLang}
      />
    </div>
  );
}
