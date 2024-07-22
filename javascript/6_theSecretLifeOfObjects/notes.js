// The Secret Life of Objects

// Object Oriented Programming - set of techniques that use objects as the central principle of program organization

// *Abstract Data Types*
// Main idea in OOP is to use objects or types of objects, as the unit of program organization
//Makes you think about its structure and enforces some kind of discipline
// Abstract Data Type or Object Class - subprogram (may contain arbitrarily complicated code) that exposes a limited set of methods and properties that people working with it are supposed to use.
// - Lets you build with "assembly parts" that will only interact with each other
// Interface - the collection of operations external code can perform on an abstract data type
// Encapsulation - Treated as internal to the type and of no concern to the rest of the program

//*Methods*
// Methods are nothing more than properties that hold function values

function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`)
}

let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

console.log("Methods:")
whiteRabbit.speak("Oh my fur and whiskers");
hungryRabbit.speak("Got any carrots?");

// When a function is called as a method - the binding called "this" in its body automatically points to the object on which it was called

console.log("Using the function's call method:");
speak.call(whiteRabbit, "Hurry");

// Arrow functions do not bind a this but can see the "this" of the scope around them

let finder = {
    find(array) {
        return array.some(v => v == this.value);
    }, value: 5
};
console.log("Finder w/ arrow function: ");
console.log(finder.find([4,5]));

//*Prototypes*
//- Prototypes: an object that defines a set of default properties
// Use object.create to create an object with a specific prototype
newSection();

console.log("Prototypes: ")
let empty = {};
console.log(empty.toString);
console.log(empty.toString());
newLine();
// looks like we just pulled a property out of an empty objects , but toString is a method stored in Object.prototype, meaning its available in most objects

console.log(Object.getPrototypeOf({}) == Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype));
newLine();

//Object.getPrototypeOf returns the prototype of an object.
console.log(Object.getPrototypeOf(Math.max));
console.log(Object.getPrototypeOf([]) == Array.prototype);
newLine();

let protoRabbit = {
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
};
let blackRabbit = Object.create(protoRabbit);
blackRabbit.type = "black";
blackRabbit.speak("I am fear and darkness");
newSection();

//Classes:
// - Class - shape of an object, what methods and properties it has
// - Instance - Object derived from a class
// - Prototypes are useful for defining properties for which all instances of a class share the same value

console.log("Classes: ");
function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
}

// - class keyword starts a class declaration, which allows us to define a constructor and a set of methods together
class Rabbit {
    constructor(type) {
        this.type = type;
    }
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
}

let killerRabbit = new Rabbit("killer");
function ArchaicRabbit(type) {
    this.type = type;
}
ArchaicRabbit.prototype.speak = function(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
    };
let oldSchoolRabbit = new ArchaicRabbit("old school");

console.log(Object.getPrototypeOf(Rabbit) ==
Function.prototype);
console.log(Object.getPrototypeOf(killerRabbit) ==
Rabbit.prototype);

let object = new class { getWord() { return "hello"; } };

//Making my life easier
function newSection() {
    return console.log("------------------------\n \n");
}

function newLine() {
    return console.log("\n");
}