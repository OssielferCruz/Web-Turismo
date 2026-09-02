import { useState } from "react";
import { Site } from "../types/site";
import { getCategoryColor, getCategoryAccent } from "../data/categories";
import Lightbox from "./Lightbox";

interface DetailPanelProps {
  site: Site;
  onClose: () => void;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12">
          <polygon
            points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5"
            fill={i <= Math.round(rating) ? "#e97c2e" : "#e5ddd5"}
          />
        </svg>
      ))}
    </span>
  );
}

export default function DetailPanel({ site, onClose }: DetailPanelProps) {
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const [tab, setTab] = useState<"info" | "historia" | "consejos">("info");

  const color = getCategoryColor(site.category);
  const accent = getCategoryAccent(site.category);
  const images = site.images && site.images.length > 0 ? site.images : ["https://images.unsplash.com/photo-1684861746842-7115e4530437?w=900&h=600&fit=crop&auto=format"];

  const openGoogleMapsLocation = () => {
    // Abre el pin de ubicación exacta en Google Maps usando lat,lng
    const url = `https://www.google.com/maps/search/?api=1&query=${site.lat},${site.lng}`;
    window.open(url, "_blank");
  };

  const openGoogleMapsRoute = () => {
    // Abre las indicaciones de cómo llegar (ruta GPS) hasta las coordenadas exactas
    const url = `https://www.google.com/maps/dir/?api=1&destination=${site.lat},${site.lng}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {lbIdx !== null && (
        <Lightbox images={images} startIndex={lbIdx} onClose={() => setLbIdx(null)} />
      )}

      <div className="flex flex-col h-full overflow-y-auto bg-white border-l border-[#e5ddd5] shadow-xl">
        {/* Cover Photo Header */}
        <div className="relative h-52 sm:h-56 flex-shrink-0 bg-[#e8e0d8]">
          <img
            src={images[0]}
            alt={site.name}
            onClick={() => setLbIdx(0)}
            className="w-full h-full object-cover cursor-zoom-in block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30 pointer-events-none" />

          {/* Thumbnail preview buttons */}
          <div className="absolute bottom-3 right-3 flex gap-1.5 z-10">
            {images.slice(1, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setLbIdx(i + 1)}
                className="w-12 h-9 rounded overflow-hidden border-2 border-white/80 shadow-md cursor-pointer hover:scale-105 transition-transform"
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white text-[#6b6059] border border-[#e5ddd5] rounded-lg text-lg flex items-center justify-center cursor-pointer shadow-sm transition-colors z-20"
            title="Cerrar detalles"
          >
            ×
          </button>

          {/* Category Badge */}
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-['Outfit',sans-serif] font-bold text-white shadow-md flex items-center gap-1 z-10"
            style={{ backgroundColor: color }}
          >
            <span>{site.emoji}</span>
            <span>{site.category}</span>
          </div>
        </div>

        {/* Panel Content Body */}
        <div className="p-4 sm:p-5 flex flex-col gap-4">
          {/* Header Info */}
          <div>
            <h2 className="text-lg font-bold font-['Outfit',sans-serif] text-[#1a1612] leading-tight">
              {site.name}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <Stars rating={site.rating ?? 4.8} />
              <span className="text-xs font-bold font-mono text-[#e97c2e]">
                {site.rating ?? 4.8}
              </span>
              <span className="text-xs text-[#9a8e84]">
                ({(site.reviews ?? 100).toLocaleString("es-NI")} reseñas)
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {(site.tags ?? []).map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-['Outfit',sans-serif] font-semibold border"
                  style={{ backgroundColor: accent, color: color, borderColor: `${color}40` }}
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Coordinates Box */}
          <div className="bg-[#f7f4f1] border border-[#e5ddd5] rounded-xl p-3 flex gap-3 items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: color }}
            >
              📍
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#9a8e84] font-mono mb-0.5">
                Coordenadas GPS · WGS84
              </p>
              <div className="flex gap-4">
                <div>
                  <p className="text-[10px] text-[#9a8e84]">Latitud</p>
                  <p className="text-xs font-bold font-mono" style={{ color }}>
                    {site.lat.toFixed(6)}° N
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[#9a8e84]">Longitud</p>
                  <p className="text-xs font-bold font-mono" style={{ color }}>
                    {Math.abs(site.lng).toFixed(6)}° O
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#f7f4f1] border border-[#e5ddd5] rounded-lg p-2 text-center">
              <span className="text-sm">🎟️</span>
              <p className="text-[9px] text-[#9a8e84] mt-0.5">Entrada</p>
              <p className="text-[10px] font-semibold text-[#3d3430] truncate mt-0.5">
                {site.entrance ?? "Libre"}
              </p>
            </div>
            <div className="bg-[#f7f4f1] border border-[#e5ddd5] rounded-lg p-2 text-center">
              <span className="text-sm">⏱️</span>
              <p className="text-[9px] text-[#9a8e84] mt-0.5">Duración</p>
              <p className="text-[10px] font-semibold text-[#3d3430] truncate mt-0.5">
                {site.duration ?? "1 hora"}
              </p>
            </div>
            <div className="bg-[#f7f4f1] border border-[#e5ddd5] rounded-lg p-2 text-center">
              <span className="text-sm">📊</span>
              <p className="text-[9px] text-[#9a8e84] mt-0.5">Dificultad</p>
              <p className="text-[10px] font-semibold text-[#3d3430] truncate mt-0.5">
                {site.difficulty ?? "Fácil"}
              </p>
            </div>
          </div>

          {/* Tabs Selector */}
          <div className="flex bg-[#f7f4f1] border border-[#e5ddd5] rounded-lg overflow-hidden p-0.5">
            {(["info", "historia", "consejos"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`flex-1 py-1.5 text-xs font-semibold font-['Outfit',sans-serif] rounded-md transition-all cursor-pointer ${
                  tab === k ? "text-white shadow-xs" : "text-[#6b6059] hover:text-[#1a1612]"
                }`}
                style={{ backgroundColor: tab === k ? color : "transparent" }}
              >
                {k === "info" ? "Información" : k === "historia" ? "Historia" : "Consejos"}
              </button>
            ))}
          </div>

          {/* Tab Text Box */}
          <div className="bg-[#faf8f6] border border-[#e5ddd5] rounded-xl p-3.5 text-xs leading-relaxed text-[#4a423d] min-h-[90px]">
            {tab === "info" && (site.description || "Sin información adicional.")}
            {tab === "historia" && (site.history || "No hay reseña histórica disponible.")}
            {tab === "consejos" && (site.tips || "Disfruta tu visita y respeta las indicaciones locales.")}
          </div>

          {/* Schedule & Visitors */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#f7f4f1] border border-[#e5ddd5] rounded-lg p-2.5">
              <p className="text-[10px] text-[#9a8e84] font-medium">🕐 Horario</p>
              <p className="text-[11px] font-semibold text-[#3d3430] mt-0.5 leading-snug">
                {site.schedule ?? "Consulta en el sitio"}
              </p>
            </div>
            <div className="bg-[#f7f4f1] border border-[#e5ddd5] rounded-lg p-2.5">
              <p className="text-[10px] text-[#9a8e84] font-medium">👥 Visitantes</p>
              <p className="text-xs font-bold font-mono mt-0.5" style={{ color }}>
                {site.visitors ?? "No registrado"}
              </p>
            </div>
          </div>

          {/* Google Maps Actions Grid */}
          <div className="flex flex-col gap-2 mt-1">
            <button
              onClick={openGoogleMapsLocation}
              className="w-full py-2.5 px-4 rounded-xl text-white font-bold font-['Outfit',sans-serif] text-xs sm:text-sm tracking-wide shadow-md hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              style={{ backgroundColor: color }}
            >
              <span>📍</span>
              <span>Ver pin exacto en Google Maps</span>
            </button>
            <button
              onClick={openGoogleMapsRoute}
              className="w-full py-2 px-4 rounded-xl bg-[#f7f4f1] hover:bg-[#eae4df] text-[#3d3430] border border-[#e5ddd5] font-semibold font-['Outfit',sans-serif] text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🚗</span>
              <span>Cómo llegar (Ruta GPS)</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
