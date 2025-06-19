import { useState, useEffect } from "react";

export default function UserMenu({ setShowProfile }) {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(window.localStorage.getItem("userProfile"));

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (!e.target.closest("#user-menu-dropdown")) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleLogout = () => {
    window.localStorage.removeItem("userProfile");
    window.localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="relative" id="user-menu-dropdown">
      <button
        className="flex items-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-900 transition"
        onClick={() => setOpen((v) => !v)}
        aria-label="Menú de usuario"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        {user.username || "Usuario"}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl z-50 flex flex-col items-stretch bg-white shadow-2xl p-2 gap-2 border border-gray-200">
          <button
            className="flex items-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-900 transition"
            onClick={() => {
              setOpen(false);
              setShowProfile(true);
            }}
            aria-label="Perfil de usuario"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            Perfil de usuario
          </button>
          <button
            className="flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-green-800 transition"
            onClick={handleLogout}
            aria-label="Cerrar sesión"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
            </svg>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
