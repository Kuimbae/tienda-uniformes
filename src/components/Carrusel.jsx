import { useState, useEffect } from "react";

/**
 * Carrusel de imágenes simple y responsivo.
 * Props:
 * - images: array de URLs de imágenes [{src, alt}]
 * - autoPlay: boolean (opcional, autoplay cada 4s)
 * - height: altura del carrusel (ej: '300px')
 */
export default function Carrusel({ images = [], autoPlay = false, height = "260px" }) {
  const [current, setCurrent] = useState(0);

  // Avanza al siguiente slide
  const next = () => setCurrent((c) => (c + 1) % images.length);
  // Retrocede al slide anterior
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  // Autoplay
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [current, autoPlay, images.length]);

  if (!images.length) return null;

  return (
    <div
      className="relative w-full h-[40vh] min-h-[220px] max-h-[600px] overflow-hidden flex items-center justify-center bg-white"
      style={{ height: '40vh', maxHeight: '600px', minHeight: '220px', borderRadius: 0, boxShadow: 'none' }}
    >
      {/* Imágenes */}
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img.src}
          alt={img.alt || `Slide ${idx + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{ height: '100%', width: '100%' }}
          draggable={false}
        />
      ))}
      {/* Flechas */}
      <div className="absolute inset-0 flex items-center justify-between px-2 z-20 pointer-events-none">
        <button
          className="bg-white bg-opacity-80 hover:bg-pink-600 hover:text-white text-pink-600 border border-pink-200 shadow-lg rounded-full w-10 h-10 flex items-center justify-center transition pointer-events-auto"
          onClick={prev}
          aria-label="Anterior"
          style={{ fontSize: 24 }}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15.5 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          className="bg-white bg-opacity-80 hover:bg-pink-600 hover:text-white text-pink-600 border border-pink-200 shadow-lg rounded-full w-10 h-10 flex items-center justify-center transition pointer-events-auto"
          onClick={next}
          aria-label="Siguiente"
          style={{ fontSize: 24 }}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M8.5 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      {/* Indicadores */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border-2 ${idx === current ? 'bg-pink-600 border-pink-600' : 'bg-white border-gray-400'} transition`}
            onClick={() => setCurrent(idx)}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
