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
;           ^^^ keyword.operator

result := a or b
;           ^^ keyword.operator

; Unary operators
result := !x
;         ^ operator

result := not x
;         ^^^ keyword.operator

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
