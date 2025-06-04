export default function Footer() {
  return (
    <footer className="w-full mt-8 py-4 text-center text-gray-100 text-sm border-t bg-[#111112] bg-opacity-95 flex flex-col items-center gap-2">
      <div className="flex gap-6 justify-center mb-1">
        {/* Facebook: icono colorido y moderno */}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg className="w-8 h-8 hover:scale-110 transition-transform" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="24" fill="#1877F2"/>
            <path d="M31.5 24h-5v12h-5V24h-3v-4h3v-2.5c0-3.1 1.7-5 5-5 1.4 0 2.9.1 3 .1v4h-2c-1.1 0-1.5.5-1.5 1.5V20h4.5l-.5 4z" fill="#fff"/>
          </svg>
        </a>
        {/* WhatsApp: icono colorido y moderno */}
        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <svg className="w-8 h-8 hover:scale-110 transition-transform" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="24" fill="#25D366"/>
            <path d="M34.6 29.2c-.5-.2-2.7-1.3-3.1-1.5-.4-.2-.7-.2-1 .2-.3.4-1.1 1.3-1.3 1.5-.2.2-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.5-.7.2-.3.1-.5 0-.7-.1-.2-1-2.4-1.4-3.3-.4-.9-.7-.8-1-.8h-.8c-.3 0-.7.1-1.1.5-.4.4-1.5 1.5-1.5 3.6s1.5 4.2 1.7 4.5c.2.3 3 4.6 7.3 6.2.7.3 1.3.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.1-1.4-.1-.1-.4-.2-.8-.4z" fill="#fff"/>
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
