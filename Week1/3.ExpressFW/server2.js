var express = require('express'),
    morgan = require('morgan');

const hostname = 'localhost',
    port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public')); //anything from the public folder can be accessed directly by the user

app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/ `);
});
