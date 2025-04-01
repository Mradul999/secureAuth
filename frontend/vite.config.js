import { defineConfig } from "vite";

import dotenv from "dotenv";

dotenv.config();

import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: import.meta.VITE_API_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [tailwindcss()],
});
