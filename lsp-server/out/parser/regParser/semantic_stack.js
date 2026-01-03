"use strict";
/**
 * Generate a parse stack of parsing process,
 * not for a real parser.
 * But, for language server providers.
 * Only parse a line.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticStack = exports.isExpr = void 0;
const types_1 = require("./types");
const tokenizer_1 = require("./tokenizer");
const asttypes_1 = require("./asttypes");
function isExpr(node) {
    if (node['right'] === undefined) {
        return false;
    }
    return true;
}
exports.isExpr = isExpr;
class SemanticStack {
    constructor(document) {
        this.tokenizer = new tokenizer_1.Tokenizer(document);
        this.currentToken = this.tokenizer.GetNextToken();
    }
    reset(document) {
        this.tokenizer.Reset(document);
        return this;
    }
    inType(actualt, expectts) {
        for (const t of expectts) {
            if (actualt === t) {
                return true;
            }
        }
        return false;
    }
    eat(type) {
        if (type === this.currentToken.type) {
            this.currentToken = this.tokenizer.GetNextToken();
        }
        else {
            throw new Error("Unexpect Token");
        }
    }
    variable() {
        let token = this.currentToken;
        this.eat(types_1.TokenType.id);
        return {
            errors: false,
            value: {
                name: token.content,
                token: token,
                offrange: new asttypes_1.Offrange(token.start, token.end)
            }
        };
    }
    literal() {
        let token = this.currentToken;
        if (this.currentToken.type === types_1.TokenType.string) {
            this.eat(types_1.TokenType.string);
        }
        else if (this.currentToken.type === types_1.TokenType.number) {
            this.eat(types_1.TokenType.number);
        }
        return {
            errors: false,
            value: {
                token: token,
                value: token.content,
                offrange: new asttypes_1.Offrange(token.start, token.end)
            }
        };
    }
    associativeArray() {
        const start = this.currentToken.start;
        let error = false;
        let pairs = [];
        this.eat(types_1.TokenType.openBrace);
        try {
            let key = this.expr();
            this.eat(types_1.TokenType.colon);
            let value = this.expr();
            pairs.push({
                key: key,
                value: value
            });
            while (this.currentToken.type === types_1.TokenType.comma) {
                this.eat(types_1.TokenType.comma);
                let key = this.expr();
                this.eat(types_1.TokenType.colon);
                let value = this.expr();
                pairs.push({
                    key: key,
                    value: value
                });
            }
            this.eat(types_1.TokenType.closeBrace);
        }
        catch (err) {
            error = true;
        }
        // FIXME: correct end range
        // 出错就随便设个末尾范围
        const end = error ? this.currentToken.start : this.currentToken.end;
        return {
            errors: error,
            value: {
                Pairs: pairs,
                offrange: new asttypes_1.Offrange(start, end)
            }
        };
    }
    array() {
        const start = this.currentToken.start;
        let error = false;
        let items = [];
        this.eat(types_1.TokenType.openBracket);
        try {
            let item = this.expr();
            items.push(item);
            while (this.currentToken.type === types_1.TokenType.comma) {
                this.eat(types_1.TokenType.comma);
                item = this.expr();
                items.push(item);
            }
            this.eat(types_1.TokenType.closeBracket);
        }
        catch (err) {
            error = true;
        }
        // FIXME: correct end range
        // 出错就随便设个末尾范围
        const end = error ? this.currentToken.start : this.currentToken.end;
        return {
            errors: error,
            value: {
                items: items,
                offrange: new asttypes_1.Offrange(start, end)
            }
        };
    }
    classNew() {
        this.eat(types_1.TokenType.new);
        const token = this.currentToken;
        // new a class like a function call
        if (this.tokenizer.currChar === '(') {
            let node = this.funcCall();
            return {
                errors: node.errors,
                value: new asttypes_1.MethodCall('__New', node.value.actualParams, node.value.token, [node.value.token], node.value.offrange)
            };
        }
        // new a class like a class call
        else if (this.tokenizer.currChar === '.') {
            let node = this.classCall();
            let vnode = node.value;
            vnode.ref.push(vnode.token);
            if (vnode instanceof asttypes_1.MethodCall) {
                return {
                    errors: node.errors,
                    value: new asttypes_1.MethodCall('__New', vnode.actualParams, vnode.token, vnode.ref, vnode.offrange)
                };
            }
            else {
                return {
                    errors: node.errors,
                    value: new asttypes_1.MethodCall('__New', [], // new like property call does not have parameters
                    vnode.token, vnode.ref, vnode.offrange)
                };
            }
        }
        // new a class just by it name
        else {
            if (token.type === types_1.TokenType.id) {
                this.eat(types_1.TokenType.id);
                return {
                    errors: false,
                    value: new asttypes_1.MethodCall('__New', [], // new like property call does not have parameters
                    token, [token], new asttypes_1.Offrange(token.start, token.end))
                };
            }
            else {
                // got wrong in new class
                return {
                    errors: true,
                    value: new asttypes_1.MethodCall('__New', [], // new like property call does not have parameters
                    types_1.createToken(types_1.TokenType.unknown, '', token.start, token.end), [], new asttypes_1.Offrange(token.start, token.end))
                };
            }
        }
    }
    // For this is simple parser, we don't care about operator level
    factor() {
        let token = this.currentToken;
        let node;
        switch (this.currentToken.type) {
            case types_1.TokenType.string:
            case types_1.TokenType.number:
                return this.literal();
            case types_1.TokenType.plus:
            case types_1.TokenType.minus:
                this.eat(this.currentToken.type);
                let exp = this.expr();
                return {
                    errors: false,
                    value: {
                        operator: token,
                        expr: exp,
                        offrange: new asttypes_1.Offrange(token.start, exp.value.offrange.end)
                    }
                };
            case types_1.TokenType.new:
                return this.classNew();
            case types_1.TokenType.openParen:
                this.eat(types_1.TokenType.openParen);
                node = this.expr();
                this.eat(types_1.TokenType.closeParen);
                return node;
            case types_1.TokenType.openBracket:
                return this.array();
            case types_1.TokenType.openBrace:
                return this.associativeArray();
            default:
                switch (this.tokenizer.currChar) {
                    case '(':
                        node = this.funcCall();
                        break;
                    case '.':
                        node = this.classCall();
                        break;
                    default:
                        node = this.variable();
                        break;
                }
                return node;
        }
    }
    expr() {
        // while (this.currentToken.type !== TokenType.id && this.currentToken.type !== TokenType.comma) {
        //     this.eat(this.currentToken.type);
        // }
        try {
            let left = this.factor();
            let node = {
                errors: left.errors,
                value: left.value
            };
            while ((this.currentToken.type >= types_1.TokenType.number && // all allowed operator
                this.currentToken.type <= types_1.TokenType.less) ||
                (this.currentToken.type === types_1.TokenType.dot) ||
                (this.currentToken.type === types_1.TokenType.unknown)) {
                let token = this.currentToken;
                // Implicit connection expression
                if (this.currentToken.type >= types_1.TokenType.number && this.currentToken.type <= types_1.TokenType.id) {
                    token = {
                        content: '',
                        type: types_1.TokenType.unknown,
                        start: this.currentToken.start,
                        end: this.currentToken.start
                    };
                }
                // temporary solution for "? :" experssion
                if (this.currentToken.type === types_1.TokenType.question) {
                    this.eat(types_1.TokenType.question);
                    const right = this.expr();
                    try {
                        this.eat(types_1.TokenType.colon);
                    }
                    finally {
                        node = {
                            errors: right.errors,
                            value: {
                                left: left,
                                operator: token,
                                right: right,
                                offrange: new asttypes_1.Offrange(token.start, right.value.offrange.end)
                            }
                        };
                    }
                }
                this.eat(this.currentToken.type);
                const right = this.expr();
                node = {
                    errors: right.errors,
                    value: {
                        left: left,
                        operator: token,
                        right: right,
                        offrange: new asttypes_1.Offrange(token.start, right.value.offrange.end)
                    }
                };
            }
            return node;
        }
        catch (err) {
            return {
                errors: true,
                value: new asttypes_1.NoOption(new asttypes_1.Offrange(this.currentToken.start, this.currentToken.end))
            };
        }
    }
    assignment() {
        let left;
        if (this.tokenizer.currChar === '.') {
            left = this.classCall();
        }
        left = this.variable();
        let isWrong = false;
        let token = this.currentToken;
        if (this.currentToken.type === types_1.TokenType.aassign) {
            this.eat(types_1.TokenType.aassign);
        }
        try {
            this.eat(types_1.TokenType.equal);
            // FIXME: tokenizor should only generate string token here
        }
        catch (err) {
            isWrong = true;
        }
        let exprNode = this.expr();
        return {
            errors: isWrong,
            value: {
                left: left,
                operator: token,
                right: exprNode,
                offrange: new asttypes_1.Offrange(token.start, exprNode.value.offrange.end)
            }
        };
    }
    commandCall() {
        let token = this.currentToken;
        let cmdName = token.content;
        let iserror = false;
        this.eat(types_1.TokenType.command);
        let actualParams = [];
        while (this.currentToken.type === types_1.TokenType.comma) {
            // '% ' deref maybe not a regular syntax
            // set flag by syntax parser maybe the only way
            // to parse without wrong, said T_T 
            this.tokenizer.setLiteralDeref(false);
            this.eat(types_1.TokenType.comma);
            actualParams.push(this.expr());
        }
        const end = this.currentToken.end;
        return {
            errors: iserror,
            value: new asttypes_1.CommandCall(cmdName, actualParams, token, new asttypes_1.Offrange(token.start, end))
        };
    }
    funcCall() {
        let token = this.currentToken;
        let funcName = token.content;
        let iserror = false;
        this.eat(types_1.TokenType.id);
        this.eat(types_1.TokenType.openParen);
        let actualParams = [];
        if (this.currentToken.type !== types_1.TokenType.closeParen) {
            actualParams.push(this.expr());
        }
        while (this.currentToken.type === types_1.TokenType.comma) {
            this.eat(types_1.TokenType.comma);
            actualParams.push(this.expr());
        }
        const end = this.currentToken.end;
        try {
            this.eat(types_1.TokenType.closeParen);
        }
        catch (err) {
            iserror = true;
        }
        return {
            errors: iserror,
            value: new asttypes_1.FunctionCall(funcName, actualParams, token, new asttypes_1.Offrange(token.start, end))
        };
    }
    classCall() {
        let classref = [this.currentToken];
        this.eat(types_1.TokenType.id);
        this.eat(types_1.TokenType.dot);
        while (this.currentToken.type === types_1.TokenType.id && this.tokenizer.currChar === '.') {
            classref.push(this.currentToken);
            this.eat(types_1.TokenType.id);
            this.eat(types_1.TokenType.dot);
        }
        let token = this.currentToken;
        if (this.currentToken.type === types_1.TokenType.id) {
            if (this.tokenizer.currChar === '(') {
                let callNode = this.funcCall();
                callNode.value.offrange.start = classref[0].start;
                return {
                    errors: callNode.errors,
                    value: new asttypes_1.MethodCall(callNode.value.name, callNode.value.actualParams, callNode.value.token, classref, callNode.value.offrange)
                };
            }
            this.eat(types_1.TokenType.id);
            return {
                errors: false,
                value: new asttypes_1.PropertCall(token.content, token, classref, new asttypes_1.Offrange(classref[0].start, token.end))
            };
        }
        return {
            errors: true,
            value: new asttypes_1.PropertCall(this.currentToken.content, this.currentToken, classref, new asttypes_1.Offrange(classref[0].start, token.end))
        };
    }
    statement() {
        // let node: any;
        // Start at first id
        while (this.currentToken.type !== types_1.TokenType.id
            && this.currentToken.type !== types_1.TokenType.command) {
            if (this.currentToken.type === types_1.TokenType.EOF) {
                return undefined;
            }
            this.eat(this.currentToken.type);
        }
        switch (this.currentToken.type) {
            case types_1.TokenType.id:
                if (this.tokenizer.currChar === '(') {
                    return this.funcCall();
                }
                else if (this.tokenizer.currChar === '.') {
                    let left = this.classCall();
                    if (left.value instanceof asttypes_1.PropertCall &&
                        this.inType(this.currentToken.type, [
                            types_1.TokenType.equal,
                            types_1.TokenType.aassign
                        ])) {
                        let token = this.currentToken;
                        this.eat(this.currentToken.type);
                        let exprNode = this.expr();
                        return {
                            errors: false,
                            value: {
                                left: left,
                                operator: token,
                                right: exprNode,
                                offrange: new asttypes_1.Offrange(left.value.offrange.start, exprNode.value.offrange.end)
                            }
                        };
                    }
                    return left;
                }
                else {
                    return this.assignment();
                }
            case types_1.TokenType.command:
                return this.commandCall();
            // default:
            //     return []
            //     break;
        }
    }
}
exports.SemanticStack = SemanticStack;
//# sourceMappingURL=semantic_stack.js.map