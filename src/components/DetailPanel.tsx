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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Custom user-uploaded MP3 file override
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);

  // Web Speech Synthesis (Speech Narration in English / Spanish)
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [useSpeechTTS, setUseSpeechTTS] = useState(false);

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
  const displayTips = lang === "en" ? (site.tipsEn || site.tips) : site.tips;
  const displaySchedule = lang === "en" ? (site.scheduleEn || site.schedule) : site.schedule;
  const displayEntrance = lang === "en" ? (site.entranceEn || site.entrance) : site.entrance;
  const displayDuration = lang === "en" ? (site.durationEn || site.duration) : site.duration;
  const displayDifficulty = lang === "en" ? (site.difficultyEn || site.difficulty) : site.difficulty;
  const displayTags = lang === "en" ? (site.tagsEn || site.tags) : site.tags;
  const displayCategory = getCategoryLabel(site.category, lang);

  // Sync audioLang when global lang changes
  useEffect(() => {
    setAudioLang(lang);
    setCustomAudioUrl(null);
  }, [lang, site.id]);

  // Audio track URL determination
  const defaultAudioUrl = audioLang === "en" ? (site.audioUrlEn || site.audioUrl) : site.audioUrl;
  const currentAudioUrl = customAudioUrl || defaultAudioUrl;

  const [audioSrc, setAudioSrc] = useState<string>(currentAudioUrl || "");

  useEffect(() => {
    setAudioSrc(currentAudioUrl || "");
  }, [currentAudioUrl]);

  // Reset audio playback when switching site or audio source
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  }, [site.id, audioLang, customAudioUrl]);

  // Web Speech Synthesis (Text to Speech Narration)
  const speakNarration = () => {
    if (!window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Stop MP3 if playing
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    const textToSpeak = `${displayName}. ${displayDescription} ${displayHistory}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = audioLang === "en" ? "en-US" : "es-ES";
    utterance.rate = 0.95;

    // Find best voice
    const voices = window.speechSynthesis.getVoices();
    const targetLangPrefix = audioLang === "en" ? "en" : "es";
    const voice = voices.find((v) => v.lang.startsWith(targetLangPrefix));
    if (voice) utterance.voice = voice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const toggleAudio = () => {
    if (useSpeechTTS) {
      speakNarration();
      return;
    }

    if (!audioRef.current) return;

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Error iniciando MP3, usando síntesis de voz:", err);
          speakNarration();
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

  // Handle local MP3 file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomAudioUrl(url);
      setUseSpeechTTS(false);
    }
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
  const activePlayingState = isPlaying || isSpeaking;

  return (
    <>
      {lbIdx !== null && (
        <Lightbox images={images} startIndex={lbIdx} onClose={() => setLbIdx(null)} />
      )}

      {/* Hidden File Input for Custom MP3 Upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="audio/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Elemento de Audio HTML5 cargado con la URL correspondiente al idioma activo */}
      <audio
        ref={audioRef}
        src={audioSrc}
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
          {/* Title and Rating */}
          <div>
            <h2 className="text-xl font-bold font-['Outfit',sans-serif] text-[#1a1612] leading-snug">
              {displayName}
            </h2>
            <div className="flex items-center gap-2 mt-1.5">
              <Stars rating={site.rating ?? 4.8} />
              <span className="text-xs font-bold font-mono text-[#e97c2e]">
                {site.rating ?? 4.8}
              </span>
              <span className="text-xs text-[#9a8e84]">
                ({(site.reviews ?? 300).toLocaleString("es-NI")} {lang === "en" ? "reviews" : "reseñas"})
              </span>
            </div>

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

          {/* Audio Player Widget Bilingüe Avanzado */}
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
                  onClick={() => {
                    setAudioLang("es");
                    setUseSpeechTTS(false);
                  }}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                    audioLang === "es" && !useSpeechTTS
                      ? "bg-[#e97c2e] text-white shadow-xs"
                      : "text-[#c4b6ab] hover:text-white"
                  }`}
                >
                  🇪🇸 Audio ES
                </button>
                <button
                  onClick={() => {
                    setAudioLang("en");
                    setUseSpeechTTS(false);
                  }}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                    audioLang === "en" && !useSpeechTTS
                      ? "bg-[#e97c2e] text-white shadow-xs"
                      : "text-[#c4b6ab] hover:text-white"
                  }`}
                >
                  🇬🇧 Audio EN
                </button>

                {/* Síntesis de voz (Voz hablada) */}
                <button
                  onClick={() => {
                    setUseSpeechTTS(true);
                  }}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                    useSpeechTTS
                      ? "bg-[#1d4ed8] text-white shadow-xs"
                      : "text-[#c4b6ab] hover:text-white"
                  }`}
                  title="Voz sintetizada bilingüe"
                >
                  🗣️ Voz
                </button>
              </div>
            </div>

            {/* Controls & Wave animation */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={toggleAudio}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white text-lg shadow-lg transition-transform active:scale-95 cursor-pointer flex-shrink-0"
                  style={{ backgroundColor: useSpeechTTS ? "#1d4ed8" : color }}
                  title={activePlayingState ? t.audioPaused : t.audioPlaying}
                >
                  {activePlayingState ? "⏸" : "▶"}
                </button>
                <div className="min-w-0">
                  <p className="text-xs font-bold font-['Outfit',sans-serif] truncate text-white">
                    {displayShortName}
                  </p>
                  <p className="text-[10px] text-[#c4b6ab] truncate mt-0.5">
                    {useSpeechTTS
                      ? audioLang === "en"
                        ? "🗣️ English Voice Speech"
                        : "🗣️ Lectura de Voz en Español"
                      : customAudioUrl
                      ? "📁 MP3 Personalizado Cargado"
                      : audioLang === "en"
                      ? "🇬🇧 English Narrated Audio"
                      : "🇪🇸 Audioguía en Español"}
                  </p>
                </div>
              </div>

              {/* Animación de ondas de sonido al reproducir */}
              <div className="flex items-end gap-1 h-5 px-1">
                <span
                  className={`w-1 bg-[#e97c2e] rounded-full transition-all duration-300 ${
                    activePlayingState ? "h-5 animate-bounce" : "h-1.5"
                  }`}
                />
                <span
                  className={`w-1 bg-[#e97c2e] rounded-full transition-all duration-300 ${
                    activePlayingState ? "h-3.5 animate-pulse" : "h-2"
                  }`}
                />
                <span
                  className={`w-1 bg-[#e97c2e] rounded-full transition-all duration-300 ${
                    activePlayingState ? "h-5 animate-bounce delay-75" : "h-1"
                  }`}
                />
              </div>
            </div>

            {/* Seeker / Barra de Progreso Interactiva (Para MP3) */}
            {!useSpeechTTS && (
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
            )}

            {/* Botón para cargar archivo MP3 local si se desea */}
            <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-[#c4b6ab]">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="hover:text-white underline cursor-pointer"
              >
                📁 Cargar mi archivo MP3 para este sitio...
              </button>
              {customAudioUrl && (
                <button
                  onClick={() => setCustomAudioUrl(null)}
                  className="text-amber-400 hover:text-white"
                >
                  Restablecer
                </button>
              )}
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

          {/* TAB 2: RESUMEN Y DATOS PRÁCTICOS DE VISITA */}
          {activeTab === "resumen" && (
            <div className="flex flex-col gap-3">
              {displayDescription && (
                <div>
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

              {/* Practical Visit Info Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {displayEntrance && (
                  <div className="p-2 bg-[#f7f4f1] rounded-lg">
                    <span className="text-[9px] font-bold font-mono text-[#9a8e84] block">
                      {t.fieldEntrance}
                    </span>
                    <span className="font-semibold text-[#1a1612]">{displayEntrance}</span>
                  </div>
                )}
                {displayDuration && (
                  <div className="p-2 bg-[#f7f4f1] rounded-lg">
                    <span className="text-[9px] font-bold font-mono text-[#9a8e84] block">
                      {t.fieldDuration}
                    </span>
                    <span className="font-semibold text-[#1a1612]">{displayDuration}</span>
                  </div>
                )}
                {displayDifficulty && (
                  <div className="p-2 bg-[#f7f4f1] rounded-lg">
                    <span className="text-[9px] font-bold font-mono text-[#9a8e84] block">
                      {t.fieldDifficulty}
                    </span>
                    <span className="font-semibold text-[#1a1612]">{displayDifficulty}</span>
                  </div>
                )}
                {displaySchedule && (
                  <div className="p-2 bg-[#f7f4f1] rounded-lg">
                    <span className="text-[9px] font-bold font-mono text-[#9a8e84] block">
                      {t.fieldSchedule}
                    </span>
                    <span className="font-semibold text-[#1a1612]">{displaySchedule}</span>
                  </div>
                )}
              </div>

              {displayTips && (
                <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-[#7c4d25] leading-relaxed">
                  <span className="font-bold block mb-0.5">💡 {t.fieldTips}</span>
                  {displayTips}
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
