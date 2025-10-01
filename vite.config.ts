import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, '.'), // project root
  plugins: [
    createHtmlPlugin({
      minify: false, // optional: don’t minify HTML in dev
    }),
  ],
  server: {
    port: 8080,
    strictPort: true,
    hmr: {
      overlay: true, // keep red error overlay; set false to disable
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // adjust if you have a src folder
    },
  },
});
