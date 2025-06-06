export default function EntrarButton({ onClick }) {
  return (
    <button
      className="bg-gray-800 text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded font-semibold shadow hover:bg-gray-900 transition text-sm sm:text-base min-w-[64px] sm:min-w-[80px] w-full max-w-[120px]"
      onClick={onClick}
    >
      Entrar
    </button>
  );
}
