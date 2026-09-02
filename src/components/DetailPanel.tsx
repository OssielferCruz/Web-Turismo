import { useState, useRef } from "react";
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
  const [activeTab, setActiveTab] = useState<"ficha" | "resumen">("ficha");

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const color = getCategoryColor(site.category);
  const accent = getCategoryAccent(site.category);
  const images =
    site.images && site.images.length > 0
      ? site.images
      : ["https://images.unsplash.com/photo-1684861746842-7115e4530437?w=900&h=600&fit=crop&auto=format"];

  const toggleAudio = () => {
    if (!audioRef.current) return;

    // Si no hay URL de audio aún cargada, simulamos la reproducción interactiva
    if (!site.audioUrl) {
      setIsPlaying((prev) => !prev);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(true)); // Fallback interactivo si el archivo es local
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setAudioProgress(p);
    }
  };

  const openGoogleMapsLocation = () => {
    // Redirige directamente a la Ficha Oficial usando el título exacto en Google Maps
    const searchQuery = site.googleMapsQuery || site.name;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
    window.open(url, "_blank");
  };

  const details = site.details ?? {};

  return (
    <>
      {lbIdx !== null && (
        <Lightbox images={images} startIndex={lbIdx} onClose={() => setLbIdx(null)} />
      )}

      {/* Elemento de Audio HTML5 (Inserta la URL de tu audio en site.audioUrl o src) */}
      <audio
        ref={audioRef}
        src={site.audioUrl || ""}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setIsPlaying(false);
          setAudioProgress(0);
        }}
      />

      <div className="flex flex-col h-full overflow-y-auto bg-white border-l border-[#e5ddd5] shadow-xl">
        {/* Cover Photo Header */}
        <div className="relative h-52 sm:h-56 flex-shrink-0 bg-[#e8e0d8]">
          <img
            src={images[0]}
            alt={site.name}
            onClick={() => setLbIdx(0)}
            className="w-full h-full object-cover cursor-zoom-in block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/40 pointer-events-none" />

          {/* Thumbnail preview buttons */}
          <div className="absolute bottom-3 right-3 flex gap-1.5 z-10">
            {images.slice(1, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setLbIdx(i + 1)}
                className="w-12 h-9 rounded overflow-hidden border-2 border-white/90 shadow-md cursor-pointer hover:scale-105 transition-transform"
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
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-['Outfit',sans-serif] font-bold text-white shadow-md flex items-center gap-1.5 z-10"
            style={{ backgroundColor: color }}
          >
            <span>{site.emoji}</span>
            <span>{site.category}</span>
          </div>
        </div>

        {/* Panel Content Body */}
        <div className="p-4 sm:p-5 flex flex-col gap-4">
          {/* Title and Rating */}
          <div>
            <h2 className="text-xl font-bold font-['Outfit',sans-serif] text-[#1a1612] leading-snug">
              {site.name}
            </h2>
            <div className="flex items-center gap-2 mt-1.5">
              <Stars rating={site.rating ?? 4.8} />
              <span className="text-xs font-bold font-mono text-[#e97c2e]">
                {site.rating ?? 4.8}
              </span>
              <span className="text-xs text-[#9a8e84]">
                ({(site.reviews ?? 300).toLocaleString("es-NI")} reseñas)
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
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

          {/* Audio Player Widget */}
          <div className="bg-gradient-to-r from-[#1a1612] to-[#362b25] text-white rounded-2xl p-3.5 shadow-md border border-[#4a3d35] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  onClick={toggleAudio}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base shadow-lg transition-transform active:scale-95 cursor-pointer flex-shrink-0"
                  style={{ backgroundColor: color }}
                  title={isPlaying ? "Pausar audioguía" : "Reproducir audioguía"}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs">🎧</span>
                    <p className="text-xs font-bold font-['Outfit',sans-serif] truncate text-white">
                      Audioguía Narrada
                    </p>
                  </div>
                  <p className="text-[10px] text-[#c4b6ab] truncate mt-0.5">
                    {site.shortName} · Historia y Arquitectura
                  </p>
                </div>
              </div>

              {/* Soundwave animation when playing */}
              <div className="flex items-end gap-0.5 h-4 px-1">
                <span
                  className={`w-1 bg-[#e97c2e] rounded-full transition-all duration-300 ${
                    isPlaying ? "h-4 animate-bounce" : "h-1.5"
                  }`}
                />
                <span
                  className={`w-1 bg-[#e97c2e] rounded-full transition-all duration-300 ${
                    isPlaying ? "h-3 animate-pulse" : "h-2"
                  }`}
                />
                <span
                  className={`w-1 bg-[#e97c2e] rounded-full transition-all duration-300 ${
                    isPlaying ? "h-4 animate-bounce delay-75" : "h-1"
                  }`}
                />
              </div>
            </div>

            {/* Audio Progress Bar */}
            <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{
                  width: isPlaying ? `${audioProgress || 45}%` : "0%",
                  backgroundColor: color,
                }}
              />
            </div>

            <p className="text-[9px] text-[#a39588] text-right font-mono">
              {isPlaying ? "Reproduciendo..." : "Haz clic para escuchar el audio"}
            </p>
          </div>

          {/* Section Tabs */}
          <div className="flex bg-[#f7f4f1] border border-[#e5ddd5] rounded-xl overflow-hidden p-1 gap-1">
            <button
              onClick={() => setActiveTab("ficha")}
              className={`flex-1 py-1.5 text-xs font-bold font-['Outfit',sans-serif] rounded-lg transition-all cursor-pointer ${
                activeTab === "ficha"
                  ? "bg-white text-[#1a1612] shadow-xs"
                  : "text-[#6b6059] hover:text-[#1a1612]"
              }`}
            >
              🏛️ Ficha Arquitectónica
            </button>
            <button
              onClick={() => setActiveTab("resumen")}
              className={`flex-1 py-1.5 text-xs font-bold font-['Outfit',sans-serif] rounded-lg transition-all cursor-pointer ${
                activeTab === "resumen"
                  ? "bg-white text-[#1a1612] shadow-xs"
                  : "text-[#6b6059] hover:text-[#1a1612]"
              }`}
            >
              📖 Resumen & Visita
            </button>
          </div>

          {/* TAB 1: FICHA ARQUITECTÓNICA & HISTÓRICA ESTRUCTURADA */}
          {activeTab === "ficha" && (
            <div className="flex flex-col gap-3.5">
              {/* Grid: Nombre, Año, Arquitecto, Estilo */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-[#faf8f6] border border-[#e5ddd5] rounded-xl p-3">
                  <span className="text-xs">🏢</span>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#9a8e84] font-mono mt-1">
                    Nombre del Edificio
                  </p>
                  <p className="text-xs font-bold text-[#1a1612] mt-0.5 leading-snug">
                    {details.officialName || site.name}
                  </p>
                </div>

                <div className="bg-[#faf8f6] border border-[#e5ddd5] rounded-xl p-3">
                  <span className="text-xs">📅</span>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#9a8e84] font-mono mt-1">
                    Año / Época
                  </p>
                  <p className="text-xs font-bold text-[#1a1612] mt-0.5 leading-snug">
                    {details.constructionDate || "Siglo XIX"}
                  </p>
                </div>

                <div className="bg-[#faf8f6] border border-[#e5ddd5] rounded-xl p-3">
                  <span className="text-xs">📐</span>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#9a8e84] font-mono mt-1">
                    Arquitecto / Constructor
                  </p>
                  <p className="text-xs font-bold text-[#1a1612] mt-0.5 leading-snug">
                    {details.architect || "No registrado"}
                  </p>
                </div>

                <div className="bg-[#faf8f6] border border-[#e5ddd5] rounded-xl p-3">
                  <span className="text-xs">🎨</span>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#9a8e84] font-mono mt-1">
                    Estilo Arquitectónico
                  </p>
                  <p className="text-xs font-bold mt-0.5 leading-snug" style={{ color }}>
                    {details.architecturalStyle || "Colonial / Ecléctico"}
                  </p>
                </div>
              </div>

              {/* Uso y Función */}
              <div className="bg-[#faf8f6] border border-[#e5ddd5] rounded-xl p-3.5 flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">🔄</span>
                  <h4 className="text-xs font-bold font-['Outfit',sans-serif] text-[#1a1612]">
                    Uso y Función (Original vs Actual)
                  </h4>
                </div>
                <p className="text-xs text-[#4a423d] leading-relaxed mt-1">
                  {details.functionInfo || site.description}
                </p>
              </div>

              {/* Importancia Histórica y Arquitectónica */}
              <div
                className="rounded-xl p-3.5 border flex flex-col gap-1.5 shadow-2xs"
                style={{ backgroundColor: accent, borderColor: `${color}40` }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">📜</span>
                  <h4
                    className="text-xs font-bold font-['Outfit',sans-serif]"
                    style={{ color }}
                  >
                    Importancia Histórica y Arquitectónica
                  </h4>
                </div>
                <p className="text-xs text-[#3d3430] leading-relaxed">
                  {details.historicalImportance || site.history}
                </p>
              </div>

              {/* Elementos Distintivos */}
              <div className="bg-[#faf8f6] border border-[#e5ddd5] rounded-xl p-3.5 flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">✨</span>
                  <h4 className="text-xs font-bold font-['Outfit',sans-serif] text-[#1a1612]">
                    Elementos Distintivos
                  </h4>
                </div>
                <p className="text-xs text-[#4a423d] leading-relaxed mt-1">
                  {details.distinctiveElements || "Detalles arquitectónicos únicos."}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: RESUMEN GENERAL & DATOS PRÁCTICOS */}
          {activeTab === "resumen" && (
            <div className="flex flex-col gap-3.5">
              {/* General Description */}
              <div className="bg-[#faf8f6] border border-[#e5ddd5] rounded-xl p-3.5 text-xs text-[#4a423d] leading-relaxed">
                <h4 className="text-xs font-bold font-['Outfit',sans-serif] text-[#1a1612] mb-1.5">
                  Resumen de la Atracción
                </h4>
                {site.description}
              </div>

              {/* Reseña Histórica Extendida */}
              {site.history && (
                <div className="bg-[#faf8f6] border border-[#e5ddd5] rounded-xl p-3.5 text-xs text-[#4a423d] leading-relaxed">
                  <h4 className="text-xs font-bold font-['Outfit',sans-serif] text-[#1a1612] mb-1.5">
                    Contexto Histórico
                  </h4>
                  {site.history}
                </div>
              )}

              {/* Practical Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#f7f4f1] border border-[#e5ddd5] rounded-xl p-2.5 text-center">
                  <span className="text-base">🎟️</span>
                  <p className="text-[9px] text-[#9a8e84] mt-0.5">Entrada</p>
                  <p className="text-[10px] font-semibold text-[#3d3430] truncate mt-0.5">
                    {site.entrance || "Libre"}
                  </p>
                </div>
                <div className="bg-[#f7f4f1] border border-[#e5ddd5] rounded-xl p-2.5 text-center">
                  <span className="text-base">⏱️</span>
                  <p className="text-[9px] text-[#9a8e84] mt-0.5">Duración</p>
                  <p className="text-[10px] font-semibold text-[#3d3430] truncate mt-0.5">
                    {site.duration || "45 min"}
                  </p>
                </div>
                <div className="bg-[#f7f4f1] border border-[#e5ddd5] rounded-xl p-2.5 text-center">
                  <span className="text-base">📊</span>
                  <p className="text-[9px] text-[#9a8e84] mt-0.5">Dificultad</p>
                  <p className="text-[10px] font-semibold text-[#3d3430] truncate mt-0.5">
                    {site.difficulty || "Fácil"}
                  </p>
                </div>
              </div>

              {/* Schedule and Visitors */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#f7f4f1] border border-[#e5ddd5] rounded-xl p-2.5">
                  <p className="text-[10px] text-[#9a8e84] font-medium">🕐 Horario</p>
                  <p className="text-[11px] font-semibold text-[#3d3430] mt-0.5 leading-snug">
                    {site.schedule || "Consulta en el sitio"}
                  </p>
                </div>
                <div className="bg-[#f7f4f1] border border-[#e5ddd5] rounded-xl p-2.5">
                  <p className="text-[10px] text-[#9a8e84] font-medium">👥 Visitantes</p>
                  <p className="text-xs font-bold font-mono mt-0.5" style={{ color }}>
                    {site.visitors || "20.000/año"}
                  </p>
                </div>
              </div>

              {/* Tips Box */}
              {site.tips && (
                <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-xl p-3.5 text-xs text-[#92400e]">
                  <p className="font-bold font-['Outfit',sans-serif] mb-1 flex items-center gap-1">
                    <span>💡</span> Recomendación de Visita
                  </p>
                  <p className="leading-relaxed">{site.tips}</p>
                </div>
              )}
            </div>
          )}

          {/* GPS Coordinates Box */}
          <div className="bg-[#f7f4f1] border border-[#e5ddd5] rounded-xl p-3 flex gap-3 items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-xs"
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

          {/* Google Maps Action Button */}
          <div className="mt-1 pb-2">
            <button
              onClick={openGoogleMapsLocation}
              className="w-full py-3 px-4 rounded-xl text-white font-bold font-['Outfit',sans-serif] text-xs sm:text-sm tracking-wide shadow-md hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              style={{ backgroundColor: color }}
            >
              <span>📍</span>
              <span>Ver pin exacto en Google Maps</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
