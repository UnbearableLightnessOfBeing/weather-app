import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
    },

    base: "/weather-app",

    plugins: [
        vue(),
        Components({
            dts: true,
            dirs: ["./src/components", "./src/layouts"],
        }),
        AutoImport({
            dts: true,
            imports: "vue",
        }),
    ],
});
