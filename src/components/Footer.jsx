export default function Footer() {
  return (
    <footer className="w-full mt-8 py-4 text-center text-gray-100 text-sm border-t bg-[#111112] bg-opacity-95 flex flex-col items-center gap-2">
      <div className="flex gap-6 justify-center mb-1">
        {/* Facebook: icono minimalista */}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg className="w-8 h-8 hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24">
            <path d="M15 2h-3a5 5 0 0 0-5 5v3H4v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" fill="#1877F3"/>
          </svg>
        </a>
        {/* WhatsApp: icono minimalista */}
        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <svg className="w-8 h-8 hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24">
            <path d="M20.52 3.48A12 12 0 1 0 2.47 20.52 12 12 0 0 0 20.52 3.48zm-8.52 17a9 9 0 1 1 9-9 9 9 0 0 1-9 9zm4.29-6.71l-1.06-1.06a1 1 0 0 0-1.41 0l-.71.71a6 6 0 0 1-4.24-4.24l.71-.71a1 1 0 0 0 0-1.41l-1.06-1.06a1 1 0 0 0-1.41 0A3 3 0 0 0 6 9a8 8 0 0 0 8 8 3 3 0 0 0 2.12-.88 1 1 0 0 0 0-1.41z" fill="#25D366"/>
          </svg>
        </a>
        {/* Instagram: icono minimalista */}
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg className="w-8 h-8 hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" fill="#E1306C"/>
            <circle cx="12" cy="12" r="5" fill="#fff"/>
            <circle cx="12" cy="12" r="3.5" fill="#E1306C"/>
            <circle cx="17" cy="7" r="1.2" fill="#fff"/>
          </svg>
        </a>
        {/* TikTok: icono minimalista */}
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <svg className="w-8 h-8 hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm2.5 7.5V15a2.5 2.5 0 1 1-2.5-2.5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.5 7.5A3.5 3.5 0 0 0 18 11" stroke="#E6007E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
      <span>
        © {new Date().getFullYear()} Sofi Confecciones. Todos los derechos reservados.
      </span>
    </footer>
  );
}
