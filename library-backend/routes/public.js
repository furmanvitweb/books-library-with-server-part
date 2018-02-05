const fs = require('fs');
const path = require('path');

function public(req, res) {
    const extension = path.extname(req.url); // /css/app.css -> .css
    const filename = req.url.slice(1); // /css/app.css -> css/app.css
    let contentType = '';
    switch (extension) {
        case '.html':
            contentType = 'text/html';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/js';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        default: 
            contentType = 'text/plain';
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);

    const stream = fs.createReadStream(path.resolve('public', filename));

    stream.pipe(res);
    stream.on('error', error => {
        if (error.code === 'ENOENT') {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        } else {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(error.message);
        }
    });


}

module.exports = public;