; Legacy conditional commands

IfEqual, x, 1
; <- keyword
;       ^ variable
;        ^ punctuation.delimiter

IfNotEqual, count, 0
; <- keyword
;           ^^^^^ variable

IfGreater, score, 100
; <- keyword
;          ^^^^^ variable

IfLess, value, max
; <- keyword
;       ^^^^^ variable

IfExist, C:\Test.txt
; <- keyword

IfInString, haystack, needle
; <- keyword
;           ^^^^^^^^ variable

IfNotInString, varName, value
; <- keyword
;              ^^^^^^^ variable

IfWinActive, ahk_class Notepad
; <- keyword

IfMsgBox, Yes
; <- keyword

; With else
IfEqual, x, 1
    MsgBox, One
else
; <- keyword
    MsgBox, Other

; With braced else
IfEqual, x, 1
{
    MsgBox, One
}
else
; <- keyword
{
    MsgBox, Other
}

; Else if chain
IfEqual, x, 1
    result := "one"
else IfEqual, x, 2
; <- keyword
;    ^^^^^^^ keyword
    result := "two"
else
; <- keyword
    result := "other"

; Mixed with modern if
IfEqual, x, 1
    MsgBox, Legacy
else if (y > 5)
; <- keyword
;    ^^ keyword
    MsgBox, Modern

; Modern if with legacy else
if (x > 5)
; <- keyword
    MsgBox, Modern
else IfEqual, y, 1
; <- keyword
;    ^^^^^^^ keyword
    MsgBox, Legacy

; Case insensitive
ifequal, test, value
; <- keyword
;        ^^^^ variable

IFNOTEQUAL, TEST, VALUE
; <- keyword
;           ^^^^ variable

; Variable reference
IfEqual, %myVar%, test
;         ^^^^^ variable

; Empty value
IfEqual, myVar,
; <- keyword
;        ^^^^^ variable

; All legacy command types
IfLessOrEqual, a, 10
; <- keyword

IfGreaterOrEqual, b, 20
; <- keyword

IfNotExist, file.txt
; <- keyword

IfWinExist, Notepad
; <- keyword

IfWinNotExist, Notepad
; <- keyword

IfWinNotActive, Notepad
; <- keyword
