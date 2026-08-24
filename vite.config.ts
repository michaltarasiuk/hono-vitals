import build from '@hono/vite-build/bun';
import adapter from '@hono/vite-dev-server/bun';
import honox from 'honox/vite';
import {defineConfig, type CSSOptions} from 'vite';

export default defineConfig(({mode}) => {
  const css: CSSOptions = {
    transformer: 'lightningcss',
    lightningcss: {
      drafts: {
        customMedia: true,
      },
    },
  };

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
    };
  }
  return {
    css,
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
  };
});
