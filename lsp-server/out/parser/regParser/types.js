"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceInfomation = exports.Parameter = exports.Word = exports.ClassNode = exports.FuncNode = exports.VariableNode = exports.SymbolNode = exports.createToken = exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    // literal
    TokenType[TokenType["number"] = 0] = "number";
    TokenType[TokenType["string"] = 1] = "string";
    TokenType[TokenType["true"] = 2] = "true";
    TokenType[TokenType["false"] = 3] = "false";
    TokenType[TokenType["id"] = 4] = "id";
    // equals
    TokenType[TokenType["aassign"] = 5] = "aassign";
    TokenType[TokenType["equal"] = 6] = "equal";
    TokenType[TokenType["pluseq"] = 7] = "pluseq";
    TokenType[TokenType["minuseq"] = 8] = "minuseq";
    TokenType[TokenType["multieq"] = 9] = "multieq";
    TokenType[TokenType["diveq"] = 10] = "diveq";
    TokenType[TokenType["idiveq"] = 11] = "idiveq";
    TokenType[TokenType["sconneq"] = 12] = "sconneq";
    TokenType[TokenType["oreq"] = 13] = "oreq";
    TokenType[TokenType["andeq"] = 14] = "andeq";
    TokenType[TokenType["xoreq"] = 15] = "xoreq";
    TokenType[TokenType["rshifteq"] = 16] = "rshifteq";
    TokenType[TokenType["lshifteq"] = 17] = "lshifteq";
    TokenType[TokenType["regeq"] = 18] = "regeq";
    // triple
    /**
     * mark: ?
     */
    TokenType[TokenType["question"] = 19] = "question";
    // binary
    TokenType[TokenType["sconnect"] = 20] = "sconnect";
    TokenType[TokenType["plus"] = 21] = "plus";
    TokenType[TokenType["minus"] = 22] = "minus";
    TokenType[TokenType["multi"] = 23] = "multi";
    TokenType[TokenType["div"] = 24] = "div";
    TokenType[TokenType["idiv"] = 25] = "idiv";
    TokenType[TokenType["power"] = 26] = "power";
    TokenType[TokenType["and"] = 27] = "and";
    TokenType[TokenType["or"] = 28] = "or";
    TokenType[TokenType["xor"] = 29] = "xor";
    TokenType[TokenType["not"] = 30] = "not";
    TokenType[TokenType["logicand"] = 31] = "logicand";
    TokenType[TokenType["logicor"] = 32] = "logicor";
    TokenType[TokenType["notEqual"] = 33] = "notEqual";
    TokenType[TokenType["greaterEqual"] = 34] = "greaterEqual";
    TokenType[TokenType["greater"] = 35] = "greater";
    TokenType[TokenType["lessEqual"] = 36] = "lessEqual";
    TokenType[TokenType["less"] = 37] = "less";
    // paren
    TokenType[TokenType["openBrace"] = 38] = "openBrace";
    TokenType[TokenType["closeBrace"] = 39] = "closeBrace";
    TokenType[TokenType["openBracket"] = 40] = "openBracket";
    TokenType[TokenType["closeBracket"] = 41] = "closeBracket";
    TokenType[TokenType["openParen"] = 42] = "openParen";
    TokenType[TokenType["closeParen"] = 43] = "closeParen";
    // comment
    TokenType[TokenType["lineComment"] = 44] = "lineComment";
    TokenType[TokenType["openMultiComment"] = 45] = "openMultiComment";
    TokenType[TokenType["closeMultiComment"] = 46] = "closeMultiComment";
    // marks
    TokenType[TokenType["sharp"] = 47] = "sharp";
    TokenType[TokenType["dot"] = 48] = "dot";
    /**
     * mark: ,
     */
    TokenType[TokenType["comma"] = 49] = "comma";
    /**
     * mark: :
     */
    TokenType[TokenType["colon"] = 50] = "colon";
    TokenType[TokenType["hotkey"] = 51] = "hotkey";
    // keyword
    TokenType[TokenType["if"] = 52] = "if";
    TokenType[TokenType["else"] = 53] = "else";
    TokenType[TokenType["switch"] = 54] = "switch";
    TokenType[TokenType["case"] = 55] = "case";
    TokenType[TokenType["do"] = 56] = "do";
    TokenType[TokenType["loop"] = 57] = "loop";
    TokenType[TokenType["while"] = 58] = "while";
    TokenType[TokenType["until"] = 59] = "until";
    TokenType[TokenType["break"] = 60] = "break";
    TokenType[TokenType["continue"] = 61] = "continue";
    TokenType[TokenType["try"] = 62] = "try";
    TokenType[TokenType["catch"] = 63] = "catch";
    TokenType[TokenType["finally"] = 64] = "finally";
    TokenType[TokenType["gosub"] = 65] = "gosub";
    TokenType[TokenType["goto"] = 66] = "goto";
    TokenType[TokenType["return"] = 67] = "return";
    TokenType[TokenType["global"] = 68] = "global";
    TokenType[TokenType["local"] = 69] = "local";
    TokenType[TokenType["throw"] = 70] = "throw";
    TokenType[TokenType["class"] = 71] = "class";
    TokenType[TokenType["extends"] = 72] = "extends";
    TokenType[TokenType["new"] = 73] = "new";
    TokenType[TokenType["static"] = 74] = "static";
    TokenType[TokenType["keyand"] = 75] = "keyand";
    TokenType[TokenType["keyor"] = 76] = "keyor";
    TokenType[TokenType["keynot"] = 77] = "keynot";
    TokenType[TokenType["command"] = 78] = "command";
    TokenType[TokenType["drective"] = 79] = "drective";
    // file
    TokenType[TokenType["EOL"] = 80] = "EOL";
    TokenType[TokenType["EOF"] = 81] = "EOF";
    // error
    TokenType[TokenType["unknown"] = 82] = "unknown";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
;
function createToken(type, content, start, end) {
    return { type: type, content, start, end };
}
exports.createToken = createToken;
class SymbolNode {
    constructor(name, kind, range, subnode) {
        this.name = name;
        this.kind = kind;
        this.range = range;
        if (subnode) {
            this.subnode = subnode;
        }
    }
}
exports.SymbolNode = SymbolNode;
class VariableNode extends SymbolNode {
    constructor(name, kind, range, refname, subnode) {
        super(name, kind, range, subnode);
        this.refname = refname;
    }
}
exports.VariableNode = VariableNode;
class FuncNode extends SymbolNode {
    constructor(name, kind, range, params, subnode) {
        super(name, kind, range, subnode);
        this.params = params;
    }
}
exports.FuncNode = FuncNode;
class ClassNode extends SymbolNode {
    constructor(name, kind, range, subnode, extendsName = ['prototype']) {
        super(name, kind, range, subnode);
        this.extends = extendsName;
    }
}
exports.ClassNode = ClassNode;
var Word;
(function (Word) {
    function create(name, range) {
        return {
            name: name,
            range: range
        };
    }
    Word.create = create;
})(Word = exports.Word || (exports.Word = {}));
var Parameter;
(function (Parameter) {
    function create(name) {
        return { name: name };
    }
    Parameter.create = create;
})(Parameter = exports.Parameter || (exports.Parameter = {}));
var ReferenceInfomation;
(function (ReferenceInfomation) {
    function create(name, line) {
        return {
            name: name,
            line: line
        };
    }
    ReferenceInfomation.create = create;
})(ReferenceInfomation = exports.ReferenceInfomation || (exports.ReferenceInfomation = {}));
//# sourceMappingURL=types.js.map