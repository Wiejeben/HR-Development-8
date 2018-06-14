import { List, Cons, Empty, last, rev, append, nth, palindrome, compress, shift } from './unit2';

const foo = (): List<number> => Cons(0)(Cons(1)(Cons(2)(Cons(3)(Empty()))))
const bar = (): List<number> => Cons(2)(Cons(4)(Cons(3)(Cons(1)(Empty()))))
const baz = (): List<number> => Cons(0)(Cons(1)(Cons(2)(Cons(2)(Cons(1)(Cons(0)(Empty()))))))
const qux = (): List<string> => Cons('a')(Cons('a')(Cons('a')(Cons('a')(Cons('b')(Cons('b')(Cons('c')(Cons('c')(Cons('z')(Empty())))))))))
const quux = (): List<number> => Cons(3)(Cons(5)(Cons(4)(Cons(-1)(Cons(2)(Cons(2)(Empty()))))))

describe('exercise 1', () => {
    it('should return the last element in the list.', () => {
        expect(last(foo())).toBe(3)
    })
})

describe('exercise 2', () => {
    it('should return a list with the elements of l in reverse order.', () => {
        const result = Cons(3)(Cons(2)(Cons(1)(Cons(0)(Empty()))));

        expect(JSON.stringify(rev(foo()))).toEqual(JSON.stringify(result))
    })
})

describe('exercise 3', () => {
    it('should add all the elements of l2 after those in l1.', () => {
        const result = Cons(0)(Cons(1)(Cons(2)(Cons(3)(Cons(2)(Cons(4)(Cons(3)(Cons(1)(Empty()))))))));

        expect(JSON.stringify(append(foo())(bar()))).toEqual(JSON.stringify(result))
    })
})

describe('exercise 4', () => {
    it('should return the element in position n in l.', () => {
        expect(nth(3)(bar())).toEqual(1)
    })
})

describe('exercise 5', () => {
    it('should check if a list is palindrome.', () => {
        expect(palindrome(baz())).toEqual(true)
    })
})

describe('exercise 6', () => {
    it('should remove consective occurrences of the same element in the list.', () => {
        const result = Cons('a')((Cons('b')(Cons('c')(Cons('z')(Empty())))))

        expect(JSON.stringify(compress(qux()))).toEqual(JSON.stringify(result))
    })
})

describe('exercise 7', () => {
    it('should shift all the letters one position in the alphabet.', () => {
        const result = Cons('b')(Cons('b')(Cons('b')(Cons('b')(Cons('c')(Cons('c')(Cons('d')(Cons('d')(Cons('a')(Empty())))))))))

        expect(JSON.stringify(shift(qux())(1))).toEqual(JSON.stringify(result))
    })
})
