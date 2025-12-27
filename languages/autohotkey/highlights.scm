; Identifiers (fallback - FIRST so others override)
(identifier) @variable

; Comments
(comment) @comment
(block_comment) @comment
(doc_comment) @comment

; Strings
(string) @string

; Continuation sections - multiline string content
(continuation_section) @string

; Escape sequences within strings
(escape_sequence) @string.escape

; Numbers
(number) @number

; Keywords
(keyword) @keyword

; Return statement
(return_statement) @keyword

; Boolean literals
(boolean) @constant.builtin

; Control flow keywords
(if_statement "if" @keyword)
(else_clause "else" @keyword)
(while_statement "while" @keyword)
(loop_statement "loop" @keyword)
(loop_statement "," @punctuation.delimiter)
(loop_type) @keyword
(for_statement "for" @keyword)
(for_statement "in" @keyword)
(try_statement "try" @keyword)
(catch_clause "catch" @keyword)
(catch_clause exception: (identifier) @variable.parameter)
(finally_clause "finally" @keyword)

; Switch statements
(switch_statement "switch" @keyword)
(switch_statement "{" @punctuation.bracket)
(switch_statement "}" @punctuation.bracket)
(case_clause "case" @keyword)
(case_clause ":" @punctuation.delimiter)
(default_clause "default" @keyword)
(default_clause ":" @punctuation.delimiter)

; Statement blocks
(statement_block "{" @punctuation.bracket)
(statement_block "}" @punctuation.bracket)

; Parenthesized expressions
(parenthesized_expression "(" @punctuation.bracket)
(parenthesized_expression ")" @punctuation.bracket)

; Operators - match in all contexts they appear

; Standalone operator rule
(operator) @operator

; Assignment operators
(assignment_expression ":=" @operator)
(assignment_expression "+=" @operator)
(assignment_expression "-=" @operator)
(assignment_expression "*=" @operator)
(assignment_expression "/=" @operator)
(assignment_expression ".=" @operator)

; Binary operators - Logical
(binary_expression "||" @operator)
(binary_expression "&&" @operator)
; Note: 'or', 'and', 'not' are case-insensitive regex patterns in the grammar
; and cannot be matched by literal string in queries

; Binary operators - Bitwise
(binary_expression "|" @operator)
(binary_expression "^" @operator)
(binary_expression "&" @operator)
(binary_expression "<<" @operator)
(binary_expression ">>" @operator)

; Binary operators - Equality
(binary_expression "=" @operator)
(binary_expression "==" @operator)
(binary_expression "!=" @operator)
(binary_expression "<>" @operator)

; Binary operators - Comparison
(binary_expression "<" @operator)
(binary_expression ">" @operator)
(binary_expression "<=" @operator)
(binary_expression ">=" @operator)

; Binary operators - Arithmetic
(binary_expression "+" @operator)
(binary_expression "-" @operator)
(binary_expression "*" @operator)
(binary_expression "/" @operator)
(binary_expression "//" @operator)
(binary_expression "%" @operator)
(binary_expression "**" @operator)

; Binary operators - Concatenation
(binary_expression "." @operator)

; Unary operators
(unary_expression "!" @operator)
(unary_expression "~" @operator)
(unary_expression "-" @operator)

; Ternary operator
(ternary_expression "?" @operator)
(ternary_expression ":" @operator)

; Hotkeys
(hotkey) @keyword

; Hotstrings
(hotstring_definition ":" @punctuation.delimiter)
(hotstring_definition "::" @punctuation.delimiter)
(hotstring_trigger) @string.special
(hotstring_options) @attribute
(hotstring_replacement) @string

; Directives - use @attribute instead of @preproc
(directive) @attribute
(directive name: (identifier) @attribute)
(directive_arguments) @string.special

