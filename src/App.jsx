import { useState, useEffect, useRef } from "react";
import ProductCatalog from "./components/ProductCatalog.jsx";
import EmbroiderySelector from "./components/EmbroiderySelector";
import Footer from "./components/Footer.jsx";
import Logo from "./components/Logo.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Modal from "./components/Modal.jsx";
import EntrarButton from "./components/EntrarButton.jsx";
import { useProductStore } from "./store/useProductStore.jsx";
import Cesta from "./components/Cesta.jsx";
import Carrusel from "./components/Carrusel.jsx";
import './styles/marijoa.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showEmbroidery, setShowEmbroidery] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const cartButtonRef = useRef();
  const { cart } = useProductStore();

  useEffect(() => {
    window.setShowProfile = setShowProfile;
    return () => {
      window.setShowProfile = undefined;
    };
  }, []);

  // Función para pasar a ProductCatalog y abrir la cesta al agregar
  const handleAddAndShowCart = (product, addToCart) => {
    addToCart(product);
    setShowCart(true);
  };

  // Filtrado de productos para el catálogo
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      window.alert("Por favor, introduce un término de búsqueda.");
      return;
    }
    setSearchActive(true);
  };

  // Cuando se cambia el texto de búsqueda, desactiva el estado de búsqueda activa
  useEffect(() => {
    if (search === "") setSearchActive(false);
  }, [search]);

  return (
    <div className="min-h-full w-full bg-[#e5e7eb] p-0 flex flex-col justify-between items-center">
      <header className="mb-10 bg-[#111112] bg-opacity-95 shadow-lg py-6 md:py-8 px-2 md:px-4 w-full flex flex-col sm:flex-row items-center relative gap-2 md:gap-0">
        <div className="relative w-full sm:w-1/4 flex justify-center sm:justify-start items-center h-20 sm:h-full mb-2 sm:mb-0">
          <Logo className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32" />
        </div>
        <h1
          className="w-full sm:w-1/2 flex-shrink text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center drop-shadow-lg tracking-tight px-2 mb-2 sm:mb-0 pb-2 whitespace-nowrap overflow-hidden text-ellipsis"
          style={{
            fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
            color: '#222',
            letterSpacing: '0.01em',
            textShadow: 'none',
            minWidth: 0
          }}
        >
          Sofi Confecciones
        </h1>
        {/* Buscador responsive */}
        <form
          className="w-full sm:w-1/3 flex justify-center sm:justify-center items-center order-3 sm:order-none mt-2 sm:mt-0 max-w-lg"
          onSubmit={handleSearchSubmit}
        >
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Buscar producto..."
              className="flex-1 py-2 pl-4 pr-12 bg-gray-100 text-gray-900 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 text-base shadow-sm min-w-0 w-full"
              style={{}}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center bg-pink-600 hover:bg-pink-700 transition text-white w-8 h-8 rounded-full shadow-sm"
              aria-label="Buscar"
              style={{padding:0}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
                <line x1="18" y1="18" x2="15.2" y2="15.2" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </form>
        <div className="w-full sm:w-1/4 md:w-40 flex justify-center sm:justify-end items-center gap-2 md:gap-4 md:static right-2 md:right-6 top-0 h-full mt-2 sm:mt-0 md:mt-0 z-10 order-3 sm:order-none relative">
          {!showLogin && !window.localStorage.getItem("userProfile") && (
            <div className="w-auto flex justify-center">
              <EntrarButton onClick={() => setShowLogin(true)} />
            </div>
          )}
          {window.localStorage.getItem("userProfile") && <UserMenu />}
        </div>
      </header>
      {/* Carrusel destacado */}
      <div className="w-full flex justify-center mb-8">
        <Carrusel
          images={[
            { src: "/imagen/Sofia.svg", alt: "Uniforme Sofi 1" },
            { src: "/imagen/Sofia.svg", alt: "Uniforme Sofi 2" },
            { src: "/imagen/Sofia.svg", alt: "Uniforme Sofi 3" }
          ]}
          autoPlay={true}
          height="260px"
        />
      </div>
      <Modal open={showLogin} onClose={() => setShowLogin(false)}>
        <LoginForm onLogin={() => setShowLogin(false)} />
      </Modal>
      <Modal open={showProfile} onClose={() => setShowProfile(false)} hideClose>
        <Profile onClose={() => setShowProfile(false)} />
      </Modal>

      <main className="w-full max-w-7xl mx-auto flex-1 flex flex-col md:flex-row gap-8 overflow-x-hidden">
        <div className="transition-shadow hover:shadow-2xl rounded-xl flex-1 md:w-2/3 lg:w-2/3 w-full">
          <ProductCatalog onAddToCart={handleAddAndShowCart} search={searchActive ? search : ""} />
        </div>
        {/* Botón flotante para abrir la cesta */}
        <button
          ref={cartButtonRef}
          className="fixed right-4 z-50 bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-green-800 transition flex items-center gap-2 bottom-44"
          onClick={() => setShowCart(true)}
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
              d="M2.25 6.75h1.386a.75.75 0 0 1 .728.573l1.272 5.09a2.25 2.25 0 0 0 2.186 1.762h7.456a2.25 2.25 0 0 0 2.186-1.762l1.272-5.09a.75.75 0 0 1 .728-.573h1.386"
            />
            <circle cx="8.25" cy="19.5" r="1.25" />
            <circle cx="17.25" cy="19.5" r="1.25" />
          </svg>
          Cesta
          {cart.length > 0 && (
            <span className="ml-2 bg-green-600 text-white rounded-full px-2 py-0.5 text-xs font-bold min-w-6 text-center">
              {cart.reduce((acc, item) => acc + (item.quantity || 1), 0)}
            </span>
          )}
        </button>
        {/* El botón flotante para elegir bordado permanece igual */}
        <button
          className="fixed right-4 z-40 bg-blue-800 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-900 transition flex items-center gap-2 bottom-28"
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
      {/* Panel lateral de la cesta */}
      <Cesta open={showCart} onClose={() => setShowCart(false)} />
      <Modal open={showEmbroidery} onClose={() => setShowEmbroidery(false)}>
        <EmbroiderySelector />
      </Modal>
      <Footer className="bg-black bg-opacity-80" />
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
              window.setShowProfile(true);
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
