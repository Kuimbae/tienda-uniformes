import { useState } from "react";

export default function RegisterForm({ onBack, onRegister }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [confirmationStep, setConfirmationStep] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [codeError, setCodeError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    // Simular envío de código
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setConfirmationCode(code);
    setConfirmationStep(true);
    // Aquí iría la lógica real de registro (API)
    // En producción, el backend enviaría el código al email
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    setCodeError(null);
    if (inputCode === confirmationCode) {
      setSuccess(true);
      if (onRegister) onRegister();
    } else {
      setCodeError("El código ingresado es incorrecto");
    }
  };

  if (success && !onRegister) {
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

  if (confirmationStep) {
    return (
      <div className="bg-white p-6 rounded-lg w-full max-w-xs mx-auto flex flex-col items-center">
        <div className="text-blue-800 mb-2 text-center">
          Se ha enviado un código de confirmación a <b>{email}</b>.<br />
          <span className="text-xs text-gray-500">(Simulado: tu código es <b>{confirmationCode}</b>)</span>
        </div>
        <form onSubmit={handleCodeSubmit} className="w-full flex flex-col items-center">
          <input
            type="text"
            placeholder="Código de confirmación"
            className="w-full p-2 mb-3 border border-gray-300 rounded text-center"
            value={inputCode}
            onChange={e => setInputCode(e.target.value)}
            maxLength={6}
            required
          />
          {codeError && <div className="text-red-500 mb-2 text-sm text-center">{codeError}</div>}
          <button
            className="w-full bg-blue-800 text-white py-2 rounded font-semibold mb-2"
            type="submit"
          >
            Confirmar código
          </button>
        </form>
        <button
          type="button"
          className="w-full bg-gray-200 text-blue-800 py-2 rounded font-semibold border border-blue-800 hover:bg-blue-50 transition mt-2"
          onClick={onBack}
        >
          Volver
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
          className="w-full p-2 mb-3 border border-gray-300 rounded bg-white text-gray-900"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border border-gray-300 rounded bg-white text-gray-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 mb-3 border border-gray-300 rounded bg-white text-gray-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="w-full p-2 mb-4 border border-gray-300 rounded bg-white text-gray-900"
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
