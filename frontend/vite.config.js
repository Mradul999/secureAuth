import { defineConfig } from "vite";
import dotenv from "dotenv";
dotenv.config();
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
});
