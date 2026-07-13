import build from "@hono/vite-build/bun";
import adapter from "@hono/vite-dev-server/bun";
import honox from "honox/vite";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ command, mode }) => {
  if (mode === "client") {
    return {
      resolve: {
        alias: {
          "@": root,
        },
      },
      build: {
        rollupOptions: {
          input: ["./app/client.ts", "./app/styles/global.css"],
        },
        manifest: true,
        emptyOutDir: false,
      },
    };
  }
  return {
    publicDir: false,
    // Keep real process.env only in the production SSR bundle (honox#307).
    // Do not apply in dev: @vite/client loads env.mjs in the browser and would
    // evaluate `process.env` from this define, causing ReferenceError.
    ...(command === "build"
      ? { define: { "process.env": "process.env" } }
      : {}),
    resolve: {
      alias: {
        "@": root,
      },
    },
    ssr: {
      external: [
        "react",
        "react-dom",
        "use-sync-external-store",
        "use-sync-external-store/shim",
        "@clickhouse/client",
      ],
    },
    plugins: [
      honox({
        client: {
          input: ["/app/client.ts", "/app/styles/global.css"],
        },
        devServer: { adapter },
      }),
      build(),
    ],
  };
});
