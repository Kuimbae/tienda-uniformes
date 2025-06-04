import { useEffect, useState } from 'react';
import { useProductStore } from '../store/useProductStore.jsx';

export default function ProductCatalog({ onAddToCart, search = "" }) {
  const { products, fetchProducts, addToCart, isLoading, error } = useProductStore();
  const [addedId, setAddedId] = useState(null);

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

  const handleAdd = (product) => {
    if (onAddToCart) {
      onAddToCart(product, addToCart);
    } else {
      addToCart(product);
    }
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1000);
  };

  if (isLoading) return <div className="p-6">Cargando productos...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full">
      <h2 className="text-xl font-bold mb-4">Catálogo</h2>
      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-2 text-center text-gray-500 py-8">No se encontraron productos.</div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="text-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-32 w-full object-cover mb-2 rounded"
              />
              <p className="font-semibold text-base text-gray-900 mb-1">{product.title}</p>
              <p className="text-sm text-gray-500 mb-2">{product.description}</p>
              <p className="text-lg font-bold text-blue-800 mb-2">${product.price}</p>
              <button
                onClick={() => handleAdd(product)}
                className={`mt-2 bg-blue-800 text-white px-4 py-1 rounded text-sm transition ${addedId === product.id ? 'bg-green-600' : ''}`}
                disabled={addedId === product.id}
              >
                {addedId === product.id ? '¡Agregado!' : 'Añadir a la cesta'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
