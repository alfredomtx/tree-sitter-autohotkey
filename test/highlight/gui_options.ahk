; GUI option flags at top level (parsed via injection in command_arguments)

; Single option flag - whole token including +/- is highlighted
+Caption
; <- attribute

-Border
; <- attribute

+AlwaysOnTop
; <- attribute

; Case insensitivity
+CAPTION
; <- attribute

+caption
; <- attribute

; Various options
+ToolWindow
; <- attribute

-SysMenu
; <- attribute

+Resize
; <- attribute

+MaximizeBox
; <- attribute

+MinimizeBox
; <- attribute

+Disabled
; <- attribute

+Owner
; <- attribute

; Invalid options should NOT highlight (typo detection)
; +Cpation would NOT get @attribute - it's just a gui_option_flag without the match
