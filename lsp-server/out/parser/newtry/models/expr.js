"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factor = exports.Binary = exports.Unary = exports.Invalid = exports.Expr = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const tokenTypes_1 = require("../tokenTypes");
const types_1 = require("../types");
const nodeBase_1 = require("./nodeBase");
/**
 * Expression base class
 */
class Expr extends nodeBase_1.NodeBase {
    /**
     * Return the tree node type of expression
     */
    get tag() {
        return types_1.SyntaxKind.expr;
    }
}
exports.Expr = Expr;
/**
 * Container for tokens constituting an invalid expression
 */
class Invalid extends Expr {
    /**
     * Invalid expression constructor
     * @param pos start position of the invalid expression
     * @param tokens all tokens in the invalid range
     */
    constructor(pos, tokens) {
        super();
        this.pos = pos;
        this.tokens = tokens;
    }
    get start() {
        return this.tokens.length > 0 ? this.tokens[0].start : this.pos;
    }
    get end() {
        return this.tokens.length > 0
            ? this.tokens[this.tokens.length - 1].end
            : this.pos;
    }
    toLines() {
        return [this.tokens.map(t => t.content).join(' ')];
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
/**
 * Class holding all valid unary expressions in KOS
 */
class Unary extends Expr {
    /**
     * Unary expression constructor
     * @param operator unary operator
     * @param factor factor
     */
    constructor(operator, factor) {
        super();
        this.operator = operator;
        this.factor = factor;
    }
    get start() {
        return this.operator.start;
    }
    get end() {
        return this.factor.end;
    }
    get ranges() {
        return [this.operator, this.factor];
    }
    toLines() {
        const lines = this.factor.toLines();
        switch (this.operator.type) {
            case tokenTypes_1.TokenType.plus:
            case tokenTypes_1.TokenType.minus:
                lines[0] = `${this.operator.content}${lines[0]}`;
                return lines;
            default:
                lines[0] = `${this.operator.content} ${lines[0]}`;
                return lines;
        }
    }
}
exports.Unary = Unary;
/**
 * Class repersenting all valid binary expressions in AHK
 */
class Binary extends Expr {
    /**
     * Constructor for all binary expressions
     * @param left left expression of the operator
     * @param operator The operator
     * @param right right expression of the operator
     */
    constructor(left, operator, right) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
    get start() {
        return this.left.start;
    }
    get end() {
        return this.right.end;
    }
    get ranges() {
        return [this.left, this.operator, this.right];
    }
    toLines() {
        const leftLines = this.left.toLines();
        const rightLines = this.right.toLines();
        return rightLines.length === 0 ?
            [`${leftLines[0]} ${this.operator.content}`] :
            [`${leftLines[0]} ${this.operator.content} ${rightLines[0]}`];
    }
}
exports.Binary = Binary;
/**
 * Class for all factor to be calcuated
 */
class factor extends Expr {
    /**
     * Factor constructor
     * @param suffixTerm base suffix term
     * @param dot optional suffix color
     * @param trailer optional suffix trailer
     */
    constructor(suffixTerm, dot, trailer) {
        super();
        this.suffixTerm = suffixTerm;
        this.dot = dot;
        this.trailer = trailer;
    }
    get start() {
        return this.suffixTerm.start;
    }
    get end() {
        return this.trailer === undefined ? this.suffixTerm.end : this.trailer.end;
    }
    get ranges() {
        if (!(this.dot === undefined) && !(this.trailer === undefined)) {
            return [this.suffixTerm, this.dot, this.trailer];
        }
        return [this.suffixTerm];
    }
    toLines() {
        const suffixTermLines = this.suffixTerm.toLines();
        if (!(this.dot === undefined) && !(this.trailer === undefined)) {
            const trailerLines = this.trailer.toLines();
            return [suffixTermLines + this.dot.content + trailerLines];
        }
        return suffixTermLines;
    }
}
exports.factor = factor;
//# sourceMappingURL=expr.js.map