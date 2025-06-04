import { useEffect, useState } from 'react';
import { useProductStore } from '../store/useProductStore.jsx';

export default function ProductCatalog({ onAddToCart }) {
  const { products, fetchProducts, addToCart, isLoading, error } = useProductStore();
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

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
        {products.map((product) => (
          <div key={product.id} className="text-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-32 w-full object-cover mb-2 rounded"
            />
            <p className="font-semibold text-sm">{product.title}</p>
            <p className="text-sm text-gray-500">${product.price}</p>
            <button
              onClick={() => handleAdd(product)}
              className={`mt-2 bg-blue-800 text-white px-4 py-1 rounded text-sm transition ${addedId === product.id ? 'bg-green-600' : ''}`}
              disabled={addedId === product.id}
            >
              {addedId === product.id ? '¡Agregado!' : 'Agregar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
