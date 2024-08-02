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
  console.log(`The ${this.type} rabbit says '${line}'`);
}

let whiteRabbit = { type: "white", speak };
let hungryRabbit = { type: "hungry", speak };

console.log("Methods:");
whiteRabbit.speak("Oh my fur and whiskers");
hungryRabbit.speak("Got any carrots?");

// When a function is called as a method - the binding called "this" in its body automatically points to the object on which it was called

console.log("Using the function's call method:");
speak.call(whiteRabbit, "Hurry");

// Arrow functions do not bind a this but can see the "this" of the scope around them

let finder = {
  find(array) {
    return array.some((v) => v == this.value);
  },
  value: 5,
};
console.log("Finder w/ arrow function: ");
console.log(finder.find([4, 5]));

//*Prototypes*
//- Prototypes: an object that defines a set of default properties
// Use object.create to create an object with a specific prototype
newSection();

console.log("Prototypes: ");
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
  },
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
ArchaicRabbit.prototype.speak = function (line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};
let oldSchoolRabbit = new ArchaicRabbit("old school");

console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
console.log(Object.getPrototypeOf(killerRabbit) == Rabbit.prototype);

let object = new (class {
  getWord() {
    return "hello";
  }
})();
newSection();

//Private Properties:
// - Private Properties: properties and methods for internal use that are not part of the interface.
// -- to declare a private property, put a # in front of its name
// -- These methods can only be called inside the class declaration that defines them
// Private properties MUST be declared in the class declaration to be available at all
class SecretiveObject {
  #getSecret() {
    return "I ate all the plums";
  }
  interrogate() {
    let shallISayIt = this.#getSecret();
    return "never";
  }
}

class RandomSource {
  #max;
  constructor(max) {
    this.#max = max;
  }
  getNumber() {
    return Math.floor(Math.random() * this.#max);
  }
}
newSection();

//*Overriding Derived Properties*
// - When you add a property to an object, the property is added to the object itself
// - If there was already a property with the same name in the prototype, this property will no longer affect the object, its hidden behind the object's own property.

console.log("Overriding Dereived Properties");
Rabbit.prototype.teeth = 'small';
console.log(killerRabbit.teeth);
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
console.log((new Rabbit("basic")).teeth);
console.log(Rabbit.prototype.teeth);

// - Overriding can be used to express exceptional properties in instances of a more generic class of objects while letting the nonexceptional objects take a standard value from their prototype

newSection();

// **MAPS**
// - MAP (noun) data structure that associates value (the keys) with other values.
// - For example, you might want to map names to ages

console.log("MAPS")
let ages = {
  Boris: 39,
  Liang: 22,
  Julia: 62
};

console.log(`Julia is ${ages['Julia']}`);
console.log("Is Jack's age known?", "Jack" in ages);
console.log("Is toString's age known?", "toString" in ages);

// - Object's property names are the people's names and the property values are their ages.
// - Using plain objects as maps is dangerous. There are several ways to avoid this problem
// - - 1) create objects with NO prototype. Pass null to object.create, the object will not derive from Object.prototype and can be used safely as map

console.log("toString" in Object.create(null));

// - - Object property names must be strings. If you need a map who's keys can't easily be converted to strings - such as objects - you cannot use an object as your map
// JavaScript comes with a class called Map that is written for this purpose. It stores a mapping and allows any type of keys

let ages_2 = new Map();
ages_2.set("Boris", 39);
ages_2.set("Liang", 22);
ages_2.set("Julia", 62);
console.log(`Júlia is ${ages_2.get("Júlia")}`);
console.log("Is Jack's age known?", ages_2.has("Jack"));
console.log(ages_2.has("toString"));

// - The methods set, get, and has are part of the interface of the Map object. 
// - If you have a plain object that you need to treat as a map, Object.keys returns only an object's OWN keys, not those in the prototype.
// - As an alternative, you can use the Object.hasOwn function, which ignore's the objects prototype.

console.log(Object.hasOwn({x: 1}, "x"));
console.log(Object.hasOwn({x: 1}, "toString"));

newSection();
console.log("POLYMORPHISM");

// - When you call the String function on an object, it will call the toString method to try and create a meaningful string from it.
// - We can write our own toString to create a string that contains more useful information

Rabbit.prototype.toString = function() {
  return `a ${this.type} rabbit`;
}
console.log(String(killerRabbit));

// **Polymorphism** - When a piece of code is written to work with objects, any kind of object that happens to support this interface can be plugged into the code and will be able to work with it.
// Polymorphic code can work with values of different shapres, as long as they support the interface it expects
newSection();
console.log("GETTERS, SETTERS, AND STATIC");

// - Interfaces often contain plain properties, not just methods
// - - Map objects have a size property that tells you how many keys are stored in them.
// **Getters** - a method call within a property. Defined by writing get in front of the method name in an object expression or class declaration

let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  }
};

console.log(varyingSize.size);
console.log(varyingSize.size);

// - whenever someone reads from this object's size property, the associated method is called.
// - you do a similar thing when a property is written to, using a **setter**

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log("Convert 22 celsius to fahrenheit: ");
console.log(temp.fahrenheit);
console.log("Convert 86 fahrenheit to celsius: ")
temp.fahrenheit = 86;
console.log(temp.celsius);

