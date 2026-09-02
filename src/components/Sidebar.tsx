import { Site, Language } from "../types/site";
import { getCategoryColor, getCategoryAccent, getCategoryLabel } from "../data/categories";
import { UI_TRANSLATIONS } from "../data/translations";

interface SidebarProps {
  sites: Site[];
  totalSitesCount: number;
  selectedSite: Site | null;
  onSelectSite: (site: Site) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  lang: Language;
}

export default function Sidebar({
  sites,
  selectedSite,
  onSelectSite,
  searchQuery,
  onSearchChange,
  isOpen,
  onToggleOpen,
  lang,
}: SidebarProps) {
  const t = UI_TRANSLATIONS[lang];

  return (
    <>
      {/* Universal Floating Toggle Button (Visible on both Mobile and Desktop) */}
      <button
        onClick={onToggleOpen}
        className={`fixed z-[600] top-20 w-9 h-9 bg-white border border-[#e5ddd5] rounded-xl shadow-lg flex items-center justify-center text-sm font-bold text-[#1a1612] hover:bg-[#f7f4f1] cursor-pointer transition-all duration-300 ${
          isOpen ? "left-[305px] md:left-[324px]" : "left-3"
        }`}
        title={isOpen ? "Ocultar lista" : "Mostrar lista de sitios"}
      >
        {isOpen ? "◀" : "☰"}
      </button>

      {/* Mobile Backdrop Overlay when Drawer is Open */}
      {isOpen && (
        <div
          onClick={onToggleOpen}
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-[490]"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`bg-white border-r border-[#e5ddd5] flex flex-col flex-shrink-0 transition-all duration-300 ${
          isOpen
            ? "fixed md:relative inset-y-0 left-0 z-[500] md:z-20 w-[88vw] max-w-[330px] md:w-[330px] h-full opacity-100 shadow-2xl md:shadow-none"
            : "w-0 opacity-0 pointer-events-none border-none overflow-hidden"
        }`}
      >
        {/* Search Header */}
        <div className="p-3.5 border-b border-[#f0ebe5] flex-shrink-0 pt-4 md:pt-3.5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#bdb0a6] font-mono">
              {t.totalPlaces}
            </p>
            {/* Close button inside drawer */}
            <button
              onClick={onToggleOpen}
              className="text-xs text-[#9a8e84] hover:text-[#1a1612] px-2 py-0.5 bg-[#f7f4f1] rounded border border-[#e5ddd5] cursor-pointer"
            >
              Cerrar ✕
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-[#f7f4f1] border border-[#e5ddd5] rounded-xl px-3 py-2 pl-8 text-xs text-[#1a1612] placeholder-[#9a8e84] focus:outline-none focus:border-[#c2622a] focus:bg-white transition-all font-['Outfit',sans-serif]"
            />
            <span className="absolute left-2.5 top-2.5 text-xs text-[#9a8e84]">🔍</span>
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-2.5 text-xs text-[#9a8e84] hover:text-[#1a1612] cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Sites List Container */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#f5f0eb] pb-16 md:pb-0">
          {sites.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#9a8e84]">
              {t.noResults}
            </div>
          ) : (
            sites.map((site) => {
              const isSelected = selectedSite?.id === site.id;
              const color = getCategoryColor(site.category);
              const accent = getCategoryAccent(site.category);
              const displayName = lang === "en" ? (site.nameEn || site.name) : site.name;
              const displayCategory = getCategoryLabel(site.category, lang);
              const displayTags = lang === "en" ? (site.tagsEn || site.tags) : site.tags;
              const coverImg =
                site.images && site.images.length > 0
                  ? site.images[0]
                  : "https://images.unsplash.com/photo-1684861746842-7115e4530437?w=400&fit=crop";

              return (
                <div
                  key={site.id}
                  onClick={() => onSelectSite(site)}
                  className={`p-3.5 transition-all cursor-pointer border-l-4 flex gap-3 hover:bg-[#faf7f4] ${
                    isSelected
                      ? "bg-[#fff8f3] border-l-[#c2622a] shadow-xs"
                      : "border-l-transparent"
                  }`}
                >
                  {/* Thumbnail Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#e8e0d8] relative border border-[#e5ddd5] self-start mt-0.5">
                    <img
                      src={coverImg}
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0.5 right-0.5 text-xs">
                      {site.emoji}
                    </span>
                  </div>

                  {/* Site Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between space-y-1.5">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className="px-2 py-0.5 rounded-full text-[9px] font-bold font-['Outfit',sans-serif] text-white tracking-wide"
                          style={{ backgroundColor: color }}
                        >
                          {displayCategory}
                        </span>
                      </div>
                      <h3 className="font-['Outfit',sans-serif] font-bold text-xs sm:text-[13px] text-[#1a1612] leading-snug break-words whitespace-normal">
                        {displayName}
                      </h3>
                    </div>

                    {/* Tag badges */}
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {(displayTags ?? []).slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.3 rounded text-[9px] font-mono text-[#6b6059] border border-[#e5ddd5]"
                          style={{ backgroundColor: accent }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
}
