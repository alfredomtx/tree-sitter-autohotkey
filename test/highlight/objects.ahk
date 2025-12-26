; Object with property
obj := {key: value}
;       ^^^ property
;          ^ punctuation.delimiter

; Object with string key
obj := {"key": value}
;       ^^^^^ property

; Object with number key
obj := {1: value}
;       ^ property

; Object brackets
obj := {a: 1}
;      ^ punctuation.bracket
;           ^ punctuation.bracket

; Nested object
obj := {outer: {inner: 1}}
;       ^^^^^ property
;               ^^^^^ property
