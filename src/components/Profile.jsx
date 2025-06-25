import { useState, useEffect } from "react";

export default function Profile({ onClose }) {
  const [user, setUser] = useState(() => {
    const stored = window.localStorage.getItem("userProfile");
    try {
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    username: user.username || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!onClose) return;
    const stored = window.localStorage.getItem("userProfile");
    let parsed = {};
    try {
      parsed = stored ? JSON.parse(stored) : {};
    } catch {}
    setUser(parsed);
    setForm({
      username: parsed.username || "",
      firstName: parsed.firstName || "",
      lastName: parsed.lastName || "",
      email: parsed.email || "",
      phone: parsed.phone || "",
      address: parsed.address || "",
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updated = { ...user, ...form };
    setUser(updated);
    window.localStorage.setItem("userProfile", JSON.stringify(updated));
    setEdit(false);
    setMsg("Perfil actualizado correctamente");
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div className="bg-white p-6 pt-10 rounded-lg w-full max-w-md mx-auto relative text-gray-900">
      <button
        type="button"
        className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 bg-white border border-gray-300 rounded hover:bg-red-500 hover:text-white text-gray-700 text-base font-bold shadow transition-all duration-150 z-20"
        style={{ lineHeight: 1, padding: 0 }}
        onClick={onClose}
        aria-label="Cerrar"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="16" height="16" rx="3" fill="none" />
          <path
            d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <h2
        className="text-2xl font-extrabold mb-4 text-center text-blue-900 font-serif tracking-tight italic"
        style={{
          fontFamily: "serif, Georgia, Times, Times New Roman, Garamond",
        }}
      >
        Perfil de Usuario
      </h2>
      {msg && <div className="text-green-600 text-center mb-2">{msg}</div>}
      <div className="flex flex-col gap-3">
        <div>
          <span className="font-semibold">Usuario:</span>{" "}
          {edit ? (
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded bg-white text-gray-900"
            />
          ) : (
            user.username
          )}
        </div>
        <div>
          <span className="font-semibold">Nombre:</span>{" "}
          {edit ? (
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded bg-white text-gray-900"
              placeholder="Nombre"
            />
          ) : (
            user.firstName
          )}
        </div>
        <div>
          <span className="font-semibold">Apellido:</span>{" "}
          {edit ? (
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded bg-white text-gray-900"
              placeholder="Apellido"
            />
          ) : (
            user.lastName
          )}
        </div>
        <div>
          <span className="font-semibold">Email:</span>{" "}
          {edit ? (
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded bg-white text-gray-900"
              placeholder="Email"
            />
          ) : (
            user.email || "No disponible"
          )}
        </div>
        <div>
          <span className="font-semibold">Teléfono:</span>{" "}
          {edit ? (
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded bg-white text-gray-900"
              placeholder="Teléfono"
            />
          ) : (
            user.phone || "No disponible"
          )}
        </div>
        <div>
          <span className="font-semibold">Dirección:</span>{" "}
          {edit ? (
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded bg-white text-gray-900"
              placeholder="Dirección"
            />
          ) : (
            user.address || "No disponible"
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-6 justify-center">
        {edit ? (
          <>
            <button
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition font-semibold"
              onClick={handleSave}
            >
              Guardar
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition font-semibold"
              onClick={() => setEdit(false)}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition font-semibold"
            onClick={() => setEdit(true)}
          >
            Editar
          </button>
        )}
      </div>
    </div>
  );
}
