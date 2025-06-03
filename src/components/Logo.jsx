import logo from '../assets/react.svg'; // Cambia la ruta si tu logo está en otra ubicación

export default function Logo() {
  return (
    <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
  );
}
