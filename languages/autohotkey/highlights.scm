; Comments
(comment) @comment
(block_comment) @comment

; Strings
(string) @string

; Numbers
(number) @number

; Keywords
(keyword) @keyword

; Functions
(function_definition name: (identifier) @function)
(function_call name: (identifier) @function.call)

; Parameters
(parameter (identifier) @variable.parameter)

; Labels
(label name: (identifier) @label)

; Hotkeys
(hotkey) @keyword.special

; Directives
(directive) @keyword.directive

; Identifiers (fallback)
(identifier) @variable
