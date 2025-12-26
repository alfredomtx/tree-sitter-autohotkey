; Double-quoted strings
"hello"
; <- string

x := "world"
;    ^^^^^^^ string

; Single-quoted strings
'hello'
; <- string

x := 'world'
;    ^^^^^^^ string

; Empty strings
""
; <- string

''
; <- string

; Strings with spaces
"hello world"
; <- string

; Escape sequences in strings
x := "line1`nline2"
;    ^^^^^^^^^^^^^^ string
;          ^^ string.escape

x := "tab`there"
;        ^^ string.escape

x := "carriage`rreturn"
;             ^^ string.escape

; Multiple escapes
x := "`n`t`r"
;     ^^ string.escape
;       ^^ string.escape
;         ^^ string.escape

; Backtick escape (literal backtick)
x := "back``tick"
;        ^^ string.escape

; Quote escape (using backtick)
x := "say `"hello`""
;         ^^ string.escape
;               ^^ string.escape

; Strings in function calls
MsgBox("Hello World")
;      ^^^^^^^^^^^^^ string

result := Format("Value: {1}", x)
;                ^^^^^^^^^^^^ string
