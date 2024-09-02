import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      exclude: [
        "**/node_modules/**",
        "./build",
        "vite.config.ts",
        "app.ts",
        "server.ts",
        "**/@types",
      ],
    },
    environmentMatchGlobs: [["src/http/controllers/**", "prisma"]],
    server: {
      deps: {
        external: ["vite-tsconfig-paths"],
      },
    },
  },
});
