"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultParam = exports.Parameter = exports.Param = exports.FuncDef = exports.HotString = exports.Key = exports.Hotkey = exports.Label = exports.ClassDef = exports.OptionalAssginStmt = exports.VarDecl = exports.Decl = void 0;
const tokenTypes_1 = require("../../tokenizor/tokenTypes");
const stringUtils_1 = require("../utils/stringUtils");
const nodeBase_1 = require("./nodeBase");
const stmt_1 = require("./stmt");
class Decl extends stmt_1.Stmt {
    constructor() {
        super();
    }
}
exports.Decl = Decl;
/**
 * Class contains all varible declaration
 */
class VarDecl extends Decl {
    /**
     * varible declaration
     * @param scope varibles' scope
     * @param assigns varibles or assignment related to variables
     */
    constructor(scope, assigns) {
        super();
        this.scope = scope;
        this.assigns = assigns;
    }
    toLines() {
        const scopeLine = this.scope.content;
        const assignsLines = this.assigns.flatMap(assign => assign.toLines());
        assignsLines[0] = scopeLine + assignsLines[0];
        return assignsLines;
    }
    get start() {
        return this.scope.start;
    }
    get end() {
        return this.assigns[this.assigns.length - 1].end;
    }
    get ranges() {
        return [this.scope]
            .concat(this.assigns.flatMap(assign => assign.ranges));
    }
    accept(visitor, parameters) {
        return visitor.visitDeclVariable(this, parameters);
    }
}
exports.VarDecl = VarDecl;
/**
 * Assignment statement for declarations,
 * part of assignment is optional
 */
class OptionalAssginStmt extends stmt_1.Stmt {
    /**
     *
     * @param identifer varible identifer
     * @param assign assign token
     * @param expr expresions
     */
    constructor(identifer, assign, expr) {
        super();
        this.identifer = identifer;
        this.assign = assign;
        this.expr = expr;
    }
    toLines() {
        const idLines = this.identifer.content;
        if (this.assign !== undefined && this.expr !== undefined) {
            const exprLines = this.expr.toLines();
            const assignLines = this.assign.content;
            exprLines[0] = `${idLines} ${assignLines} ${exprLines[0]}`;
            return exprLines;
        }
        else {
            return [idLines];
        }
    }
    get start() {
        return this.identifer.start;
    }
    get end() {
        return this.expr !== undefined ?
            this.expr.end :
            this.identifer.end;
    }
    get ranges() {
        return (this.expr !== undefined && this.assign !== undefined) ?
            [this.identifer, this.assign, this.expr] :
            [this.identifer];
    }
    // optional assign will be process directly, this is to make ts happy.
    accept(visitor, parameters) {
        throw new Error('Method not implemented.');
    }
}
exports.OptionalAssginStmt = OptionalAssginStmt;
class ClassDef extends Decl {
    /**
     * @param classToken class keyword
     * @param name class name
     * @param extendsToken extens keyword
     * @param parentName parent class name
     * @param body body of class
     */
    constructor(classToken, name, body, extendsToken, parentName) {
        super();
        this.classToken = classToken;
        this.name = name;
        this.body = body;
        this.extendsToken = extendsToken;
        this.parentName = parentName;
    }
    toLines() {
        const defLine = [`${this.classToken.content} ${this.name.content}`];
        if (this.extendsToken !== undefined && this.parentName !== undefined) {
            defLine[0] += `${this.extendsToken.content} ${this.parentName.content}`;
        }
        const block = this.body.toLines();
        return stringUtils_1.joinLines(' ', defLine, block);
    }
    get start() {
        return this.classToken.start;
    }
    get end() {
        return this.body.end;
    }
    get ranges() {
        return (this.extendsToken !== undefined && this.parentName !== undefined) ?
            [this.classToken, this.name, this.extendsToken, this.parentName, ...this.body.ranges] :
            [this.classToken, this.name, ...this.body.ranges];
    }
    accept(visitor, parameters) {
        return visitor.visitDeclClass(this, parameters);
    }
}
exports.ClassDef = ClassDef;
class Label extends Decl {
    /**
     * @param name name of Label
     */
    constructor(name) {
        super();
        this.name = name;
    }
    toLines() {
        const idLines = this.name.content;
        return [`${idLines}:`];
    }
    get start() {
        return this.name.start;
    }
    get end() {
        return this.name.end;
    }
    get ranges() {
        return [this.name];
    }
    accept(visitor, parameters) {
        return visitor.visitDeclLabel(this, parameters);
    }
}
exports.Label = Label;
class Hotkey extends Decl {
    /**
     *
     * @param key1 First hotkey
     * @param and '&' token
     * @param key2 Second hotkey
     */
    constructor(key1, and, key2) {
        super();
        this.key1 = key1;
        this.and = and;
        this.key2 = key2;
    }
    toLines() {
        const k1 = this.key1.toLines();
        if (this.and !== undefined &&
            this.key2 !== undefined) {
            const k2 = this.key2.toLines();
            return [`${k1[0]} & ${k2[0]}`];
        }
        return k1;
    }
    get start() {
        return this.key1.start;
    }
    get end() {
        return (this.and !== undefined &&
            this.key2 !== undefined) ?
            this.key2.end :
            this.key1.end;
    }
    get ranges() {
        if (this.and !== undefined &&
            this.key2 !== undefined) {
            return [...this.key1.ranges, this.and, ...this.key2.ranges];
        }
        return this.key1.ranges;
    }
    accept(visitor, parameters) {
        return visitor.visitDeclHotkey(this, parameters);
    }
}
exports.Hotkey = Hotkey;
class Key extends nodeBase_1.NodeBase {
    /**
     *
     * @param key Key token
     * @param modifiers modifiers of a hotkey
     */
    constructor(key, modifiers) {
        super();
        this.key = key;
        this.modifiers = modifiers;
    }
    toLines() {
        if (this.modifiers !== undefined) {
            let modifiersLine = '';
            for (const t of this.modifiers) {
                modifiersLine += t.content;
            }
            return [`${modifiersLine}${this.key.content}`];
        }
        return [`${this.key.content}`];
    }
    get start() {
        return this.modifiers !== undefined ?
            this.modifiers[0].start :
            this.key.start;
    }
    get end() {
        return this.key.end;
    }
    get ranges() {
        return this.modifiers !== undefined ?
            this.modifiers.concat(this.key) :
            [this.key];
    }
}
exports.Key = Key;
class HotString extends Decl {
    /**
     *
     * @param option ':option:'
     * @param str hotstring'::'
     * @param expend expend string
     */
    constructor(option, str, expend) {
        super();
        this.option = option;
        this.str = str;
        this.expend = expend;
    }
    toLines() {
        return [`${this.option.content}${this.str.content}${this.expend.content}`];
    }
    get start() {
        return this.option.start;
    }
    get end() {
        return this.expend.end;
    }
    get ranges() {
        return [this.option, this.str, this.expend];
    }
    accept(visitor, parameters) {
        return visitor.visitDeclHotString(this, parameters);
    }
}
exports.HotString = HotString;
class FuncDef extends Decl {
    /**
     * @param nameToken name of function
     * @param params parameters of function
     * @param body body of function defination
     */
    constructor(nameToken, params, body) {
        super();
        this.nameToken = nameToken;
        this.params = params;
        this.body = body;
    }
    toLines() {
        const idLines = this.nameToken.content;
        const params = this.params.toLines();
        const block = this.body.toLines();
        params[0] = idLines + params[0];
        return stringUtils_1.joinLines(' ', params, block);
    }
    get start() {
        return this.nameToken.start;
    }
    get end() {
        return this.body.end;
    }
    get ranges() {
        return [this.nameToken, ...this.params.ranges, ...this.body.ranges];
    }
    accept(visitor, parameters) {
        return visitor.visitDeclFunction(this, parameters);
    }
}
exports.FuncDef = FuncDef;
/**
 * Class contains all parameters of a function define
 */
