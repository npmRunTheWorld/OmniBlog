import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import VueIconsResolver from "@kalimahapps/vue-icons/resolver";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: "**/*.vue",
    }),
    vueJsx(),
    AutoImport({
      imports: ["vue"],
      dirs: ["src/stores/"],
    }),
    Components({
      dirs: ["src/components/", "src/views/"],
      resolvers: [VueIconsResolver],
    }),
  ],
  esbuild: {
    drop: ["console", "debugger"],
  },
  optimizeDeps: {
    include: ["quill"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/variables.scss";@import "@/assets/styles/standardMixin.scss";`,
      },
    },
  },
});
