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
        (i <= 0) ? Tuple<List<a>, List<a>>(Cons(l.head)(Empty()))(l.tail) :
            ((t: Tuple<List<a>, List<a>>): Tuple<List<a>, List<a>> => Tuple<List<a>, List<a>>(Cons(l.head)(t.fst))(t.snd))(splitAt<a>(i - 1)(l.tail)) :
        undefined;

/**
 * Exercise 2:
 * Implement a function that merges together two sorted lists into a single sorted list.
 */
export const merge = <a>(l1: List<a>) => (l2: List<a>): List<a> =>
    (l1.kind === 'empty') ? l2 :
        (l2.kind === 'empty') ? l1 :
            (l1.head <= l2.head) ? Cons(l1.head)(merge(l1.tail)(l2)) :
                Cons(l2.head)(merge(l1)(l2.tail))

/**
 * Exercise 3:
 * Implement a function that implements the Merge Sort algorithm. The Merge Sort returns the list itself
 * when the list has only one element. Otherwise it splits l in two lists, one containing the lements
 * between position 0 and l.length / 2. Merge Sort is called recursively  on the two lists. After this step
 * the function merge above to merge the two sorted lists.
 */
export const mergeSort = <a>(l: List<a>): List<a> => {
    const count = l.count();

    if (count <= 1) {
        return l;
    }

    const splitted = splitAt<a>((Math.floor(count / 2) - 1))(l);

    return merge<a>(mergeSort<a>(splitted.fst))(mergeSort<a>(splitted.snd));
}

export type Expr = {
    kind: 'value',
    value: number,
} | {
    kind: 'variable',
    name: string,
} | {
    kind: 'addition',
    x: Expr,
    y: Expr,
} | {
    kind: 'subtract',
    x: Expr,
    y: Expr,
} | {
    kind: 'multiply',
    x: Expr,
    y: Expr,
} | {
    kind: 'divide',
    x: Expr,
    y: Expr
}

export const ExprValue = (value: number): Expr => ({ kind: 'value', value: value })

/**
 * Exercise 4:
 * Implement a function that allows to evaluate arithmetic expressions.
 */
export const evaluate = (exp: Expr): number => {

    if (exp.kind === 'addition') {
        return evaluate(exp.x) + evaluate(exp.y)
    } else if (exp.kind === 'subtract') {
        return evaluate(exp.x) - evaluate(exp.y)
    } else if (exp.kind === 'multiply') {
        return evaluate(exp.x) * evaluate(exp.y)
    } else if (exp.kind === 'divide') {
        return evaluate(exp.x) / evaluate(exp.y)
    } else if (exp.kind === 'value') {
        return exp.value
    }

    throw Error('Expression kind not supported')
}

/**
 * Exercise 5:
 * Implement a function that extends the previous eval function by supporting also variables.
 * Variables are another case of the union. Evaluating a variable means looking it up in the stack.
 * A stack is a list of tuple mapping a variable name to its value. If the lookup is successful eval
 * returns the value of the variable, otherwise it throws an error.
 */
export const evaluate2 = (exp: Expr) => (stack: List<Tuple<string, number>>): number => {

    if (exp.kind !== 'variable') {
        return evaluate(exp);
    }

    return exp;
}
