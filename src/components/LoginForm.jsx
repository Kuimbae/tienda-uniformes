import { useState } from 'react';

export default function LoginForm() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setUser(null);
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error desconocido');
      if (data.token) localStorage.setItem('token', data.token);
      setUser(data);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full">
      <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
      {success && user ? (
        <div className="flex flex-col items-center gap-4">
          <div className="text-green-600 mb-2 text-lg text-center">
            ¡Bienvenido, <span className="font-bold text-blue-800">{user.username || user.firstName || 'Usuario'}</span>!
          </div>
          <div className="flex gap-3">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              onClick={() => {
                setSuccess(false);
                setUser(null);
                setUsername('');
                setPassword('');
                localStorage.removeItem('token');
              }}
            >
              Cerrar sesión
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              onClick={() => alert('Funcionalidad de editar perfil próximamente')}
            >
              Editar perfil
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            className="w-full p-2 mb-3 border border-gray-300 rounded"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
          <button className="w-full bg-blue-800 text-white py-2 rounded font-semibold" type="submit">
            Entrar
          </button>
        </form>
      )}
    </div>
  );
}
