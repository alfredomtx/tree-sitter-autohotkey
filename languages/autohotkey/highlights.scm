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

; Built-in commands
(command_name) @function.builtin

; Built-in variables
(builtin_variable) @variable.builtin

; Variable references in commands
(variable_ref (identifier) @variable)
(variable_ref (builtin_variable) @variable.builtin)
(variable_ref "%" @punctuation.special)

; Labels
(label . (identifier) @label)