// - Temperature class allows you to read and write the temperature in either celsius or fahrenheit, but only stores celsius.
// - Sometimes you want to attach some properties directly to your constructor function rather than the prototype. You won't be able to have access to a class instance but those methods can be used to provide additional ways to create instances (how?)
// - Inside a class declaration, methods or properties that have static written before their name are stored on the constructor.
// - - the Temperature class allowed you to write Temperature.fromFahrenheit(100) to create a temperature using F

let boil = Temperature.fromFahrenheit(212);
console.log(`Boiling in celsius: ${boil.celsius}`);
newSection();
console.log("SYMBOLS");

// - for/of cna loop over several kinds of data structures. This is another case of polymorphism
// - We can add this interface to our own objects
// - It's possible for multiple interfaces to use the same property name for different things. (i.e. Array uses length, but a hiking trail object could also use length to describe something else)
// - For iteration protocol, designers needed something that really doesn't conflict with any other property. Symbols were added in 2015.
// **Symbol** - Property created with Symbol function instead of string. 
// - Unlike strings, newly created symbols are unique, you cannot create the same symbol twice

let sym = Symbol("name");
console.log(sym == Symbol("name"));
Rabbit.prototype[sym] == 55;
console.log(killerRabbit[sym]);

// - Being both unique and usable as property names makes symbols suitable for defining interfaces that can peacefully live alongside other properties, no matter what their names are

const length = Symbol("length");
Array.prototype[length] = 0;

console.log([1, 2].length);
console.log([1, 2][length]);

//it is possible to include symbol properties in object expressions and classes by using square brackets around the property name.

let myTrip = {
  length: 2,
  0: "Lankwitz",
  1: "Babelsburg",
  [length]: 21500
};
console.log(myTrip[length], myTrip.length);

newSection();
console.log("THE ITERATOR INTERFACE");

// - The object given to a for/of loop is expected to be iterable. This means it has a method with the Symbol.iterator symbol.
// - When called, that method should return an object that provides a second interface, iterator.
// - This is the thing that iterates, has a next method that returns the next result. That result is an object with a value property that provides the next value (if there is one), or done (if not).
// - Next, value, and done property names are plain strings.

let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
console.log(okIterator.next());
console.log(okIterator.next());

class List {
  constructor(value, rest) {
    this.value = value;
    this.rest = rest;
  }
  get length() {
    return 1 + (this.rest ? this.rest.length : 0);
  }
  static fromArray(array) {
    let result = null;
    for (let i = array.length - 1; i >= 0; i--) {
      result = new this(array[i], result);
    }
    return result;
  }
}

class ListIterator {
  constructor(list) {
    this.list = list;
  }

  next() {
    if (this.list == null) {
      return {done: true};
    }
    let value = this.list.value;
    this.list = this.list.rest;
    return {value, done: false};
  }
}

List.prototype[Symbol.iterator] = function() {
  return new ListIterator(this);
};

let list = List.fromArray([1,2,3]);
for (let element of list) {
  console.log(element);
}

// SOMETHING HERE BREAKS AND IM NOT QUITE SURE WHAT

newSection();
console.log("INHERITANCE");

// - JavaScript's prototype system makes it possible to create a new class, much like the old class, but with new definition for some of its properties.
// - The prototype for the new class derives from the old class, but adds a new definition for properties. This is called **inheritance**
// The new class inherits properties and behavior from the old class

class LengthList extends List {
  #length;

  constructor(value, rest) {
    super(value, rest);
    this.#length = super.length;
  }
  get length() {
    return this.#length;
  }
}

console.log(LengthList.fromArray([1,2,3]).length);

// - The use of the word extends indicates that this class shouldn't directy be based on the default Object prototype, but on some other class.
// - - This is the superclass. Derived class is the subclass
// - Initializing, LengthList constructor called the constructor of its superclass through the super keyword.
// - Constructor then stores length list in a private property. #length is now filled out, when it wasn't before
// - Inheritance allows us to build slightly different data types from existing data types with relatively little work. Controversial because encapsulation and polymorphism separate, while inheritance causes tangle.

newSection();
console.log("THE INSTANCEOF OPERATOR");

// - It's occasionally useful to know whether an object was derived from a specific class. JavaScript has a binary operator called instanceof

console.log(
  new LengthList(1, null) instanceof LengthList
);
console.log(new LengthList(2, null) instanceof List);
console.log(new List(3, null) instanceof LengthList);
console.log([1] instanceof Array);

// - The operator will see through inherited types, so a LengthList is an instance of List. Almost every object is an instance of Object.

newSection();
console.log("SUMMARY");

// - Objects hold more than just their own properties. They habve prototypes, which are other objects.
// - Simple objects have Object.prototype as their prototype
// - Constructors, whose names usually start with a capital letter, can be used with the new operator to create new objects.
// - There's a class notation that provides a clear way to define a constructor and its prototype.
// - You can definte getters and setters to secretly call methods every time and object's property is accessed. 
// - Static methods are stored in the class's constructor rather than its prototype.
// - instanceof tells you whether or not an object is an instance of that constructor.
//

//Making my life easier
function newSection() {
  return console.log("------------------------\n \n");
}

function newLine() {
  return console.log("\n");
}
