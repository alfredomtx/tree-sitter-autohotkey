; MyClass.ahk - Class definition file

class MyClass {
    __New(name) {
        this.name := name
    }

    greet() {
        MsgBox, Hello from %this.name%!
    }

    getName() {
        return this.name
    }
}
