import build from "@hono/vite-build/bun";
import adapter from "@hono/vite-dev-server/bun";
import honox from "honox/vite";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      resolve: {
        alias: {
          "@": root,
        },
      },
      build: {
        rollupOptions: {
          input: ["./app/client.ts"],
        },
        manifest: true,
        emptyOutDir: false,
      },
    };
  }
  return {
    resolve: {
      alias: {
        "@": root,
      },
    },
    ssr: {
      external: ["react", "react-dom"],
    },
    plugins: [
      honox({
        devServer: { adapter },
      }),
      build(),
    ],
  };
});
