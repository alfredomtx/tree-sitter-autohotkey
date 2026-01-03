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
;    ^^^^ variable.special

x := base
;    ^^^^ variable.special

this.value := 1
; <- variable.special
;    ^^^^^ property

base.__New()
; <- variable.special

; Exception parameter
try {
    throw "error"
} catch e {
;       ^ variable.parameter
    x := e
}
