# Bugs and Errors

- _Bugs_ - Flaws in computer programs
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
- _Debugged_ - The process of finding mistakes

### Strict Mode

- JS can be made a little stricter by using _strict_ mode.
- Put "use strict" at the top of a file or function body
- _Strict mode_ - This hold undefined in functions that are not called as methods.
- Code inside classes and modules is automatically strict.
  - The old nonstrict behavior still exists only because some old code might depend on it, and the designers worked hard to avoid breaking any existing programs
- Normally, when you forget to put let in front of a binding, JS quietly creates a global binding and uses that
  - In strict mode, an error is reported instead.
  - This doesn't work when the binding in question already exists somewhere in the scope.
    - In that case, the loop will quietly overwrite the value of the binding.
- Strict mode also stores _this_ binding as undefined.
  - So if you accidentally call a method or constructor incorrectly in strict mode, JavaScript will produce an error as soon as it tries to read something from _this_, rather than writing to the global scope.

### Types

- Some languages will want to know the types of all your bindings and expressions before even running a program (TypeScript?)
- JavaScript considers types only when actually running the program, and even there often tries to implicitly convert values to the type it expects.
- A lot of mistakes come from being confused about the kind of value that goes into or comes out of a function. If you have that information written down, you're less likely to be confused.
- Types need to introduce their own complexity to be able to describe enough code to be useful.

  - You'd need to introduce a _type variable_ **T**, which can stand in for any type, so that you can give randomPick a type like
  - ```
    (T[])->T //function from an array of Ts to a T
    ```

  ```

  ```

- When the types of a program are known, its possible for the computer to _check_ them for you, pointing out mistakes before the program is run (hello again, TypeScript)

## Testing

- If the program won't help us find mistakes, we'll have to do it the hard way: by running the program and seeing whether it does the right thing.
- Doing this by hand, again and again, is a bad idea.
- _Automated testing_ - the process of writing a program that tests another program.
- It's a bit more work, but once mastered, it will take you only seconds to verify that your program still behaves properly in all situations you wrote tests for.
- Tests usually take the form of little labeled programs that verify some aspect of your code.
- Writing tests tends to produce rather repetitive, awkward code.
  - There are pieces of software that help you build and run a collection of tests (_test suties_) by providing a language (in the form of functions and methods) suited to expressing tests and outputting informative information when a test fails. _test runners_
- Some code is easier to test than others
  - The more external objects that the code interacts with, the harder it is to set up the context in which to test it.

## Debugging

- Sometimes the line that triggered the problem is simply the first place where a flaky value produced elsewhere gets used.
- Don't make random changes to the code to see whehter that makes it better
  - Instead, think. Analyze what is happening and come up with a theory of why it might be happening.
  - Then, make additional observations to test this theory - or if you don't have a theory, make additional observations to help you come up with one.
  - Put in a few strategic console.log calls.
- An alternative to using console.log is to use the debugger capabilities.
- Set a _breakpoint_ on a specific line of code.
- Another way to set a breakpoint is to include a *debugger* statement.

## Error Propagation

- Not all problems can be prevented by the programmer.
- If your code communicates with the outside world, it is possible to get malformed input, be overloaded with work, or have the network fail
- If you build for yourself, you can afford to just ignore such problems until they occur.
- If you're building for someone else:
  - Sometimes the right thing to do is take the bad input in stride and continue running.
  - In other cases, it's better to report to the user what went wrong and then give up.
  - In either situation the program has to actively do something in response to a problem.
- So if you have a function that asks the user for a number, what should it return if the user inputs "orange"?
  - Have the code check whether an actual number was read and, failing that, must somehow recover.
    - Maybe by asking again or filling in a default value.
    - Or it could return a special value to its caller to indicate that it failed to do what it was asked.
- In many situations, returning a special value is a good way to indicate an error

## Exceptions
- *Exception handling* - Stop what we are doing and jump to a place that knows how to handle the problem.
- Exceptions are a mechanism that makes it possible for code that runs into a problem to *raise* (or *throw*) an exception.
- Exception can be any value
- Raising an exception jumps out of not just the current function but also its callers, all the way down to the first call that started the current execution.
- ^^ *unwinding the stack*
- If exceptions always zoomed to the bottom of the stack, they wouldnt be much use.
  - Instead, we can set "obstacles" along the stack to *catch* the exception.
- The *throw* keyword is used to raise an exception
  - Catching one is done by wrapping a piece of code in a try block, followed by the keyword *catch*
  - After the catch block finishes, or if the try block finishes without problems, the program proceeds beneath the entire try/catch statement.
- *Stack trace* - the call stack that existed when the exception was created.
- The big advantage of exceptions: error-handling code only at the point where the error occurs and at the point where it is handled.

## Cleaning up after exceptions
- The effect of an exception is another kind of control flow. 
- Every action that might cause an exception might cause control to suddenly leave your code.
  - This means that when code has several side effects, even if its "regular" control flow looks like they'll always happen, an exception might prevent some of them from taking place.
- One way to address this is to use fewer side effects
- A programming style that computes new values instead of changing existing values helps.
- Try statements have another feature: they may be followed by a finally block
- *finally* - a block that says "no matter what happens, run this code after trying to run the code in the try block"

## Selective Catching
- When an exception makes it all the way to the bottom of the stack without being caught, it gets handled by the environment.
- In browsers, a description of the error gets written to the JavaScript console.
- In Node, it aborts the whole process when an unhandled exception occurs.
- For programming mistakes, just letting tje error go through is often the best you can do.
- For problems that are *expected* to happen during routine use, crashing with an unhandled exception is a terrible strategy.
- The for (;;) construct is a way to intentionally create a loop that doesn't terminate on its own. 
  - We break out of the loop only when a valid direction is given.

## Assertions
- *Assertions* - are checks inside the program that verify that something is the way its suposed to be.
- They are not used to handle situations that can come up in normal operation but to find programmer mistakes.
- Loudly blowing up program instead of silently returning undefined.
- Do not write assertions for every possible kind of bad input. Reserve them for mistakes that are easy to make

## Summary
- An important part of programming is finding, diagnosing, and fixing bugs.
- Problems become easier to notice if you have an automated test suite or add assertions to your programs.
- Throwing an exception causes the call stack to be unwound until the next enclosing try/catch block or until the bottom of the stack.
- To help address the unpredictable control flow caused by exceptions, *finally* blocks can be used to ensure that a piece of code **always** runs when a block finishes.
