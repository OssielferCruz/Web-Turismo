import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface LightboxProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((p) => (p + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((p) => (p - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose]);

  return createPortal(
    <div
      className="fixed inset-0 bg-black/95 z-[999999] flex items-center justify-center p-4 animate-fade-in backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-w-[95vw] max-h-[95vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Image */}
        <img
          src={images[idx]}
          alt=""
          className="max-w-[90vw] max-h-[78vh] object-contain rounded-xl shadow-2xl transition-all duration-200"
        />

        {/* Counter Badge */}
        <div className="absolute top-4 left-4 bg-black/70 text-white rounded-full px-3 py-1 text-xs font-mono backdrop-blur-md border border-white/20">
          {idx + 1} / {images.length}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 bg-black/70 hover:bg-black text-white text-xl rounded-full flex items-center justify-center cursor-pointer transition-colors backdrop-blur-md border border-white/20"
          title="Cerrar (Esc)"
        >
          ✕
        </button>

        {/* Previous / Next Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setIdx((p) => (p - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/60 hover:bg-black text-white text-2xl rounded-full flex items-center justify-center cursor-pointer transition-colors backdrop-blur-md border border-white/20 shadow-lg"
              title="Anterior"
            >
              ‹
            </button>
            <button
              onClick={() => setIdx((p) => (p + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/60 hover:bg-black text-white text-2xl rounded-full flex items-center justify-center cursor-pointer transition-colors backdrop-blur-md border border-white/20 shadow-lg"
              title="Siguiente"
            >
              ›
            </button>
          </>
        )}

        {/* Thumbnail Carousel */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto max-w-full px-3 py-1.5 scrollbar-none bg-black/40 rounded-xl border border-white/10 backdrop-blur-sm">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`flex-shrink-0 border-2 rounded-lg transition-all cursor-pointer overflow-hidden ${
                  i === idx ? "border-white scale-105 shadow-md" : "border-transparent opacity-50 hover:opacity-90"
                }`}
              >
                <img src={img} alt="" className="w-16 h-11 object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
