import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [react()],
    resolve: {
        alias: {
            assets: path.resolve(__dirname, "./src/assets"),
            components: path.resolve(__dirname, "./src/components"),
            hooks: path.resolve(__dirname, "./src/hooks"),
            layout: path.resolve(__dirname, "./src/layout"),
            pages: path.resolve(__dirname, "./src/pages"),
            routes: path.resolve(__dirname, "./src/routes"),
            store: path.resolve(__dirname, "./src/store"),
            services: path.resolve(__dirname, "./src/services"),
            helpers: path.resolve(__dirname, "./src/helpers")
        }
    }
});
