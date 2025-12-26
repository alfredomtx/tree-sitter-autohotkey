; Integer numbers
123
; <- number

x := 42
;    ^^ number

y := 0
;    ^ number

; Floating point numbers
3.14
; <- number

x := 2.718
;    ^^^^^ number

y := 0.5
;    ^^^ number

; Hex numbers
0xFF
; <- number

x := 0x1A2B
;    ^^^^^^ number

y := 0XFF
;    ^^^^ number

; Boolean literals
true
; <- constant.builtin

false
; <- constant.builtin

x := true
;    ^^^^ constant.builtin

y := false
;    ^^^^^ constant.builtin

; Booleans in expressions
result := true && false
;         ^^^^ constant.builtin
;                 ^^^^^ constant.builtin
