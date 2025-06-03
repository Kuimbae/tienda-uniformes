export default function Footer() {
  return (
    <footer className="w-full mt-8 py-4 text-center text-gray-500 text-sm border-t bg-white/80">
      © {new Date().getFullYear()} Tienda de Ropa. Todos los derechos reservados.
    </footer>
  );
}