; Conditional directives (#if)
; The #if keyword is highlighted as attribute, inner expressions use standard rules
(if_directive) @attribute

; Window conditional directives (#IfWinActive, #IfWinExist, etc.)
(if_win_directive) @attribute
(if_win_directive (if_win_type) @attribute)
(if_win_directive (if_win_title) @string.special)
(if_win_directive (if_win_title (string) @string))
(if_win_directive (if_win_text) @string.special)

; Functions
(function_definition . (identifier) @function)
(function_call . (identifier) @function)

; Member expressions - property access
(member_expression property: (identifier) @property)

; Method calls
(method_call method: (identifier) @function.method)

; Command names (identifier in command position gets highlighted as function)
(command name: (identifier) @function)

; Built-in commands (known AHK commands highlighted as function.builtin via #match?)
; GUI/Dialog commands
((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(MsgBox|InputBox|ToolTip|TrayTip|Progress|Gui|GuiControl|GuiControlGet|Menu)$"))

; Input/Output commands
((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(Send|SendInput|SendRaw|SendEvent|SendPlay|SendLevel|Click|MouseClick|MouseClickDrag|MouseGetPos|MouseMove|KeyWait|Input|Hotkey)$"))

; Flow control commands
((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(Sleep|SetTimer|Pause|Suspend|Thread|Run|RunWait|RunAs|Reload|ExitApp|Exit|Shutdown)$"))

; Standalone flow control (highlighted as keywords like return/break)
((identifier) @keyword
 (#match? @keyword "^(?i)(Reload|Exit|ExitApp|Pause|Suspend|Critical|Thread)$"))

; Standalone debug commands (highlighted as function.builtin)
((identifier) @function.builtin
 (#match? @function.builtin "^(?i)(KeyHistory|ListHotkeys|ListLines|ListVars)$"))

; Window management commands
((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(WinActivate|WinActivateBottom|WinWait|WinWaitActive|WinWaitClose|WinClose|WinKill|WinMinimize|WinMaximize|WinRestore)$"))

((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(WinMinimizeAll|WinMinimizeAllUndo|WinHide|WinShow|WinMove|WinSet|WinSetTitle|WinMenuSelectItem)$"))

; Control commands
((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(Control|ControlClick|ControlFocus|ControlGet|ControlGetFocus|ControlGetPos|ControlGetText|ControlMove|ControlSend|ControlSendRaw|ControlSetText)$"))

; File operations commands
((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(FileRead|FileReadLine|FileAppend|FileDelete|FileCopy|FileMove|FileCopyDir|FileMoveDir|FileCreateDir|FileRemoveDir)$"))

((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(FileCreateShortcut|FileGetShortcut|FileGetAttrib|FileSetAttrib|FileGetSize|FileGetTime|FileGetVersion|FileSetTime)$"))

((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(FileSelectFile|FileSelectFolder|FileRecycle|FileRecycleEmpty)$"))

; Registry and INI commands
((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(RegRead|RegWrite|RegDelete|IniRead|IniWrite|IniDelete)$"))

; String manipulation commands (legacy)
((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(StringCaseSense|StringGetPos|StringLeft|StringRight|StringMid|StringLower|StringUpper|StringLen|StringReplace|StringSplit|StringTrimLeft|StringTrimRight)$"))

; Legacy conditional commands
((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(IfEqual|IfNotEqual|IfLess|IfLessOrEqual|IfGreater|IfGreaterOrEqual|IfExist|IfNotExist|IfInString|IfNotInString|IfMsgBox)$"))

((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(IfWinExist|IfWinNotExist|IfWinActive|IfWinNotActive)$"))

; Configuration commands
((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(SetWorkingDir|CoordMode|SetFormat|SetBatchLines|SetDefaultMouseSpeed|SetWinDelay|SetControlDelay|SetKeyDelay|SetMouseDelay)$"))

((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(SetTitleMatchMode|SetRegView|SetStoreCapsLockMode|SetCapsLockState|SetNumLockState|SetScrollLockState|AutoTrim|DetectHiddenWindows|DetectHiddenText)$"))

; Sound commands
((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(SoundBeep|SoundGet|SoundPlay|SoundSet)$"))

; Group commands
((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(GroupActivate|GroupAdd|GroupClose|GroupDeactivate)$"))

; Other commands
((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(BlockInput|Drive|DriveGet|DriveSpaceFree|Edit|KeyHistory|ListHotkeys|ListLines|ListVars)$"))

((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(Process|Random|Sort|Transform|UrlDownloadToFile|ClipWait|EnvGet|EnvSet|EnvUpdate|FormatTime)$"))

((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(SplitPath|StatusBarGetText|StatusBarWait|SysGet|WinGet|WinGetActiveStats|WinGetActiveTitle|WinGetClass|WinGetPos|WinGetText|WinGetTitle)$"))

((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(PostMessage|SendMessage|OnMessage|DllCall|NumGet|NumPut|VarSetCapacity)$"))

((command name: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(ComObjCreate|ComObjGet|ComObjConnect|ComObjError|ObjAddRef|ObjRelease|ObjBindMethod|ObjRawSet)$"))

; Variable references in commands
(variable_ref (identifier) @variable)
(variable_ref "%" @punctuation.special)

; Built-in variables (via #match? - highlights identifiers matching A_* patterns)
; Script properties
((identifier) @variable.special
 (#match? @variable.special "^(?i)A_(ScriptDir|ScriptName|ScriptFullPath|ScriptHwnd|WorkingDir|InitialWorkingDir|Args|LineNumber|LineFile|ThisFunc|ThisLabel|AhkVersion|AhkPath|IsUnicode|IsCompiled|ExitReason)$"))

; Date and time
((identifier) @variable.special
 (#match? @variable.special "^(?i)A_(Now|NowUTC|YYYY|MM|DD|MMMM|MMM|DDDD|DDD|WDay|YDay|YWeek|Hour|Min|Sec|MSec|TickCount)$"))

; Script settings
((identifier) @variable.special
 (#match? @variable.special "^(?i)A_(IsSuspended|IsPaused|IsCritical|BatchLines|ListLines|TitleMatchMode|TitleMatchModeSpeed|DetectHiddenWindows|DetectHiddenText|AutoTrim|StringCaseSense|FileEncoding|FormatInteger|FormatFloat)$"))

((identifier) @variable.special
 (#match? @variable.special "^(?i)A_(SendMode|SendLevel|StoreCapsLockMode|KeyDelay|KeyDuration|KeyDelayPlay|KeyDurationPlay|WinDelay|ControlDelay|MouseDelay|MouseDelayPlay|DefaultMouseSpeed)$"))

((identifier) @variable.special
 (#match? @variable.special "^(?i)A_(CoordModeToolTip|CoordModePixel|CoordModeMouse|CoordModeCaret|CoordModeMenu|RegView|IconHidden|IconTip|IconFile|IconNumber)$"))

; User idle time
((identifier) @variable.special
 (#match? @variable.special "^(?i)A_(TimeIdle|TimeIdlePhysical|TimeIdleKeyboard|TimeIdleMouse)$"))

; GUI windows
((identifier) @variable.special
 (#match? @variable.special "^(?i)A_(DefaultGui|DefaultListView|DefaultTreeView|Gui|GuiControl|GuiWidth|GuiHeight|GuiX|GuiY|GuiEvent|GuiControlEvent|EventInfo)$"))

; Hotkeys, hotstrings, menus
((identifier) @variable.special
 (#match? @variable.special "^(?i)A_(ThisMenuItem|ThisMenu|ThisMenuItemPos|ThisHotkey|PriorHotkey|PriorKey|TimeSinceThisHotkey|TimeSincePriorHotkey|EndChar)$"))

; OS and user info
((identifier) @variable.special
 (#match? @variable.special "^(?i)(A_ComSpec|ComSpec|A_Temp|A_OSType|A_OSVersion|A_Is64bitOS|A_PtrSize|A_Language|A_ComputerName|A_UserName|A_WinDir|A_ProgramFiles)$"))

((identifier) @variable.special
 (#match? @variable.special "^(?i)A_(AppData|AppDataCommon|Desktop|DesktopCommon|StartMenu|StartMenuCommon|Programs|ProgramsCommon|Startup|StartupCommon|MyDocuments|IsAdmin)$"))

((identifier) @variable.special
 (#match? @variable.special "^(?i)A_(ScreenWidth|ScreenHeight|ScreenDPI|IPAddress1|IPAddress2|IPAddress3|IPAddress4)$"))

; Special characters and misc
((identifier) @variable.special
 (#match? @variable.special "^(?i)(A_Space|A_Tab|A_Cursor|A_CaretX|A_CaretY|A_Clipboard|Clipboard|ClipboardAll|A_LastError|True|False|ErrorLevel)$"))

; Loop variables
((identifier) @variable.special
 (#match? @variable.special "^(?i)A_(Index|LoopFileName|LoopFileExt|LoopFileFullPath|LoopFileLongPath|LoopFileShortPath|LoopFileShortName|LoopFileDir)$"))

((identifier) @variable.special
 (#match? @variable.special "^(?i)A_(LoopFileTimeModified|LoopFileTimeCreated|LoopFileTimeAccessed|LoopFileAttrib|LoopFileSize|LoopFileSizeKB|LoopFileSizeMB)$"))

((identifier) @variable.special
 (#match? @variable.special "^(?i)A_(LoopRegName|LoopRegType|LoopRegKey|LoopRegSubKey|LoopRegTimeModified|LoopReadLine|LoopField)$"))

; Window matching criteria (WinTitle parameters)
((identifier) @constant.builtin
 (#match? @constant.builtin "^(?i)ahk_(id|class|exe|pid|group)$"))

; Labels
(label . (identifier) @label)

; GUI action highlighting (e.g., MyGui:Add in Gui, MyGui:Add)
(gui_action gui_name: (identifier) @string.special)

; GUI target highlighting (e.g., MyGui: in GuiControl, MyGui:, Control)
; This matches "identifier:," patterns that would otherwise parse as labels during injection
(gui_target gui_name: (identifier) @string.special)

; Drive letter highlighting (e.g., C: in DriveGet commands)
; This matches "X:" patterns that would otherwise parse as labels during injection
(drive_letter) @string.special

; GUI options highlighting (e.g., MyGui:-Caption in Gui, MyGui:-Caption)
; Structured node with gui_name and option fields
(gui_options gui_name: (identifier) @string.special)
(gui_options option: (gui_option_flag) @constant)

; GUI options with space highlighting (e.g., MyGui: +Border in Gui, MyGui: +Border)
(gui_options_spaced gui_name: (identifier) @string.special)
(gui_options_spaced option: (gui_option_flag) @constant)

; GUI option names as identifiers (for option names that follow gui_options - no space variant)
((identifier) @constant
 (#match? @constant "^(?i)(AlwaysOnTop|Border|Caption|Delimiter|Disabled|DPIScale|Hwnd|Label|LastFound|LastFoundExist|MaximizeBox|MinimizeBox|MinSize|MaxSize|OwnDialogs|Owner|Parent|Resize|SysMenu|Theme|ToolWindow)$"))

; GUI sub-commands - highlight known sub-commands as function.builtin
((gui_action action: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)(Add|Show|Submit|Cancel|Hide|Destroy|Font|Color|Margin|Menu|Minimize|Maximize|Restore|Flash|Default|New)$"))

; GUI action with space highlighting (e.g., MyGui: Color in Gui, MyGui: Color)
(gui_action_spaced gui_name: (identifier) @string.special)

; GUI sub-commands in spaced actions - highlight known sub-commands as function.builtin
; Note: The action includes leading whitespace from the token
((gui_action_spaced action: (identifier) @function.builtin)
 (#match? @function.builtin "^(?i)[ \\t]*(Add|Show|Submit|Cancel|Hide|Destroy|Font|Color|Margin|Menu|Minimize|Maximize|Restore|Flash|Default|New|Options)$"))

; GUI option flags (+Option or -Option) - only highlight recognized options
; Token includes +/- prefix, so regex accounts for it
((gui_option_flag) @constant
 (#match? @constant "^(?i)[+-](AlwaysOnTop|Border|Caption|Delimiter|Disabled|DPIScale|Hwnd|Label|LastFound|LastFoundExist|MaximizeBox|MinimizeBox|MinSize|MaxSize|OwnDialogs|Owner|Parent|Resize|SysMenu|Theme|ToolWindow)$"))

; Arrays
(array_literal "[" @punctuation.bracket)
(array_literal "]" @punctuation.bracket)
(index_expression "[" @punctuation.bracket)
(index_expression "]" @punctuation.bracket)

; Object literals
(object_literal "{" @punctuation.bracket)
(object_literal "}" @punctuation.bracket)
(object_property key: (identifier) @property)
(object_property key: (string) @property)
(object_property key: (number) @property)
(object_property ":" @punctuation.delimiter)

; Class definitions
(class_definition "class" @keyword)
(class_definition "extends" @keyword)
(class_definition name: (identifier) @type)
(class_definition parent: (identifier) @type)
(class_definition "{" @punctuation.bracket)
(class_definition "}" @punctuation.bracket)

; Method definitions
(method_definition "static" @keyword)
(method_definition name: (identifier) @function.method)

; Special method names (constructor, destructor, meta-functions)
(method_definition
  name: (identifier) @function.special
  (#match? @function.special "^__(New|Delete|Get|Set|Call)$"))

; Class properties
(class_property "static" @keyword)
(class_property name: (identifier) @property)

; this and base keywords
(this_expression) @variable.builtin
(base_expression) @variable.builtin
