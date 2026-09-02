import { AppView } from "../types/site";

interface MobileNavProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const NAV_ITEMS: { key: AppView; label: string; icon: string }[] = [
  { key: "mapa",    label: "Mapa",    icon: "🗺️" },
  { key: "lista",   label: "Lista",   icon: "☰" },
  { key: "galería", label: "Galería", icon: "⊞" },
  { key: "acerca",  label: "Acerca",  icon: "ℹ" },
];

export default function MobileNav({ currentView, onViewChange }: MobileNavProps) {
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
    </nav>
  );
}
