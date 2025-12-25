; Comments
(comment) @comment
(block_comment) @comment

; Strings
(string) @string

; Numbers
(number) @number

; Keywords
(keyword) @keyword

; Functions - capture the name identifier
(function_definition name: (identifier) @function)
(function_call name: (identifier) @function)

; Parameters
(parameter (identifier) @variable.parameter)

; Labels - capture the name identifier
(label name: (identifier) @label)

; Hotkeys
(hotkey) @keyword

; Directives
(directive) @preproc

; Identifiers (fallback - must be last)
(identifier) @variable
