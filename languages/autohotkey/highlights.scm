; Identifiers (fallback - FIRST so others override)
(identifier) @variable

; Comments
(comment) @comment
(block_comment) @comment

; Strings
(string) @string

; Numbers
(number) @number

; Keywords
(keyword) @keyword

; Hotkeys
(hotkey) @keyword

; Directives
(directive) @preproc

; Functions - specific patterns LAST to override fallback
(function_definition . (identifier) @function)
(function_call . (identifier) @function)

; Labels
(label . (identifier) @label)
