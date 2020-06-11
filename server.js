const https = require('https');
const services = require('./services');
const url = require('url');
const jsonBody = require("body/json");
const { request } = require('http');
const fs = require('fs');

const server = https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
});
server.on('request', (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  
  if (request.method === 'GET' && parsedUrl.pathname === '/metadata/') {
      const { id } = parsedUrl.query;
      const metadata = services.fetchImageMetadata(id);
      console.log(metadata);
  }  
  
 jsonBody(request, response, (err, body) => {
     if (err) {
         console.log(err)
     }else {
       console.log(body);  
       services.createUser(body['userName'])
     }
     console.log(body);
 })

 response.end('This was served with https!');
});

server.listen(443);