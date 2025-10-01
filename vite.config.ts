import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 8888,
    open: true,
    fs: {
      strict: true, // only serve files from project root
    },
    watch: {
      // ignore node_modules and .git completely in dev mode
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },
  optimizeDeps: {
    // exclude all dependencies inside node_modules from pre-bundling
    exclude: ['**/node_modules/**'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      // prevent Rollup from bundling anything inside node_modules or .git
      external: ['**/node_modules/**', '**/.git/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
