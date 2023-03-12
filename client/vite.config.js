import { fileURLToPath, URL } from 'node:url';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

export default defineConfig({
  server: {
    port: 8080,
  },
  preview: {
    port: 5555,
    proxy: {
      '/meals': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '^/images/icons/.*': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),

    VitePWA({
      registerType: 'autoUpdate',
      manifest,
      workbox: {
        mode: 'development',
        runtimeCaching: [
          {
            urlPattern: '/meals',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'max-meals',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 1, // <== 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /.*images\/icons\/*.*.png/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'max-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 1, // <== 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https?:\/\/localhost:3000\/meals/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'meals-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // Cache for 1 day
              },
            },
          },
        ],
      },
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: '../server/client',
    emptyOutDir: false,
  },
});
