; Simple label
MyLabel:
; <- label

; Label with underscore
My_Label:
; <- label

; Label with numbers
Label123:
; <- label

; Label used with Goto
Goto, MyLabel
; <- function.builtin

; Label used with Gosub
Gosub, MyLabel
; <- function.builtin

; Label at end of script
ExitLabel:
; <- label
