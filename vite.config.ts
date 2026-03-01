import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    base: './',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: "Egypt Time Machine",
          short_name: 'EgyptTM',
          description: "Journey through Egypt's history with CameraKit",
          theme_color: '#0f172a',
          background_color: '#0f172a',
          display: 'fullscreen',
          orientation: 'portrait',
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
