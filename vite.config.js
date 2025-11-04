import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: false
  },
  server: {
    port: 3000,
    open: true
  }
});
