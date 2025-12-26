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
