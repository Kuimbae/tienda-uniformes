import { useProductStore } from "../store/useProductStore.jsx";
import { useState } from "react";

export default function CestaResumen() {
  const { cart } = useProductStore();
  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const [pedidoRealizado, setPedidoRealizado] = useState(false);
  const [mostrarPago, setMostrarPago] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");

  const handlePedido = () => {
    setMostrarPago(true);
  };

  const handleConfirmarPago = () => {
    setPedidoRealizado(true);
    setMostrarPago(false);
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <div className="flex flex-col items-center mb-6">
        <img src="/imagen/Sofia.svg" alt="Logo Sofi Confecciones" className="w-32 h-32 object-contain mb-2 print:mb-0" />
        <h2 className="text-2xl font-bold text-blue-900 text-center print:mt-2">Artículos en tu cesta</h2>
      </div>
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
        <div className="flex justify-between items-center border-t pt-4 mb-4">
          <span className="font-semibold text-gray-700">Total:</span>
          <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>
      )}
      {cart.length > 0 && !mostrarPago && (
        <div className="flex flex-col md:flex-row gap-3 justify-center mt-4">
          <button
            className="bg-green-700 text-white px-4 py-2 rounded font-semibold hover:bg-green-800 transition"
            onClick={handlePedido}
          >
            Realizar pedido
          </button>
          <button
            className="bg-blue-700 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800 transition"
            onClick={handleImprimir}
          >
            Imprimir factura
          </button>
        </div>
      )}
      {mostrarPago && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="text-lg font-semibold text-gray-800">Selecciona el método de pago:</div>
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <label className="flex items-center gap-2 text-gray-800 font-medium">
              <input
                type="radio"
                name="metodoPago"
                value="Banco"
                checked={metodoPago === "Banco"}
                onChange={() => setMetodoPago("Banco")}
                className="accent-blue-700 hidden"
              />
              <span className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${metodoPago === "Banco" ? 'border-blue-700 bg-blue-700 text-white' : 'border-gray-400 bg-white text-gray-400'}`}>🏦</span>
              Transferencia bancaria
            </label>
            <label className="flex items-center gap-2 text-gray-800 font-medium">
              <input
                type="radio"
                name="metodoPago"
                value="PayPal"
                checked={metodoPago === "PayPal"}
                onChange={() => setMetodoPago("PayPal")}
                className="accent-blue-700 hidden"
              />
              <span className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${metodoPago === "PayPal" ? 'border-blue-700 bg-blue-700 text-white' : 'border-gray-400 bg-white text-gray-400'}`}>💸</span>
              PayPal
            </label>
            <label className="flex items-center gap-2 text-gray-800 font-medium">
              <input
                type="radio"
                name="metodoPago"
                value="Tarjeta"
                checked={metodoPago === "Tarjeta"}
                onChange={() => setMetodoPago("Tarjeta")}
                className="accent-blue-700 hidden"
              />
              <span className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${metodoPago === "Tarjeta" ? 'border-blue-700 bg-blue-700 text-white' : 'border-gray-400 bg-white text-gray-400'}`}>💳</span>
              Tarjeta de crédito/débito
            </label>
            <label className="flex items-center gap-2 text-gray-800 font-medium">
              <input
                type="radio"
                name="metodoPago"
                value="Bizum"
                checked={metodoPago === "Bizum"}
                onChange={() => setMetodoPago("Bizum")}
                className="accent-blue-700 hidden"
              />
              <span className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${metodoPago === "Bizum" ? 'border-blue-700 bg-blue-700 text-white' : 'border-gray-400 bg-white text-gray-400'}`}>📲</span>
              Bizum
            </label>
            <label className="flex items-center gap-2 text-gray-800 font-medium">
              <input
                type="radio"
                name="metodoPago"
                value="Contra reembolso"
                checked={metodoPago === "Contra reembolso"}
                onChange={() => setMetodoPago("Contra reembolso")}
                className="accent-blue-700 hidden"
              />
              <span className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${metodoPago === "Contra reembolso" ? 'border-blue-700 bg-blue-700 text-white' : 'border-gray-400 bg-white text-gray-400'}`}>💵</span>
              Contra reembolso
            </label>
          </div>
          <button
            className="mt-4 bg-green-700 text-white px-4 py-2 rounded font-semibold hover:bg-green-800 transition disabled:opacity-50"
            onClick={handleConfirmarPago}
            disabled={!metodoPago}
          >
            Confirmar pedido
          </button>
        </div>
      )}
      {pedidoRealizado && (
        <div className="mt-6 text-green-700 text-center font-bold">¡Pedido realizado con éxito!</div>
      )}
      <div className="mt-8 text-center">
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800 transition"
          onClick={() => {
            window.location.hash = "#";
          }}
        >
          Volver a la tienda
        </button>
      </div>
    </div>
  );
}
