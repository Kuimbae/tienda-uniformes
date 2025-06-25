import { useEffect, useState } from 'react';
import { getTurtleStitchDesigns } from '../services/turtlestitch';

export default function EmbroiderySelector() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getTurtleStitchDesigns()
      .then(data => setDesigns(data))
      .catch(err => setError('Error al cargar bordados'))
      .finally(() => setLoading(false));
  }, []);

  // Función para obtener la URL de la imagen preliminar
  const getPreviewUrl = (design) => {
    // TurtleStitch genera una imagen PNG de preview en esta ruta:
    // https://www.turtlestitch.org/users/<user>/projects/<project>/thumbnail.png
    return `https://www.turtlestitch.org/users/${design.user}/projects/${design.id}/thumbnail.png`;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full">
      <h2 className="text-xl font-bold mb-4">Bordado</h2>
      {loading && <div className="mb-4">Cargando bordados...</div>}
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="h-48 bg-gray-200 mb-4 rounded flex flex-wrap gap-2 overflow-auto">
        {designs.map((design) => (
          <div
            key={design.id}
            className={`p-2 border rounded cursor-pointer flex flex-col items-center w-32 ${selected === design.id ? 'border-blue-600' : 'border-gray-300'}`}
            onClick={() => setSelected(design.id)}
          >
            <img
              src={getPreviewUrl(design)}
              alt={design.name}
              className="w-24 h-24 object-contain mb-2 bg-white rounded"
              onError={e => {
                e.target.style.display = 'none';
                // Si no hay imagen, muestra un placeholder SVG
                const placeholder = document.createElement('div');
                placeholder.innerHTML = `<svg width='96' height='96' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='96' height='96' rx='16' fill='#f3f4f6'/><path d='M24 72L40 56L56 72L72 56' stroke='#a1a1aa' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/><circle cx='32' cy='40' r='8' fill='#a1a1aa'/></svg>`;
                placeholder.style.width = '96px';
                placeholder.style.height = '96px';
                placeholder.className = e.target.className;
                e.target.parentNode.insertBefore(placeholder, e.target);
              }}
            />
            <a href={design.url} target="_blank" rel="noopener noreferrer" className="underline text-center text-xs">
              {design.name || 'Bordado'}
            </a>
          </div>
        ))}
        {designs.length === 0 && !loading && <span className="text-gray-500">Sin bordados disponibles</span>}
      </div>
      <button className="w-full bg-blue-800 text-white py-2 rounded font-semibold" disabled={!selected}>
        Elegir
      </button>
    </div>
  );
}
