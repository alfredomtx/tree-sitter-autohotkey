# Escape Sequences in Strings

## Summary

Parse AHK escape sequences within strings as distinct nodes for syntax highlighting.

## Decisions

- **Minimal escape set**: `` `n ``, `` `t ``, `` `r ``, ``` `` ```, `` `" ``, `` `' ``
- **Strict matching**: Only recognized sequences become escape_sequence nodes
- **Child node structure**: escape_sequence is a named child of string

## Grammar Changes

```javascript
string: $ => choice(
  seq('"', repeat(choice($.escape_sequence, /[^"`]+/)), '"'),
  seq("'", repeat(choice($.escape_sequence, /[^'`]+/)), "'"),
),

escape_sequence: $ => token(seq(
  '`',
  choice('n', 't', 'r', '`', '"', "'")
)),
```

## Highlighting Changes

```scheme
; Escape sequences within strings
(escape_sequence) @string.escape
```

## Test Cases

Manual test file (test.ahk):
```ahk
; Escape sequence tests
msg := "Hello`nWorld"
path := "C:``temp``file.txt"
tabs := "col1`tcol2`tcol3"
quotes := "She said `"Hello`""
mixed := 'single`'quote'
carriage := "line1`rline2"
```
