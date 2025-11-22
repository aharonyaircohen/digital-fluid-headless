import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";

dotenv.config();

const target = process.env.VITE_WPGRAPHQLEndpoint || process.env.VITE_WPGRAPHQL_ENDPOINT;
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isProd ? "/app/" : "",
  plugins: [tailwindcss({ config: "./tailwind.config.ts" }), react()],
  server: {
    port: 5173,
    host: "0.0.0.0",
    allowedHosts: ["tdr-fed-dev.onrender.com"],
    proxy: target
      ? {
        "/graphql": {
          target,
          changeOrigin: true,
          secure: false,
        },
      }
      : undefined,
  },
});
