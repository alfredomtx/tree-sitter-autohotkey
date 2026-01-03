; Test file for LSP features

; Function definition (test go-to-definition)
GetMessage() {
    return "Hello from AutoHotkey"
}

; Another function for testing
Calculate(x, y) {
    return x + y
}

; Function call - Ctrl+Click "GetMessage" should jump to line 4
msg := GetMessage()

; Test calculation
result := Calculate(5, 10)

; Built-in command - hover should show docs
MsgBox, %msg%

; Test variable references
total := result * 2
MsgBox, The total is %total%

; Intentional syntax error - should show red diagnostic
this should cause an error
