const http = require('http');
const fs = require('fs');
const url = require('url');

const templeteOverview=fs.readFileSync(`${__dirname}/templetes/overview.html`, 'utf-8');
const templeteProduct=fs.readFileSync(`${__dirname}/templetes/product.html`, 'utf-8');
const templeteCard=fs.readFileSync(`${__dirname}/templetes/card.html`, 'utf-8');


const data=fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


 const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
}


// Create an HTTP server
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // overview page
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        
        const cardsHtml = dataObj.map(el => replaceTemplate(templeteCard, el)).join('');
        const output = templeteOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
        res.end(output);

    // API page
    }else if(pathname === '/api'){
        res.writeHead(200, {'Content-type': 'application/json'});
          res.end(data);

    // Product page
    } else if(pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'});
          const product = dataObj[query.id];
          const output = replaceTemplate(templeteProduct, product);
          res.end(output);


    // Not Found page
    }else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>Page Not Found</h1>');
    } 
});
server.listen(3000, () => {
    console.log('Server is running on port 3000'); 
}); 