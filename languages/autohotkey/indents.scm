; Statement blocks handle all control flow indentation
; (statement_block contains the braces directly - if/else/while/loop/for all use it)
(statement_block "}" @end) @indent

; Function definition has its own braces (not via statement_block)
(function_definition "}" @end) @indent

; Class definition indentation
(class_definition "}" @end) @indent

; Method definition has its own braces
(method_definition "}" @end) @indent

; Switch statement indentation
(switch_statement "}" @end) @indent
