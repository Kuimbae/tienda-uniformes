const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

const bordados = [
  {
    id: 1,
    nombre: "Estrella",
    imagen: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    descripcion: "Bordado de estrella en hilo dorado.",
    precio: 1500
  },
  {
    id: 2,
    nombre: "Corazón",
    imagen: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    descripcion: "Bordado de corazón en hilo rojo.",
    precio: 1200
  },
  {
    id: 3,
    nombre: "Flor",
    imagen: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    descripcion: "Bordado de flor multicolor.",
    precio: 1800
  }
];

app.get('/api/bordados', (req, res) => {
  res.json(bordados);
});

app.get('/api/bordados/:id', (req, res) => {
  const bordado = bordados.find(b => b.id === parseInt(req.params.id));
  if (bordado) {
    res.json(bordado);
  } else {
    res.status(404).json({ error: 'Bordado no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`API de bordados escuchando en http://localhost:${PORT}`);
});
