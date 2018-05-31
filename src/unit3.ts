import { Cons, Empty, List, quux } from './unit2';

interface Tuple<a, b> {
    fst: a,
    snd: b,
};

const Tuple = <a, b>(fst: a) => (snd: b): Tuple<a, b> => ({ fst: fst, snd: snd });

/**
 * Exercise 1:
 * Implement a function that splits the list into two lists, the first one containing all the elements of l from
 * position 0 to position i included, and the second one containing all the remaining elements. The two resulting
 * lists are returned in a tuple. For example split 3 [3;5;4;-1;2;2] = fst:  [3;5;4;-1], snd: [2;2].
 */
let splitAt = <a>(i: number) => (l: List<a>): Tuple<List<a>, List<a>> =>
    (l.kind === 'cons') ?
        (i <= 0) ?
            Tuple<List<a>, List<a>>(Cons(l.head)(Empty()))(l.tail) :
            ((t: Tuple<List<a>, List<a>>): Tuple<List<a>, List<a>> => Tuple<List<a>, List<a>>(Cons(l.head)(t.fst))(t.snd))(splitAt<a>(i - 1)(l.tail)) :
        undefined;

const splitAtResult = splitAt(3)(quux());
console.log('Exercise 1:', splitAtResult.fst.toString(), splitAtResult.snd.toString());

