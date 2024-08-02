// The standard JavaScript environment provides another data structure
// called Set. Like an instance of Map, a set holds a collection of values.
// Unlike Map, it does not associate other values with those—it just tracks
// which values are part of the set. A value can be part of a set only
// once—adding it again doesn’t have any effect.
// Write a class called Group (since Set is already taken). Like Set, it has
// add, delete, and has methods. Its constructor creates an empty group,
// add adds a value to the group (but only if it isn’t already a member),
// delete removes its argument from the group (if it was a member), and
// has returns a Boolean value indicating whether its argument is a mem-
// ber of the group.
// Use the === operator, or something equivalent such as indexOf, to
// determine whether two values are the same.
// Give the class a static from method that takes an iterable object as
// argument and creates a group that contains all the values produced by
// iterating over it.

// Make the Group class from the previous exercise iterable. Refer to the
// section about the iterator interface earlier in the chapter if you aren’t
// clear on the exact form of the interface anymore.
// If you used an array to represent the group’s members, don’t just
// return the iterator created by calling the Symbol.iterator method on
// the array. That would work, but it defeats the purpose of this exercise.

class Group {
    constructor() {
      this.members = [];
    }
  
    add(value) {
      if (!this.has(value)) {
        this.members.push(value);
      }
    }
  
    delete(value) {
      this.members = this.members.filter(v => v !== value);
    }
  
    has(value) {
      return this.members.includes(value);
    }
  
    static from(collection) {
      let group = new Group();
      for (let value of collection) {
        group.add(value);
      }
      return group;
    }
  
    [Symbol.iterator]() {
      let index = 0;
      let members = this.members;
      return {
        next() {
          if (index < members.length) {
            return { value: members[index++], done: false };
          } else {
            return { done: true };
          }
        }
      };
    }
  }
