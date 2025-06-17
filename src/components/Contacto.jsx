import { useState } from "react";

export default function Contacto({ onBack }) {
  const [estado, setEstado] = useState(null); // null | "ok" | "error"
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setEstado(null);
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formsubmit.co/delgadofleitas@hotmail.com", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setEstado("ok");
        form.reset();
      } else {
        setEstado("error");
      }
    } catch {
      setEstado("error");
    } finally {
      setEnviando(false);
    }
  };

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
        <p>
          Escríbenos a{" "}
          <a
            href="mailto:sofi@confecciones.com"
            className="text-pink-700 underline"
          >
            sofi@confecciones.com
          </a>{" "}
          o por WhatsApp al{" "}
          <a
            href="tel:+34123456789"
            className="text-pink-700 underline"
          >
            +34 123 456 789
          </a>
          .
        </p>
      </div>
      {/* Formulario de contacto que envía datos a formsubmit.co */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow max-w-md mx-auto mt-8"
        autoComplete="off"
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          required
          className="p-2 border border-gray-300 rounded bg-white text-black"
          style={{ color: '#111' }}
          autoComplete="name"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="p-2 border border-gray-300 rounded bg-white text-black"
          style={{ color: '#111' }}
          autoComplete="email"
        />
        <textarea
          name="mensaje"
          placeholder="Mensaje"
          required
          className="p-2 border border-gray-300 rounded min-h-[100px] bg-white text-black"
        />
        <input type="hidden" name="_captcha" value="false" />
        <button
          type="submit"
          className="bg-blue-800 text-white py-2 rounded font-semibold hover:bg-blue-900 transition disabled:opacity-60"
          disabled={enviando}
        >
          {enviando ? "Enviando..." : "Enviar"}
        </button>
        {estado === "ok" && (
          <div className="text-green-700 font-semibold">
            ¡Mensaje enviado correctamente!
          </div>
        )}
        {estado === "error" && (
          <div className="text-red-700 font-semibold">
            Hubo un error al enviar. Intenta de nuevo.
          </div>
        )}
      </form>
      /*
        Estilos para el autocompletado de los inputs en navegadores Webkit (Chrome, Edge, Safari):
        Forzamos el fondo negro y el texto blanco en el autocompletado.
      */
      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px #111 inset !important;
          box-shadow: 0 0 0 1000px #111 inset !important;
          -webkit-text-fill-color: #fff !important;
          color: #fff !important;
          caret-color: #fff !important;
          border-radius: 0.375rem;
        }
      `}</style>
    </section>
  );
}
