#NoEnv
#SingleInstance Force

; This is a comment
/* Block
comment */

/**
 * This is a doc comment
 * @param param1 The first parameter
 * @param param2 The second parameter
 * @return The sum of both parameters
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
