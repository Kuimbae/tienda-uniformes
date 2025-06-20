import { useProductStore } from "../store/useProductStore.jsx";
import { useEffect, useRef } from "react";

export default function Cesta({ open, onClose }) {
  const { cart, clearCart, increaseQuantity, decreaseQuantity, removeFromCart } = useProductStore();
  const drawerRef = useRef();

  // Cerrar la cesta al hacer clic fuera
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  return (
    <div
      ref={drawerRef}
      className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out flex flex-col
        ${open ? "translate-x-0" : "translate-x-full"}`}
      style={{ boxShadow: open ? "-4px 0 24px 0 rgba(0,0,0,0.15)" : "none" }}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-bold text-gray-800">Tu cesta</h3>
        <button
          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-red-500 hover:text-white text-gray-700 text-base font-bold shadow transition-all duration-150"
          style={{ lineHeight: 1, padding: 0 }}
          onClick={onClose}
          aria-label="Cerrar cesta"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="16" rx="3" fill="none" />
            <path d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <div className="text-gray-500 text-center mt-8">Tu cesta está vacía.</div>
        ) : (
          <ul className="space-y-4">
            {cart.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 border-b pb-2">
                <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{item.title}</div>
                  <div className="text-sm text-gray-500">
                    ${item.price} x {item.quantity || 1} = <span className="font-bold text-gray-800">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-lg font-bold hover:bg-gray-800 transition"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label="Disminuir"
                    >
                      -
                    </button>
                    <span className="font-bold text-gray-800 w-6 text-center">{item.quantity || 1}</span>
                    <button
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-lg font-bold hover:bg-gray-800 transition"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label="Aumentar"
                    >
                      +
                    </button>
                    <button
                      className="ml-2 text-black hover:text-red-600 bg-transparent p-0 border-0 shadow-none"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Eliminar"
                      style={{ background: 'none' }}
                    >
                      {/* Icono de papelera alternativo, simple y claro */}
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        <path d="M3 6h18" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <rect x="5" y="6" width="14" height="14" rx="2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="p-4 border-t flex flex-col gap-2">
        {cart.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">Total:</span>
              <span className="text-lg font-bold text-gray-900">
                ${cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0).toFixed(2)}
              </span>
            </div>
            <button
              className="bg-blue-700 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800 transition mb-2"
              onClick={() => {
                // Navegación interna a la página de resumen de la cesta
                window.location.hash = '#/cesta';
                onClose();
              }}
            >
              Ver artículos en tu cesta
            </button>
          </>
        )}
      </div>
    </div>
  );
}
