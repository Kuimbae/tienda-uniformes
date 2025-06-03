export default function EntrarButton({ onClick }) {
  return (
    <button
      className="bg-gray-800 text-white px-6 py-2 rounded font-semibold shadow hover:bg-gray-900 transition"
      onClick={onClick}
    >
      Entrar
    </button>
  );
}
