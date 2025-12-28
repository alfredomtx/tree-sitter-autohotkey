; Function definitions
MyFunc() {
; <- function
}

MyFunc(x, y) {
; <- function
}

; Function calls
result := MyFunc()
;         ^^^^^^ function

result := MyFunc(42)
;         ^^^^^^ function

result := MyFunc(a, b)
;         ^^^^^^ function

; Nested function calls
result := Outer(Inner())
;         ^^^^^ function
;               ^^^^^ function

; Method calls
obj.method()
;   ^^^^^^ function.method

obj.method(arg)
;   ^^^^^^ function.method

obj.prop.method()
;        ^^^^^^ function.method

; Class references (PascalCase or _PascalCase as object in method calls)
_Logger.exception()
; <- namespace
;       ^^^^^^^^^ function.method

Database.connect()
; <- namespace
;        ^^^^^^^ function.method

_Config.Settings.load()
; <- namespace
;       ^^^^^^^^ property
;                ^^^^ function.method

; Class references in member expressions
_Logger.level
; <- namespace
;       ^^^^^ property

Settings.theme
; <- namespace
;        ^^^^^ property

; Non-class references stay as variable (lowercase start)
myVar.property
; <- !namespace
;     ^^^^^^^^ property

obj.method()
; <- !namespace
;   ^^^^^^ function.method

; Builtin commands
MsgBox, Hello
; <- function.builtin

Sleep, 1000
; <- function.builtin

Run, notepad.exe
; <- function.builtin

Send, Hello
; <- function.builtin

SetTimer, MyLabel, 1000
; <- function.builtin

Gosub, MyLabel
; <- keyword

; Special methods in class
class Example {
    __New() {
;   ^^^^^ function.special
    }

    __Delete() {
;   ^^^^^^^^ function.special
    }

    __Get(key) {
;   ^^^^^ function.special
    }

    __Set(key, value) {
;   ^^^^^ function.special
    }

    __Call(method, args*) {
;   ^^^^^^ function.special
    }
}

; GUI action (GuiName:SubCommand pattern)
; When parsed at top level (e.g., via injection)
MyGui:Add
; <- string.special
;     ^^^ function.builtin

TestGui:Show
; <- string.special
;       ^^^^ function.builtin

Window:Destroy
; <- string.special
;      ^^^^^^^ function.builtin

; GUI options (GuiName:+/-Option pattern)
MyGui:-Caption
; <- string.special
;      ^^^^^^^^ constant

TestGui:+Border
; <- string.special
;        ^^^^^^^ constant

; Standalone flow control (highlighted as keywords)
Reload
; <- keyword

Exit
; <- keyword

ExitApp
; <- keyword

Pause
; <- keyword

Suspend
; <- keyword

; Standalone debug commands (highlighted as function.builtin)
KeyHistory
; <- function.builtin

ListHotkeys
; <- function.builtin

ListLines
; <- function.builtin

ListVars
; <- function.builtin
