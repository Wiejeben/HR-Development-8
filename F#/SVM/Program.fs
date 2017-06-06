open System
open Microsoft.FSharp.Data.TypeProviders
open System.IO
open SVMAST
open ParserUtils
open SVM
open Microsoft.FSharp.Text.Lexing

// Types
type DataType =
    | String of string
    | Int of int
    | Float of float

type State =  {
    PC : int
    Reg1 : DataType
    Reg2 : DataType
    Reg3 : DataType
    Reg4 : DataType
    Memory : DataType list
    }

// Helpers
let DataTypeToString (dataType : DataType) = 
    match dataType with
    | String x -> x
    | Int x -> x |> string
    | Float x -> x |> string

let getValueFromRegister (state : State) (register : Register) = 
    match register with
    | Reg1 -> state.Reg1
    | Reg2 -> state.Reg2
    | Reg3 -> state.Reg3
    | Reg4 -> state.Reg4

let getIntValueFromRegister (state : State) (register : Register) =
    match getValueFromRegister state register with
    | Int n -> n
    | _ -> failwith "No int value found"

let getValueFromAddress (state : State) value =
    let intValue = 
        match value with
        | Int x -> x
        | _ -> failwith "No int value found"
    state.Memory |> List.item intValue

let rec getValue lit (state : State) =
    match lit with
    | Literal.Integer (x, z) -> Int x
    | Literal.Float (x, z) -> Float x
    | Literal.String(x, z) -> String x
    | Literal.Address(x) -> getValueFromAddress state (getValue x state)
    | Literal.Register(x,z) -> getValueFromRegister state x

let getIntValue lit (state : State) =
    match getValue lit state with
    | Int n -> n
    | _ -> failwith "No int value found"

// Indirect internal functions
let rec updateAddresses n l value =
    match l with
    | [] -> failwith "Index out or range"
    | h::t when n = 0 -> value::t // assign value
    | h::t -> h :: updateAddresses (n-1) t value // keep going until n = 0

// Direct internal functions
let move (state : State) arg1 arg2 =
    match arg1 with
    | Address lit -> { state with Memory = updateAddresses (getIntValue lit state) state.Memory (getValue arg2 state) }

// Application functions
let parse (fileName : string) =
  let stream = new StreamReader(fileName)
  let buffer = LexBuffer<char>.FromTextReader stream
  Parser.start Lexer.tokenstream buffer

let initialize (memory : int) =
    {
        PC = 0
        Reg1 = Int 0
        Reg2 = Int 0
        Reg3 = Int 0
        Reg4 = Int 0
        Memory = [0..memory-1] |> List.map (fun x -> Int 0)
    }

let status (state : State) = 
    printfn "MEMORY:"
    state.Memory |> Seq.iter (fun x -> printf "%s" (DataTypeToString x))
    printfn ""
    printfn "============"
    printfn "REGISTERS"
    printfn "%s %s %s %s" (DataTypeToString state.Reg1) (DataTypeToString state.Reg2) (DataTypeToString state.Reg3) (DataTypeToString state.Reg4)
    printfn "============"
    printfn "PROGRAM COUNTER:"
    printfn "%i" state.PC
    printfn "~~~~~~~~~~~~"


let next (state : State) = { state with PC = state.PC + 1 }
let execute (program : Program) (state : State) = 
    if (state.PC < program.Length) then
        let operation = program |> List.item state.PC

        match operation with
        | Nop _ -> next (state)
        | Label (arg1, arg2) -> next (state)
        | Mov (arg1, arg2, pos) -> next (move state arg1 arg2)
        | _ -> failwith "Unknown action"
    else
        failwith "Done executing program"

let rec run (program : Program) (state : State) =
    status state
    run program (execute program state)

[<EntryPoint>]
let main argv =
  try
    if argv.Length = 2 then
      let program = parse argv.[0]
      let state = initialize (int argv.[1])
      run program state

      //do printfn "%A" program
      0
    else
      do printfn "You must specify a command line argument containing the path to the program source file and the size of the memory"
      1
  with
  | ParseError(msg,row,col) ->
      do printfn "Parse Error: %s at line %d column %d" msg row col
      1
  | :? Exception as e ->
      do printfn "%s" e.Message
      1
