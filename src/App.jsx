import { useState, useEffect } from "react";
import ProductCatalog from "./components/ProductCatalog.jsx";
import EmbroiderySelector from "./components/EmbroiderySelector";
import Footer from "./components/Footer.jsx";
import Logo from "./components/Logo.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Modal from "./components/Modal.jsx";
import EntrarButton from "./components/EntrarButton.jsx";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showEmbroidery, setShowEmbroidery] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    window.setShowProfile = setShowProfile;
    return () => {
      window.setShowProfile = undefined;
    };
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-0 flex flex-col justify-between items-center">
      <header className="mb-10 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 shadow-lg rounded-r-xl py-8 px-4 w-full flex items-center relative">
        <div className="absolute left-6 inset-y-0 my-auto flex items-center h-full">
          <Logo />
        </div>
        <h1
          className="flex-1 text-5xl font-extrabold text-center text-gray-100 drop-shadow-lg tracking-tight font-serif italic"
          style={{
            fontFamily:
              '"Dancing Script", "Pacifico", "Great Vibes", "Satisfy", "Caveat", cursive',
          }}
        >
          Sofi Confecciones
        </h1>
        <div className="absolute right-6 top-6 flex items-center gap-4">
          {!showLogin && !window.localStorage.getItem("userProfile") && (
            <EntrarButton onClick={() => setShowLogin(true)} />
          )}
          {window.localStorage.getItem("userProfile") && <UserMenu />}
        </div>
      </header>
      <Modal open={showLogin} onClose={() => setShowLogin(false)}>
        <LoginForm onLogin={() => setShowLogin(false)} />
      </Modal>
      <Modal open={showProfile} onClose={() => setShowProfile(false)} hideClose>
        <Profile onClose={() => setShowProfile(false)} />
      </Modal>

      <main className="w-full max-w-7xl mx-auto flex-1 flex flex-col md:flex-row gap-8">
        <div className="transition-shadow hover:shadow-2xl rounded-xl flex-1 md:w-2/3 lg:w-2/3 w-full">
          <ProductCatalog />
        </div>
        {/* El botón flotante para elegir bordado permanece igual */}
        <button
          className="fixed bottom-8 right-8 z-50 bg-blue-800 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-900 transition flex items-center gap-2"
          onClick={() => setShowEmbroidery(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Elegir bordado
        </button>
        {/* El espacio del modal de bordado ya no se muestra en desktop */}
      </main>
      <Modal open={showEmbroidery} onClose={() => setShowEmbroidery(false)}>
        <EmbroiderySelector />
      </Modal>
      <Footer />
    </div>
  );
}

function UserMenu() {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(window.localStorage.getItem("userProfile"));
  const setShowProfile = window.setShowProfile;

  // Cierra el menú al hacer click fuera
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      // Si el click es fuera del menú, ciérralo
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
        className="font-semibold text-white px-3 py-1 rounded hover:bg-black transition"
        onClick={() => setOpen((v) => !v)}
      >
        {user.username || "Usuario"}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg z-50 flex flex-col">
          <button
            className="px-4 py-2 text-left text-white bg-blue-900 rounded-t hover:bg-black transition"
            onClick={() => {
              setOpen(false);
              window.setShowProfile(true);
            }}
          >
            Perfil de usuario
          </button>
          <button
            className="px-4 py-2 text-left hover:bg-red-100 text-red-600 border-t"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

function Profile({ onClose }) {
  const [user, setUser] = useState(() => {
    const stored = window.localStorage.getItem("userProfile");
    try {
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    username: user.username || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
  });
  const [msg, setMsg] = useState("");

  // Refresca los datos solo cuando se abre el modal (cuando showProfile pasa de false a true)
  useEffect(() => {
    if (!onClose) return;
    const stored = window.localStorage.getItem("userProfile");
    let parsed = {};
    try {
      parsed = stored ? JSON.parse(stored) : {};
    } catch {}
    setUser(parsed);
    setForm({
      username: parsed.username || "",
      firstName: parsed.firstName || "",
      lastName: parsed.lastName || "",
      email: parsed.email || "",
      phone: parsed.phone || "",
      address: parsed.address || "",
    });
  }, []); // Solo al montar el componente

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updated = { ...user, ...form };
    setUser(updated);
    window.localStorage.setItem("userProfile", JSON.stringify(updated));
    setEdit(false);
    setMsg("Perfil actualizado correctamente");
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div className="bg-white p-6 pt-10 rounded-lg w-full max-w-md mx-auto relative text-gray-900">
      <button
        type="button"
        className="fixed md:absolute top-4 right-4 md:top-2 md:right-2 flex items-center justify-center w-7 h-7 bg-white border border-gray-300 rounded hover:bg-red-500 hover:text-white text-gray-700 text-base font-bold shadow transition-all duration-150 z-50"
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
      <h2
        className="text-2xl font-extrabold mb-4 text-center text-blue-900 font-serif tracking-tight italic"
        style={{
          fontFamily: "serif, Georgia, Times, Times New Roman, Garamond",
        }}
      >
        Perfil de Usuario
      </h2>
      {msg && <div className="text-green-600 text-center mb-2">{msg}</div>}
      <div className="flex flex-col gap-3">
        <div>
          <span className="font-semibold">Usuario:</span>{" "}
          {edit ? (
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded bg-white text-gray-900"
            />
          ) : (
            user.username
          )}
        </div>
        <div>
          <span className="font-semibold">Nombre:</span>{" "}
          {edit ? (
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded bg-white text-gray-900"
              placeholder="Nombre"
            />
          ) : (
            user.firstName
          )}
        </div>
        <div>
          <span className="font-semibold">Apellido:</span>{" "}
          {edit ? (
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded bg-white text-gray-900"
              placeholder="Apellido"
            />
          ) : (
            user.lastName
          )}
        </div>
        <div>
          <span className="font-semibold">Email:</span>{" "}
          {edit ? (
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded bg-white text-gray-900"
              placeholder="Email"
            />
          ) : (
            user.email || "No disponible"
          )}
        </div>
        <div>
          <span className="font-semibold">Teléfono:</span>{" "}
          {edit ? (
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded bg-white text-gray-900"
              placeholder="Teléfono"
            />
          ) : (
            user.phone || "No disponible"
          )}
        </div>
        <div>
          <span className="font-semibold">Dirección:</span>{" "}
          {edit ? (
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded bg-white text-gray-900"
              placeholder="Dirección"
            />
          ) : (
            user.address || "No disponible"
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-6 justify-center">
        {edit ? (
          <>
            <button
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition font-semibold"
              onClick={handleSave}
            >
              Guardar
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition font-semibold"
              onClick={() => setEdit(false)}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition font-semibold"
            onClick={() => setEdit(true)}
          >
            Editar
          </button>
        )}
      </div>
    </div>
  );
}

// Manejo global para abrir el perfil desde UserMenu
window.setShowProfile = () => {};

export default App;
