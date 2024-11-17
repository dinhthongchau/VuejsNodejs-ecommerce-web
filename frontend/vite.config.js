import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  // Lấy VITE_URL từ env hoặc dùng giá trị mặc định
  const Url_1 = env.VITE_URL || 'http://localhost:3300';

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/api': {
          target: Url_1,
          changeOrigin: true
        },
        '/public': {
          target: Url_1,
          changeOrigin: true
        }
      }
    }
  };
});
