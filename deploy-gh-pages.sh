#!/bin/bash
# Script para publicar automáticamente el build de Vite en GitHub Pages (rama gh-pages)

set -e

# 1. Generar el build de producción
echo "Construyendo el proyecto..."
npm run build

# 2. Ir a la carpeta dist
echo "Entrando a la carpeta dist..."
cd dist

# 3. Inicializar un nuevo repo git y hacer commit
git init
git add .
git commit -m "Deploy to GitHub Pages"

# 4. Forzar push a la rama gh-pages (reemplaza USUARIO y REPO por los tuyos)
# Obtén la URL del repo automáticamente
# Elimina el remoto origin si ya existe
(git remote remove origin 2>/dev/null || true)
git remote add origin $(git -C .. remote get-url origin)
git branch -M gh-pages
git push -f origin gh-pages

echo "¡Deploy completado! Accede a: https://kuimbae.github.io/tienda-uniformes/"
