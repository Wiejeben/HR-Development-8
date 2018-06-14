// Exercise 1: Implement a function that returns a string containing all numbers from 0 to n.
export const allNumber = (n: number): string => (n <= 0) ? '0' : allNumber(n - 1) + ' ' + n.toString();

// Exercise 2: Implemeent a function that returns a string containing all numbers from n to 0.
export const allNumberRev = (n: number): string => (n <= 0) ? '0' : n.toString() + ' ' + allNumberRev(n - 1);

// Exercise 3: Implement a function that returns a string containing all numbers between lower and upper.
export const allNumberRange = (lower: number) => (upper: number): string =>
    (lower >= upper) ? upper.toString() : lower.toString() + ' ' + allNumberRange(lower + 1)(upper);

// Exercise 4: Implement a function that returns a string containing all numbers between lower and upper in reverse order.
export const allNumberRangeRev = (lower: number) => (upper: number): string =>
    (lower >= upper) ? lower.toString() : upper.toString() + ' ' + allNumberRangeRev(lower)(upper - 1);

// Exercise 5: Implement a function that returns a string containing all even numbers between lower and upper.
export const allEvenRange = (lower: number) => (upper: number): string =>
    (lower <= upper) ? ((lower % 2 === 0) ? lower.toString() + ((lower >= upper) ? '' : ' ') : '') + allEvenRange(lower + 1)(upper) : ''

// Exercise 6: Implement a function that returns a string containing length asterisks.
export const drawLine = (length: number): string => (length <= 0) ? '' : '*' + drawLine(length - 1);

// Exercise 7: Implement a function that returns a string containing length repetitions of symbol.
export const drawSymbols = (symbol: string) => (length: number): string => (length <= 0) ? '' : symbol + drawSymbols(symbol)(length - 1);

/* 
 * Exercise 8
 * Implement a function that returns a string containing the binary representation of the input number (it must be positive)
 * The binary representation is obtained using the following procedure:
 * 1. Add to the end of the string the remainder of the division between the current number and 2.
 * 2. Repeat the previous step until the number is 0. In this case simply don't add anything.
 */
export const toBinary = (n: number): string => (n <= 0) ? '' : toBinary(Math.floor(n / 2)) + (n % 2).toString();

/*
 * Exercise 9
 * Implement a function that returns a string containing the representation of the input number in an arbitrary base
 * (the number must be positive). The algorithm is the same as above except you must take the remainder of n devided by base.
*/
export const toBase = (n: number) => (base: number): string => (n <= 0) ? '' : toBase(Math.floor(n / base))(base) + (n % base).toString();
