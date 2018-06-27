type List<a> = {
  kind: "empty"
} | {
  kind: "cons",
  head: a,
  tail: List<a>
}

let Empty = <a>(): List<a> => ({ kind: "empty" })
let Cons = <a>(x: a, xs: List<a>): List<a> => ({
  kind: "cons",
  head: x,
  tail: xs
})

type Option<a> = {
  kind: "none"
} | {
  kind: "some"
  value: a
}

let None = <a>(): Option<a> => ({ kind: "none" })
let Some = <a>(value: a): Option<a> => ({
  kind: "some",
  value: value
})

interface Tuple<a, b> {
  fst: a
  snd: b
}

let Tuple = <a, b>(x: a, y: b): Tuple<a, b> => ({
  fst: x,
  snd: y
})

interface Functor<F, G, a, b> {
  map: (this: F, f: (x: a) => b) => G
}

type ListFunctor<a, b> = List<a> & Functor<List<a>, List<b>, a, b>

//NOTE: COMMENT THE PART OF THE CODE THAT IS INCOMPLETE TO COMPILE. DO NOT CHANGE THE GIVEN DATA STRUCTURES

//exercise 1
let drawLine = (length: number): string => (length <= 0) ? '' : '*' + drawLine(length - 1); //PLACEHOLDER: REPLACE WITH YOUR CODE
// console.log(drawLine(10));

//exercise 2
let merge = <a>(l1: List<a>) => (l2: List<a>): List<a> => (l1.kind == 'empty') ? l2 : Cons(l1.head, merge(l1.tail)(l2))
// Empty<a>() //PLACEHOLDER: REPLACE WITH YOUR CODE
// console.log(merge(Cons(1, Cons(2, Empty())))(Cons(3, Cons(4, Empty()))))

//exercise 3
let next = <a>(l: List<a>): List<a> => (l.kind == 'cons') ? l.tail : l;
let map2Safe = <a, b, c>(f: (x: a) => (y: b) => c) => (l1: List<a>) => (l2: List<b>): List<Option<c>> =>
  (l1.kind == 'cons' && l2.kind == 'cons') ? Cons(Some(f(l1.head)(l2.head)), map2Safe(f)(l1.tail)(l2.tail)) :
    (l1.kind == 'cons' || l2.kind == 'cons') ? Cons(None(), map2Safe(f)(next(l1))(next(l2))) :
      Empty()
//PLACEHOLDER: REPLACE WITH YOUR CODE

const left = Cons(1, Cons(2, Cons(3, Cons(4, Empty()))));
const right = Cons(4, Cons(5, Empty()));
const result = map2Safe<number, number, number>((x: number) => (y: number) => x + y)(left)(right);
// console.log(result);

//exercise 4
let curry = <a, b, c>(f: (t: Tuple<a, b>) => c) => (x: a) => (y: b): c => f(Tuple(x, y))
//PLACEHOLDER REPLACE WITH YOUR CODE
// console.log(curry<number, number, number>((t: Tuple<number, number>): number => t.fst + t.snd)(10)(15))


//exercise 5 - constructor for the list functor
let ListFunctor = <a, b>(l: List<a>): ListFunctor<a, b> => ({
  ...l,
  map: function (f: (x: a) => b) {
    return (this.kind == 'cons') ? Cons(f(this.head), Empty<b>()) : Empty<b>()
  }
})

//PLACEHOLDER REPLACE WITH YOUR CODE
// console.log(ListFunctor(Cons(10, Cons(20, Empty()))).map(x => x + 1));
