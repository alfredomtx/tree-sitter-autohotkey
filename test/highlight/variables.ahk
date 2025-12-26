; Regular variables
myVar := 1
; <- variable

x := myVar
;    ^^^^^ variable

; Builtin variables (A_ prefix)
A_ScriptDir
; <- variable.special

path := A_ScriptDir
;       ^^^^^^^^^^^ variable.special

A_Now
; <- variable.special

A_TickCount
; <- variable.special

A_AhkVersion
; <- variable.special

A_ComSpec
; <- variable.special

; Other builtin variables
Clipboard
; <- variable.special

ErrorLevel
; <- variable.special

; Properties on objects
obj.property
;   ^^^^^^^^ property

obj.prop := 10
;   ^^^^ property

obj.nested.prop
;          ^^^^ property

; this and base keywords in context
x := this
;    ^^^^ variable.builtin

x := base
;    ^^^^ variable.builtin

this.value := 1
; <- variable.builtin
;    ^^^^^ property

base.__New()
; <- variable.builtin

; Exception parameter
try {
    throw "error"
} catch e {
;       ^ variable.parameter
    x := e
}
