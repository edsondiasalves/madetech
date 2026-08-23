import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
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
        'bestgym/index': resolve(__dirname, 'bestgym/index.html'),
        'best-gym/index': resolve(__dirname, 'best-gym/index.html'),
        'scrutinium/index': resolve(__dirname, 'scrutinium/index.html'),
        'smas/index': resolve(__dirname, 'smas/index.html')
      }
    }
  }
});
