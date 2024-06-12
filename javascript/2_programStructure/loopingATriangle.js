const prompt = require('prompt-sync')();

var count = prompt("How many rows?");

for (let i = 1; i <= count; i++) {
    console.log('#'.repeat(i));
}