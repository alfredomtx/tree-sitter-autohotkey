; Identifiers (fallback - FIRST so others override)
(identifier) @variable

; Comments
(comment) @comment
(block_comment) @comment
(doc_comment) @comment

; Strings
(string) @string

; Numbers
(number) @number

; Keywords
(keyword) @keyword

; Operators
(operator) @operator

; Hotkeys
(hotkey) @keyword

; Directives - use @attribute instead of @preproc
(directive) @attribute
(directive . (identifier) @attribute)

; Functions
(function_definition . (identifier) @function)
(function_call . (identifier) @function)

; Labels
(label . (identifier) @label)
