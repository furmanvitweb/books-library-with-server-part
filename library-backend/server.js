const http = require('http');

const public = require('./routes/public');
const home = require('./routes/home');
const search = require('./routes/search');
const notFound = require('./routes/not-found');

http.createServer((req, res) => {
    if (req.url.match(/\.(html|css|js|png)$/)) {
        public(req, res);
    } else if (req.url === '/') {
        home(req, res);
    } else if (req.url.startsWith('/search')) {
        search(req, res);
    } else {
        notFound(req, res);
    }
}).listen(3000, () => console.log('Server is working'));