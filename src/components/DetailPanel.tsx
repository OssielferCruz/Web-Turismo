import { useState, useRef, useEffect } from "react";
import { Site, Language } from "../types/site";
import { getCategoryColor, getCategoryAccent, getCategoryLabel } from "../data/categories";
import { UI_TRANSLATIONS } from "../data/translations";
import Lightbox from "./Lightbox";

interface DetailPanelProps {
  site: Site;
  onClose: () => void;
  lang?: Language;
}

function formatTime(sec: number): string {
  if (isNaN(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export default function DetailPanel({ site, onClose, lang = "es" }: DetailPanelProps) {
  const t = UI_TRANSLATIONS[lang];
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"ficha" | "resumen">("ficha");

  // Audio Language Selector within the widget ("es" or "en")
  const [audioLang, setAudioLang] = useState<Language>(lang);

  // Audio Player State (MP3)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const color = getCategoryColor(site.category);
  const accent = getCategoryAccent(site.category);
  const images =
    site.images && site.images.length > 0
      ? site.images
      : ["https://images.unsplash.com/photo-1684861746842-7115e4530437?w=900&h=600&fit=crop&auto=format"];

  // Language & Site translations helper
  const displayName = lang === "en" ? (site.nameEn || site.name) : site.name;
  const displayShortName = lang === "en" ? (site.shortNameEn || site.shortName) : site.shortName;
  const displayDescription = lang === "en" ? (site.descriptionEn || site.description) : site.description;
  const displayHistory = lang === "en" ? (site.historyEn || site.history) : site.history;
  const displayTags = lang === "en" ? (site.tagsEn || site.tags) : site.tags;
  const displayCategory = getCategoryLabel(site.category, lang);

  // Sync audioLang when global lang or site changes
  useEffect(() => {
    setAudioLang(lang);
  }, [lang, site.id]);

  // Audio track URL determination
  const currentAudioUrl = audioLang === "en" ? (site.audioUrlEn || site.audioUrl) : site.audioUrl;

  // Reset audio playback when switching site or audio source
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  }, [site.id, audioLang]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Error iniciando reproductor MP3:", err);
          setIsPlaying(false);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const seekPercentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = seekPercentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const openGoogleMapsLocation = () => {
    const searchQuery = site.googleMapsQuery || site.name;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
    window.open(url, "_blank");
  };

  const details = site.details ?? {};
  const dOfficialName = lang === "en" ? (details.officialNameEn || details.officialName) : details.officialName;
  const dConstDate = lang === "en" ? (details.constructionDateEn || details.constructionDate) : details.constructionDate;
  const dArchitect = lang === "en" ? (details.architectEn || details.architect) : details.architect;
  const dFunction = lang === "en" ? (details.functionInfoEn || details.functionInfo) : details.functionInfo;
  const dStyle = lang === "en" ? (details.architecturalStyleEn || details.architecturalStyle) : details.architecturalStyle;
  const dImportance = lang === "en" ? (details.historicalImportanceEn || details.historicalImportance) : details.historicalImportance;
  const dDistinctive = lang === "en" ? (details.distinctiveElementsEn || details.distinctiveElements) : details.distinctiveElements;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {lbIdx !== null && (
        <Lightbox images={images} startIndex={lbIdx} onClose={() => setLbIdx(null)} />
      )}

      {/* Elemento de Audio HTML5 cargado con la URL del idioma de audio activo */}
      <audio
        ref={audioRef}
        src={currentAudioUrl || ""}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
      />

      <div className="flex flex-col h-full overflow-y-auto bg-white border-l border-[#e5ddd5] shadow-xl">
        {/* Cover Photo Header */}
        <div className="relative h-52 sm:h-56 flex-shrink-0 bg-[#e8e0d8]">
          <img
            src={images[0]}
            alt={displayName}
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
            title={t.btnClose}
          >
            ×
          </button>

          {/* Category Badge */}
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-['Outfit',sans-serif] font-bold text-white shadow-md flex items-center gap-1.5 z-10"
            style={{ backgroundColor: color }}
          >
            <span>{site.emoji}</span>
            <span>{displayCategory}</span>
          </div>
        </div>

        {/* Panel Content Body */}
        <div className="p-4 sm:p-5 flex flex-col gap-4">
          {/* Title */}
          <div>
            <h2 className="text-xl font-bold font-['Outfit',sans-serif] text-[#1a1612] leading-snug">
              {displayName}
            </h2>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {(displayTags ?? []).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-['Outfit',sans-serif] font-semibold border"
                  style={{ backgroundColor: accent, color: color, borderColor: `${color}40` }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Audio Player Widget Limpio */}
          <div className="bg-gradient-to-r from-[#1a1612] to-[#362b25] text-white rounded-2xl p-4 shadow-md border border-[#4a3d35] flex flex-col gap-3">
            {/* Audio Header & Language Switcher inside Widget */}
            <div className="flex items-center justify-between border-b border-[#4a3d35] pb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">🎧</span>
                <span className="text-xs font-bold font-['Outfit',sans-serif] text-white">
                  {t.audioTitle}
                </span>
              </div>

              {/* Selector de Idioma de Audio (ES / EN) */}
              <div className="flex items-center gap-1 bg-[#2d2420] p-1 rounded-full border border-[#4a3d35]">
                <button
                  onClick={() => setAudioLang("es")}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                    audioLang === "es"
                      ? "bg-[#e97c2e] text-white shadow-xs"
                      : "text-[#c4b6ab] hover:text-white"
                  }`}
                >
                  🇪🇸 Audio ES
                </button>
                <button
                  onClick={() => setAudioLang("en")}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                    audioLang === "en"
                      ? "bg-[#e97c2e] text-white shadow-xs"
                      : "text-[#c4b6ab] hover:text-white"
                  }`}
                >
                  🇬🇧 Audio EN
                </button>
              </div>
            </div>

            {/* Controls & Wave animation */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={toggleAudio}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white text-lg shadow-lg transition-transform active:scale-95 cursor-pointer flex-shrink-0"
                  style={{ backgroundColor: color }}
                  title={isPlaying ? t.audioPaused : t.audioPlaying}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <div className="min-w-0">
                  <p className="text-xs font-bold font-['Outfit',sans-serif] truncate text-white">
                    {displayShortName}
                  </p>
                </div>
              </div>

              {/* Animación de ondas de sonido al reproducir */}
              <div className="flex items-end gap-1 h-5 px-1">
                <span
                  className={`w-1 bg-[#e97c2e] rounded-full transition-all duration-300 ${
                    isPlaying ? "h-5 animate-bounce" : "h-1.5"
                  }`}
                />
                <span
                  className={`w-1 bg-[#e97c2e] rounded-full transition-all duration-300 ${
                    isPlaying ? "h-3.5 animate-pulse" : "h-2"
                  }`}
                />
                <span
                  className={`w-1 bg-[#e97c2e] rounded-full transition-all duration-300 ${
                    isPlaying ? "h-5 animate-bounce delay-75" : "h-1"
                  }`}
                />
              </div>
            </div>

            {/* Seeker / Barra de Progreso Interactiva */}
            <div className="flex flex-col gap-1 mt-1">
              <div
                onClick={handleSeek}
                className="w-full h-2 bg-[#4a3d35] rounded-full overflow-hidden cursor-pointer relative group"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#e97c2e] to-[#fcd5b8] rounded-full transition-all duration-100"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Visor de Tiempo mm:ss */}
              <div className="flex items-center justify-between text-[10px] font-mono text-[#c4b6ab]">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* Action Button: Google Maps Pin */}
          <button
            onClick={openGoogleMapsLocation}
            className="w-full py-2.5 px-4 bg-white border-2 border-[#1a1612] hover:bg-[#1a1612] hover:text-white text-[#1a1612] rounded-xl font-['Outfit',sans-serif] font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer group active:scale-98"
          >
            <span className="text-base group-hover:scale-110 transition-transform">📍</span>
            <span>{t.btnMaps}</span>
          </button>

          {/* Tab Selector */}
          <div className="flex border-b border-[#e5ddd5] gap-4">
            <button
              onClick={() => setActiveTab("ficha")}
              className={`pb-2 text-xs font-bold font-['Outfit',sans-serif] transition-colors cursor-pointer border-b-2 ${
                activeTab === "ficha"
                  ? "border-[#c2622a] text-[#c2622a]"
                  : "border-transparent text-[#9a8e84] hover:text-[#6b6059]"
              }`}
            >
              {t.tabFicha}
            </button>
            <button
              onClick={() => setActiveTab("resumen")}
              className={`pb-2 text-xs font-bold font-['Outfit',sans-serif] transition-colors cursor-pointer border-b-2 ${
                activeTab === "resumen"
                  ? "border-[#c2622a] text-[#c2622a]"
                  : "border-transparent text-[#9a8e84] hover:text-[#6b6059]"
              }`}
            >
              {t.tabResumen}
            </button>
          </div>

          {/* TAB 1: FICHA ARQUITECTÓNICA COMPLETA */}
          {activeTab === "ficha" && (
            <div className="flex flex-col gap-3">
              {dOfficialName && (
                <div className="p-3 bg-[#faf7f4] border border-[#e5ddd5] rounded-xl">
                  <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#9a8e84]">
                    {t.fieldBuilding}
                  </p>
                  <p className="text-xs font-semibold text-[#1a1612] mt-0.5">{dOfficialName}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                {dConstDate && (
                  <div className="p-2.5 bg-[#faf7f4] border border-[#e5ddd5] rounded-xl">
                    <p className="text-[9px] font-bold font-mono uppercase tracking-wider text-[#9a8e84]">
                      {t.fieldYear}
                    </p>
                    <p className="text-xs font-medium text-[#1a1612] mt-0.5">{dConstDate}</p>
                  </div>
                )}

                {dArchitect && (
                  <div className="p-2.5 bg-[#faf7f4] border border-[#e5ddd5] rounded-xl">
                    <p className="text-[9px] font-bold font-mono uppercase tracking-wider text-[#9a8e84]">
                      {t.fieldArchitect}
                    </p>
                    <p className="text-xs font-medium text-[#1a1612] mt-0.5">{dArchitect}</p>
                  </div>
                )}
              </div>

              {dStyle && (
                <div className="p-3 bg-[#faf7f4] border border-[#e5ddd5] rounded-xl">
                  <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#9a8e84]">
                    {t.fieldStyle}
                  </p>
                  <p className="text-xs font-medium text-[#1a1612] mt-0.5">{dStyle}</p>
                </div>
              )}

              {dFunction && (
                <div className="p-3 bg-[#faf7f4] border border-[#e5ddd5] rounded-xl">
                  <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#9a8e84]">
                    {t.fieldFunction}
                  </p>
                  <p className="text-xs text-[#4a423d] leading-relaxed mt-0.5">{dFunction}</p>
                </div>
              )}

              {dImportance && (
                <div className="p-3 bg-[#faf7f4] border border-[#e5ddd5] rounded-xl">
                  <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#9a8e84]">
                    {t.fieldImportance}
                  </p>
                  <p className="text-xs text-[#4a423d] leading-relaxed mt-0.5">{dImportance}</p>
                </div>
              )}

              {dDistinctive && (
                <div className="p-3 bg-[#faf7f4] border border-[#e5ddd5] rounded-xl">
                  <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#9a8e84]">
                    {t.fieldDistinctive}
                  </p>
                  <p className="text-xs text-[#4a423d] leading-relaxed mt-0.5">{dDistinctive}</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: RESUMEN HISTÓRICO */}
          {activeTab === "resumen" && (
            <div className="flex flex-col gap-3">
              {displayDescription && (
                <div className="p-3 bg-[#faf7f4] border border-[#e5ddd5] rounded-xl">
                  <h4 className="text-xs font-bold font-mono uppercase text-[#9a8e84]">
                    {t.fieldOverview}
                  </h4>
                  <p className="text-xs text-[#3d3430] leading-relaxed mt-1">{displayDescription}</p>
                </div>
              )}

              {displayHistory && (
                <div className="p-3 bg-[#fdfaf7] border border-[#e5ddd5] rounded-xl">
                  <h4 className="text-xs font-bold font-mono uppercase text-[#9a8e84]">
                    {t.fieldHistoryContext}
                  </h4>
                  <p className="text-xs text-[#4a423d] leading-relaxed mt-1">{displayHistory}</p>
                </div>
              )}
            </div>
          )}

          {/* Coordinates Bar */}
          <div className="p-3 bg-[#f7f4f1] border border-[#e5ddd5] rounded-xl flex items-center justify-between text-[11px] font-mono text-[#6b6059]">
            <div>
              <span className="text-[#9a8e84] block text-[9px]">{t.fieldGPS}</span>
              <span className="font-bold">
                {site.lat.toFixed(4)}, {site.lng.toFixed(4)}
              </span>
            </div>
            <span className="text-[10px] text-[#9a8e84]">WGS84</span>
          </div>
        </div>
      </div>
    </>
  );
}
