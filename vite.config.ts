import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/vitest.setup.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html", "clover", "json", "json-summary"],
      include: ["src/**/*.?(c|m)[jt]s?(x)"],
      exclude: ["src/utils/graphql/types", "src/main.tsx"],
    },
  },
});
