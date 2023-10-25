import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import svgr from "vite-plugin-svgr";
import ImportMetaEnvPlugin from "@import-meta-env/unplugin";

const host = process.env.HOST || true;
const port = +(process.env.PORT || 80);
const projectRoot = resolve(__dirname, "app");

export default defineConfig(() => {
  return {
    root: "./app",
    server: { host, port },
    preview: { host, port },
    plugins: [
      svgr(),
      react(),
      AutoImport({
        imports: ["vitest"],
        dts: true, // generate Typescript definitions
      }),
      ImportMetaEnvPlugin.vite({
        example: ".env.example",
        env: ".env"
      }),
    ],
    build: {
      outDir: "../build",
      sourcemap: true,
    },
    resolve: {
      alias: {
        "@root": projectRoot,
        "~": projectRoot,
      },
    },
  };
});
