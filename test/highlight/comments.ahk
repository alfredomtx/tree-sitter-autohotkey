; Single-line comment
; <- comment

; This is a comment
; <- comment

x := 1 ; inline comment
;      ^^^^^^^^^^^^^^^^ comment

; Block comments
/* block comment */
; <- comment

/*
multi-line
block comment
*/
; <- comment

; Doc comments
/** documentation comment */
; <- comment

/**
 * Multi-line doc comment
 * with asterisks
 */
; <- comment

; Comments after code
MyFunc() {
; <- function
} ; end of function
; ^^^^^^^^^^^^^^^^^ comment

; Nested-looking block comments (AHK doesn't nest)
/* outer /* inner */ still comment */
; <- comment
