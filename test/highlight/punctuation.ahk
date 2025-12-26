; Parenthesized expressions
x := (1)
;    ^ punctuation.bracket
;      ^ punctuation.bracket

; Statement block braces in while
while (true) {
;            ^ punctuation.bracket
}

; Statement block braces in loop
loop {
;    ^ punctuation.bracket
}

; Try block braces
try {
;   ^ punctuation.bracket
}

; Array literal brackets
arr := [1]
;      ^ punctuation.bracket
;        ^ punctuation.bracket

; Index expression brackets
x := arr[0]
;       ^ punctuation.bracket
;         ^ punctuation.bracket
