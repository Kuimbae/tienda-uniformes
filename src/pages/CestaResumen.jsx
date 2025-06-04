import { useProductStore } from "../store/useProductStore.jsx";

export default function CestaResumen() {
  const { cart } = useProductStore();
  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-900 text-center">Artículos en tu cesta</h2>
      {cart.length === 0 ? (
        <div className="text-gray-500 text-center">Tu cesta está vacía.</div>
      ) : (
        <ul className="divide-y divide-gray-200 mb-6">
          {cart.map((item, idx) => (
            <li key={idx} className="flex items-center gap-4 py-4">
              <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{item.title}</div>
                <div className="text-sm text-gray-500">
                  ${item.price} x {item.quantity || 1} = <span className="font-bold text-gray-800">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <div className="flex justify-between items-center border-t pt-4">
          <span className="font-semibold text-gray-700">Total:</span>
          <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}
