import { AppView, Language } from "../types/site";
import { UI_TRANSLATIONS } from "../data/translations";

interface HeaderProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  siteCount: number;
  totalSites: number;
  lang: Language;
  onToggleLang: () => void;
}

export default function Header({
  currentView,
  onViewChange,
  siteCount,
  totalSites,
  lang,
  onToggleLang,
}: HeaderProps) {
  const t = UI_TRANSLATIONS[lang];

  const NAV_ITEMS: { key: AppView; label: string; icon: string }[] = [
    { key: "mapa", label: t.viewMapa, icon: "🗺️" },
    { key: "lista", label: t.viewLista, icon: "☰" },
    { key: "galería", label: t.viewGaleria, icon: "⊞" },
    { key: "acerca", label: t.viewAcerca, icon: "ℹ" },
  ];

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 h-16 flex-shrink-0 bg-white border-b border-[#e5ddd5] shadow-xs z-10">
      {/* Brand Logo SVG + Typographic Name ArqGuides León Tours */}
      <div
        className="flex items-center gap-3 cursor-pointer group py-1"
        onClick={() => onViewChange("mapa")}
        title="ArqGuides León Tours - Inicio"
      >
        {/* SVG Logo from public/logo/logo.svg */}
        <div className="w-8 h-10 sm:w-9 sm:h-11 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
          <img
            src="/logo/logo.svg"
            alt="ArqGuides Logo"
            className="w-full h-full object-contain filter drop-shadow-xs"
          />
        </div>

        {/* Brand Typographic Style: ArqGuides (underlined) + León Tours */}
        <div className="flex flex-col justify-center leading-none">
          <span className="font-brand font-black text-lg sm:text-xl text-[#1a1612] tracking-tight border-b-2 border-[#1a1612] pb-[1px] inline-block">
            ArqGuides
          </span>
          <span className="font-brand font-bold text-[10px] sm:text-[11px] text-[#1a1612] tracking-wider uppercase text-center mt-[3px]">
            León Tours
          </span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-1">
        {NAV_ITEMS.map(({ key, label, icon }) => {
          const active = currentView === key;
          return (
            <button
              key={key}
              onClick={() => onViewChange(key)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-['Outfit',sans-serif] flex items-center gap-1.5 transition-all cursor-pointer ${
                active
                  ? "bg-[#c2622a] text-white shadow-xs"
                  : "text-[#6b6059] hover:bg-[#f7f4f1] hover:text-[#1a1612]"
              }`}
            >
              <span className="text-sm">{icon}</span>
              {label}
            </button>
          );
        })}
      </nav>

      {/* Language Toggle & Stats */}
      <div className="flex items-center gap-2.5">
        {/* Language Switcher Switch */}
        <button
          onClick={onToggleLang}
          className="flex items-center gap-1.5 px-3 py-1 bg-[#1a1612] hover:bg-[#322822] text-white border border-[#4a3d35] rounded-full text-xs font-bold font-['Outfit',sans-serif] transition-all cursor-pointer shadow-xs active:scale-95"
          title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
        >
          <span className="text-sm">{lang === "es" ? "🇪🇸" : "🇬🇧"}</span>
          <span>{lang === "es" ? "Español" : "English"}</span>
        </button>

        {/* Counter Badge */}
        <div className="hidden xs:flex items-center gap-1.5 px-3 py-1 bg-[#f7f4f1] border border-[#e5ddd5] rounded-full text-xs text-[#6b6059] font-['JetBrains_Mono',monospace]">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-semibold text-[#3d3430]">{siteCount}</span>
          <span className="text-[#9a8e84]">/ {totalSites}</span>
        </div>
      </div>
    </header>
  );
}
