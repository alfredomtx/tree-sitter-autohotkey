; if/else
if (x) {
; <- keyword
}

if (x) {
} else {
; ^^ keyword
}

; while loop
while (running) {
; <- keyword
}

; loop
loop {
; <- keyword
}

loop 10 {
; <- keyword
}

; for loop
for item in collection {
; <- keyword
;         ^^ keyword
}

; try/catch/finally
try {
; <- keyword
} catch e {
; ^^^^^ keyword
} finally {
; ^^^^^^^ keyword
}

; Control flow
return
; <- keyword

return value
; <- keyword

break
; <- keyword

continue
; <- keyword

; throw
throw "error"
; <- keyword

; class keywords
class MyClass {
; <- keyword
}

class Child extends Parent {
; <- keyword
;           ^^^^^^^ keyword
}

; static keyword
class Example {
    static value := 1
;   ^^^^^^ keyword

    static Method() {
;   ^^^^^^ keyword
    }
}

; Uppercase keywords - test case insensitivity
IF (x) {
; <- keyword
}

WHILE (running) {
; <- keyword
}

Loop 10 {
; <- keyword
}

FOR item IN collection {
; <- keyword
;         ^^ keyword
}

TRY {
; <- keyword
} CATCH e {
; ^^^^^ keyword
} FINALLY {
; ^^^^^^^ keyword
}

Switch var {
; <- keyword
    CASE 1:
        MsgBox, one
    DEFAULT:
        MsgBox, other
}

CLASS UpperClass EXTENDS BaseClass {
; <- keyword
;                ^^^^^^^ keyword
    STATIC count := 0
;   ^^^^^^ keyword

    STATIC Method() {
;   ^^^^^^ keyword
    }
}

; Mixed case
If (a OR b AND c) {
; <- keyword
    MsgBox, test
}
