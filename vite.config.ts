import build from "@hono/vite-build/bun";
import adapter from "@hono/vite-dev-server/bun";
import honox from "honox/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
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
    plugins: [
      honox({
        devServer: { adapter },
      }),
      build(),
    ],
  };
});
