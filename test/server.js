var http       = require('http');
var fs         = require('fs');
var browserify = require('browserify');
var hyperquest = require('hyperquest');

http.createServer(function(q, r) {
  if (q.url === '/favicon.ico') {
    r.writeHead(200, {'content-type': 'image/x-icon'} );
    r.end();
    return;
  }

  if (q.url === '/bundle.css') {
    r.writeHead(200, {'content-type': 'text/css'});
    fs.createReadStream('./test/bundle.css').pipe(r);
  }

  if (q.url === '/background.png') {
    r.writeHead(200, {'content-type': 'image/png'});
    hyperquest('https://dl.dropboxusercontent.com/u/11380518/color-picker-backdrop.png').pipe(r);
  }

  if (q.url === '/bundle.js') {
    r.writeHead(200, {'content-type': 'application/x-javascript'});
    browserify()
      .add('./test/picker.js')
      .bundle()
      .pipe(r);
    return;
  }

  if (q.url === '/') {
    fs.createReadStream('./test/server.html').pipe(r);
  }
}).listen(3000);

console.log('Running http://localhost:3000');
