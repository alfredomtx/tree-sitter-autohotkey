; Simple command
MsgBox, Hello
; <- function.builtin
;       ^^^^^ variable

; Multiple commands on separate lines (THE BUG CASE)
Gui, MyGui:Add, Text
; <- function.builtin
GuiControl, MyGui:, Control
; <- function.builtin

; Command followed by blank line
Send, {Enter}
; <- function.builtin

Sleep, 1000
; <- function.builtin
;      ^^^^ number

; Command with variable reference
MsgBox, %A_ScriptDir%
; <- function.builtin
;       ^^^^^^^^^^^^ variable.special

; GuiControl with force expression (exact test2.ahk case)
Gui, MyGui:Add, Text, vMyText
; <- function.builtin

GuiControl, MyGui:, MyText
; <- function.builtin

; Built-in commands from different categories
FileRead, content, file.txt
; <- function.builtin

WinActivate, ahk_class Notepad
; <- function.builtin

SetTimer, MyLabel, 1000
; <- function.builtin

; User-defined command (not built-in)
MyCustomCommand, arg1, arg2
; <- function

; Flow control commands
Goto, MyLabel
; <- keyword

Gosub, MyLabel
; <- keyword

; Legacy if-command with block (if_command node)
IfNotInString, varName, value
; <- function.builtin
{
    MsgBox, test
}

; Legacy if-command with block and else
IfInString, var, needle
; <- function.builtin
{
    MsgBox, found
} else {
    MsgBox, not found
}
