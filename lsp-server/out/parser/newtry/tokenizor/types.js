"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenKind = void 0;
/**
 * all result kind of a tokenizor
 */
var TokenKind;
(function (TokenKind) {
    /**
     * tokenizor got a token
     */
    TokenKind[TokenKind["Token"] = 0] = "Token";
    /**
     * tokenizor enconter an error
     */
    TokenKind[TokenKind["Diagnostic"] = 1] = "Diagnostic";
    /**
     * got a comment
     */
    TokenKind[TokenKind["Commnet"] = 2] = "Commnet";
})(TokenKind = exports.TokenKind || (exports.TokenKind = {}));
;
//# sourceMappingURL=types.js.map