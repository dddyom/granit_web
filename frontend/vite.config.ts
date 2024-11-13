import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    host: true,
    port: 9100,
  },
  plugins: [react()],
});
