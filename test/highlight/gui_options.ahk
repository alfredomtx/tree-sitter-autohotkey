; GUI option flags at top level (parsed via injection in command_arguments)
; Without gui_option_flag in _statement, options parse as operator + identifier
; The identifier gets @constant via #match? rule, +/- gets @operator

; Single option flag - +/- as operator, option name as constant
+Caption
; <- operator
;  ^^^^^^^ constant

-Border
; <- operator
;  ^^^^^ constant

+AlwaysOnTop
; <- operator
;  ^^^^^^^^^^ constant

; Case insensitivity (option names via #match?)
+CAPTION
; <- operator
;  ^^^^^^^ constant

+caption
; <- operator
;  ^^^^^^^ constant

; Various options
+ToolWindow
; <- operator
;  ^^^^^^^^^^ constant

-SysMenu
; <- operator
;  ^^^^^^^ constant

+Resize
; <- operator
;  ^^^^^^ constant

+MaximizeBox
; <- operator
;  ^^^^^^^^^^^ constant

+MinimizeBox
; <- operator
;  ^^^^^^^^^^^ constant

+Disabled
; <- operator
;  ^^^^^^^^ constant

+Owner
; <- operator
;  ^^^^^ constant

; Invalid options should NOT highlight (typo detection)
; +Cpation - + is operator, Cpation is just identifier (no @constant)
