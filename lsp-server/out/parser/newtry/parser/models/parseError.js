"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseError = void 0;
class ParseError {
    constructor(token, message) {
        this.token = token;
        this.message = message;
    }
    get start() {
        return this.token.start;
    }
    get end() {
        return this.token.end;
    }
}
exports.ParseError = ParseError;
//# sourceMappingURL=parseError.js.map