var rect = {
    perimeter: function(x, y) {
        return (2 * (x + y));
    },

    area: function(x, y) {
        return (x * y);
    }
}

function solveRect(l, b) {
    if (l < 0 || b < 0) {
        console.log("Rectangle dimensions should be greater than zero.\n" +
            " l = " + l + " and b = " + b);
    } else {
        console.log("The area of a rectangle of dimensions l = " + l +
            " and b = " + b + " is " + rect.area(l, b));
        console.log("The perimeter of a rectangle of dimensions l = " + l +
            " and b = " + b + " is " + rect.perimeter(l, b));
    }
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(-3, 5);
