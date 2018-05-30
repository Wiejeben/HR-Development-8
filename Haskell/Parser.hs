module Main (main) where

import ParseSVM

runCommands (x:xs) = runCommands (runCommand x) : runCommands xs

executeProgram (Left n) = "eh"
executeProgram (Right commands) = show (runCommands commands)

-- executeProgram (Right (Mov (Register Reg1) (Location (Address (Direct 15)))) = "Test"
-- 	| 
-- 	| otherwise = show (length n)

-- parses SVM file from standard input port and displays result
main = do
    input <- getContents -- reads from stdin
    let result = parse program "(standard input)" input
    print (executeProgram result)

