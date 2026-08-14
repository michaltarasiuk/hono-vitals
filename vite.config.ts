import build from '@hono/vite-build/bun'
import adapter from '@hono/vite-dev-server/bun'
import honox from 'honox/vite'
import {type CSSOptions, defineConfig} from 'vite'

export default defineConfig(({command, mode}) => {
  const css: CSSOptions = {
    transformer: 'lightningcss',
    lightningcss: {
      drafts: {
        customMedia: true,
      },
    },
  }

  if (mode === 'client') {
    return {
      css,
      publicDir: false,
      resolve: {
        alias: {
          '@': import.meta.dirname,
        },
      },
      build: {
        rollupOptions: {
          input: [
            './app/client.ts',
            './app/styles/global.css',
            './app/scripts/metric/cls-observer.ts',
            './app/scripts/metric/fcp-observer.ts',
            './app/scripts/metric/inp-observer.ts',
            './app/scripts/metric/lcp-observer.ts',
            './app/scripts/metric/ttfb-observer.ts',
          ],
        },
        manifest: true,
      },
    }
  }
  return {
    css,
    // Avoid `publicDir: false`: Vite resolves that to "" and @hono/vite-build
    // would scan the repo root for serveStatic paths. Copy is handled by
    // `cp -r public dist/public` after build.
    publicDir: 'public',
    // Keep real process.env only in the production SSR bundle (honox#307).
    // Do not apply in dev: @vite/client loads env.mjs in the browser and would
    // evaluate `process.env` from this define, causing ReferenceError.
    ...(command === 'build' ? {define: {'process.env': 'process.env'}} : {}),
    resolve: {
      alias: {
        '@': import.meta.dirname,
      },
    },
    ssr: {
      external: [
        'react',
        'react-dom',
        'use-sync-external-store',
        'waddler',
        'waddler/duckdb-neo',
        '@duckdb/node-api',
        '@duckdb/node-bindings',
      ],
    },
    build: {
      copyPublicDir: false,
    },
    plugins: [
      honox({
        devServer: {
          adapter,
        },
      }),
      build({
        staticRoot: './dist',
      }),
    ],
  }
})
