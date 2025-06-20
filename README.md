# Tienda de Uniformes - Sofi Confecciones

Proyecto web realizado con React + Vite + Zustand + TailwindCSS.

## Funcionalidades principales

- **Catálogo de productos**: Visualización y búsqueda de productos, filtrado en tiempo real.
- **Cesta de compras**: Añadir, quitar y modificar cantidades de productos. Resumen de compra y total.
- **Login y registro**: Formulario de inicio de sesión y registro de usuario, con persistencia en localStorage.
- **Perfil de usuario**: Edición de datos personales y persistencia local.
- **Carrusel destacado**: Imágenes principales con botones funcionales para navegar a catálogo y ofertas.
- **Ofertas**: Sección especial con productos en promoción.
- **Bordados**: Sección para personalización de prendas y selección de bordados.
- **Selector de bordados**: Modal flotante para elegir bordado.
- **Contacto**: Información de contacto y enlaces a redes sociales.
- **Despliegue en GitHub Pages**: Script automático para build y deploy.
- **Navegación SPA**: Navegación por hash compatible con GitHub Pages.
- **Responsive**: Adaptado a móvil, tablet y escritorio. Carrusel táctil en móvil.
- **Botones del carrusel**: Ocultos en móvil, visibles en escritorio.
- **Google Analytics**: Integración para seguimiento de visitas.
- **API de bordados**: Mock local y ejemplo de API real con Express.
- **CI/CD**: Workflow básico de GitHub Actions para correr tests en cada push.

## Estructura del proyecto

- `src/components/` - Componentes reutilizables (Header, Footer, Carrusel, Cesta, etc.)
- `src/pages/` - Páginas principales (CestaResumen, etc.)
- `src/services/` - Servicios y APIs (mock y real)
- `src/store/` - Estado global con Zustand
- `src/styles/` - Estilos personalizados
- `public/imagen/` - Imágenes usadas en la web
- `.github/workflows/ci.yml` - CI con GitHub Actions
- `deploy-gh-pages.sh` - Script de despliegue automático

## Instalación y uso

1. Clona el repositorio
2. Instala dependencias: `npm install`
3. Ejecuta en local: `npm run dev`
4. Build de producción: `npm run build`
5. Despliegue en GitHub Pages: `npm run deploy`

## Notas técnicas

- Navegación por hash para compatibilidad total con GitHub Pages.
- Los botones del carrusel usan `window.setActiveSection` para navegación fluida.
- El login usa variables de entorno para valores por defecto (no visibles en el repo).
- El carrusel es táctil en móvil y oculta los botones de desplazamiento.
- El código está modularizado y optimizado para fácil mantenimiento.

---

Desarrollado por Sofi Confecciones · 2025
