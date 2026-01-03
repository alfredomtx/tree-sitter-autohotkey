"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignStmt = exports.Invalid = exports.Stmt = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const types_1 = require("../types");
const nodeBase_1 = require("./nodeBase");
/**
 * Statement base class
 */
class Stmt extends nodeBase_1.NodeBase {
    /**
     * Return the tree node type of statement
     */
    get tag() {
        return types_1.SyntaxKind.stmt;
    }
}
exports.Stmt = Stmt;
class Invalid extends Stmt {
    /**
   * Construct a new invalid statement
   * @param pos Provides the start position of this statement
   * @param tokens tokens involved in this invalid statement
   */
    constructor(pos, tokens) {
        super();
        this.pos = pos;
        this.tokens = tokens;
    }
    /**
     * Convert this invalid statement into a set of line
     */
    toLines() {
        return [this.tokens.map(t => t.content).join(' ')];
    }
    /**
     * What is the start position of this statement
     */
    get start() {
        return this.tokens.length > 0 ? this.tokens[0].start : this.pos;
    }
    /**
     * What is the end position of this statement
     */
    get end() {
        return this.tokens.length > 0
            ? this.tokens[this.tokens.length - 1].end
            : this.pos;
    }
    /**
     * Ranges of this statement
     */
    get ranges() {
        let ranges = [];
        for (const token of this.tokens) {
            ranges.push(vscode_languageserver_1.Range.create(token.start, token.end));
        }
        return ranges;
    }
}
exports.Invalid = Invalid;
class AssignStmt extends Stmt {
    /**
     * @param identifer Variable to be assigned
     * @param assign Assign token
     */
    constructor(identifer, assign, expr) {
        super();
        this.identifer = identifer;
        this.assign = assign;
        this.expr = expr;
    }
    toLines() {
        const exprLines = this.expr.toLines();
        const idLines = this.identifer.content;
        const assignLines = this.assign.content;
        exprLines[0] = `${idLines} ${assignLines} ${exprLines[0]}`;
        return exprLines;
    }
    get start() {
        return this.identifer.start;
    }
    get end() {
        return this.expr.end;
    }
    get ranges() {
        return [this.expr];
    }
}
exports.AssignStmt = AssignStmt;
//# sourceMappingURL=stmt.js.map