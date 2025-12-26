; Test file for class definition syntax
; Use this to validate highlighting in Zed

; Simple class
class Animal {
    name := ""

    __New(name) {
        this.name := name
    }

    Speak() {
        MsgBox, % this.name " says hello"
    }
}

; Class with inheritance
class Dog extends Animal {
    static count := 0
    breed

    __New(name, breed := "Unknown") {
        base.__New(name)
        Dog.count += 1
        this.breed := breed
    }

    __Delete() {
        Dog.count -= 1
    }

    Speak() {
        MsgBox, % this.name " barks"
    }

    static GetCount() {
        return Dog.count
    }
}

; Nested class example
class Container {
    class Item {
        value := 0

        __New(val) {
            this.value := val
        }
    }

    items := []

    Add(val) {
        item := new Container.Item(val)
        this.items.Push(item)
    }
}

; Meta-functions
class PropertyBag {
    data := {}

    __Get(key) {
        return this.data[key]
    }

    __Set(key, value) {
        this.data[key] := value
        return value
    }

    __Call(method, args*) {
        MsgBox, Called %method%
    }
}

; Usage examples
dog := new Dog("Rex", "German Shepherd")
dog.Speak()

container := new Container()
container.Add(42)

; this and base in expressions
class Example {
    value := 10

    GetValue() {
        return this.value
    }

    GetChained() {
        return this.data.value
    }
}
