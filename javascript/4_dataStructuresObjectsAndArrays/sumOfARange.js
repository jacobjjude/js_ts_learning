function range(start, end) {
    let range = [];

    for (let i = start; i <= end; i++) {
        range.push(i);
    }

    return range;
}

function sum(array) {
    let answer = 0;
    for (let i = 0; i < array.length; i++) {
        answer = answer + array[i];
    }
    return answer
}

function bonus(start, end, step) {
    let array = [];
    //start at start, end at end.
    //If step is included, increase by that step
    if (step < 0 && start > end) {
        console.log("passed the if")
        for (let i = start; i >= end; i = i + step) {
            console.log("in the for loop");
            array.push(i);
            console.log(i);
        }
    } else {
        for (let i = start; i <= end; i = i + step) {
            array.push(i);
        }
    }
    
    return array;
}

console.log(bonus(5,2,-1));
console.log(bonus(1,16,3));