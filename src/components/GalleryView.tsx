import { useState } from "react";
import { Site } from "../types/site";
import { getCategoryColor } from "../data/categories";
import Lightbox from "./Lightbox";

interface GalleryViewProps {
  sites: Site[];
  onSelectSite: (site: Site) => void;
}

export default function GalleryView({ sites, onSelectSite }: GalleryViewProps) {
  const allImages = sites.flatMap((site) =>
    (site.images ?? []).map((img) => ({ img, site }))
  );

  const [lbIdx, setLbIdx] = useState<number | null>(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-7 bg-[#f5f0eb] pb-20 md:pb-8">
      {lbIdx !== null && (
        <Lightbox
          images={allImages.map((x) => x.img)}
          startIndex={lbIdx}
          onClose={() => setLbIdx(null)}
        />
      )}

      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-bold text-[#1a1612]">
            Galería Fotográfica de León
          </h2>
          <p className="text-xs sm:text-sm text-[#9a8e84]">
            {allImages.length} fotografías en alta resolución de la ciudad y sus alrededores
          </p>
        </div>

        {/* Masonry / Responsive Column Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {allImages.map(({ img, site }, index) => {
            const color = getCategoryColor(site.category);

            return (
              <div
                key={index}
                className="break-inside-avoid relative rounded-xl overflow-hidden group cursor-zoom-in shadow-md hover:shadow-xl transition-all"
                onClick={() => setLbIdx(index)}
              >
                <img
                  src={img}
                  alt={site.name}
                  className="w-full h-auto object-cover block group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                  <div className="self-end bg-black/40 text-white text-[10px] px-2 py-0.5 rounded font-mono backdrop-blur-xs">
                    🔍 Ampliar
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSite(site);
                    }}
                    className="self-start px-2.5 py-1 rounded-full text-xs font-['Outfit',sans-serif] font-bold text-white shadow-md cursor-pointer hover:scale-105 transition-transform flex items-center gap-1"
                    style={{ backgroundColor: color }}
                  >
                    <span>{site.emoji}</span>
                    <span>{site.shortName}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
