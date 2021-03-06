const fs = require('fs');
const path = require('path'); 

function search(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    const stream = fs.createReadStream(path.resolve('public', 'movie.html'));
    
    stream.pipe(res);
}

module.exports = search;