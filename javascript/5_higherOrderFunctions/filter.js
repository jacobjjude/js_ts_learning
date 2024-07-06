const SCRIPTS = require('./scripts');

function filter(array, test) {
    let passed = [];
    for (let element of array) {
        if (test(element)) {
            passed.push(element);
        }
    }
    return passed;
}

function map(array, transform) {
    let mapped = [];
    for (let element of array) {
        mapped.push(transform(element));
    }
    return mapped;
}

console.log(filter(SCRIPTS, script => script.living));
let rtlscripts = SCRIPTS.filter(s => s.direction == "rtl");
console.log(map(rtlscripts, s => s.name));
