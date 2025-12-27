; Inject AutoHotkey into command_arguments ONLY when they contain %var% patterns
; Conditional injection prevents false label matches (e.g., "Carregando:" in GuiControl)
; Without this filter, "GuiControl, Carregando:, MyProgress" would parse "Carregando:"
; as a label during injection, polluting the symbol picker
((command_arguments) @injection.content
 (#match? @injection.content "%[^%]+%")
 (#set! injection.language "autohotkey"))
