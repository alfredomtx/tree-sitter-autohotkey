; GUI option flags at top level (parsed via injection in command_arguments)

; Single option flag - whole token including +/- is highlighted
+Caption
; <- property

-Border
; <- property

+AlwaysOnTop
; <- property

; Case insensitivity
+CAPTION
; <- property

+caption
; <- property

; Various options
+ToolWindow
; <- property

-SysMenu
; <- property

+Resize
; <- property

+MaximizeBox
; <- property

+MinimizeBox
; <- property

+Disabled
; <- property

+Owner
; <- property

; Invalid options should NOT highlight (typo detection)
; +Cpation would NOT get @property - it's just a gui_option_flag without the match
