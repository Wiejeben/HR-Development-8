import { List, Cons, Empty } from './unit2';
import { filter, map, fold, apply } from './unit4';

const foo = (): List<number> => Cons(10)(Cons(11)(Cons(12)(Cons(13)(Cons(14)(Cons(15)(Cons(16)(Empty())))))))

describe('exercise 1', () => {
    it('should insert in the output list only the elements for which predicate returns true.', () => {
        const result = Cons(10)(Cons(12)(Cons(14)(Cons(16)(Empty()))))

        expect(JSON.stringify(filter<number>((x) => x % 2 === 0)(foo()))).toEqual(JSON.stringify(result))
    })
})

describe('exercise 2', () => {
    it('should apply the function f to all the elements l and return a list containing the results.', () => {
        const result = Cons(true)(Cons(false)(Cons(true)(Cons(false)(Cons(true)(Cons(false)(Cons(true)(Empty())))))))

        expect(JSON.stringify(map<number, boolean>((x) => x % 2 === 0)(foo()))).toEqual(JSON.stringify(result))
    })
})

describe('exercise 3', () => {
    it('should apply a function f to elements in the same position from l, threading an accumulator argument of type s through the computation.', () => {
        const sum = (state: number) => (x: number): number => x + state

        expect(fold<number, number>(sum)(0)(foo())).toEqual(91)
    })
})

describe('exercise 4', () => {
    it('should apply function f to element x.', () => {
        expect(apply<number, number>((x) => x / 2)(10)).toEqual(5)
    })
})

// describe('exercise 5', () => {
//     it('should apply function f using as input element x and y stored as a tuple.', () => {
        
//     })
// })
