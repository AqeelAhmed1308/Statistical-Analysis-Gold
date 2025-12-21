import path from "path"
import react from "@vitejs/plugin-react-swc" // or "@vitejs/plugin-react" depending on what you installed
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})