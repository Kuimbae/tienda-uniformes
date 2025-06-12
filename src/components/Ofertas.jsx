export default function Ofertas({ onBack }) {
  return (
    <section id="ofertas" className="w-full max-w-7xl mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-pink-700">Ofertas</h2>
      <button
        className="mb-4 bg-blue-700 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800 transition"
        onClick={onBack}
      >
        Volver a inicio
      </button>
      <div className="bg-pink-50 rounded-xl p-6 shadow text-gray-700">
        ¡Aprovecha nuestras ofertas especiales de temporada! Descuentos en productos seleccionados.
      </div>
    </section>
  );
}
