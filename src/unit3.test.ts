import { List, Cons, Empty } from './unit2';
import { Tuple, Expr, ExprValue, splitAt, merge, mergeSort, evaluate, evaluate2 } from './unit3'

const foo = (): List<number> => Cons(3)(Cons(5)(Cons(4)(Cons(-1)(Cons(2)(Cons(2)(Empty()))))))
const bar = (): List<number> => Cons(2)(Cons(4)(Cons(5)(Cons(6)(Empty()))))
const baz = (): List<number> => Cons(1)(Cons(3)(Cons(7)(Cons(8)(Empty()))))
const bax = (): List<number> => Cons(5)(Cons(2)(Cons(4)(Cons(3)(Cons(1)(Empty())))))

describe('exercise 1', () => {
    it('should split list into two lists inside a tuple.', () => {
        const first = Cons(3)(Cons(5)(Cons(4)(Cons(-1)(Empty()))));
        const second = (Cons(2)(Cons(2)(Empty())));
        const result = Tuple<List<number>, List<number>>(first)(second)

        expect(JSON.stringify(splitAt(3)(foo()))).toBe(JSON.stringify(result))
    })
})

describe('exercise 2', () => {
    it('should merge together two sorted lists into a single sorted list.', () => {
        const result = Cons(1)(Cons(2)(Cons(3)(Cons(4)(Cons(5)(Cons(6)(Cons(7)(Cons(8)(Empty()))))))))

        expect(merge(bar())(baz()).toString()).toBe(result.toString())
    })
})

describe('exercise 3', () => {
    it('should sort list based on the Merge Sort algorithm.', () => {
        const result = Cons(1)(Cons(2)(Cons(3)(Cons(4)(Cons(5)(Empty())))))

        expect(JSON.stringify(mergeSort(bax()))).toEqual(JSON.stringify(result))
    })
})

describe('exercise 4', () => {
    it('should give back my value', () => {
        expect(evaluate(ExprValue(10))).toBe(10)
    })

    it('should apply addition', () => {
        expect(evaluate({ kind: 'addition', x: ExprValue(10), y: ExprValue(15) })).toEqual(25)
    })

    it('should subtract', () => {
        expect(evaluate({ kind: 'subtract', x: ExprValue(10), y: ExprValue(15) })).toEqual(-5)
    })

    it('should multiply', () => {
        expect(evaluate({ kind: 'multiply', x: ExprValue(10), y: ExprValue(15) })).toEqual(150)
    })

    it('should divide', () => {
        expect(evaluate({ kind: 'divide', x: ExprValue(5), y: ExprValue(10) })).toEqual(0.5)
    })
})

describe('exercise 5', () => {
    it('should give back my value', () => {
        expect(evaluate2(ExprValue(10))(Empty())).toBe(10)
    })

    it('should apply addition', () => {
        expect(evaluate2({ kind: 'addition', x: ExprValue(10), y: ExprValue(15) })(Empty())).toEqual(25)
    })

    it('should subtract', () => {
        expect(evaluate2({ kind: 'subtract', x: ExprValue(10), y: ExprValue(15) })(Empty())).toEqual(-5)
    })

    it('should multiply', () => {
        expect(evaluate2({ kind: 'multiply', x: ExprValue(10), y: ExprValue(15) })(Empty())).toEqual(150)
    })

    it('should divide', () => {
        expect(evaluate2({ kind: 'divide', x: ExprValue(5), y: ExprValue(10) })(Empty())).toEqual(0.5)
    })

    // it('should find value based on variable', () => {

    //     evaluate2({ kind: 'variable', name: 'meaningOfLife' })(Cons(Tuple<string, number>('meaningOfLife')(42))(Empty()))
    // })
})
