#NoEnv
#SingleInstance, Force

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

result := MyFunc(1, 2)

MyLabel:
    MsgBox("Hello")
return

^a::
    Send("test")
return

x := "hello world"
y := 'single quoted'
num := 123
hex := 0xFF
pi := 3.14

if (x = 1) {
    return true
} else {
    global myVar
    loop 10 {
        break
    }
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
CoordMode, Mouse, Screen
SetFormat, Float, 0.0
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