class Param extends Decl {
    constructor(open, requiredParameters, optionalParameters, close) {
        super();
        this.open = open;
        this.requiredParameters = requiredParameters;
        this.optionalParameters = optionalParameters;
        this.close = close;
    }
    toLines() {
        const paramLines = this.requiredParameters
            .flatMap(param => param.toLines())
            .join(', ');
        const defaultParamLines = this.optionalParameters
            .flatMap(param => param.toLines())
            .join(', ');
        let lines = [];
        // if (
        //     this.requiredParameters.length > 0 &&
        //     this.optionalParameters.length > 0
        // ) {
        //     lines = joinLines(', ', paramLines, defaultParamLines);
        // } else if (this.requiredParameters.length > 0) {
        //     lines = paramLines;
        // } else {
        //     lines = defaultParamLines;
        // }
        lines[lines.length - 1] = `${lines[lines.length - 1]}.`;
        return lines;
    }
    get start() {
        return this.open.start;
    }
    get end() {
        return this.close.end;
    }
    get ranges() {
        return [this.open]
            .concat(this.requiredParameters)
            .concat(this.optionalParameters);
        //    .concat([this.end as Range])
    }
    accept(visitor, parameters) {
        return visitor.visitDeclParameter(this, parameters);
    }
}
exports.Param = Param;
/**
 * Class contains all required parameters of a function define
 */
class Parameter extends nodeBase_1.NodeBase {
    constructor(identifier) {
        super();
        this.identifier = identifier;
    }
    toLines() {
        return [this.identifier.content];
    }
    get start() {
        return this.identifier.start;
    }
    get end() {
        return this.identifier.end;
    }
    get ranges() {
        return [this.identifier];
    }
    get isKeyword() {
        return this.identifier.type !== tokenTypes_1.TokenType.id;
    }
}
exports.Parameter = Parameter;
/**
 * Class contains all default parameters of a function define
 */
class DefaultParam extends Parameter {
    constructor(identifier, assign, value) {
        super(identifier);
        this.assign = assign;
        this.value = value;
    }
    toLines() {
        const lines = this.value.toLines();
        lines[0] = `${this.identifier.content} ${this.assign.content} ${lines[0]}`;
        return lines;
    }
    get start() {
        return this.identifier.start;
    }
    get end() {
        return this.value.end;
    }
    get ranges() {
        return [this.identifier, this.assign, this.value];
    }
    get isKeyword() {
        return this.identifier.type !== tokenTypes_1.TokenType.id;
    }
}
exports.DefaultParam = DefaultParam;
//# sourceMappingURL=declaration.js.map