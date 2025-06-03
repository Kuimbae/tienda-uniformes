import { useState } from "react";
import ProductCatalog from './components/ProductCatalog.jsx';
import EmbroiderySelector from './components/EmbroiderySelector';
import Footer from "./components/Footer.jsx";
import Logo from "./components/Logo.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Modal from "./components/Modal.jsx";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showEmbroidery, setShowEmbroidery] = useState(false);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-0 flex flex-col justify-between items-center">
      <header className="mb-10 bg-white/80 shadow-lg rounded-xl py-8 px-4 w-full flex items-center relative">
        <div className="absolute left-6 top-6">
          <Logo />
        </div>
        <h1 className="flex-1 text-5xl font-extrabold text-center text-blue-900 drop-shadow-lg tracking-tight">
          Tienda de Ropa
        </h1>
        <div className="absolute right-6 top-6 flex items-center gap-4">
          {!showLogin && (
            <button
              className="bg-blue-800 text-white px-6 py-2 rounded font-semibold shadow hover:bg-blue-900 transition"
              onClick={() => setShowLogin(true)}
            >
              Entrar
            </button>
          )}
        </div>
      </header>
      <Modal open={showLogin} onClose={() => setShowLogin(false)}>
        <LoginForm />
      </Modal>
      <Modal open={showEmbroidery} onClose={() => setShowEmbroidery(false)}>
        <EmbroiderySelector />
      </Modal>
      <main className="w-full max-w-7xl mx-auto flex-1">
        <div className="transition-shadow hover:shadow-2xl rounded-xl">
          <ProductCatalog />
          <div className="flex justify-end mt-6">
            <button
              className="bg-blue-800 text-white px-6 py-2 rounded font-semibold shadow hover:bg-blue-900 transition"
              onClick={() => setShowEmbroidery(true)}
            >
              Elegir bordado
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
