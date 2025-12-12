import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  css: {
    transformer: "postcss",
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7241',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});