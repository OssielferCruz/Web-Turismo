import { AppView, Language } from "../types/site";
import { UI_TRANSLATIONS } from "../data/translations";

interface MobileNavProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  lang: Language;
  onToggleLang: () => void;
}

export default function MobileNav({
  currentView,
  onViewChange,
  lang,
  onToggleLang,
}: MobileNavProps) {
  const t = UI_TRANSLATIONS[lang];

  const NAV_ITEMS: { key: AppView; label: string; icon: string }[] = [
    { key: "mapa", label: t.viewMapa, icon: "🗺️" },
    { key: "lista", label: t.viewLista, icon: "☰" },
    { key: "galería", label: t.viewGaleria, icon: "⊞" },
    { key: "acerca", label: t.viewAcerca, icon: "ℹ" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-t border-[#e5ddd5] flex items-center justify-around z-50 px-2 shadow-lg">
      {NAV_ITEMS.map(({ key, label, icon }) => {
        const active = currentView === key;
        return (
          <button
            key={key}
            onClick={() => onViewChange(key)}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${
              active
                ? "text-[#c2622a] font-bold scale-105"
                : "text-[#9a8e84] font-medium hover:text-[#6b6059]"
            }`}
          >
            <span className="text-lg leading-none mb-0.5">{icon}</span>
            <span className="text-[10px] font-['Outfit',sans-serif]">{label}</span>
          </button>
        );
      })}

      {/* Language Toggle Button in Mobile Nav */}
      <button
        onClick={onToggleLang}
        className="flex flex-col items-center justify-center flex-1 py-1 text-[#1a1612] font-bold transition-all cursor-pointer"
        title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
      >
        <span className="text-base leading-none mb-0.5">{lang === "es" ? "🇪🇸" : "🇬🇧"}</span>
        <span className="text-[10px] font-['Outfit',sans-serif]">{lang === "es" ? "ES" : "EN"}</span>
      </button>
    </nav>
  );
}
