; main.ahk - Tests cross-file go-to-definition

#Include MyClass.ahk

; Create instance - Ctrl+Click "MyClass" should jump to MyClass.ahk:3
instance := new MyClass("Test")

; Call method
instance.greet()

; Get name
name := instance.getName()
MsgBox, Name is: %name%
