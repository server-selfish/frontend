import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig((config) => ({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    ...(config.command === "build" ? [nitro({ preset: "bun" })] : []),
    devtools(),
    // this is the plugin that enables path aliases
    // viteTsConfigPaths({
    //   projects: ["./tsconfig.json"],
    // }),

    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
}));

export default config;
