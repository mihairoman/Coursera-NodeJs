var express = require('express'),
    morgan = require('morgan');

const hostname = 'localhost',
    port = 3000;

var app = express();

app.use(morgan('dev'));

function auth(req, res, next) {
    console.log(req.headers);
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authorized!');
        err.status = 401;
        next(err);
        return;
    }
    //First part of the authHeader includes something like 'Basic', second part
    //includes the encoded string
    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
        next();
    } else {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        console.log(err);
        next(err);
    }
}

app.use(auth);
app.use(express.static(__dirname + '/public')); //anything from the public folder can be accessed directly by the user
app.use(function(err, req, res, next) {
    res.writeHead(err.status || 500, {
        'WWW-Authenticate': 'Basic',
        'Content-Type': 'text/plain'
    });
    res.end(err.message);
});


app.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/ `);
});
