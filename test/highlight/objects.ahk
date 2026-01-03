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

; New expression
instance := new MyClass()
;           ^^^ keyword

; New expression with arguments
obj := new Namespace.ClassName(arg1, arg2)
;      ^^^ keyword
