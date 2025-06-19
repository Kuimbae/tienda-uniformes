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
import Header from "./components/Header.jsx";
import Catalogo from "./components/Catalogo.jsx";
import Bordados from "./components/Bordados.jsx";
import Ofertas from "./components/Ofertas.jsx";
import Contacto from "./components/Contacto.jsx";
import UserMenu from "./components/UserMenu.jsx";
import Profile from "./components/Profile.jsx";
import './styles/marijoa.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showEmbroidery, setShowEmbroidery] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const cartButtonRef = useRef();
  const { cart, products, fetchProducts, addToCart } = useProductStore();

  // Buscar productos en tiempo real
  useEffect(() => {
    if (!products.length) fetchProducts();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      setSearchActive(false);
      return;
    }
    // Filtrar productos
    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
    );
    setSearchResults(filtered);
    setShowSearchResults(true);
    setSearchActive(false);
  }, [search, products]);

  // Cerrar panel al hacer click fuera
  useEffect(() => {
    if (!showSearchResults) return;
    const handleClick = (e) => {
      if (!e.target.closest("#search-dropdown-panel") && !e.target.closest("#search-input-header")) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showSearchResults]);

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
    setShowSearchResults(true);
  };

  // Cuando se cambia el texto de búsqueda, desactiva el estado de búsqueda activa
  useEffect(() => {
    if (search === "") setSearchActive(false);
  }, [search]);

  // Permitir que el carrusel cambie la sección activa
  useEffect(() => {
    window.setActiveSection = (section) => {
      setActiveSection(section);
      // Forzar scroll al top para mejor UX
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return () => { window.setActiveSection = () => {}; };
  }, []);

  // Manejar navegación por hash para GitHub Pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (["catalogo", "ofertas", "bordados", "contacto", "inicio"].includes(hash)) {
        setActiveSection(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    // Al cargar la página, si hay hash, navegar a la sección
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-full w-full bg-[#e5e7eb] p-0 flex flex-col justify-between items-center">
      <Header
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        search={search}
        setSearch={setSearch}
        handleSearchSubmit={handleSearchSubmit}
        UserMenu={(props) => <UserMenu {...props} />}
        setShowProfile={setShowProfile}
        searchResults={searchResults}
        showSearchResults={showSearchResults}
        setShowSearchResults={setShowSearchResults}
        onAddToCart={handleAddAndShowCart}
        onSearchChange={handleSearchChange}
        setActiveSection={setActiveSection}
      />
      {/* Carrusel destacado solo en inicio */}
      {activeSection === "inicio" && (
        <>
          <div className="w-full flex justify-center mb-8">
            <Carrusel
              images={[
                { src: `${import.meta.env.BASE_URL}imagen/Sofia.svg`, alt: "Uniforme Sofi 1" },
                { src: `${import.meta.env.BASE_URL}imagen/Sofia.svg`, alt: "Uniforme Sofi 2" },
                { src: `${import.meta.env.BASE_URL}imagen/Sofia.svg`, alt: "Uniforme Sofi 3" }
              ]}
              autoPlay={true}
              height="260px"
            />
          </div>
          <main className="w-full max-w-7xl mx-auto flex-1 flex flex-col md:flex-row gap-8 overflow-x-hidden">
            <div className="transition-shadow hover:shadow-2xl rounded-xl flex-1 md:w-2/3 lg:w-2/3 w-full">
              <ProductCatalog 
                onAddToCart={(product, addToCart) => {
                  addToCart(product);
                  setShowCart(true);
                }} 
                search={searchActive ? search : ""} 
              />
            </div>
          </main>
        </>
      )}
      {activeSection === "catalogo" && (
        <Catalogo 
          onBack={() => setActiveSection("inicio")}
          onAddToCart={handleAddAndShowCart}
        />
      )}
      {activeSection === "bordados" && <Bordados onBack={() => setActiveSection("inicio")} />}
      {activeSection === "ofertas" && <Ofertas onBack={() => setActiveSection("inicio")} />}
      {activeSection === "contacto" && <Contacto onBack={() => setActiveSection("inicio")} />}
      <Modal open={showLogin} onClose={() => setShowLogin(false)}>
        <LoginForm onLogin={() => setShowLogin(false)} />
      </Modal>
      <Modal open={showProfile} onClose={() => setShowProfile(false)} hideClose>
        <Profile onClose={() => setShowProfile(false)} />
      </Modal>
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
      {/* Panel lateral de la cesta */}
      <Cesta open={showCart} onClose={() => setShowCart(false)} />
      <Modal open={showEmbroidery} onClose={() => setShowEmbroidery(false)}>
        <EmbroiderySelector />
      </Modal>
      <Footer className="bg-black bg-opacity-80" />
    </div>
  );
}

export default App;
