import { Site } from "../types/site";
import { getCategoryColor, getCategoryAccent } from "../data/categories";

interface SidebarProps {
  sites: Site[];
  totalSitesCount: number;
  selectedSite: Site | null;
  onSelectSite: (site: Site) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 12 12">
          <polygon
            points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5"
            fill={i <= Math.round(rating) ? "#e97c2e" : "#e5ddd5"}
          />
        </svg>
      ))}
    </span>
  );
}

export default function Sidebar({
  sites,
  totalSitesCount,
  selectedSite,
  onSelectSite,
  searchQuery,
  onSearchChange,
  isOpen,
  onToggleOpen,
}: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar Toggle Floating Button */}
      <button
        onClick={onToggleOpen}
        className={`hidden md:flex absolute z-[600] top-16 w-7 h-7 bg-white border border-[#e5ddd5] rounded-md shadow-md items-center justify-center text-xs text-[#6b6059] hover:bg-[#f7f4f1] cursor-pointer transition-all duration-300 ${
          isOpen ? "left-[284px]" : "left-3"
        }`}
        title={isOpen ? "Contraer lista" : "Expandir lista"}
      >
        {isOpen ? "◀" : "▶"}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`bg-white border-r border-[#e5ddd5] flex flex-col flex-shrink-0 z-20 transition-all duration-300 ${
          isOpen
            ? "w-full md:w-[292px] h-full opacity-100"
            : "w-0 opacity-0 pointer-events-none border-none overflow-hidden"
        }`}
      >
        {/* Search Header */}
        <div className="p-3 border-b border-[#f0ebe5] flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#bdb0a6] font-mono">
              Sitios Turísticos · {sites.length}
            </p>
            {/* Mobile close button inside drawer */}
            <button
              onClick={onToggleOpen}
              className="md:hidden text-xs text-[#9a8e84] hover:text-[#1a1612] px-2 py-0.5 bg-[#f7f4f1] rounded border border-[#e5ddd5]"
            >
              Cerrar ✕
            </button>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f7f4f1] border border-[#e5ddd5] rounded-lg">
            <span className="text-xs">🔍</span>
            <input
              type="text"
              placeholder="Buscar lugar, categoría, tag..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full text-xs bg-transparent outline-none text-[#3d3430] placeholder-[#bdb0a6]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="text-xs text-[#9a8e84] hover:text-[#1a1612]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* List of Sites */}
        <div className="flex-1 overflow-y-auto">
          {sites.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#bdb0a6]">
              No se encontraron sitios con "{searchQuery}"
            </div>
          ) : (
            sites.map((site, index) => {
              const color = getCategoryColor(site.category);
              const accent = getCategoryAccent(site.category);
              const isActive = selectedSite?.id === site.id;

              return (
                <button
                  key={site.id}
                  onClick={() => onSelectSite(site)}
                  className={`w-full text-left p-3 flex items-start gap-2.5 border-b border-[#f0ebe5] transition-all cursor-pointer hover:bg-[#faf7f4] ${
                    isActive ? "bg-amber-50/60" : ""
                  }`}
                  style={{
                    borderLeft: isActive ? `4px solid ${color}` : "4px solid transparent",
                    backgroundColor: isActive ? accent : undefined,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-xs"
                    style={{ backgroundColor: `${color}18` }}
                  >
                    {site.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-bold font-['Outfit',sans-serif] truncate ${
                        isActive ? "text-[#1a1612]" : "text-[#3d3430]"
                      }`}
                      style={{ color: isActive ? color : undefined }}
                    >
                      {site.shortName}
                    </p>
                    <p className="text-[10px] text-[#9a8e84] truncate">{site.category}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Stars rating={site.rating ?? 4.8} />
                      <span className="text-[10px] font-bold font-mono text-[#e97c2e]">
                        {site.rating ?? 4.8}
                      </span>
                      {site.visitors && (
                        <span className="text-[9px] text-[#bdb0a6]">· {site.visitors}</span>
                      )}
                    </div>
                  </div>

                  <span className="text-[9px] font-mono text-[#bdb0a6] flex-shrink-0 mt-0.5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 border-t border-[#f0ebe5] flex-shrink-0 flex items-center justify-between text-[10px] font-mono text-[#bdb0a6] bg-[#faf8f6]">
          <span>WGS84 · EPSG:4326</span>
          <span>
            {sites.length}/{totalSitesCount} activos
          </span>
        </div>
      </aside>
    </>
  );
}
