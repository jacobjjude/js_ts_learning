// let re1 = new RegExp("abc");
// let re2 = /abc/;

console.log(/abc/.test("abcde"));
console.log(/abc/.test("abxde"));
console.log(/[0123456789]/.test("in 1992"));
console.log(/[0-9]/.test("in 1992"));

let dateTime = /\d\d-\d\d-\d\d\d\d/;
console.log(dateTime.test("01-30-2003 15:20"));
console.log(dateTime.test("30-jan-2003 15:20"));

let nonBinary = /[^01]/;
console.log(nonBinary.test("1000101101100101"));
console.log(nonBinary.test("00111010201001"));

console.log(/\p{L}/u.test("α"));
// → true
console.log(/\p{L}/u.test("!"));
// → false
console.log(/\p{Script=Greek}/u.test("α"));
// → true
console.log(/\p{Script=Arabic}/u.test("α"));
// → false
let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));
// → true
console.log(neighbor.test("neighbor"));
// -> true

let cartoonCrying = /boo+(hoo+)+/i;
//i makes it case-insensitive
console.log(cartoonCrying.test("Boohoooohoohoo"));

let match = /\d+/.exec("one two 100");
console.log(match);
console.log(match.index);

let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));