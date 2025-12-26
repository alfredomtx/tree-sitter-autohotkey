; Basic hotstring
::btw::by the way
; <- punctuation.delimiter
;  ^^^ string.special
;     ^^ punctuation.delimiter
;       ^^^^^^^^^^ string

; Hotstring with asterisk option (immediate trigger)
:*:omw::on my way
; <- punctuation.delimiter
;^ attribute
;  ^^^ string.special
;     ^^ punctuation.delimiter
;       ^^^^^^^^^ string

; Hotstring with case-sensitive option
:C:AHK::AutoHotkey
; <- punctuation.delimiter
;^ attribute
;  ^^^ string.special
;     ^^ punctuation.delimiter
;       ^^^^^^^^^^ string

; Hotstring with multiple options
:*C:sig::Best regards
; <- punctuation.delimiter
;^^ attribute
;   ^^^ string.special
;      ^^ punctuation.delimiter
;        ^^^^^^^^^^^^ string

; Hotstring with raw option
:R:raw::raw output
; <- punctuation.delimiter
;^ attribute
;  ^^^ string.special
;     ^^ punctuation.delimiter
;       ^^^^^^^^^^ string

; Hotstring with text option
:T:txt::plain text
; <- punctuation.delimiter
;^ attribute
;  ^^^ string.special
;     ^^ punctuation.delimiter
;       ^^^^^^^^^^ string

; Hotstring with backspace option
:B0:noback::no backspace
; <- punctuation.delimiter
;^^ attribute
;    ^^^^^^ string.special
;          ^^ punctuation.delimiter
;            ^^^^^^^^^^^^ string

; Hotstring with ending character option
:?:end::match at word end
; <- punctuation.delimiter
;^ attribute
;  ^^^ string.special
;     ^^ punctuation.delimiter
;       ^^^^^^^^^^^^^^^^^ string

; Hotstring with delay option
:K40:slow::slow typing
; <- punctuation.delimiter
;^^^ attribute
;    ^^^^ string.special
;        ^^ punctuation.delimiter
;          ^^^^^^^^^^^ string
