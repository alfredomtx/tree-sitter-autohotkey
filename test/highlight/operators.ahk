; Assignment operators
x := 1
; ^ operator

x += 1
; ^ operator

x -= 1
; ^ operator

x *= 2
; ^ operator

x /= 2
; ^ operator

x .= "text"
; ^ operator

; Arithmetic operators
result := a + b
;           ^ operator

result := a - b
;           ^ operator

result := a * b
;           ^ operator

result := a / b
;           ^ operator

result := a // b
;           ^^ operator

result := a % b
;           ^ operator

result := a ** b
;           ^^ operator

; Logical operators
result := a && b
;           ^^ operator

result := a || b
;           ^^ operator

result := a and b
; Note: 'and', 'or', 'not' are case-insensitive and not specifically highlighted

result := a or b

; Unary operators
result := !x
;         ^ operator

result := not x

result := ~x
;         ^ operator

result := -x
;         ^ operator

; Comparison operators
result := a == b
;           ^^ operator

result := a != b
;           ^^ operator

result := a <> b
;           ^^ operator

result := a < b
;           ^ operator

result := a > b
;           ^ operator

result := a <= b
;           ^^ operator

result := a >= b
;           ^^ operator

; Bitwise operators
result := a | b
;           ^ operator

result := a & b
;           ^ operator

result := a ^ b
;           ^ operator

result := a << b
;           ^^ operator

result := a >> b
;           ^^ operator

; Ternary operator
result := x ? "yes" : "no"
;           ^ operator
;                   ^ operator

; Concatenation operator
result := a . b
;           ^ operator
