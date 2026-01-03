"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.SyntaxKind = void 0;
var SyntaxKind;
(function (SyntaxKind) {
    SyntaxKind[SyntaxKind["script"] = 0] = "script";
    SyntaxKind[SyntaxKind["stmt"] = 1] = "stmt";
    SyntaxKind[SyntaxKind["expr"] = 2] = "expr";
    SyntaxKind[SyntaxKind["suffixTerm"] = 3] = "suffixTerm";
})(SyntaxKind = exports.SyntaxKind || (exports.SyntaxKind = {}));
class Token {
    constructor(type, content, start, end) {
        this.type = type;
        this.content = content;
        this.start = start;
        this.end = end;
    }
}
exports.Token = Token;
//# sourceMappingURL=types.js.map