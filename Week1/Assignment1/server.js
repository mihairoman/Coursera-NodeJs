const express = require('express'),
    bodyParser = require('body-parser'),
    dishRouter = require('./dishRouter'),
    leaderRouter = require('./leaderRouter'),
    promoRouter = require('./promoRouter');

const hostname = 'localhost',
    port = Number(process.env.PORT || 3000);

var app = express();

app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promotions', promoRouter);
app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});
