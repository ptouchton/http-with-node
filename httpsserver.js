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

    if (request.method === 'GET' && parsedUrl.pathname === '/metadata') {
        const { id } = parsedUrl.query;
        const metadata = services.fetchImageMetadata(id);
        response.writeHead(200, {
            'X-Powered-By': 'Node',
            'Content-Type': 'application/json'
        });
        const serializedJson = JSON.stringify(metadata);
        response.write(serializedJson);
        response.end();
    } else if (request.method === 'POST' && parsedUrl.pathname === '/users') {
        jsonBody(request, response, (err, body) => {
            if (err) {
                console.log(err);
            } else {
                services.createUser(body['userName']);
            }
        });
    } else {
        response.writeHead(404, {
            'X-Powered-By': 'Node'
        });
        response.end();
    }
});

server.listen(443);