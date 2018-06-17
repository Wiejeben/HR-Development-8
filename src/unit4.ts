import { List, Cons, Empty } from './unit2';
import { ITuple } from './unit3';


// Exercise 1: Implement a function that inserts in the output list only the elements for which predicate returns true.
export const filter = <a>(predict: (x: a) => boolean) => (l: List<a>): List<a> =>
    (l.kind === 'empty') ? l : (!predict(l.head)) ? filter(predict)(l.tail) : Cons<a>(l.head)(filter(predict)(l.tail))

// Exercise 2: Implement a function that applies the function f to all the elements l and returns a list containing the results.
export const map = <a, b>(f: (x: a) => b) => (l: List<a>): List<b> =>
    (l.kind === 'empty') ? Empty() : Cons(f(l.head))(map(f)(l.tail))

// Exercise 3: Implement a function that applies a function f to elements in the same position from l, threading an accumulator argument of type s through the computation.
export const fold = <s, a>(f: (state: s) => (x: a) => s) => (current: s) => (l: List<a>): s =>
    (l.kind === 'empty') ? current : fold(f)(f(current)(l.head))(l.tail)

// Exercise 4: Implement a function that applies function f to element x
export const apply = <a, b>(f: (x: a) => b) => (x: a): b => f(x)

// Exercise 5: Implement a function that applies function f using as input element x and y stored as a tuple.
// export const curry = <a, b, c>(f: (x: ITuple<a, b>) => c) => (x: a) => (y: b): c => {
//     return;
// }
