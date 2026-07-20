import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  // Served at the site root. If deploying to a project GitHub Pages URL
  // without a custom domain, change this to '/Corevia-Netowrk-Website/'.
  // Asset/iframe paths use import.meta.env.BASE_URL, so they follow this.
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
