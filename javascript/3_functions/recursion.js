function isEven (num) {
    if (num >= 0) {
        let checkNum = num;
        
        if (checkNum == 0) {
            console.log(true);
            return true;
        } else if (checkNum == 1) {
            console.log(false);
            return false;
        } else {
            isEven(checkNum - 2);
        }
    } else {
        console.log("Sorry, this only works with positive integers right now.")
        return false;
    }
}

isEven(50);
isEven(75);
isEven(-1);