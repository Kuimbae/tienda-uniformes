import { useState } from "react";

export default function RegisterForm({ onBack }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    // Aquí iría la lógica real de registro (API)
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="bg-white p-6 rounded-lg w-full max-w-xs mx-auto flex flex-col items-center">
        <div className="text-green-600 mb-2 text-lg text-center">
          ¡Registro exitoso!
        </div>
        <button
          className="bg-blue-800 text-white py-2 px-4 rounded font-semibold mt-4"
          onClick={onBack}
        >
          Volver a iniciar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-xs mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-900 font-serif italic">
        Registrarse
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && (
          <div className="text-red-500 mb-2 text-sm text-center">{error}</div>
        )}
        <button
          className="w-full bg-blue-800 text-white py-2 rounded font-semibold mb-2"
          type="submit"
        >
          Registrarse
        </button>
        <button
          type="button"
          className="w-full bg-gray-200 text-blue-800 py-2 rounded font-semibold border border-blue-800 hover:bg-blue-50 transition"
          onClick={onBack}
        >
          Volver
        </button>
      </form>
    </div>
  );
}
