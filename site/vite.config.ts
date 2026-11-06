import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';

import { ADMIN_ENDPOINT } from './src/admin/endpoint';

/**
 * Serves the dashboard's API during local development.
 *
 * In production the Node app in preview-deploy/ochf-admin-api answers there. Locally
 * this middleware imports the same handler, so there is one implementation for both.
 * The path avoids the word "admin": Namecheap's LiteSpeed blocks `POST /api/admin`.
 */
function adminApiPlugin(): Plugin {
  return {
    name: 'ochf-admin-api',
    configureServer(server) {
      server.middlewares.use(ADMIN_ENDPOINT, async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'POST only' }));
          return;
        }
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');

          const { handleAdmin } = await server.ssrLoadModule('/api/content.ts');
          const result = await handleAdmin(body, req.headers.cookie, { ip: req.socket.remoteAddress ?? 'local' });

          if (result.setCookie) res.setHeader('Set-Cookie', result.setCookie);
          res.statusCode = result.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result.body));
        } catch (err) {
          console.error('[admin-api]', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Server error' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, __dirname, '');

  return {
    root: __dirname,
    envDir: __dirname,
    plugins: [react(), tailwindcss(), adminApiPlugin()],
    resolve: {
      alias: { '@': path.resolve(__dirname, '.') },
    },
    server: { hmr: process.env.DISABLE_HMR !== 'true' },
    build: isSsrBuild
      ? { outDir: 'dist-ssr', emptyOutDir: true }
      : {
          rollupOptions: {
            output: {
              // Keep the CMS client and the dashboard out of the critical path.
              manualChunks: { sanity: ['@sanity/client', '@sanity/image-url'] },
            },
          },
        },
    // The write token is deliberately NOT exposed; it stays server-side in api/content.ts.
    define: { __CMS_PROJECT__: JSON.stringify(env.VITE_SANITY_PROJECT_ID ?? '') },
  };
});
