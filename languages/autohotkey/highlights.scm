; Identifiers (fallback - FIRST so others override)
(identifier) @variable

; Comments
(comment) @comment
(block_comment) @comment
(doc_comment) @comment

; Strings
(string) @string

; Escape sequences within strings
(escape_sequence) @string.escape

; Numbers
(number) @number

; Keywords
(keyword) @keyword

; Control flow keywords
(if_statement "if" @keyword)
(else_clause "else" @keyword)
(while_statement "while" @keyword)
(loop_statement "loop" @keyword)
(for_statement "for" @keyword)
(for_statement "in" @keyword)
(try_statement "try" @keyword)
(catch_clause "catch" @keyword)
(catch_clause exception: (identifier) @variable.parameter)
(finally_clause "finally" @keyword)

; Statement blocks
(statement_block "{" @punctuation.bracket)
(statement_block "}" @punctuation.bracket)

; Parenthesized expressions
(parenthesized_expression "(" @punctuation.bracket)
(parenthesized_expression ")" @punctuation.bracket)

; Operators
(operator) @operator

; Hotkeys
(hotkey) @keyword

; Hotstrings
(hotstring_definition ":" @punctuation.delimiter)
(hotstring_definition "::" @punctuation.delimiter)
(hotstring_trigger) @string.special
(hotstring_options) @attribute
(hotstring_replacement) @string

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

; Arrays
(array_literal "[" @punctuation.bracket)
(array_literal "]" @punctuation.bracket)
(index_expression "[" @punctuation.bracket)
(index_expression "]" @punctuation.bracket)

; Object literals
(object_literal "{" @punctuation.bracket)
(object_literal "}" @punctuation.bracket)
(object_property key: (identifier) @property)
(object_property key: (string) @property)
(object_property ":" @punctuation.delimiter)

; Class definitions
(class_definition "class" @keyword)
(class_definition "extends" @keyword)
(class_definition name: (identifier) @type)
(class_definition parent: (identifier) @type)
(class_body "{" @punctuation.bracket)
(class_body "}" @punctuation.bracket)

; Method definitions
(method_definition "static" @keyword)
(method_definition name: (identifier) @function.method)

; Special method names (constructor, destructor, meta-functions)
(method_definition
  name: (identifier) @function.special
  (#match? @function.special "^__(New|Delete|Get|Set|Call)$"))

; Class properties
(class_property "static" @keyword)
(class_property name: (identifier) @property)

; this and base keywords
(this_expression) @variable.builtin
(base_expression) @variable.builtin
