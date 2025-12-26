; Statement blocks handle all control flow indentation
; (statement_block contains the braces directly - if/else/while/loop/for all use it)
(statement_block "}" @end) @indent

; Function definition has its own braces (not via statement_block)
(function_definition "}" @end) @indent
