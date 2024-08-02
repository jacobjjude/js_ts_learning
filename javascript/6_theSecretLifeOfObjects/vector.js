// takes x and y parameters (numbers), that it saves to properties of the
// same name.
// Give the Vec prototype two methods, plus and minus, that take an-
// other vector as a parameter and return a new vector that has the sum or
// difference of the two vectors’ (this and the parameter) x and y values.
// Add a getter property length to the prototype that computes the
// length of the vector—that is, the distance of the point (x, y) from the
// origin (0, 0).

// Writer a class vector that takes two parameters, x and y.
class Vector {
    #length

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.#length = Math.sqrt(Math.abs(Math.pow(this.x, 2)) + Math.abs(Math.pow(this.y, 2)))
    }

    get length() {
        return this.#length;
    }
}

Vector.prototype.plus = function(vec1, vec2) {
    let newX = vec1.x + vec2.x;
    let newY = vec1.y + vec2.y;
    let newVec = new Vector(newX, newY);

    return newVec;
}

Vector.prototype.minus = function(vec1, vec2) {
    let newX = vec2.x - vec1.x;
    let newY = vec2.y - vec1.y;
    let newVec = new Vector(newX, newY);

    return newVec;
}

let x = new Vector(3, 4);
let y = new Vector(1, 1);
console.log(x.x, x.y);

console.log(Vector.prototype);

console.log(x.length);