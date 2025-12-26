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

; Member expressions - property access
(member_expression property: (identifier) @property)

; Method calls
(method_call method: (identifier) @function.method)

; Built-in commands
(command_name) @function.builtin

; Built-in variables
(builtin_variable) @variable.special

; Variable references in commands
(variable_ref (identifier) @variable)
(variable_ref (builtin_variable) @variable.special)
(variable_ref "%" @punctuation.special)

; Labels
(label . (identifier) @label)
