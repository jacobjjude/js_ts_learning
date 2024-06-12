const prompt = require('prompt-sync')();

function greet() {
    let rows = prompt("How many rows?: ");

    if (rows % 2 == 0) {
        console.log("Generating your chessboard...");
        chessBoard(rows);
    } else if (rows % 2 !== 0) {
        console.log("Please choose an even number");
        greet();
    } else {
        console.log("idk how you managed to get here, but just gonna send you back");
        greet();
    }
}

function chessBoard(count) {
    for (let i = 1; i <= count; i++) {
        if (i % 2 == 0) {
            console.log(evenLine(count));
        } else {
            console.log(oddLine(count));
        }
    }
}

function oddLine(count) {
    let line = "";
    for (let i = 0; i < count; i++) {
        if (i % 2 == 0) {
            line += "_";
        } else {
            line += "#";
        }
    }

    return line;
}

function evenLine(count) {
    let line = "";
    for (let i = 0; i < count; i++) {
        if (i % 2 == 0) {
            line += "#";
        } else {
            line += "_";
        }
    }

    return line;
}

greet();