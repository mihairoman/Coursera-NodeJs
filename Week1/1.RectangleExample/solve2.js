var argv = require('yargs')
    .usage('Usage: node $0 --l=[num] --b=[num]')
    .demand(['l','b'])
    .argv; //JS object

var rect = require('./rectangle2');

function solveRect(l, b) {
    rect(l, b, function(err, rectangle) {
        if (err) {
            console.log(err);
        } else {
            console.log("The area of a rectangle of dimensions length = " + l + " and breadth = " + b + " is " + rectangle.area());
            console.log("The perimeter of a rectangle of dimensions length = " + l + " and breadth = " + b + " is " + rectangle.perimeter());
        }
    });
}

solveRect(argv.l, argv.b);
