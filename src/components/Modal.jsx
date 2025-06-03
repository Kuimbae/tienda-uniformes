export default function Modal({ open, onClose, children, hideClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 relative w-full max-w-md">
        {/* Solo muestra el botón de cerrar si hideClose no está activado */}
        {!hideClose && (
          <button
            className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 bg-white border border-gray-300 rounded hover:bg-red-500 hover:text-white text-gray-700 text-base font-bold shadow transition-all duration-150"
            style={{ lineHeight: 1, padding: 0 }}
            onClick={onClose}
            aria-label="Cerrar"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="16" height="16" rx="3" fill="none" />
              <path
                d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
