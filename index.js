const http = require("node:http");
const fs = require("node:fs");
const url = require("node:url");

const PORT = 8000;
const HOST = "127.0.0.1";
const DATA_FILE = `${__dirname}/data/data.json`;
const TEMPLATES_DIR = `${__dirname}/templates`;

const data = fs.readFileSync(DATA_FILE, "utf-8");
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(`${TEMPLATES_DIR}/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${TEMPLATES_DIR}/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${TEMPLATES_DIR}/product.html`, 'utf-8');

const replaceTemplate = function (template, product) {
    let output = template
        .replaceAll('{%PRODUCT_NAME%}', product.productName)
        .replaceAll('{%IMAGE%}', product.image)
        .replaceAll('{%PRICE%}', product.price)
        .replaceAll('{%QUANTITY%}', product.quantity)
        .replaceAll('{%ID%}', product.id)
        .replaceAll('{%FROM%}', product.from)
        .replaceAll('{%NUTRIENTS%}', product.nutrients)
        .replaceAll('{%DESCRIPTION%}', product.description);
    if (!product.organic)
        return output.replaceAll('{%NOT_ORGANIC%}', 'not-organic');
    else
        return output;
};

const server = http.createServer((req, res) => {
    const {pathname, query} = url.parse(req.url, true);
    console.log(pathname, query);
    switch (pathname) {
        // Overview page
        case "/overview":
        case "/":
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            const cardsHTML = dataObj.map(product => replaceTemplate(tempCard, product)).join('');
            const response = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);
            res.end(response);
            break;
        // Product page
        case "/products":
            res.writeHead(200, {
                "Content-type": "text/html"
            })
            const product = dataObj[query.id];
            const output = replaceTemplate(tempProduct, product);
            res.end(output);
            break;
        // API
        case "/api":
            res.writeHead(200, {
                "Content-type": "application/json"
            })
            res.end(data);
            break;
        // 404
        default:
            res.writeHead(404, {
                "Content-type": "text/html"
            });
            res.end("<h1>Page not found</h1>");
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Server is listening on port ${PORT} at host ${HOST}, use URL http://${HOST}:${PORT}`);
});