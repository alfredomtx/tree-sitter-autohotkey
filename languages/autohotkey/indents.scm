; Function body indentation (Zed style: @indent on node, @end on closing brace)
(function_definition "}" @end) @indent

; Control flow indentation
(if_statement "}" @end) @indent
(else_clause "}" @end) @indent
(while_statement "}" @end) @indent
(loop_statement "}" @end) @indent
(for_statement "}" @end) @indent
