let list = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: null
        }
    }
}
let array = [1,2,3];

function arrayToList(array) {
    let returnList = null;

    for (let i = array.length - 1; i >= 0; i--) {
        returnList = { value: array[i], rest: returnList };
    }

    return returnList;
}

function listToArray(list) {
    let array = [];
    let current = list;

    while (current != null) {
        array.push(current.value);
        current = current.rest;
    }

    return array;
}

function prepend(x, list) {
    let newList = {value: x, rest: list};
    return newList;
}

function nth(num, list) {
    if (num == 0) {
        return list.value;
    } else {
        return nth(num - 1, list.rest);
    }
}

function deepEqual(a, b) {
    if (a === b) return true;

    if (a === null || b === null) return false;

    if (typeof a !== "object" || typeof b !== "object") return false;

    let keysA = Object.keys(a);
    let keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }

    return true;
}




console.log(arrayToList(array));
console.log(JSON.stringify(arrayToList(array), null, 2));
console.log(listToArray(list));
console.log(JSON.stringify(prepend(0, list), null, 2));
console.log(nth(1, list));
let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj)); // true
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 })); // true
console.log(deepEqual(obj, { here: { is: "another" }, object: 2 })); // false