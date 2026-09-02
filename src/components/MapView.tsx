import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Site, Language } from "../types/site";
import { getCategoryColor, getCategoryLabel } from "../data/categories";

interface MapViewProps {
  sites: Site[];
  selectedSite: Site | null;
  flyToTarget: [number, number] | null;
  onSelectSite: (site: Site) => void;
  activeCategories: Set<string>;
  onToggleCategory: (cat: string) => void;
  lang?: Language;
}

// Custom Marker Icon generator using HTML Leaflet DivIcon with prominent badge tags
function createMarkerIcon(site: Site, isActive: boolean, lang: Language = "es") {
  const color = getCategoryColor(site.category);
  const pinSize = isActive ? 48 : 40;
  const displayName = lang === "en" ? (site.shortNameEn || site.shortName) : site.shortName;

  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; pointer-events: auto;">
        <!-- Floating Text Name Pill Badge -->
        <div style="
          background: ${isActive ? '#1a1612' : 'rgba(255, 255, 255, 0.96)'};
          color: ${isActive ? '#ffffff' : '#2d2420'};
          padding: 3px 9px;
          border-radius: 14px;
          border: 2px solid ${color};
          box-shadow: 0 4px 12px rgba(0,0,0,0.22);
          font-family: 'Outfit', -apple-system, sans-serif;
          font-size: ${isActive ? '12px' : '11px'};
          font-weight: 700;
          white-space: nowrap;
          margin-bottom: 4px;
          transition: all 0.2s ease;
          letter-spacing: -0.01em;
          pointer-events: none;
        ">
          ${displayName}
        </div>

        <!-- Teardrop Pin Container -->
        <div style="
          width:${pinSize}px; height:${pinSize}px;
          background:${color};
          border-radius: 50% 50% 50% 4px;
          transform: rotate(-45deg);
          display: flex; align-items: center; justify-content: center;
          border: 3px solid #ffffff;
          box-shadow: ${isActive ? `0 8px 24px ${color}aa, 0 0 0 6px ${color}33` : `0 6px 16px ${color}66`};
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          ${isActive ? 'animation: markerPulse 2.2s infinite ease-in-out;' : ''}
        ">
          <span style="transform: rotate(45deg); font-size: ${isActive ? 22 : 17}px; line-height: 1">
            ${site.emoji}
          </span>
        </div>
      </div>
    `,
    iconSize: [120, pinSize + 30],
    iconAnchor: [60, pinSize + 30],
    popupAnchor: [0, -(pinSize + 30)],
  });
}

// Controller component to handle smooth flyTo animations, size invalidation and opening popups
function MapController({
  selectedSite,
  flyToTarget,
  markerRefs,
}: {
  selectedSite: Site | null;
  flyToTarget: [number, number] | null;
  markerRefs: React.MutableRefObject<Record<number, L.Marker | null>>;
}) {
  const map = useMap();

  // Invalidate map size on load and resize
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    const handleResize = () => {
      map.invalidateSize();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [map]);

  useEffect(() => {
    if (selectedSite) {
      const isLargeArea = selectedSite.category === "Volcán" || selectedSite.category === "Playa";
      const targetZoom = isLargeArea ? 15 : 17;

      map.flyTo([selectedSite.lat, selectedSite.lng], targetZoom, {
        duration: 1.2,
        easeLinearity: 0.25,
      });

      const timer = setTimeout(() => {
        const marker = markerRefs.current[selectedSite.id];
        if (marker) {
          marker.openPopup();
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [selectedSite, map, markerRefs]);

  useEffect(() => {
    if (flyToTarget) {
      map.flyTo([flyToTarget[0], flyToTarget[1]], 16.5, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, [flyToTarget, map]);

  return null;
}

export default function MapView({
  sites,
  selectedSite,
  flyToTarget,
  onSelectSite,
  lang = "es",
}: MapViewProps) {
  const markerRefs = useRef<Record<number, L.Marker | null>>({});

  return (
    <div className="relative w-full h-full min-w-full min-h-full">
      <MapContainer
        center={[12.435345491333722, -86.87924770224978]}
        zoom={16}
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
          maxZoom={20}
          attribution="&copy; Google Maps"
        />

        <MapController
          selectedSite={selectedSite}
          flyToTarget={flyToTarget}
          markerRefs={markerRefs}
        />

        {sites.map((site) => {
          const isActive = selectedSite?.id === site.id;
          const color = getCategoryColor(site.category);
          const displayShortName = lang === "en" ? (site.shortNameEn || site.shortName) : site.shortName;
          const displayCategory = getCategoryLabel(site.category, lang);
          const displayDesc = lang === "en" ? (site.descriptionEn || site.description) : site.description;

          return (
            <Marker
              key={site.id}
              position={[site.lat, site.lng]}
              icon={createMarkerIcon(site, isActive, lang)}
              ref={(ref) => {
                markerRefs.current[site.id] = ref;
              }}
              eventHandlers={{
                click: () => onSelectSite(site),
              }}
            >
              <Popup className="custom-leaflet-popup">
                <div className="p-1 min-w-[200px] max-w-[240px]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-base">{site.emoji}</span>
                    <span
                      className="text-[10px] font-bold font-['Outfit',sans-serif] px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: color }}
                    >
                      {displayCategory}
                    </span>
                  </div>

                  <h3 className="font-['Outfit',sans-serif] font-bold text-sm text-[#1a1612] leading-snug">
                    {displayShortName}
                  </h3>

                  <p className="text-[11px] text-[#6b6059] mt-1 line-clamp-2 leading-relaxed">
                    {displayDesc}
                  </p>

                  <button
                    onClick={() => onSelectSite(site)}
                    className="w-full mt-2 py-1 px-2 text-white font-['Outfit',sans-serif] font-bold text-xs rounded-lg transition-transform active:scale-95 shadow-xs cursor-pointer text-center block"
                    style={{ backgroundColor: color }}
                  >
                    {lang === "en" ? "View Details & Audio" : "Ver Ficha y Audio"}
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
