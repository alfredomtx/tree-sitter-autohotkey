"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoOption = exports.PropertCall = exports.MethodCall = exports.CommandCall = exports.FunctionCall = exports.FunctionDeclaration = exports.ClassDeclaration = exports.Offrange = void 0;
class Offrange {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}
exports.Offrange = Offrange;
// export class InvalidNode implements IASTNode {
// 	public readonly offrange: IOffRange;
// 	public readonly token: Token;
// 	constructor(token: Token, start: Position, end: Position) {
// 		this.token = token;
// 		this.offrange = start;
// 	}
// }
class ClassDeclaration {
    constructor(name, exts, token, block) {
        this.name = name;
        this.exts = exts;
        this.token = token;
        this.block = block;
        this.offrange = {
            start: token.start,
            end: token.end
        };
    }
}
exports.ClassDeclaration = ClassDeclaration;
class FunctionDeclaration {
    constructor(name, parameters, block, token) {
        this.name = name;
        this.parameters = parameters;
        this.block = block;
        this.token = token;
        this.offrange = {
            start: token.start,
            end: token.end
        };
    }
}
exports.FunctionDeclaration = FunctionDeclaration;
class FunctionCall {
    constructor(name, actualParams, token, offrange) {
        this.name = name;
        this.actualParams = actualParams;
        this.token = token;
        this.offrange = offrange;
    }
}
exports.FunctionCall = FunctionCall;
class CommandCall extends FunctionCall {
    constructor(name, actualParams, token, offrange) {
        super(name, actualParams, token, offrange);
    }
}
exports.CommandCall = CommandCall;
class MethodCall extends FunctionCall {
    constructor(name, actualParams, token, ref, offrange) {
        super(name, actualParams, token, offrange);
        this.ref = ref;
    }
}
exports.MethodCall = MethodCall;
class PropertCall {
    constructor(name, token, ref, offrange) {
        this.name = name;
        this.token = token;
        this.ref = ref;
        this.offrange = offrange;
    }
}
exports.PropertCall = PropertCall;
class NoOption {
    constructor(offrange) {
        this.none = null;
        this.offrange = offrange;
    }
}
exports.NoOption = NoOption;
//# sourceMappingURL=asttypes.js.map