const { createServer } = require('http');
const { readFileSync, existsSync } = require('fs');
const { join, extname, normalize } = require('path');
const { parse } = require('url');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const DIST_DIR = join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

const server = createServer((req, res) => {
  try {
    // Parse URL and remove query string
    const parsedUrl = parse(req.url || '/', true);
    let pathname = decodeURIComponent(parsedUrl.pathname || '/');
    
    // Normalize path to prevent directory traversal
    pathname = normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
    
    // Determine file path
    let filePath = pathname === '/' 
      ? join(DIST_DIR, 'index.html')
      : join(DIST_DIR, pathname);
    
    // Security: prevent directory traversal
    const resolvedPath = normalize(filePath);
    if (!resolvedPath.startsWith(normalize(DIST_DIR))) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }

    // If file doesn't exist and has no extension, try index.html (for directories)
    if (!existsSync(filePath) && !extname(filePath)) {
      const indexPath = join(filePath, 'index.html');
      if (existsSync(indexPath)) {
        filePath = indexPath;
      }
    }

    // If still doesn't exist, serve index.html (SPA fallback)
    if (!existsSync(filePath)) {
      filePath = join(DIST_DIR, 'index.html');
    }

    // Read and serve file
    const content = readFileSync(filePath);
    const ext = extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    // Set cache headers for static assets
    const cacheControl = ext === '.html' 
      ? 'no-cache, no-store, must-revalidate'
      : 'public, max-age=31536000, immutable';
    
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
    });
    res.end(content);
  } catch (error) {
    console.error('Server error:', error);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

