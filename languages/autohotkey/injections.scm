; Inject AutoHotkey into command_arguments to enable sub-token highlighting
; This allows %var% patterns, gui_action (MyGui:Add), gui_options (MyGui:-Caption),
; and gui_target (MyGui:,) to be parsed and highlighted within command arguments
; Note: gui_target rule in grammar.js prevents "MyGui:," from becoming a false labelMyGui:MyGui:MyGui:
((command_arguments) @injection.content
 (#set! injection.language "autohotkey"))
