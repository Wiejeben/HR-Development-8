import { allNumber, allNumberRev, allNumberRange, toBase, toBinary, drawSymbols, drawLine, allEvenRange, allNumberRangeRev } from './unit1';

describe('exercise 1', () => {
    it('should return a string containing all numbers from 0 to 10.', () => {
        expect(allNumber(10)).toBe('0 1 2 3 4 5 6 7 8 9 10')
    })
})

describe('exercise 2', () => {
    it('should return a string containing all numbers from 10 to 0.', () => {
        expect(allNumberRev(10)).toBe('10 9 8 7 6 5 4 3 2 1 0')
    })
})

describe('exercise 3', () => {
    it('should return a string containing all numbers between 5 and 10', () => {
        expect(allNumberRange(5)(10)).toBe('5 6 7 8 9 10')
    })
})

describe('exercise 4', () => {
    it('should return a string containing all numbers between 5 and 10 in reverse order', () => {
        expect(allNumberRangeRev(5)(10)).toBe('10 9 8 7 6 5')
    })
})

describe('exercise 5', () => {
    it('should return a string containing all even numbers between 5 and 10', () => {
        expect(allEvenRange(5)(10)).toBe('6 8 10 ')
    })
})

describe('exercise 6', () => {
    it('should return a string with 5 asterisks', () => {
        expect(drawLine(5)).toBe('*****')
    })
})

describe('exercise 7', () => {
    it('should return a string with 5 minus symbols', () => {
        expect(drawSymbols('-')(5)).toBe('-----')
    })
})

describe('exercise 8', () => {
    it('should return a binary string reassembling the number 6', () => {
        expect(toBinary(6)).toBe('1101')
    })
})

describe('exercise 9', () => {
    it('should return a string containing the representation of the input number in arbitrary base', () => {
        expect(toBase(6)(2)).toBe('110')
    })
})
