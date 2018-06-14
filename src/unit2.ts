export type List<a> = ({ kind: 'empty' } | { kind: 'cons', head: a, tail: List<a> }) & {
    count: (this: List<a>) => number
    toString: (this: List<a>) => string
    equals: (this: List<a>, l: List<a>) => boolean
};

// Helpers
export const Empty = <a>(): List<a> => ({
    kind: 'empty',
    count: (): number => 0,
    toString: (): string => '',
    equals: function (l: List<a>): boolean { return match(this)(l) }
});
export const Cons = <a>(head: a) => (tail: List<a>): List<a> => ({
    kind: 'cons',
    head: head,
    tail: tail,
    count: function (): number { return count(this) },
    toString: function (): string { return all(this) },
    equals: function (l: List<a>): boolean { return match(this)(l) }
});

const all = <a>(l: List<a>): string => (l.kind === 'empty') ? '' : l.head.toString() + ' ' + all(l.tail);
const count = <a>(l: List<a>): number => (l.kind === 'empty') ? 0 : 1 + count(l.tail);
const match = <a>(l1: List<a>) => (l2: List<a>): boolean => (
    l1.kind === 'empty' && l2.kind === 'empty' ||
    l1.kind === 'cons' && l2.kind === 'cons' &&
    l1.head === l2.head && match(l1.tail)(l2.tail)
)

export const foo = (): List<number> => Cons(0)(Cons(1)(Cons(2)(Cons(3)(Empty()))))
export const bar = (): List<number> => Cons(2)(Cons(4)(Cons(3)(Cons(1)(Empty()))))
export const baz = (): List<number> => Cons(0)(Cons(1)(Cons(2)(Cons(2)(Cons(1)(Cons(0)(Empty()))))))
export const qux = (): List<string> => Cons('a')(Cons('a')(Cons('a')(Cons('a')(Cons('b')(Cons('b')(Cons('c')(Cons('c')(Cons('z')(Empty())))))))))
export const quux = (): List<number> => Cons(3)(Cons(5)(Cons(4)(Cons(-1)(Cons(2)(Cons(2)(Empty()))))))

// Exercise 1: Implement a function that returns the last element in the list.
export const last = <a>(l: List<a>): a => (l.kind === 'cons') ? (l.tail.kind === 'empty') ? l.head : last(l.tail) : undefined;

// Exercise 2: Implement a function that creates a list with the elements of l in reverse order.
export const concat = <a>(l1: List<a>) => (l2: List<a>): List<a> => (l1.kind === 'empty') ? l2 : Cons(l1.head)(concat(l1.tail)(l2));
export const rev = <a>(l: List<a>): List<a> => (l.kind === 'empty') ? l : concat(rev(l.tail))(Cons(l.head)(Empty()))

// Exercise 3: Implement a function that adds all the elements of l2 after those in l1
export const append = <a>(l1: List<a>) => (l2: List<a>): List<a> => (l1.kind === 'empty') ? l2 : Cons(l1.head)(append(l1.tail)(l2));

// Exercise 4: Implement a function that returns the element in position n in l.
export const nth = <a>(n: number) => (l: List<a>): a => (l.kind === 'cons') ? (n <= 0) ? l.head : nth<a>(n - 1)(l.tail) : undefined;

// Exercise 5: Implement a function that checks if a list is palindrome. A list is palindrome if it is equal to its inverse.
export const palindrome = <a>(l: List<a>): boolean => l.equals(rev(l));

// Exercise 6: Implement a function that removes consective occurrences of the same element in the list.
export const compress = <a>(l: List<a>): List<a> =>
    (l.kind === 'cons') ? (l.tail.kind === 'cons' && l.tail.head === l.head) ? compress(l.tail) : Cons(l.head)(compress(l.tail)) : l;

/*
 * Exercise 7
 * The Caesar’s cypher take a text, represented as a list of characters, and shifts all the letters
 * (so only if the character is an alphabetical character) in it up by the number of position specified
 * by shift. If the letter goes past z it restarts from a. You can assume that all the text is in lower-case
 * letter. For instance:
 * 
 * shift("c")(5) = h
 * shift("y")(5) = d
 * 
 * The ASCII code for a specific character in a string can be obtained by using the method charCodeAt
 * that takes as input the position of the character of the string you want to get the ASCII code of.
 * For instance:
 * "Caesar".charCodeAt(2) = 101
 */
export const shift = (l: List<string>) => (n: number): List<string> =>
    (l.kind === 'empty') ? l : Cons(String.fromCharCode(((l.head.charCodeAt(0) - 'a'.charCodeAt(0) + n) % 26) + 'a'.charCodeAt(0)))(shift(l.tail)(n))
