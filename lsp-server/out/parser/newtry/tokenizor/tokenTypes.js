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
    TokenType[TokenType["dot"] = 43] = "dot";
    TokenType[TokenType["comma"] = 44] = "comma";
    // literal
    TokenType[TokenType["string"] = 45] = "string";
    TokenType[TokenType["number"] = 46] = "number";
    TokenType[TokenType["true"] = 47] = "true";
    TokenType[TokenType["false"] = 48] = "false";
    TokenType[TokenType["id"] = 49] = "id";
    // paren
    TokenType[TokenType["openBracket"] = 50] = "openBracket";
    TokenType[TokenType["openParen"] = 51] = "openParen";
    TokenType[TokenType["precent"] = 52] = "precent";
    TokenType[TokenType["openBrace"] = 53] = "openBrace";
    TokenType[TokenType["closeBrace"] = 54] = "closeBrace";
    TokenType[TokenType["closeBracket"] = 55] = "closeBracket";
    TokenType[TokenType["closeParen"] = 56] = "closeParen";
    // marks
    TokenType[TokenType["sharp"] = 57] = "sharp";
    TokenType[TokenType["dollar"] = 58] = "dollar";
    TokenType[TokenType["key"] = 59] = "key";
    /**
     * mark: ':'
     */
    TokenType[TokenType["colon"] = 60] = "colon";
    TokenType[TokenType["hotkey"] = 61] = "hotkey";
    TokenType[TokenType["hotkeyand"] = 62] = "hotkeyand";
    /**
     * ':热字串的修饰符:'
     */
    TokenType[TokenType["hotstringOpen"] = 63] = "hotstringOpen";
    /**
     * '热字串::'
     */
    TokenType[TokenType["hotstringEnd"] = 64] = "hotstringEnd";
    // comment
    TokenType[TokenType["lineComment"] = 65] = "lineComment";
    TokenType[TokenType["blockComment"] = 66] = "blockComment";
    // keyword
    TokenType[TokenType["if"] = 67] = "if";
    TokenType[TokenType["else"] = 68] = "else";
    TokenType[TokenType["switch"] = 69] = "switch";
    TokenType[TokenType["case"] = 70] = "case";
    TokenType[TokenType["loop"] = 71] = "loop";
    TokenType[TokenType["for"] = 72] = "for";
    TokenType[TokenType["in"] = 73] = "in";
    TokenType[TokenType["while"] = 74] = "while";
    TokenType[TokenType["until"] = 75] = "until";
    TokenType[TokenType["break"] = 76] = "break";
    TokenType[TokenType["continue"] = 77] = "continue";
    TokenType[TokenType["try"] = 78] = "try";
    TokenType[TokenType["catch"] = 79] = "catch";
    TokenType[TokenType["finally"] = 80] = "finally";
    TokenType[TokenType["gosub"] = 81] = "gosub";
    TokenType[TokenType["goto"] = 82] = "goto";
    TokenType[TokenType["return"] = 83] = "return";
    TokenType[TokenType["global"] = 84] = "global";
    TokenType[TokenType["local"] = 85] = "local";
    TokenType[TokenType["throw"] = 86] = "throw";
    TokenType[TokenType["class"] = 87] = "class";
    TokenType[TokenType["extends"] = 88] = "extends";
    TokenType[TokenType["new"] = 89] = "new";
    TokenType[TokenType["static"] = 90] = "static";
    TokenType[TokenType["command"] = 91] = "command";
    TokenType[TokenType["drective"] = 92] = "drective";
    TokenType[TokenType["label"] = 93] = "label";
    TokenType[TokenType["implconn"] = 94] = "implconn";
    // file
    TokenType[TokenType["EOL"] = 95] = "EOL";
    TokenType[TokenType["EOF"] = 96] = "EOF";
    // error
    TokenType[TokenType["unknown"] = 97] = "unknown";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
//# sourceMappingURL=tokenTypes.js.map