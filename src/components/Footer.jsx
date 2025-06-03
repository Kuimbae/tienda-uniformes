export default function Footer() {
  return (
    <footer className="w-full mt-8 py-4 text-center text-gray-100 text-sm border-t bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 flex flex-col items-center gap-2">
      <div className="flex gap-6 justify-center mb-1">
        {/* Facebook: icono colorido y moderno */}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg className="w-8 h-8 hover:scale-110 transition-transform" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="24" fill="#1877F2"/>
            <path d="M31.5 24h-5v12h-5V24h-3v-4h3v-2.5c0-3.1 1.7-5 5-5 1.4 0 2.9.1 3 .1v4h-2c-1.1 0-1.5.5-1.5 1.5V20h4.5l-.5 4z" fill="#fff"/>
          </svg>
        </a>
        {/* Instagram: icono gradiente */}
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg className="w-8 h-8 hover:scale-110 transition-transform" viewBox="0 0 48 48">
            <defs>
              <radialGradient id="IG" cx="0.5" cy="0.5" r="0.8">
                <stop offset="0%" stopColor="#feda75"/>
                <stop offset="30%" stopColor="#fa7e1e"/>
                <stop offset="60%" stopColor="#d62976"/>
                <stop offset="100%" stopColor="#962fbf"/>
              </radialGradient>
            </defs>
            <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#IG)"/>
            <circle cx="24" cy="24" r="9" fill="#fff"/>
            <circle cx="24" cy="24" r="6" fill="url(#IG)"/>
            <circle cx="32" cy="16" r="2" fill="#fff"/>
          </svg>
        </a>
        {/* TikTok: icono colorido y moderno */}
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <svg className="w-8 h-8 hover:scale-110 transition-transform" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="24" fill="#000"/>
            <path d="M33.5 20.5c-2.2 0-4-1.8-4-4V13h-4v14.5a2.5 2.5 0 1 1-2.5-2.5c.6 0 1-.4 1-1s-.4-1-1-1A4.5 4.5 0 1 0 29.5 33V20.9c1.1.6 2.3.9 3.5.9.6 0 1-.4 1-1s-.4-1-1-1z" fill="#fff"/>
            <path d="M33.5 20.5c-2.2 0-4-1.8-4-4V13h-4v14.5a2.5 2.5 0 1 1-2.5-2.5c.6 0 1-.4 1-1s-.4-1-1-1A4.5 4.5 0 1 0 29.5 33V20.9c1.1.6 2.3.9 3.5.9.6 0 1-.4 1-1s-.4-1-1-1z" fill="#25F4EE" fillOpacity=".7"/>
          </svg>
        </a>
      </div>
      <span>
        © {new Date().getFullYear()} Sofi Confecciones. Todos los derechos reservados.
      </span>
    </footer>
  );
}
