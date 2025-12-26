; Continuation section - assertions must be outside the token
var := (
  content here
)
; <- string

; Continuation with options
sql := (LTrim
  SELECT *
  FROM users
)
; <- string

; Continuation with nested parens
query := (
  SELECT (id, name)
  FROM users
)
; <- string
