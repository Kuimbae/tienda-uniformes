export default function Contacto({ onBack }) {
  return (
    <section id="contacto" className="w-full max-w-7xl mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Contacto</h2>
      <button
        className="mb-4 bg-blue-700 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800 transition"
        onClick={onBack}
      >
        Volver a inicio
      </button>
      <div className="bg-blue-50 rounded-xl p-6 shadow text-gray-700">
        <p>¿Tienes dudas o quieres hacer un pedido personalizado?</p>
        <p>Escríbenos a <a href="mailto:sofi@confecciones.com" className="text-pink-700 underline">sofi@confecciones.com</a> o por WhatsApp al <a href="tel:+34123456789" className="text-pink-700 underline">+34 123 456 789</a>.</p>
      </div>
    </section>
  );
}
