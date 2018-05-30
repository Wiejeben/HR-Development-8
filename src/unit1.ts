// Exercise 1: Implement a function that returns a string containing all numbers from 0 to n.
const allNumber = (n: number): string => (n <= 0) ? '0' : allNumber(n - 1) + ' ' + n.toString();

// Exercise 2: Implemeent a function that returns a string containing all numbers from n to 0.
const allNumberRev = (n: number): string => (n <= 0) ? '0' : n.toString() + ' ' + allNumberRev(n - 1);

// Exercise 3: Implement a function that returns a string containing all numbers between lower and upper.
const allNumberRange = (lower: number) => (upper: number): string =>
    (lower >= upper) ? upper.toString() : lower.toString() + ' ' + allNumberRange(lower + 1)(upper);

// Exercise 4: Implement a function that returns a string containing all numbers between lower and upper in reverse order.
const allNumberRangeRev = (lower: number) => (upper: number): string =>
    (lower >= upper) ? lower.toString() : upper.toString() + ' ' + allNumberRangeRev(lower)(upper - 1);

// Exercise 5: Implement a function that returns a string containing all even numbers between lower and upper.
const allEvenRange = (lower: number) => (upper: number): string =>
    (lower > upper) ? '' : (lower % 2 !== 0) ? allEvenRange(lower + 1)(upper) : lower.toString() + ' ' + allEvenRange(lower + 1)(upper)

// Exercise 6: Implement a function that returns a string containing length asterisks.
const drawLine = (length: number): string => (length <= 0) ? '' : '*' + drawLine(length - 1);

// Exercise 7: Implement a function that returns a string containing length repetitions of symbol.
const drawSymbols = (symbol: string) => (length: number): string => (length <= 0) ? '' : symbol + drawSymbols(symbol)(length - 1);

/* 
 * Exercise 8
 * Implement a function that returns a string containing the binary representation of the input number (it must be positive)
 * The binary representation is obtained using the following procedure:
 * 1. Add to the end of the string the remainder of the division between the current number and 2.
 * 2. Repeat the previous step until the number is 0. In this case simply don't add anything.
 */
const toBinary = (n: number): string => (n <= 0) ? '' : toBinary(Math.floor(n / 2)) + (n % 2).toString();

/*
 * Exercise 9
 * Implement a function that returns a string containing the representation of the input number in an arbitrary base
 * (the numebr must be positive). The algorithm is the same as above except you must take the remainder of n devided by base.
*/
const toBase = (n: number) => (base: number): string => (n <= 0) ? '' : toBase(Math.floor(n / base))(base) + (n % base).toString();

// Results
console.log('Exercise 1:', allNumber(20));
console.log('Exercise 2:', allNumberRev(20));
console.log('Exercise 3:', allNumberRange(10)(20));
console.log('Exercise 4:', allNumberRangeRev(10)(20));
console.log('Exercise 5:', allEvenRange(11)(23));
console.log('Exercise 6:', drawLine(5));
console.log('Exercise 7:', drawSymbols('-')(5));
console.log('Exercise 8:', toBinary(6));
console.log('Exercise 9:', toBase(6)(2));