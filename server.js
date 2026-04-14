const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = 'C:/Users/usEr/Documents/kopi-lampung';
const PORT = 3456;

const mimeTypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'ico': 'image/x-icon'
};

http.createServer((req, res) => {
    let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url);
    // Decode URI
    filePath = decodeURIComponent(filePath);
    try {
        const data = fs.readFileSync(filePath);
        const ext = path.extname(filePath).slice(1).toLowerCase();
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
        res.end(data);
    } catch(e) {
        res.writeHead(404);
        res.end('Not found: ' + filePath);
    }
}).listen(PORT, () => {
    console.log('Server running at http://localhost:' + PORT);
});
