import { List, Cons, Empty } from './unit2';
import { Tuple, splitAt } from './unit3'

const quux = (): List<number> => Cons(3)(Cons(5)(Cons(4)(Cons(-1)(Cons(2)(Cons(2)(Empty()))))))

describe('exercise 1', () => {
    it('should split list into two lists inside a tuple.', () => {
        const first = Cons(3)(Cons(5)(Cons(4)(Cons(-1)(Empty()))));
        const second = (Cons(2)(Cons(2)(Empty())));
        const result = Tuple<List<number>, List<number>>(first)(second)

        expect(JSON.stringify(splitAt(3)(quux()))).toBe(JSON.stringify(result))
    })
})
