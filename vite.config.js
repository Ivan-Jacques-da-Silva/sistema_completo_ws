import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  // base: '/sistema/',
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "c71e4e0b-924b-4cd6-98f4-162b5e3a3de3-00-3h3j3mtwtorhf.worf.replit.dev"
    ]
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/index.js",
        chunkFileNames: "assets/index.js",
        assetFileNames: "assets/index.css",
      },
    },
  },
  plugins: [react()],
});
