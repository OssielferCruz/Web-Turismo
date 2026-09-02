import { Site } from "../types/site";
import { getCategoryColor, getCategoryAccent } from "../data/categories";

interface ListViewProps {
  sites: Site[];
  onSelectSite: (site: Site) => void;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 12 12">
          <polygon
            points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5"
            fill={i <= Math.round(rating) ? "#e97c2e" : "#e5ddd5"}
          />
        </svg>
      ))}
    </span>
  );
}

export default function ListView({ sites, onSelectSite }: ListViewProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-7 bg-[#f5f0eb] pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-bold text-[#1a1612]">
            Todos los sitios turísticos
          </h2>
          <p className="text-xs sm:text-sm text-[#9a8e84]">
            {sites.length} lugares emblemáticos registrados en León, Nicaragua
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {sites.map((site) => {
            const color = getCategoryColor(site.category);
            const accent = getCategoryAccent(site.category);
            const image = site.images && site.images.length > 0 ? site.images[0] : "https://images.unsplash.com/photo-1684861746842-7115e4530437?w=900&h=600&fit=crop&auto=format";

            return (
              <div
                key={site.id}
                onClick={() => onSelectSite(site)}
                className="bg-white border border-[#e5ddd5] rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 flex flex-col group"
              >
                {/* Card Image Cover */}
                <div className="relative h-44 overflow-hidden bg-[#e8e0d8]">
                  <img
                    src={image}
                    alt={site.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Category Badge */}
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-['Outfit',sans-serif] font-bold text-white shadow-md flex items-center gap-1"
                    style={{ backgroundColor: color }}
                  >
                    <span>{site.emoji}</span>
                    <span>{site.category}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-['Outfit',sans-serif] text-sm font-bold text-[#1a1612] group-hover:text-[#c2622a] transition-colors leading-snug">
                      {site.shortName}
                    </h3>

                    <div className="flex items-center gap-1.5 mt-1.5 mb-2">
                      <Stars rating={site.rating ?? 4.8} />
                      <span className="text-xs font-bold font-mono text-[#e97c2e]">
                        {site.rating ?? 4.8}
                      </span>
                      {site.visitors && (
                        <span className="text-[10px] text-[#bdb0a6]">· {site.visitors}</span>
                      )}
                    </div>

                    <p className="text-xs text-[#6b6059] line-clamp-2 leading-relaxed mb-3">
                      {site.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-[#f0ebe5]">
                    {(site.tags ?? []).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-semibold px-2 py-0.5 rounded-full border"
                        style={{ backgroundColor: accent, color: color, borderColor: `${color}30` }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
