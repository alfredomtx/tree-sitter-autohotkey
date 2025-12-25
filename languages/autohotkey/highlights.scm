; Comments
(comment) @comment
(block_comment) @comment

; Strings
(string) @string

; Numbers
(number) @number

; Keywords
(keyword) @keyword

; Functions - try anchored first child with .
(function_definition . (identifier) @function)
(function_call . (identifier) @function)

; Labels - try anchored first child
(label . (identifier) @label)

; Hotkeys
(hotkey) @keyword

; Directives - identifier is a child
(directive (identifier) @preproc)
(directive) @preproc

; Identifiers (fallback)
(identifier) @variable
