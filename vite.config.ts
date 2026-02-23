import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/5.3.3.Routes_Layout_Link_useMatch/",
  server: {
    proxy: {
      "/api": {
        target: "https://api.hh.ru",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
