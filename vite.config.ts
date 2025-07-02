import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import path from "path";

const resolvePath = (relPath: string) => path.join(__dirname, relPath);

export default defineConfig({
  base: "./",
  plugins: [react(), mkcert()],
  resolve: {
    alias: {
      src: resolvePath("src"),
    },
  },
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    include: ["./src/**/*.test.ts?(x)"],
  },
});
