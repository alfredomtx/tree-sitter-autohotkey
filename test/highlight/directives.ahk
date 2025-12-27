; Include directive
#Include somefile.ahk
; <- attribute

; Include with inline comment
#Include test.ahk ; with comment
; <- attribute
;                 ^ comment

; Include with path
#Include <Library>
; <- attribute

#Include %A_ScriptDir%\lib.ahk
; <- attribute

; Requires directive
#Requires AutoHotkey v2.0
; <- attribute

; SingleInstance directive
#SingleInstance Force
; <- attribute

#SingleInstance Ignore
; <- attribute

; NoTrayIcon directive
#NoTrayIcon
; <- attribute

; Persistent directive
#Persistent
; <- attribute

; InstallKeybdHook directive
#InstallKeybdHook
; <- attribute

; InstallMouseHook directive
#InstallMouseHook
; <- attribute

; UseHook directive
#UseHook
; <- attribute

; MaxThreads directive
#MaxThreads 2
; <- attribute

; MaxThreadsPerHotkey directive
#MaxThreadsPerHotkey 1
; <- attribute

; HotkeyInterval directive
#HotkeyInterval 2000
; <- attribute

; MaxHotkeysPerInterval directive
#MaxHotkeysPerInterval 200
; <- attribute

; Warn directive
#Warn
; <- attribute

#Warn All, MsgBox
; <- attribute

; If directives
#If WinActive("ahk_class Notepad")
; <- attribute

#IfWinActive ahk_class Notepad
; <- attribute

#IfWinExist
; <- attribute
