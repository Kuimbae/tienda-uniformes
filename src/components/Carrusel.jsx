import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    image: '/img1.jpg',
    title: 'Nueva Temporada',
    description: 'Descubrí lo nuevo en moda femenina',
    button: 'Ver colección',
    color: '#e6007e',
  },
  {
    image: '/img2.jpg',
    title: 'Ofertas Especiales',
    description: 'Descuentos de hasta el 50%',
    button: 'Aprovechar ahora',
    color: '#1e293b',
  },
  {
    image: '/img3.jpg',
    title: 'Estilo Único',
    description: 'Lo mejor de la moda urbana',
    button: 'Explorar',
    color: '#0ea5e9',
  },
]

export default function HeroCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      loop
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true, renderBullet: (i, className) => `<span class='${className} !w-5 !h-5 !rounded-full !bg-white !border-2 !border-pink-600 !mx-1'></span>` }}
      className="w-full h-[600px]"
      navigation={false}
    >
      {/* Botones personalizados de desplazamiento */}
      <button
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-pink-600 hover:text-white text-pink-600 border-2 border-pink-600 shadow-lg rounded-full w-14 h-14 flex items-center justify-center transition-all duration-200 group"
        style={{ fontSize: 32 }}
        onClick={() => document.querySelector('.swiper').swiper.slidePrev()}
        aria-label="Anterior"
        type="button"
      >
        {/* Icono flecha izquierda: chevron doble minimalista */}
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-pink-600 hover:text-white text-pink-600 border-2 border-pink-600 shadow-lg rounded-full w-14 h-14 flex items-center justify-center transition-all duration-200 group"
        style={{ fontSize: 32 }}
        onClick={() => document.querySelector('.swiper').swiper.slideNext()}
        aria-label="Siguiente"
        type="button"
      >
        {/* Icono flecha derecha: chevron doble minimalista */}
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.title}
                initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: `${slide.color}cc`, mixBlendMode: 'multiply' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -60 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-center text-white space-y-4 px-4"
                >
                  <h2 className="text-4xl md:text-5xl font-bold drop-shadow-lg tracking-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl font-medium drop-shadow">
                    {slide.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-4 px-8 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition"
                  >
                    {slide.button}
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
