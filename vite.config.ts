import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";

dotenv.config();
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isProd ? "/app/" : "",
  plugins: [tailwindcss({ config: "./tailwind.config.ts" }), react()],
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
});
