import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: false,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        bestgym: resolve(__dirname, 'bestgym-details.html'),
        scrutinium: resolve(__dirname, 'scrutinium-details.html')
      }
    }
  }
});
