import { Cons, Empty, List, quux, baz } from './unit2';

export interface Tuple<a, b> {
    fst: a,
    snd: b,
};

export const Tuple = <a, b>(fst: a) => (snd: b): Tuple<a, b> => ({ fst: fst, snd: snd });

/**
 * Exercise 1:
 * Implement a function that splits the list into two lists, the first one containing all the elements of l from
 * position 0 to position i included, and the second one containing all the remaining elements. The two resulting
 * lists are returned in a tuple. For example split 3 [3;5;4;-1;2;2] = fst:  [3;5;4;-1], snd: [2;2].
 */
export const splitAt = <a>(i: number) => (l: List<a>): Tuple<List<a>, List<a>> =>
    (l.kind === 'cons') ?
        (i <= 0) ?
            Tuple<List<a>, List<a>>(Cons(l.head)(Empty()))(l.tail) :
            ((t: Tuple<List<a>, List<a>>): Tuple<List<a>, List<a>> => Tuple<List<a>, List<a>>(Cons(l.head)(t.fst))(t.snd))(splitAt<a>(i - 1)(l.tail)) :
        undefined;

/**
 * Exercise 2:
 * Implement a function that merges together two sorted lists into a single sorted list.
 */
export const merge = (l1: List<number>) => (l2: List<number>): List<number> => {
    if (l1.kind === 'empty') {
        return l1;
    }

    if (l2.kind === 'empty') {
        return l2;
    }

    if (l1.head <= l2.head) {
        return Cons(l1.head)(merge(l1.tail)(l2))
    } else {
        return Cons(l2.head)(merge(l1)(l2.tail))
    }
}

// const splitAtResult = splitAt(3)(quux());
// console.log('Exercise 1:', splitAtResult.fst.toString(), splitAtResult.snd.toString());
// console.log(quux().toString());
// console.log(baz().toString());
// console.log('Exercise 2:', merge(quux())(baz()).toString())
