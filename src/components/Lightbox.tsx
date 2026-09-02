import { useState, useEffect } from "react";

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

  return (
    <div
      className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-[92vw] max-h-[92vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Image */}
        <img
          src={images[idx]}
          alt=""
          className="max-w-[90vw] max-h-[76vh] object-contain rounded-lg shadow-2xl transition-all duration-200"
        />

        {/* Counter Badge */}
        <div className="absolute top-3 left-3 bg-black/60 text-white rounded px-2.5 py-1 text-xs font-mono backdrop-blur-xs">
          {idx + 1} / {images.length}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 bg-black/60 hover:bg-black/80 text-white text-xl rounded-md flex items-center justify-center cursor-pointer transition-colors backdrop-blur-xs"
          title="Cerrar (Esc)"
        >
          ×
        </button>

        {/* Previous / Next Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setIdx((p) => (p - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 text-white text-2xl rounded-full flex items-center justify-center cursor-pointer transition-colors backdrop-blur-xs"
              title="Anterior"
            >
              ‹
            </button>
            <button
              onClick={() => setIdx((p) => (p + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 text-white text-2xl rounded-full flex items-center justify-center cursor-pointer transition-colors backdrop-blur-xs"
              title="Siguiente"
            >
              ›
            </button>
          </>
        )}

        {/* Thumbnail Carousel */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto max-w-full px-2 py-1 scrollbar-none">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`flex-shrink-0 border-2 rounded transition-all cursor-pointer overflow-hidden ${
                  i === idx ? "border-white scale-105" : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <img src={img} alt="" className="w-14 h-10 object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
