const prompt = require('prompt-sync')();

function greet() {
    let num1 = parseInt(prompt("Enter the first number: "));
    let num2 = parseInt(prompt("Enter the second number: "));
    console.log(typeof num1, typeof num2);

    console.log(mathMin(num1, num2));
}

function mathMin(num1, num2) {
    let numArray = [];

    if (typeof num1 == "number") {
        numArray.push(num1);
    }
    
    if (typeof num2 == "number") {
        numArray.push(num2);
    }

    if (numArray.length > 0) {
        let minNumber = Math.min(...numArray);
        return minNumber;
    } else {
        return "You did not provide two numbers"
    }
}

greet();