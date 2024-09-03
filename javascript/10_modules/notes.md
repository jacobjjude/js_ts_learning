# Modules

- Ideally a program has a clear, straightforward structure.
- In practice, programs flow organically.
  - Pieces of functionality are added as the programmer identifies new needs.
- Allowing a program to become deeply entangled causes two practical issues:
  - Understanding an entangled system is hard.
    - You are forced to build up a holistic understanding of the entire thing
  - If you want to use any of the functionality from such a program, rewriting it may be easier than trying to disentangle it from its context
- *Big ball of mud* - large structureless programs

## Modular Programs
- *Modules* - a piece of program that specifies which other piece it relies on and which functionality it provides for other modules to use (its interface)
- Module interfaces have a lot in common with object interfaces, they make part of the module available to the outside world and keep the rest private.
- A good module system requires modules to specify which code *they* use from other modules. 
- *Dependencies* - When modules use code from other modules
- When these are clearly specified in the module itself, they can be used to figure out which other modules need to be present to be able to use a given modules and automatically load dependencies.
- When the ways in which modules interact with each other are explicit, a system becomes more like LEGO.

## ES Modules

- The original JavaScript did not have any concept of a module. All scripts ran in the same scope, and accessing a function defined in another script was done by referencing the global bindings created by that script.