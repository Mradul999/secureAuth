import { defineConfig } from "vite";

import dotenv from "dotenv";

dotenv.config();

import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:7000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [tailwindcss()],
});
