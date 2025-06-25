// Servicio para obtener bordados recientes de TurtleStitch (scraping simple de HTML)
// Ahora usando corsproxy.io para evitar problemas de CORS

export async function getTurtleStitchDesigns() {
  const url = 'https://corsproxy.io/?https://www.turtlestitch.org/projects/newest';
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('No se pudo obtener los bordados');
    const html = await response.text();
    // Extraer proyectos usando expresiones regulares simples
    const regex = /<a href=\"\/users\/(.*?)\/projects\/(.*?)\"[^>]*>(.*?)<\/a>/g;
    const designs = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      designs.push({
        id: match[2],
        user: match[1],
        name: match[3],
        url: `https://www.turtlestitch.org/users/${match[1]}/projects/${match[2]}`,
        // No hay imagen real, pero puedes usar un flag para mostrar un placeholder
        hasPreview: false
      });
    }
    return designs;
  } catch (err) {
    throw err;
  }
}
