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

function reduce(array, combine, start) {
    let  current = start;
    for (let element of array) {
        current = combine(current, element);
    }
    return current;
}

function characterCount(script) {
    return script.ranges.reduce((count, [from, to]) => {
        return count + (to - from);
    }, 0);
}


function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => { return code >= from && code < to; })) {
            return script;
        }
    }
    return null;
}


console.log(filter(SCRIPTS, script => script.living));
let rtlscripts = SCRIPTS.filter(s => s.direction == "rtl");
console.log(map(rtlscripts, s => s.name));

console.log([1,2,3,4].reduce((a , b) => a + b, 0))

console.log(SCRIPTS.reduce((a, b) => {
    return characterCount(a) < characterCount(b) ? b : a;
}));

console.log(characterScript(121));