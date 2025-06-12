export default function Bordados({ onBack }) {
  return (
    <section id="bordados" className="w-full max-w-7xl mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Bordados</h2>
      <button
        className="mb-4 bg-blue-700 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800 transition"
        onClick={onBack}
      >
        Volver a inicio
      </button>
      <p className="text-gray-700 mb-4">Personaliza tus prendas con nuestro servicio de bordado profesional.</p>
      {/* Aquí puedes renderizar opciones de bordado o un selector */}
    </section>
  );
}
