import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      // "@assets": path.resolve(__dirname, "src/assets"),
      "@models": path.resolve(__dirname, "src/models"),
      "@utils": path.resolve(__dirname, "src/utils"),
      // "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
});
