# Regular Expressions

- *Regular Expressions*: a way to describe patterns in string data.
  - They form a small, separate language that is part of JavaScript and many other languages and systems
- Powerful tool for inspecting and processing strings

## Creating a Regular Expression

- A regular expression is a type of object.
- Can be constructed with the RegExp constructor or as a literal value by enclosing a pattern in / characters
```
let re1 = new RegExp("abc");
let re2 = /abc/;
```
- Both of those regular expression objects represent the same pattern: an *a* character followed by a *b* followed by a *c*

## Testing for Matches

- Regular expression objects have a number of methods.
  - Simplest one is test
    - If you pass in a string, it will return a Boolean telling you whether the string contains a match of the pattern in the expression
- A regular expression consisting only of nonspecial characters simply represents that sequence of characters. 
- If *abc* occurs anywhere in the string we are testing against, test will return true.

## Sets of Characters

- Finding out whether a string contains abc could just as well be done with a call to indexOf.
- Regular expressions are useful because they allow us to describe more complicated patterns.
- Say we want to match any number. In a regex, putting a set of characters between square brackets makes that part of the expression match any of the characters between the brackets
```
console.log(/[0123456789]/.test("in 1992"));
console.log(/[0-9]/.test("in 1992"));
```
- Within square brackets, a hyphen (-) between two characters can be user to indicate a range of characters, where the ordering is determined by the characters Unicode number.
- A number of common character groups thave their own built-in shortcuts.
  - *\d* - any digit character
  - *\w* - An alphanumberic characer ('word character')
  - *\s* - Any whitespace character (space, tab, newline, and similar)
  - *\D* - a character that is *not* a digit
  - *\W* - a nonalphanumeric character
  - *\S* - A nonwhitespace character
  - *.* - any character except for newline
- You could match a date and time format like 01-30-2003 15:20 with (see code):
- The regex looks awful.
  - Backslash codes can also be used inside square brackets. *[\d.]* means any digit or a period character. The same goes for other special characters, such as the plus sign (+)
- To *invert* a set of characters - that is, to express that you want to match any characters *except* the ones in the set - you can write a caret (^) character after the opening bracket.

## International characters

- JavaScript's regular expressions are rather dumb about characters that do not appear in the English language.
- A "word character" is only one of the 26 characters in the Latin alphabet (upper or lowercase), decimal digits and the underscore character.
- Things like é or ß, which most definitely are word characters, will not match \w (and will match uppercase \W, the nonword category).
- It is possible to use \p in a regular expression to match all characters to which the Unicode standard assigns a given property
- \p{L}: Any letter
- \p{N}: Any numeric character
- \p{P}: Any punctuation character
- \P{L}: Any non-letter (uppercase P inverts)
- \p{Script=Hangul}:  Any character from the given script
- \p property groups are more robust

## Repeating parts of a pattern

- When you put a plus sign (+) after something in a regular expression, it indicates that the element may be repeated more than once.
- The star (*) has a similar meaning but also allws the pattern to match zero times. 
- Something with a star after it never prevents a pattern from matching- it'll just match zero instances if it can't find any suitable text to match.
- A question mark (?) makes a part of a pattern *optional*, meaning it may occur zero times or one time
- To indicate that a pattern should occur a precise number of times, use brace. 
  - Putting {4} after an element, requires it to occur exactly 4 times.
  - Its also possible to specify a range this way: {2,4} means the element must occur at least twice and at most four times.
- 