; Braceless control flow - keywords on same line to avoid comments becoming body
; Testing that keywords highlight correctly in braceless forms

if (x) y := 1
; <- keyword

while (running) DoWork()
;^^^^ keyword

loop 5 count += 1
;^^^ keyword

for item in collection Process(item)
;^^ keyword
;        ^^ keyword

; Braceless if-else on separate lines
if (x) a := 1 else b := 2
; <- keyword
;             ^^^^ keyword
