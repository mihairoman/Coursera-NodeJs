var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost',
    port = 3000;

var server = http.createServer(function(req, res) {
    console.log('Request for ' + req.url + ' by method ' + req.method);
    if (req.method == 'GET') {
        var fileUrl,
            filePath,
            fileExt;
        if (req.url == '/') {
            fileUrl = '/index.html'
        } else {
            fileUrl = req.url;
        }
        filePath = path.resolve('./public' + fileUrl);
        fileExt = path.extname(filePath);
        if (fileExt == '.html') {
            fs.exists(filePath, function(exists) {
                if (!exists) {
                    res.writeHead(404, {
                        'Content-Type': 'text/html'
                    });
                    res.end('<h1>Error 404: ' + fileUrl + ' not found</h1>');
                    return;
                }
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            res.end('<h1>Error 404: ' + fileUrl + ' not an html file</h1>');
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>Error 400: ' + req.method + ' not supported</h1>');
    }
});

server.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/ `);
});
