const http = require("node:http");

const PORT = 8000;
const HOST = "127.0.0.1";

const server = http.createServer((req, res) => {
    res.end("Server is working");
});

server.listen(PORT, HOST, () => {
    console.log(`Server is listening on port ${PORT} at host ${HOST}, use URL http://${HOST}:${PORT}`);
});