import build from "@hono/vite-build/bun";
import adapter from "@hono/vite-dev-server/bun";
import honox from "honox/vite";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      define: {
        "process.env": "process.env",
      },
      resolve: {
        alias: {
          "@": root,
        },
      },
      build: {
        rollupOptions: {
          input: ["./app/client.ts", "./app/style.css"],
        },
        manifest: true,
        emptyOutDir: false,
      },
    };
  }
  return {
    publicDir: false,
    define: {
      "process.env": "process.env",
    },
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
          input: ["/app/client.ts", "/app/style.css"],
        },
        devServer: { adapter },
      }),
      build({
        entryContentBeforeHooks: [
          async (appName, options) => {
            const paths = (options?.staticPaths ?? []).filter(
              (path) => path !== "/public/*",
            );
            let code = "import { serveStatic } from 'hono/bun'\n";
            for (const path of paths) {
              code += `${appName}.use('${path}', serveStatic({ root: './' }))\n`;
            }
            return code;
          },
        ],
      }),
    ],
  };
});
