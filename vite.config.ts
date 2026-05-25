import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Set base to "/" for custom domain, or "/repo-name/" for GitHub Pages project sites.
// Update VITE_BASE_URL in your repo settings or here if deploying to a subdirectory.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
  },
});
