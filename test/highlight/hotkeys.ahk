; Simple hotkey with Win modifier
#n::
; <- keyword

; Ctrl+Alt hotkey
^!s::
; <- keyword

; Shift hotkey
+a::
; <- keyword

; Multiple modifiers
^+!#x::
; <- keyword

; Hotkey with command
#n::Run, notepad.exe
; <- keyword

; Hotkey with block
#m:: {
; <- keyword
    MsgBox, Hello
}

; Function key hotkey
F1::
; <- keyword

; Special key hotkeys
Enter::
; <- keyword

Space::
; <- keyword

Tab::
; <- keyword

Escape::
; <- keyword

; Mouse button hotkeys
LButton::
; <- keyword

RButton::
; <- keyword

MButton::
; <- keyword

; Wheel hotkeys
WheelUp::
; <- keyword

WheelDown::
; <- keyword

; Tilde prefix (don't block native function)
~LButton::
; <- keyword

; Asterisk prefix (fire even if extra modifiers held)
*F1::
; <- keyword
