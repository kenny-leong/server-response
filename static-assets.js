const http = require('http');
const fs = require("fs");


const getContentType = (extension) => {
  switch (extension) {
    case 'css':
      return 'text/css';
      case 'jpg':
        return 'img/jpg';
    default:
      return 'text/plain';

  }
}



const server = http.createServer((req, res) => {

  if (req.method === 'GET' && req.url.startsWith('/static')) {
    const urlParts = req.url.split('/static');
    console.log('url parts ', urlParts);

    const assetExtension = urlParts[urlParts.length - 1].split('.')[1];
    console.log(assetExtension);


    const resBody = fs.readFileSync('./assets/' + urlParts[urlParts.length - 1]);

    const contentType = getContentType(assetExtension);
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    return res.end(resBody);
  }

  if (req.method === 'GET' && req.url === '/') {
    const index = fs.readFileSync('./index.html');

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/css')
    res.end(index);
  }


});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
