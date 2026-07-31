import build from "@hono/vite-build/bun";
import adapter from "@hono/vite-dev-server/bun";
import honox from "honox/vite";
import { CSSOptions, defineConfig } from "vite";

export default defineConfig(({ command, mode }) => {
  const css: CSSOptions = {
    transformer: "lightningcss",
    lightningcss: {
      drafts: {
        customMedia: true,
      },
    },
  };

  if (mode === "client") {
    return {
      css,
      resolve: {
        alias: {
          "@": import.meta.dirname,
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
    css,
    publicDir: false,
    // Keep real process.env only in the production SSR bundle (honox#307).
    // Do not apply in dev: @vite/client loads env.mjs in the browser and would
    // evaluate `process.env` from this define, causing ReferenceError.
    ...(command === "build"
      ? { define: { "process.env": "process.env" } }
      : {}),
    resolve: {
      alias: {
        "@": import.meta.dirname,
      },
    },
    ssr: {
      external: [
        "react",
        "react-dom",
        "use-sync-external-store",
        "waddler",
        "waddler/duckdb-neo",
        "@duckdb/node-api",
        "@duckdb/node-bindings",
      ],
    },
    plugins: [
      honox({
        client: {
          input: ["/app/client.ts", "/app/styles/global.css"],
        },
        devServer: {
          adapter,
        },
      }),
      build(),
    ],
  };
});
