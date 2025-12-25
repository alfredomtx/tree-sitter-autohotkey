; Comments
(comment) @comment
(block_comment) @comment

; Strings
(string) @string

; Numbers
(number) @number

; Keywords
(keyword) @keyword

; Functions - must come before generic identifier
(function_definition name: (identifier) @function)
(function_call name: (identifier) @function)

; Parameters
(parameter (identifier) @variable)

; Labels
(label name: (identifier) @label)

; Hotkeys
(hotkey) @keyword

; Directives
(directive) @preproc

; Identifiers (fallback - must be last)
(identifier) @variable
