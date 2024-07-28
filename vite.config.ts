import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@models": path.resolve(__dirname, "src/models"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@services": path.resolve(__dirname, "src/services"),
    },
  },
});
