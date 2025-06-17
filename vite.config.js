import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  base: '/tienda-uniformes/',

  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'imagen', dest: '' }
      ]
    })
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    globals: true,
    coverage: {
      reporter: ['text', 'html'],
      include: [
        'src/components/Contacto.jsx',
        'src/components/LoginForm.jsx',
        'src/__tests__/Contacto.test.jsx',
        'src/__tests__/LoginForm.test.jsx'
      ],
    },
  },
});
