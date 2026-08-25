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
      publicDir: false,
      resolve: {
        alias: {
          '@': import.meta.dirname,
        },
      },
      css,
      build: {
        rollupOptions: {
          input: [
            './app/client.ts',
            './app/styles/global.css',
            './app/entries/metric/cls-observer.ts',
            './app/entries/metric/fcp-observer.ts',
            './app/entries/metric/inp-observer.ts',
            './app/entries/metric/lcp-observer.ts',
            './app/entries/metric/ttfb-observer.ts',
          ],
        },
        manifest: true,
      },
    };
  }

  return {
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
    resolve: {
      alias: {
        '@': import.meta.dirname,
      },
    },
    css,
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
  };
});
