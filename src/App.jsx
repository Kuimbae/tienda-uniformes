import LoginForm from "./components/LoginForm.jsx";
import ProductCatalog from './components/ProductCatalog.jsx';
import EmbroiderySelector from './components/EmbroiderySelector';
import Footer from "./components/Footer.jsx";
import Logo from "./components/Logo.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-8 flex flex-col justify-center items-center">
      <header className="mb-10 bg-white/80 shadow-lg rounded-xl py-8 px-4 w-full flex flex-col items-center relative">
        <div className="absolute left-6 top-6">
          <Logo />
        </div>
        <h1 className="text-5xl font-extrabold text-center text-blue-900 drop-shadow-lg tracking-tight w-full flex justify-center items-center">
          Tienda de Ropa
        </h1>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        <div className="transition-shadow hover:shadow-2xl rounded-xl">
          <LoginForm />
        </div>
        <div className="transition-shadow hover:shadow-2xl rounded-xl">
          <ProductCatalog />
        </div>
        <div className="transition-shadow hover:shadow-2xl rounded-xl">
          <EmbroiderySelector />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
