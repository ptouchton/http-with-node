const http = require('http');

const server = http.createServer();
server.on('request', (request, response) => {
  console.log(request.method, request.url);
});

server.listen(8080);
