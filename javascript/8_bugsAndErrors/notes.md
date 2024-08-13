# Bugs and Errors

- *Bugs* - Flaws in computer programs
- We can roughly categorize bugs into:
  - Those caused by mistakes introduced converting a thought to code
  - Those cause by the thoughts being confused

### Language
- Mistakes could be pointed out to us by the computer if it knew enough about what we were trying to do.
- Here, JavaScript's looseness is a hinderance (probably where TypeScript will come in to save the day)
  - Its concepts of properties and bindings is loose enough that it will rarely catch typos before actually running the program
  - Even still, it will allow you to do absurd things without complaint.
- There are some things JavaScript will complain about:
  - Not following the language's grammer.
  - Calling something that's not a function or looking up a property on an undefined value.
  - Often, your non-sense computation will merely produce NaN or an undefined value
- *Debugged* - The process of finding mistakes

### Strict Mode
- JS can be made a little stricter by using *strict* mode.
- Put "use strict" at the top of a file or function body
- *Strict mode* - This hold undefined in functions that are not called as methods.
- Code inside classes and modules is automatically strict.
  - The old nonstrict behavior still exists only because some old code might depend on it, and the designers worked hard to avoid breaking any existing programs
-  Normally, when you forget to put let in front of a binding, JS quietly creates a global binding and uses that
   -  In strict mode, an error is reported instead.
   -  This doesn't work when the binding in question already exists somewhere in the scope.
      -  In that case, the loop will quietly overwrite the value of the binding.
-  Strict mode also stores *this* binding as undefined. 
   -  So if you accidentally call a method or constructor incorrectly in strict mode, JavaScript will produce an error as soon as it tries to read something from *this*, rather than writing to the global scope.

### Types
- Some languages will want to know the types of all your bindings and expressions before even running a program (TypeScript?)
- JavaScript considers types only when actually running the program, and even there often tries to implicitly convert values to the type it expects.
- A lot of mistakes come from being confused about the kind of value that goes into or comes out of a function. If you have that information written down, you're less likely to be confused.
- Types need to introduce their own complexity to be able to describe enough code to be useful.
  - You'd need to introduce a *type variable* **T**, which can stand in for any type, so that you can give randomPick a type like 
  - ```
  (T[])->T //function from an array of Ts to a T
  ```
- When the types of a program are known, its possible for the computer to *check* them for you, pointing out mistakes before the program is run (hello again, TypeScript)
  
### Testing
- If the program won't help us find mistakes, we'll have to do it the hard way: by running the program and seeing whether it does the right thing.
- Doing this by hand, again and again, is a bad idea.
- *Automated testing* - the process of writing a program that tests another program.
- It's a bit more work, but once mastered, it will take you only seconds to verify that your program still behaves properly in all situations you wrote tests for.
- Tests usually take the form of little labeled programs that verify some aspect of your code.
- Writing tests tends to produce rather repetitive, awkward code.
  - There are pieces of software that help you build and run a collection of tests (*test suties*) by providing a language (in the form of functions and methods) suited to expressing tests and outputting informative information when a test fails. *test runners*
- Some code is easier to test than others
  - The more external objects that the code interacts with, the harder it is to set up the context in which to test it.

### Debugging
- 