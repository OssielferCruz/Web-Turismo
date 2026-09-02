import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Site } from "../types/site";
import { CATEGORIES, getCategoryColor } from "../data/categories";

interface MapViewProps {
  sites: Site[];
  selectedSite: Site | null;
  flyToTarget: [number, number] | null;
  onSelectSite: (site: Site) => void;
  activeCategories: Set<string>;
  onToggleCategory: (cat: string) => void;
}

// Custom Marker Icon generator using HTML Leaflet DivIcon with prominent badge tags
function createMarkerIcon(site: Site, isActive: boolean) {
  const color = getCategoryColor(site.category);
  const pinSize = isActive ? 48 : 40;

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
          ${site.shortName}
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

// Controller component to handle smooth flyTo animations and opening popups
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

// Category legend component
function MapLegend({
  activeCategories,
  onToggleCategory,
}: {
  activeCategories: Set<string>;
  onToggleCategory: (cat: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-16 sm:bottom-6 right-3 z-[500] bg-white/95 border border-[#e5ddd5] rounded-xl shadow-lg backdrop-blur-md min-w-[160px] overflow-hidden">
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="w-full flex items-center justify-between px-3 py-2 text-left bg-none cursor-pointer border-b border-[#f0ebe5]"
      >
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b6059] font-mono">
          Leyenda Categorías
        </span>
        <span className={`text-xs text-[#9a8e84] transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="p-2 space-y-1 max-h-48 overflow-y-auto">
          {Object.entries(CATEGORIES).map(([key, { color, label }]) => {
            const active = activeCategories.has(key);
            return (
              <button
                key={key}
                onClick={() => onToggleCategory(key)}
                className={`flex items-center gap-2 w-full px-2 py-1 text-left text-xs rounded transition-opacity cursor-pointer ${
                  active ? "opacity-100 font-semibold" : "opacity-40 hover:opacity-75"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[#3d3430] truncate text-[11px]">{label}</span>
              </button>
            );
          })}
          <p className="text-[9px] text-[#bdb0a6] font-mono pt-1.5 border-t border-[#f0ebe5] px-1">
            Haz clic para filtrar marcadores
          </p>
        </div>
      )}
    </div>
  );
}

export default function MapView({
  sites,
  selectedSite,
  flyToTarget,
  onSelectSite,
  activeCategories,
  onToggleCategory,
}: MapViewProps) {
  const markerRefs = useRef<Record<number, L.Marker | null>>({});

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#e8e0d8]">
      <MapContainer
        center={[12.4354, -86.8793]}
        zoom={14}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
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
          const isSelected = selectedSite?.id === site.id;
          return (
            <Marker
              key={site.id}
              position={[site.lat, site.lng]}
              icon={createMarkerIcon(site, isSelected)}
              ref={(ref) => {
                markerRefs.current[site.id] = ref;
              }}
              eventHandlers={{ click: () => onSelectSite(site) }}
              zIndexOffset={isSelected ? 1000 : 0}
            >
              <Popup autoPan={false}>
                <div className="p-1 min-w-[180px] max-w-[220px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{site.emoji}</span>
                    <p
                      className="text-xs font-bold font-['Outfit',sans-serif] leading-tight"
                      style={{ color: getCategoryColor(site.category) }}
                    >
                      {site.shortName}
                    </p>
                  </div>
                  <p className="text-[10px] text-[#9a8e84] font-mono mt-1">
                    {site.lat.toFixed(4)}°N · {Math.abs(site.lng).toFixed(4)}°O
                  </p>
                  <p className="text-[10px] text-[#6b6059] mt-1.5 line-clamp-2 leading-snug">
                    {site.description}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Category Legend */}
      <MapLegend activeCategories={activeCategories} onToggleCategory={onToggleCategory} />

      {/* Map Badge Info */}
      <div className="absolute bottom-16 sm:bottom-4 left-3 z-[500] bg-white/85 border border-[#e5ddd5] rounded-lg px-2.5 py-1 text-[10px] font-mono text-[#9a8e84] backdrop-blur-xs shadow-xs hidden xs:block">
        Google Maps · León, Nicaragua
      </div>
    </div>
  );
}

