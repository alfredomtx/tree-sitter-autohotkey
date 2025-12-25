; DEBUG: Test if nodes are being produced at all
; Using distinct colors to see what matches

; These should work (they did before)
(comment) @comment
(block_comment) @comment
(string) @string
(number) @number
(keyword) @keyword

; Test if these nodes exist - using obvious colors
(function_definition) @type
(function_call) @type
(label) @tag
(directive) @attribute
(hotkey) @constant

; Fallback
(identifier) @variable
