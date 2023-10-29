import path from 'path';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import mockDevServerPlugin from 'vite-plugin-mock-dev-server';
import svgr from 'vite-plugin-svgr';

function manualChunks(id: string) {
  if (id.includes('node_modules')) {
    return 'vendor';
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isTest = mode === 'test';

  return {
    plugins: [
      react({
        babel: {
          babelrc: false,
          configFile: false,
          plugins: ['antd-style'],
        },
      }),
      checker({ typescript: true }),
      svgr({
        svgrOptions: {
          icon: true,
          svgoConfig: {
            plugins: ['prefixIds'],
          },
        },
      }),
      mockDevServerPlugin(),
    ],
    server: {
      host: 'practice.com',
      port: 3000,
      open: true,
      proxy: {
        '^/api': 'localhost:3001',
      },
    },
    css: {
      postcss: {
        plugins: [autoprefixer],
      },
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src'),
        },
        {
          find: '~/',
          replacement: path.resolve(__dirname, 'node_modules'),
        },
      ],
    },
    build: {
      minify: command === 'build' ? 'esbuild' : false,
      terserOption: {
        drop_console: !isTest,
      },
      rollupOptions: {
        external: ['styled-components'],
        output: {
          manualChunks,
        },
      },
    },
    sourcemap: true,
    envDir: path.resolve(__dirname, '.env'),
  };
});
