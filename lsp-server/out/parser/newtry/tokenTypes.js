"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    // operators
    TokenType[TokenType["pplus"] = 0] = "pplus";
    TokenType[TokenType["mminus"] = 1] = "mminus";
    TokenType[TokenType["power"] = 2] = "power";
    TokenType[TokenType["not"] = 3] = "not";
    TokenType[TokenType["bnot"] = 4] = "bnot";
    TokenType[TokenType["multi"] = 5] = "multi";
    TokenType[TokenType["div"] = 6] = "div";
    TokenType[TokenType["fdiv"] = 7] = "fdiv";
    TokenType[TokenType["plus"] = 8] = "plus";
    TokenType[TokenType["minus"] = 9] = "minus";
    TokenType[TokenType["rshift"] = 10] = "rshift";
    TokenType[TokenType["lshift"] = 11] = "lshift";
    TokenType[TokenType["and"] = 12] = "and";
    TokenType[TokenType["xor"] = 13] = "xor";
    TokenType[TokenType["or"] = 14] = "or";
    TokenType[TokenType["sconnect"] = 15] = "sconnect";
    TokenType[TokenType["regeq"] = 16] = "regeq";
    TokenType[TokenType["greater"] = 17] = "greater";
    TokenType[TokenType["greaterEqual"] = 18] = "greaterEqual";
    TokenType[TokenType["less"] = 19] = "less";
    TokenType[TokenType["lessEqual"] = 20] = "lessEqual";
    TokenType[TokenType["equal"] = 21] = "equal";
    TokenType[TokenType["dequal"] = 22] = "dequal";
    TokenType[TokenType["glnequal"] = 23] = "glnequal";
    TokenType[TokenType["notEqual"] = 24] = "notEqual";
    TokenType[TokenType["keynot"] = 25] = "keynot";
    TokenType[TokenType["logicand"] = 26] = "logicand";
    TokenType[TokenType["keyand"] = 27] = "keyand";
    TokenType[TokenType["keyor"] = 28] = "keyor";
    TokenType[TokenType["logicor"] = 29] = "logicor";
    TokenType[TokenType["question"] = 30] = "question";
    TokenType[TokenType["aassign"] = 31] = "aassign";
    TokenType[TokenType["pluseq"] = 32] = "pluseq";
    TokenType[TokenType["minuseq"] = 33] = "minuseq";
    TokenType[TokenType["multieq"] = 34] = "multieq";
    TokenType[TokenType["diveq"] = 35] = "diveq";
    TokenType[TokenType["idiveq"] = 36] = "idiveq";
    TokenType[TokenType["sconneq"] = 37] = "sconneq";
    TokenType[TokenType["oreq"] = 38] = "oreq";
    TokenType[TokenType["andeq"] = 39] = "andeq";
    TokenType[TokenType["xoreq"] = 40] = "xoreq";
    TokenType[TokenType["rshifteq"] = 41] = "rshifteq";
    TokenType[TokenType["lshifteq"] = 42] = "lshifteq";
    // literal
    TokenType[TokenType["number"] = 43] = "number";
    TokenType[TokenType["string"] = 44] = "string";
    TokenType[TokenType["true"] = 45] = "true";
    TokenType[TokenType["false"] = 46] = "false";
    TokenType[TokenType["id"] = 47] = "id";
    // paren
    TokenType[TokenType["openBrace"] = 48] = "openBrace";
    TokenType[TokenType["closeBrace"] = 49] = "closeBrace";
    TokenType[TokenType["openBracket"] = 50] = "openBracket";
    TokenType[TokenType["closeBracket"] = 51] = "closeBracket";
    TokenType[TokenType["openParen"] = 52] = "openParen";
    TokenType[TokenType["closeParen"] = 53] = "closeParen";
    TokenType[TokenType["precent"] = 54] = "precent";
    // comment
    TokenType[TokenType["lineComment"] = 55] = "lineComment";
    TokenType[TokenType["openMultiComment"] = 56] = "openMultiComment";
    TokenType[TokenType["closeMultiComment"] = 57] = "closeMultiComment";
    // marks
    TokenType[TokenType["sharp"] = 58] = "sharp";
    TokenType[TokenType["dot"] = 59] = "dot";
    /**
     * mark: ,
     */
    TokenType[TokenType["comma"] = 60] = "comma";
    /**
     * mark: :
     */
    TokenType[TokenType["colon"] = 61] = "colon";
    TokenType[TokenType["hotkey"] = 62] = "hotkey";
    // keyword
    TokenType[TokenType["if"] = 63] = "if";
    TokenType[TokenType["else"] = 64] = "else";
    TokenType[TokenType["switch"] = 65] = "switch";
    TokenType[TokenType["case"] = 66] = "case";
    TokenType[TokenType["loop"] = 67] = "loop";
    TokenType[TokenType["while"] = 68] = "while";
    TokenType[TokenType["until"] = 69] = "until";
    TokenType[TokenType["break"] = 70] = "break";
    TokenType[TokenType["continue"] = 71] = "continue";
    TokenType[TokenType["try"] = 72] = "try";
    TokenType[TokenType["catch"] = 73] = "catch";
    TokenType[TokenType["finally"] = 74] = "finally";
    TokenType[TokenType["gosub"] = 75] = "gosub";
    TokenType[TokenType["goto"] = 76] = "goto";
    TokenType[TokenType["return"] = 77] = "return";
    TokenType[TokenType["global"] = 78] = "global";
    TokenType[TokenType["local"] = 79] = "local";
    TokenType[TokenType["throw"] = 80] = "throw";
    TokenType[TokenType["class"] = 81] = "class";
    TokenType[TokenType["extends"] = 82] = "extends";
    TokenType[TokenType["new"] = 83] = "new";
    TokenType[TokenType["static"] = 84] = "static";
    TokenType[TokenType["command"] = 85] = "command";
    TokenType[TokenType["drective"] = 86] = "drective";
    // file
    TokenType[TokenType["EOL"] = 87] = "EOL";
    TokenType[TokenType["EOF"] = 88] = "EOF";
    // error
    TokenType[TokenType["unknown"] = 89] = "unknown";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
//# sourceMappingURL=tokenTypes.js.map