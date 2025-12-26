; Empty array
[]
; <- punctuation.bracket
;^ punctuation.bracket

arr := []
;      ^ punctuation.bracket
;       ^ punctuation.bracket

; Array with elements
[1, 2, 3]
; <- punctuation.bracket
;       ^ punctuation.bracket

arr := [1, 2, 3]
;      ^ punctuation.bracket
;              ^ punctuation.bracket

; Array with mixed types
arr := [1, "two", true]
;      ^ punctuation.bracket
;                     ^ punctuation.bracket

; Nested arrays
arr := [[1, 2], [3, 4]]
;      ^ punctuation.bracket
;       ^ punctuation.bracket
;            ^ punctuation.bracket
;                    ^ punctuation.bracket
;                     ^ punctuation.bracket

; Array indexing
x := arr[0]
;       ^ punctuation.bracket
;         ^ punctuation.bracket

; Chained indexing
x := arr[0][1]
;       ^ punctuation.bracket
;         ^ punctuation.bracket
;          ^ punctuation.bracket
;            ^ punctuation.bracket

; Index with expression
x := arr[i + 1]
;       ^ punctuation.bracket
;             ^ punctuation.bracket

; Array in function call
MyFunc([1, 2, 3])
;      ^ punctuation.bracket
;              ^ punctuation.bracket
