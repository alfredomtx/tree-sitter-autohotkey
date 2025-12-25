; Test file for command parsing
MsgBox, Hello World
Sleep, 1000
Send, {Enter}
Run, notepad.exe
WinActivate, Notepad
Gui, Show
FileRead, content, file.txt
SetTimer, MyTimer, 1000
Reload
ExitApp
