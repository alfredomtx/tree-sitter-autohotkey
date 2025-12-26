; Inject AutoHotkey into command_arguments to parse variable references
; This enables highlighting of %var% syntax within commands
((command_arguments) @injection.content
 (#set! injection.language "autohotkey"))
