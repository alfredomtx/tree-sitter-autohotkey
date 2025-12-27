#NoEnv
#SingleInstance, Force
#Include test.ahk ; with comment

msgbox, test

ExitApp
Reload
Pause
Critical, On

; This is a comment
/* Block
comment */

/**
 * This is a doc comment
 * @param {Integer|Float} param1 The first parameter
 * @param {Integer|Float} param2 The second parameter
 * @return {Integer|Float} The sum of both parameters
 */
MyFunc(param1, param2) {
    return param1 + param2
}

test()
{
    return false
}

emptyFunc()
{
}

result := MyFunc(1, 2)
emptyFunc()

goto, MyLabel
gosub, MyLabel

MyLabel:
    test("Hello")
return

^a::
    Send, % "test"
return

x := "hello world"
y := 'single quoted'
num := 123
hex := 0xFF
pi := 3.14

; === Control Flow ===
; If statement
if (enabled)
    DoSomething()

; If-else
if (condition) {
    x := 1
} else {
    x := 2
}

; If-else if-else chain
if (status) {
    MsgBox, Active
} else if (pending) {
    MsgBox, Waiting
} else {
    MsgBox, Inactive
}

; While loop
while (running) {
    Process()
    if (done) {
        break
    }
}

; Simple loop (infinite)
loop {
    if (shouldStop) {
        break
    }
}

; Loop with count
loop 10 {
    counter += 1
}

; Loop with variable count
loop iterations {
    DoWork()
}

; Loop variants (comma-style)
loop, parse, InputVar, `,
{
    result .= A_LoopField
}

loop, files, C:\*.txt, R
{
    FileRead, content, %A_LoopFileFullPath%
}

loop, read, input.txt
{
    line := A_LoopReadLine
}

loop, reg, HKEY_LOCAL_MACHINE\SOFTWARE {
    RegRead, val, %A_LoopRegKey%, %A_LoopRegName%
}

; For-in with single variable
for item in collection {
    Process(item)
}

; For-in with key-value
for key, value in myObject {
    result .= key
}

; Nested control flow
if (outer) {
    while (inner) {
        loop 5 {
            for k, v in data {
                Handle(k, v)
            }
        }
    }
}

; === Switch Statement ===
; Basic switch
switch action {
    case "save":
        Save()
    case "load":
        Load()
    default:
        MsgBox, Unknown action
}

; Switch with parenthesized expression
switch (e.What) {
    case "ReloadException":
        Reload(false)
        return
    case "EnableDefenderException":
        EnableDefender()
}

; Switch with multiple case values
switch errorCode {
    case 1, 2, 3:
        MsgBox, Minor error
    case 100, 200:
        MsgBox, Major error
    default:
        MsgBox, Unknown error: %errorCode%
}

; === Try/Catch/Finally ===
; Simple try block
try {
    RiskyOperation()
}

; Try with catch
try {
    MightFail()
} catch e {
    HandleError(e)
}

; Try with finally
try {
    AcquireResource()
} finally {
    ReleaseResource()
}

; Try with both catch and finally
try {
    DoWork()
} catch err {
    LogError(err)
} finally {
    Cleanup()
}

; Catch without exception variable
try {
    x := 1
} catch {
    MsgBox, Something went wrong
}

; Nested try blocks
try {
    try {
        InnerRisky()
    } catch inner {
        throw
    }
} catch outer {
    LogError(outer)
}

; === Operators ===
; Assignment
a := 1
b += 2
c -= 3
d *= 4
e /= 5
f .= "text"

; Comparison
equal := a == b
notEqual := a != b
alsoNotEqual := a <> b
greater := a > b
less := a < b
greaterEq := a >= b
lessEq := a <= b

; Arithmetic
sum := 1 + 2
diff := 5 - 3
prod := 4 * 2
quot := 10 / 2
intDiv := 10 // 3
power := 2 ** 8
modulo := 10 % 3

; Logical
both := a && b
either := a || b
negated := !a

; Bitwise
bitAnd := a & b
bitOr := a | b
bitXor := a ^ b
bitNot := ~a
shiftR := a >> 2
shiftL := a << 2

; Ternary (? is operator, : is not - conflicts with labels)
result := condition ? "yes" : "no"

; === Commands ===
MsgBox, Hello World
Sleep, 1000
Send, {Enter}
Run, notepad.exe
SetTimer, MyLabel, 1000
SetTimer, MyLabel, Delete
SetFormat, Float, 0.0
CoordMode, Mouse, Screen
IniRead, value, %filepath%, section, key
Gui, MyGui:Add, Text,, Hello


; === Built-in Variables ===
; Direct usage in expressions
path := A_ScriptDir
time := A_Now
idle := A_TimeIdle
version := A_AhkVersion

; Inside variable references
MsgBox, %A_TickCount%
Run, %A_ComSpec%

; Non-A_ builtins
text := Clipboard
if (ErrorLevel)
    return

; New builtins (from AHK v1 docs)
if (!A_IsCompiled) {
    MsgBox, Not compiled
}

; Should NOT match as builtins (regular identifiers)
A_CustomVar := 1
myA_Var := 2

; === Object/Method Syntax ===
obj := {}
obj.name := "test"
obj.nested.value := 1
result := obj.GetValue()
obj.nested.Method(arg1, arg2)
x := obj.a.b.c

obj2 := {1: "one", 2: "two", "test": "three"}

; === Array Syntax ===
; Array literals
arr := [1, 2, 3]
empty := []
nested := [[1, 2], [3, 4]]
mixed := [1, "text", 3.14]

; Array access
first := arr[1]
second := arr[2]
nested_access := arr[1][2]

; Combined with member expressions
obj.items[0] := "test"
result := obj.data[index]

; === Escape Sequences ===
msg := "Hello`nWorld"
path := "C:``temp``file.txt"
tabs := "col1`tcol2`tcol3"
quotes := "She said `"Hello`""
mixed := 'single`'quote'
carriage := "line1`rline2"

; === Hotstrings ===
; Basic hotstrings
::btw::by the way
::omw::on my way
::sig::Best regards,`nJohn

; With options
:*:btw2::by the way     ; immediate
:?:ing::ING             ; inside words
:C:BTW::BY THE WAY      ; case-sensitive
:*?C:abbr::expanded     ; multiple options
:B0:test::testing       ; no backspacing

; Execute code instead of replacement
:X:now::MsgBox, % A_Now

:X:now::
MsgBox, %A_Now%
Sleep, 1000
return

test := LANGUAGE = "EN-US" ? "Hi" : "Bonjour"
test := LANGUAGE = "EN-US" ? "How are you?" : "Comment allez-vous?"

return

Gui, MyGui:-Caption +Border +Toolwindow +AlwaysOnTop
Gui, MyGui:Add, Text, vMyText, % LANGUAGE = "EN-US" ? "Hi" : "Bonjour"
Gui, MyGui:Show, NoActivate,

GuiControl, MyGui:, MyText, % "test"
GuiControl, MyGui:, MyText, test

global VAR := true
global VAR := false

; === Continuation Sections ===
; Simple continuation
message := (
  This is a multi-line
  message that spans
  several lines
)

; With LTrim option and nested parens
query := (LTrim
  SELECT (id, name)
  FROM users
)
