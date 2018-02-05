const http = require('http');

const public = require('./routes/public');

http.createServer((req, res) => {
    if (req.url.match(/\.(html|css|js|png)$/)) {
        public(req, res);
    } else if (req.url === '/') {

    } else if (req.url.startsWith('/search')) {

    } else {

    }
}).listen(3000, () => console.log('Server is working'));