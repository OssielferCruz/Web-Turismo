import { AppView } from "../types/site";

interface HeaderProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  siteCount: number;
  totalSites: number;
}

const NAV_ITEMS: { key: AppView; label: string; icon: string }[] = [
  { key: "mapa",    label: "Mapa",    icon: "🗺️" },
  { key: "lista",   label: "Lista",   icon: "☰" },
  { key: "galería", label: "Galería", icon: "⊞" },
  { key: "acerca",  label: "Acerca",  icon: "ℹ" },
];

export default function Header({ currentView, onViewChange, siteCount, totalSites }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 h-14 flex-shrink-0 bg-white border-b border-[#e5ddd5] shadow-xs z-10">
      {/* Brand Logo */}
      <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onViewChange("mapa")}>
        <div className="w-8 h-8 bg-[#c2622a] rounded-lg flex items-center justify-center text-lg text-white shadow-xs">
          🇳🇮
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
          <span className="font-['Outfit',sans-serif] font-extrabold text-sm sm:text-base text-[#1a1612] tracking-tight">
            Turismo León
          </span>
          <span className="text-[11px] text-[#9a8e84] font-medium hidden sm:inline">
            Nicaragua
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

      {/* Badge / Stats */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#f7f4f1] border border-[#e5ddd5] rounded-full text-xs text-[#6b6059] font-['JetBrains_Mono',monospace]">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-semibold text-[#3d3430]">{siteCount}</span>
          <span className="hidden xs:inline text-[#9a8e84]">/ {totalSites} sitios</span>
        </div>
      </div>
    </header>
  );
}
