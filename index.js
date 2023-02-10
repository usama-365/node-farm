const http = require("node:http");
const url = require("node:url");

const PORT = 8000;
const HOST = "127.0.0.1";

const server = http.createServer((req, res) => {
    const path = req.url;
    switch (path) {
        case "/overview":
        case "/":
            res.end("This is the OVERVIEW");
            break;
        case "/product":
            res.end("This is the PRODUCT");
            break;
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