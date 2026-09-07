import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';

/**
 * Serves /api/admin during local development.
 *
 * In production Vercel runs api/admin.ts as a serverless function. Locally there is no
 * such runtime, so this middleware imports the same handler and mounts it — one
 * implementation, both environments.
 */
function adminApiPlugin(): Plugin {
  return {
    name: 'ochf-admin-api',
    configureServer(server) {
      server.middlewares.use('/api/admin', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'POST only' }));
          return;
        }
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');

          const { handleAdmin } = await server.ssrLoadModule('/api/admin.ts');
          const result = await handleAdmin(body, req.headers.cookie);

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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react(), tailwindcss(), adminApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      rollupOptions: {
        output: {
          // Keep the admin bundle out of the public site's critical path.
          manualChunks: {
            sanity: ['@sanity/client', '@sanity/image-url'],
          },
        },
      },
    },
    // Expose only what the browser legitimately needs. The write token is deliberately
    // NOT here — it stays server-side in api/admin.ts.
    define: {
      __CMS_PROJECT__: JSON.stringify(env.VITE_SANITY_PROJECT_ID ?? ''),
    },
  };
});
