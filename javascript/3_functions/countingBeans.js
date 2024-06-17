function countBs(string) {
    let bCount = 0;
    for (let i = 0; i <= string.length - 1; i++) {
        if (string[i] == "B") {
            bCount++;
        }
    }
    return bCount;
}

function countChars(string, char) {
    let charCount = 0;
    for (let i = 0; i <= string.length - 1; i++) {
        if(string[i] == `${char}`) {
            charCount++;
        }
    }

    return charCount;
}

console.log(countBs("bbBbbBBBBbbbBBjfdlsajfbBbbjfdklsa"));
console.log(countChars("jfdlsjaguirhgudjvkksndafkjfjdslafjlska", "j"));