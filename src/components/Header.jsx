import Logo from "./Logo.jsx";
import EntrarButton from "./EntrarButton.jsx";

function Header({ showLogin, setShowLogin, search, setSearch, handleSearchSubmit, UserMenu, searchResults = [], showSearchResults, setShowSearchResults, onAddToCart, onSearchChange, setShowProfile }) {
  return (
    <>
      <header className="mb-2 bg-[#111112] bg-opacity-95 shadow-lg py-4 sm:py-6 md:py-8 px-2 sm:px-4 w-full flex flex-col items-center relative gap-2 md:gap-0">
        {/* Fila principal: logo y título */}
        <div className="w-full flex flex-row items-center gap-1 sm:gap-2 md:gap-4 relative min-h-[60px]">
          {/* Logo a la izquierda */}
          <div className="flex-shrink-0 flex items-center justify-center min-w-[44px] sm:min-w-[56px] z-10">
            <Logo className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-28 lg:h-28" />
          </div>
          {/* Título perfectamente centrado absoluto */}
          <div className="absolute left-0 right-0 flex justify-center items-center pointer-events-none select-none">
            <h1
              className="text-center font-black italic font-serif drop-shadow-[0_8px_32px_rgba(230,0,126,0.25)] tracking-tight px-1 sm:px-2 mb-1 sm:mb-2 pb-1 sm:pb-2 pt-1 sm:pt-2 whitespace-nowrap overflow-visible text-ellipsis animate-gradient bg-gradient-to-r from-pink-600 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent relative text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              style={{
                fontFamily: 'Great Vibes, cursive',
                letterSpacing: '0.06em',
                minWidth: 0,
                lineHeight: 1.1,
                textTransform: 'none',
                margin: '0 auto',
                display: 'block',
                textAlign: 'center'
              }}
            >
              <span className="inline-block animate-bounce-slow">S</span>ofi <span className="inline-block animate-bounce-slow delay-150">C</span>onfecciones
            </h1>
          </div>
          {/* Buscador y usuario a la derecha SOLO en pantallas medianas o mayores */}
          <div className="hidden sm:flex flex-shrink-0 items-center gap-1 sm:gap-2 min-w-0 max-w-[60vw] sm:max-w-[220px] md:max-w-[320px] justify-end z-10 ml-auto">
            <form
              className="flex flex-row items-center gap-1 sm:gap-2 w-full min-w-0 max-w-full relative"
              onSubmit={handleSearchSubmit}
              style={{margin: 0, flex: 1, justifyContent: 'flex-end'}}
            >
              <input
                id="search-input-header"
                type="text"
                value={search}
                onChange={onSearchChange}
                placeholder="Buscar..."
                className="flex-1 min-w-0 py-2 pl-4 pr-12 bg-gray-100 text-gray-900 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 text-base shadow-sm w-full !m-0"
                style={{margin: 0, maxWidth: '100%', minWidth: '320px'}}
                autoComplete="off"
              />
              <button
                type="submit"
                className="flex items-center justify-center bg-pink-600 hover:bg-pink-700 transition text-white w-8 h-8 rounded-full shadow-sm flex-shrink-0 absolute right-1 top-1/2 -translate-y-1/2"
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
              {/* Panel de resultados de búsqueda (desktop) */}
              {showSearchResults && searchResults.length > 0 && (
                <div
                  id="search-dropdown-panel"
                  className="absolute left-0 top-12 w-[32rem] min-w-[20rem] max-w-[90vw] bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-[28rem] overflow-y-auto mt-1"
                  style={{width: '32rem'}}
                >
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-pink-50 cursor-pointer border-b last:border-b-0"
                      onClick={() => {
                        setSearch(product.title);
                        setShowSearchResults(false);
                        // Opcional: navegar al catálogo filtrado o mostrar detalle
                      }}
                    >
                      <img src={product.thumbnail} alt={product.title} className="w-10 h-10 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-sm">{product.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-1">{product.description}</div>
                      </div>
                      <button
                        className="bg-green-700 text-white px-3 py-1 rounded font-semibold text-xs hover:bg-green-800 transition"
                        onClick={e => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                      >Añadir</button>
                    </div>
                  ))}
                  {searchResults.length === 0 && (
                    <div className="px-3 py-2 text-gray-500 text-sm">No se encontraron productos.</div>
                  )}
                </div>
              )}
            </form>
            <div className="flex-shrink-0 ml-1 sm:ml-2 flex items-center h-full">
              {!showLogin && !window.localStorage.getItem("userProfile") && (
                <EntrarButton onClick={() => setShowLogin(true)} />
              )}
              {window.localStorage.getItem("userProfile") && UserMenu && <UserMenu setShowProfile={setShowProfile} />}
            </div>
          </div>
        </div>
        {/* Buscador y usuario DEBAJO del título en móvil */}
        <div className="flex sm:hidden w-full flex-row items-center justify-center gap-2 mt-2">
          <form
            className="flex flex-row items-center gap-2 w-full max-w-xs relative"
            onSubmit={handleSearchSubmit}
            style={{margin: 0}}
          >
            <input
              id="search-input-header"
              type="text"
              value={search}
              onChange={onSearchChange}
              placeholder="Buscar..."
              className="flex-1 py-2 pl-4 pr-12 bg-gray-100 text-gray-900 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 text-base shadow-sm min-w-0 w-full !m-0"
              style={{margin: 0}}
              autoComplete="off"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-pink-600 hover:bg-pink-700 transition text-white w-8 h-8 rounded-full shadow-sm flex-shrink-0 absolute right-1 top-1/2 -translate-y-1/2"
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
            {/* Panel de resultados de búsqueda (móvil) */}
            {showSearchResults && searchResults.length > 0 && (
              <div
                id="search-dropdown-panel"
                className="absolute left-0 top-12 w-[95vw] min-w-[16rem] max-w-[99vw] bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-[24rem] overflow-y-auto mt-1"
                style={{width: '95vw'}}
              >
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-pink-50 cursor-pointer border-b last:border-b-0"
                    onClick={() => {
                      setSearch(product.title);
                      setShowSearchResults(false);
                    }}
                  >
                    <img src={product.thumbnail} alt={product.title} className="w-10 h-10 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">{product.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{product.description}</div>
                    </div>
                    <button
                      className="bg-green-700 text-white px-3 py-1 rounded font-semibold text-xs hover:bg-green-800 transition"
                      onClick={e => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                    >Añadir</button>
                  </div>
                ))}
                {searchResults.length === 0 && (
                  <div className="px-3 py-2 text-gray-500 text-sm">No se encontraron productos.</div>
                )}
              </div>
            )}
          </form>
          <div className="flex-shrink-0 ml-1 flex items-center h-full">
            {!showLogin && !window.localStorage.getItem("userProfile") && (
              <EntrarButton onClick={() => setShowLogin(true)} />
            )}
            {window.localStorage.getItem("userProfile") && UserMenu && <UserMenu setShowProfile={setShowProfile} />}
          </div>
        </div>
      </header>
      {/* Menú de navegación debajo del header, letras pequeñas */}
      <nav className="w-full flex justify-center items-center gap-6 mt-0 mb-6">
        <a href="#catalogo" className="text-xs font-medium text-pink-600 hover:text-fuchsia-600 transition tracking-wide uppercase">Catálogo</a>
        <a href="#bordados" className="text-xs font-medium text-pink-600 hover:text-fuchsia-600 transition tracking-wide uppercase">Bordados</a>
        <a href="#ofertas" className="text-xs font-medium text-pink-600 hover:text-fuchsia-600 transition tracking-wide uppercase">Ofertas</a>
        <a href="#contacto" className="text-xs font-medium text-pink-600 hover:text-fuchsia-600 transition tracking-wide uppercase">Contacto</a>
      </nav>
    </>
  );
}

export default Header;
