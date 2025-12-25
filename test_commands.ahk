; Test file for command parsing - all command groups
MsgBox, Hello World
InputBox, result, Title, Prompt
Sleep, 1000
Send, {Enter}
SendInput, test
Run, notepad.exe
RunWait, calc.exe
WinActivate, Notepad
WinClose, Notepad
FileRead, content, file.txt
FileAppend, data, output.txt
RegRead, value, HKCU, Software\Test
IniRead, val, config.ini, Section, Key
Gui, Show
GuiControl, , MyEdit, NewText
SetTimer, MyLabel, 1000
SetWorkingDir, %A_ScriptDir%
CoordMode, Mouse, Screen
Gosub, MyLabel
Reload
ExitApp
