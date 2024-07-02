let startingArray = [1,2,3];

function reverseArray(array) {
    return array.reverse();
}

function reverseArrayInPlace(array) {
    array = array.reverse();
}

console.log(startingArray);
reverseArrayInPlace(startingArray);
console.log(startingArray);