const http = require('http');
const fs = require('fs');
const url = require('url');

const data=fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8') 
const dataObj = JSON.parse(data);

// Create an HTTP server
const server = http.createServer((req, res) => {
    const pathName = req.url;

    // overview page
    if(pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<h1>Welcome to the Overview Page</h1>');

    // API page
    }else if(pathName === '/api'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);

    // Product page
    } else if(pathName === '/product') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<h1>Welcome to the Product Page</h1>');

    // Not Found page
    }else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>Page Not Found</h1>');
    } 
});
server.listen(3000, () => {
    console.log('Server is running on port 3000'); 
});