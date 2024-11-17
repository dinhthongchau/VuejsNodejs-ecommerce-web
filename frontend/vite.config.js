// Vite.config.js
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const Url = import.meta.env.VITE_URL;

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: Url,
        changeOrigin: true
      },
      '/public': {
        target: Url,
        changeOrigin: true
      }
    }
  }
});
