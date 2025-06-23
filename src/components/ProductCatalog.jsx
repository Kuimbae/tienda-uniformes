import { useEffect, useState } from 'react';
import { useProductStore } from '../store/useProductStore.jsx';

export default function ProductCatalog({ onAddToCart, search = "" }) {
  const { products, fetchProducts, addToCart, isLoading, error } = useProductStore();
  const [addedId, setAddedId] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtrar productos por búsqueda
  const filteredProducts = search
    ? products.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
      )
    : products;

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  // Mostrar productos desde el inicio hasta el final de la página seleccionada
  const paginatedProducts = filteredProducts.slice(0, page * pageSize);

  const handleAdd = (product) => {
    if (onAddToCart) {
      onAddToCart(product, addToCart);
    } else {
      addToCart(product);
    }
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1000);
  };

  // Cambiar de página y volver arriba
  const goToPage = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => { setPage(1); }, [search]); // Reinicia a la página 1 al buscar

  if (isLoading) return <div className="p-6">Cargando productos...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full product-card">
      <h2 className="text-xl font-bold mb-4">Catálogo</h2>
      <div className="grid grid-cols-2 gap-4">
        {paginatedProducts.length === 0 ? (
          <div className="col-span-2 text-center text-gray-500 py-8">No se encontraron productos.</div>
        ) : (
          paginatedProducts.map((product) => (
            <div key={product.id} className="text-center product-card">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-32 w-full object-cover mb-2 rounded"
              />
              <p className="font-semibold text-base text-gray-900 mb-1">{product.title}</p>
              <p className="text-sm text-gray-500 mb-2">{product.description}</p>
              <p className="precio mb-2">${product.price}</p>
              <button
                onClick={() => handleAdd(product)}
                className={`mt-2 btn-principal px-4 py-1 text-sm transition ${addedId === product.id ? 'bg-green-600' : ''}`}
                disabled={addedId === product.id}
              >
                {addedId === product.id ? '¡Agregado!' : 'Añadir a la cesta'}
              </button>
            </div>
          ))
        )}
      </div>
      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded font-semibold ${page === i + 1 ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-pink-100'}`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
