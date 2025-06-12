import { useProductStore } from "../store/useProductStore.jsx";
import { useState } from "react";

export default function CestaResumen() {
  const { cart } = useProductStore();
  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const [pedidoRealizado, setPedidoRealizado] = useState(false);
  const [mostrarPago, setMostrarPago] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");
  const [erroresPago, setErroresPago] = useState({});
  const [banco, setBanco] = useState({ titular: "", iban: "", banco: "", referencia: "" });
  const [paypal, setPaypal] = useState({ email: "" });
  const [tarjeta, setTarjeta] = useState({ numero: "", fecha: "", cvv: "", titular: "" });
  const [bizum, setBizum] = useState({ telefono: "" });
  const [reembolso, setReembolso] = useState({ nombre: "", telefono: "" });

  // Obtener datos del usuario desde localStorage
  const user = (() => {
    try {
      return JSON.parse(window.localStorage.getItem("userProfile")) || {};
    } catch {
      return {};
    }
  })();
  const isLogged = !!user && !!user.username;

  const handlePedido = () => {
    setMostrarPago(true);
  };

  const validarPago = () => {
    let errores = {};
    if (metodoPago === "Banco") {
      if (!banco.titular) errores.titular = "Campo obligatorio";
      if (!banco.iban) errores.iban = "Campo obligatorio";
      if (!banco.banco) errores.banco = "Campo obligatorio";
    }
    if (metodoPago === "PayPal") {
      if (!paypal.email) errores.paypal = "Campo obligatorio";
    }
    if (metodoPago === "Tarjeta") {
      if (!tarjeta.numero) errores.numero = "Campo obligatorio";
      if (!tarjeta.fecha) errores.fecha = "Campo obligatorio";
      if (!tarjeta.cvv) errores.cvv = "Campo obligatorio";
      if (!tarjeta.titular) errores.titularTarjeta = "Campo obligatorio";
    }
    if (metodoPago === "Bizum") {
      if (!bizum.telefono) errores.bizum = "Campo obligatorio";
    }
    if (metodoPago === "Contra reembolso") {
      if (!reembolso.nombre) errores.nombreReembolso = "Campo obligatorio";
      if (!reembolso.telefono) errores.telefonoReembolso = "Campo obligatorio";
    }
    setErroresPago(errores);
    return Object.keys(errores).length === 0;
  };

  const handleConfirmarPago = () => {
    if (!validarPago()) return;
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
      {/* Datos del usuario para la factura */}
      <div className="mb-6 border rounded-lg p-4 bg-gray-50 print:bg-white print:border print:p-2">
        <h3 className="font-bold text-gray-800 mb-2 text-lg">Datos del cliente</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-gray-700 text-sm">
          <div><span className="font-semibold">Usuario:</span> {user.username || "-"}</div>
          <div><span className="font-semibold">Nombre:</span> {user.firstName || "-"}</div>
          <div><span className="font-semibold">Apellido:</span> {user.lastName || "-"}</div>
          <div><span className="font-semibold">Email:</span> {user.email || "-"}</div>
          <div><span className="font-semibold">Teléfono:</span> {user.phone || "-"}</div>
          <div className="md:col-span-2"><span className="font-semibold">Dirección:</span> {user.address || "-"}</div>
        </div>
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
      {/* Solo mostrar botones y mensajes si no es impresión */}
      <div className="print:hidden">
        {cart.length > 0 && !mostrarPago && (
          <div className="flex flex-col md:flex-row gap-3 justify-center mt-4">
            <button
              className="bg-green-700 text-white px-4 py-2 rounded font-semibold hover:bg-green-800 transition disabled:opacity-50"
              onClick={handlePedido}
              disabled={!isLogged}
              title={!isLogged ? 'Debes iniciar sesión para realizar un pedido' : ''}
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
        {!isLogged && (
          <div className="text-red-600 text-center mt-2 font-semibold text-sm">
            Debes iniciar sesión para realizar un pedido.
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
              {/* Campos para Transferencia bancaria */}
              {metodoPago === "Banco" && (
                <div className="flex flex-col gap-2 bg-white border border-blue-200 rounded p-3 mt-2">
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded bg-white text-gray-900"
                    placeholder="Nombre del titular de la cuenta"
                    value={banco.titular}
                    onChange={e => setBanco({ ...banco, titular: e.target.value })}
                  />
                  {erroresPago.titular && <span className="text-red-600 text-xs">{erroresPago.titular}</span>}
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded bg-white text-gray-900"
                    placeholder="IBAN o número de cuenta"
                    value={banco.iban}
                    onChange={e => setBanco({ ...banco, iban: e.target.value })}
                  />
                  {erroresPago.iban && <span className="text-red-600 text-xs">{erroresPago.iban}</span>}
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded bg-white text-gray-900"
                    placeholder="Banco de origen"
                    value={banco.banco}
                    onChange={e => setBanco({ ...banco, banco: e.target.value })}
                  />
                  {erroresPago.banco && <span className="text-red-600 text-xs">{erroresPago.banco}</span>}
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded bg-white text-gray-900"
                    placeholder="Referencia o comprobante de transferencia (opcional)"
                    value={banco.referencia}
                    onChange={e => setBanco({ ...banco, referencia: e.target.value })}
                  />
                  <div className="text-xs text-gray-500 mt-1">Por favor, realiza la transferencia a la cuenta indicada en la factura y adjunta la referencia si es posible.</div>
                </div>
              )}
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
              {/* Campos para PayPal */}
              {metodoPago === "PayPal" && (
                <div className="flex flex-col gap-2 bg-white border border-blue-200 rounded p-3 mt-2">
                  <input
                    type="email"
                    className="p-2 border border-gray-300 rounded bg-white text-gray-900"
                    placeholder="Correo electrónico de PayPal"
                    value={paypal.email}
                    onChange={e => setPaypal({ email: e.target.value })}
                  />
                  {erroresPago.paypal && <span className="text-red-600 text-xs">{erroresPago.paypal}</span>}
                  <div className="text-xs text-gray-500 mt-1">Serás redirigido a PayPal para completar el pago.</div>
                </div>
              )}
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
              {/* Campos para Tarjeta de crédito/débito */}
              {metodoPago === "Tarjeta" && (
                <div className="flex flex-col gap-2 bg-white border border-blue-200 rounded p-3 mt-2">
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded bg-white text-gray-900"
                    placeholder="Número de tarjeta"
                    maxLength={19}
                    value={tarjeta.numero}
                    onChange={e => setTarjeta({ ...tarjeta, numero: e.target.value })}
                  />
                  {erroresPago.numero && <span className="text-red-600 text-xs">{erroresPago.numero}</span>}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="p-2 border border-gray-300 rounded bg-white text-gray-900 w-1/2"
                      placeholder="MM/AA"
                      maxLength={5}
                      value={tarjeta.fecha}
                      onChange={e => setTarjeta({ ...tarjeta, fecha: e.target.value })}
                    />
                    <input
                      type="text"
                      className="p-2 border border-gray-300 rounded bg-white text-gray-900 w-1/2"
                      placeholder="CVV"
                      maxLength={4}
                      value={tarjeta.cvv}
                      onChange={e => setTarjeta({ ...tarjeta, cvv: e.target.value })}
                    />
                  </div>
                  {(erroresPago.fecha || erroresPago.cvv) && <span className="text-red-600 text-xs">{erroresPago.fecha || erroresPago.cvv}</span>}
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded bg-white text-gray-900"
                    placeholder="Nombre del titular"
                    value={tarjeta.titular}
                    onChange={e => setTarjeta({ ...tarjeta, titular: e.target.value })}
                  />
                  {erroresPago.titularTarjeta && <span className="text-red-600 text-xs">{erroresPago.titularTarjeta}</span>}
                  <div className="text-xs text-gray-500 mt-1">Tus datos están protegidos y no se almacenan.</div>
                </div>
              )}
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
              {/* Campos para Bizum */}
              {metodoPago === "Bizum" && (
                <div className="flex flex-col gap-2 bg-white border border-blue-200 rounded p-3 mt-2">
                  <input
                    type="tel"
                    className="p-2 border border-gray-300 rounded bg-white text-gray-900"
                    placeholder="Teléfono asociado a Bizum"
                    value={bizum.telefono}
                    onChange={e => setBizum({ telefono: e.target.value })}
                  />
                  {erroresPago.bizum && <span className="text-red-600 text-xs">{erroresPago.bizum}</span>}
                  <div className="text-xs text-gray-500 mt-1">Recibirás una solicitud de pago en tu app Bizum.</div>
                </div>
              )}
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
              {/* Campos para Contra reembolso */}
              {metodoPago === "Contra reembolso" && (
                <div className="flex flex-col gap-2 bg-white border border-blue-200 rounded p-3 mt-2">
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded bg-white text-gray-900"
                    placeholder="Nombre completo del receptor"
                    value={reembolso.nombre}
                    onChange={e => setReembolso({ ...reembolso, nombre: e.target.value })}
                  />
                  {erroresPago.nombreReembolso && <span className="text-red-600 text-xs">{erroresPago.nombreReembolso}</span>}
                  <input
                    type="tel"
                    className="p-2 border border-gray-300 rounded bg-white text-gray-900"
                    placeholder="Teléfono de contacto"
                    value={reembolso.telefono}
                    onChange={e => setReembolso({ ...reembolso, telefono: e.target.value })}
                  />
                  {erroresPago.telefonoReembolso && <span className="text-red-600 text-xs">{erroresPago.telefonoReembolso}</span>}
                  <div className="text-xs text-gray-500 mt-1">Recuerda tener el importe exacto preparado para el repartidor.</div>
                </div>
              )}
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
    </div>
  );
}
