const http = require('http');
const services = require('./services');
const url = require('url');

const server = http.createServer();
server.on('request', (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  console.log(parsedUrl);
  console.log(request.method);
  if (request.method === 'GET' && parsedUrl.pathname === '/metadata/') {
      const { id } = parsedUrl.query;
      const metadata = services.fetchImageMetadata(id);
      console.log(metadata);
  }  
  
});

server.listen(8080);