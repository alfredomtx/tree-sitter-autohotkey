; Comments
(comment) @comment
(block_comment) @comment

; Strings
(string) @string

; Numbers
(number) @number

; Keywords
(keyword) @keyword

; Functions - use structural query (identifier as child)
(function_definition (identifier) @function)
(function_call (identifier) @function)

; Labels - identifier as child
(label (identifier) @label)

; Hotkeys
(hotkey) @keyword

; Directives
(directive) @preproc

; Identifiers (fallback - must be last)
(identifier) @variable
