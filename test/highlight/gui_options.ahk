; GUI option flags at top level (parsed via injection in command_arguments)

; Single option flag - whole token including +/- is highlighted
+Caption
; <- constant

-Border
; <- constant

+AlwaysOnTop
; <- constant

; Case insensitivity
+CAPTION
; <- constant

+caption
; <- constant

; Various options
+ToolWindow
; <- constant

-SysMenu
; <- constant

+Resize
; <- constant

+MaximizeBox
; <- constant

+MinimizeBox
; <- constant

+Disabled
; <- constant

+Owner
; <- constant

; Invalid options should NOT highlight (typo detection)
; +Cpation would NOT get @constant - it's just a gui_option_flag without the match
