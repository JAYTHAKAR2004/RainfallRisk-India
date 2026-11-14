import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.csv': 'text/csv; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

const RESEARCH_ASSET_PREFIXES = [
  '/outputs/',
  '/outputs_project2/',
  '/Annual_Rainfall_Maps/',
  '/Dataset/',
];

function serveResearchOutputs(): Plugin {
  const rootDir = __dirname;
  const attachMiddleware = (middlewares: { use: Function }) => {
    middlewares.use((req: { url?: string }, res: any, next: () => void) => {
      const reqUrl = (req.url || '').split('?')[0];
      const matchesPrefix = RESEARCH_ASSET_PREFIXES.some((prefix) => reqUrl.startsWith(prefix));
      if (!matchesPrefix) {
        return next();
      }
      const relPath = decodeURIComponent(reqUrl.slice(1));
      const fullPath = path.resolve(rootDir, relPath);
      if (!fullPath.startsWith(rootDir) || !fs.existsSync(fullPath) || fs.statSync(fullPath).isDirectory()) {
        return next();
      }
      const ext = path.extname(fullPath).toLowerCase();
      res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
      if (ext === '.csv') {
        res.setHeader('Content-Disposition', `inline; filename="${path.basename(fullPath)}"`);
      }
      fs.createReadStream(fullPath).pipe(res);
    });
  };

  return {
    name: 'serve-research-outputs',
    configureServer(server) {
      attachMiddleware(server.middlewares);
    },
    configurePreviewServer(server) {
      attachMiddleware(server.middlewares);
    },
  };
}

export default defineConfig({
  plugins: [react(), serveResearchOutputs()],
  server: {
    port: 5173,
    host: true,
  },
});

