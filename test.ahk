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
