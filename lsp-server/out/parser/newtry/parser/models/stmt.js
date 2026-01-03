"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drective = exports.FinallyStmt = exports.CatchStmt = exports.TryStmt = exports.Return = exports.Break = exports.ForStmt = exports.WhileStmt = exports.UntilLoop = exports.Loop = exports.DefaultCase = exports.CaseExpr = exports.CaseStmt = exports.SwitchStmt = exports.Else = exports.If = exports.Block = exports.ExprStmt = exports.AssignStmt = exports.Invalid = exports.Stmt = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const types_1 = require("../../types");
const nodeBase_1 = require("./nodeBase");
const stringUtils_1 = require("../utils/stringUtils");
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
    accept(visitor, parameters) {
        return visitor.visitStmtInvalid(this, parameters);
    }
}
exports.Invalid = Invalid;
class AssignStmt extends Stmt {
    /**
     * @param left Variable to be assigned
     * @param assign Assign token
     */
    constructor(left, assign, expr) {
        super();
        this.left = left;
        this.assign = assign;
        this.expr = expr;
    }
    toLines() {
        const exprLines = this.expr.toLines();
        const idLines = this.left.toLines();
        return stringUtils_1.joinLines(this.assign.content, idLines, exprLines);
    }
    get start() {
        return this.left.start;
    }
    get end() {
        return this.expr.end;
    }
    get ranges() {
        return [this.expr];
    }
    accept(visitor, parameters) {
        return visitor.visitAssign(this, parameters);
    }
}
exports.AssignStmt = AssignStmt;
/**
 * class containing function call and ',' expressions
 */
class ExprStmt extends Stmt {
    constructor(suffix) {
        super();
        this.suffix = suffix;
    }
    toLines() {
        const suffixLines = this.suffix.toLines();
        suffixLines[suffixLines.length - 1] = `${suffixLines[suffixLines.length - 1]}`;
        return suffixLines;
    }
    get start() {
        return this.suffix.start;
    }
    get end() {
        return this.suffix.end;
    }
    get ranges() {
        return [this.suffix];
    }
    accept(visitor, parameters) {
        return visitor.visitExpr(this, parameters);
    }
}
exports.ExprStmt = ExprStmt;
class Block extends Stmt {
    constructor(open, stmts, close) {
        super();
        this.open = open;
        this.stmts = stmts;
        this.close = close;
    }
    toLines() {
        const lines = this.stmts.flatMap(stmt => stmt.toLines());
        if (lines.length === 0) {
            return [`${this.open.content} ${this.close.content}`];
        }
        if (lines.length === 1) {
            return [`${this.open.content} ${lines[0]} ${this.close.content}`];
        }
        return [`${this.open.content}`].concat(...lines.map(line => `    ${line}`), `${this.close.content}`);
    }
    get start() {
        return this.open.start;
    }
    get end() {
        return this.close.end;
    }
    get ranges() {
        return [this.open, ...this.stmts, this.close];
    }
    accept(visitor, parameters) {
        return visitor.visitBlock(this, parameters);
    }
}
exports.Block = Block;
class If extends Stmt {
    constructor(ifToken, condition, body, elseStmt) {
        super();
        this.ifToken = ifToken;
        this.condition = condition;
        this.body = body;
        this.elseStmt = elseStmt;
    }
    toLines() {
        const conditionLines = this.condition.toLines();
        const stmtLines = this.body.toLines();
        conditionLines[0] = `${this.ifToken.content} ${conditionLines[0]}`;
        const lines = conditionLines;
        if (this.elseStmt !== undefined) {
            const elseLines = this.elseStmt.toLines();
            return lines;
        }
        return lines;
    }
    get start() {
        return this.ifToken.start;
    }
    get end() {
        return (this.elseStmt === undefined) ? this.body.end : this.elseStmt.end;
    }
    get ranges() {
        const ranges = [this.ifToken, this.condition, this.body];
        if (this.elseStmt !== undefined) {
            ranges.push(this.elseStmt);
        }
        return ranges;
    }
    accept(visitor, parameters) {
        return visitor.visitIf(this, parameters);
    }
}
exports.If = If;
class Else extends Stmt {
    constructor(elseToken, body) {
        super();
        this.elseToken = elseToken;
        this.body = body;
    }
    toLines() {
        const lines = this.body.toLines();
        lines[0] = `${this.elseToken.content} ${lines[0]}`;
        return lines;
    }
    get start() {
        return this.elseToken.start;
    }
    get end() {
        return this.body.end;
    }
    get ranges() {
        return [this.elseToken, this.body];
    }
    accept(visitor, parameters) {
        return visitor.visitElse(this, parameters);
    }
}
exports.Else = Else;
class SwitchStmt extends Stmt {
    constructor(switchToken, condition, open, cases, close) {
        super();
        this.switchToken = switchToken;
        this.condition = condition;
        this.open = open;
        this.cases = cases;
        this.close = close;
    }
    toLines() {
        const conditionLines = this.condition.toLines();
        const casesLines = this.caseLines();
        conditionLines[0] = `${this.switchToken.content} ${conditionLines[0]}`;
        return stringUtils_1.joinLines(' ', conditionLines, casesLines);
    }
    caseLines() {
        const lines = this.cases.flatMap(stmt => stmt.toLines());
        if (lines.length === 0) {
            return [`${this.open.content} ${this.close.content}`];
        }
        if (lines.length === 1) {
            return [`${this.open.content} ${lines[0]} ${this.close.content}`];
        }
        return [`${this.open.content}`].concat(...lines.map(line => `    ${line}`), `${this.close.content}`);
    }
    get start() {
        return this.switchToken.start;
    }
    get end() {
        return this.close.end;
    }
    get ranges() {
        const casesRange = this.cases.flatMap(c => c.ranges);
        return [
            this.switchToken, ...this.condition.ranges,
            this.open, ...casesRange, this.close
        ];
    }
    accept(visitor, parameters) {
        return visitor.visitSwitch(this, parameters);
    }
}
exports.SwitchStmt = SwitchStmt;
class CaseStmt extends Stmt {
    constructor(CaseNode, body) {
        super();
        this.CaseNode = CaseNode;
        this.body = body;
    }
    toLines() {
        const CaseNodeLines = this.CaseNode.toLines();
        const bodyLines = this.body.map(stmt => stmt.toLines());
        return stringUtils_1.joinLines(' ', CaseNodeLines, ...bodyLines);
    }
    get start() {
        return this.CaseNode.start;
    }
    get end() {
        if (this.body.length !== 0)
            return this.CaseNode.end;
        else
            return this.body[this.body.length - 1].end;
    }
    get ranges() {
        const bodyRange = this.body.flatMap(b => b.ranges);
        return [...this.CaseNode.ranges, ...bodyRange];
    }
    accept(visitor, parameters) {
        return visitor.visitCase(this, parameters);
    }
}
exports.CaseStmt = CaseStmt;
class CaseExpr extends nodeBase_1.NodeBase {
    constructor(caseToken, conditions, colon) {
        super();
        this.caseToken = caseToken;
        this.conditions = conditions;
        this.colon = colon;
    }
    toLines() {
        const conditionLines = this.conditions.flatMap(cond => cond.toLines());
        conditionLines[0] = `${this.caseToken.content} ${conditionLines[0]}`;
        conditionLines[conditionLines.length - 1] += this.colon.content;
        return conditionLines;
    }
    get start() {
        return this.caseToken.start;
    }
    get end() {
        return this.colon.end;
    }
    get ranges() {
        const condRange = this.conditions.flatMap(cond => cond.ranges);
        return [this.caseToken, ...condRange, this.colon];
    }
}
exports.CaseExpr = CaseExpr;
class DefaultCase extends nodeBase_1.NodeBase {
    constructor(defaultToken) {
        super();
        this.defaultToken = defaultToken;
    }
    toLines() {
        return [`${this.defaultToken.content}:`];
    }
    get start() {
        return this.defaultToken.start;
    }
    get end() {
        return this.defaultToken.end;
    }
    get ranges() {
        return [this.defaultToken];
    }
}
exports.DefaultCase = DefaultCase;
class Loop extends Stmt {
    constructor(loop, body, condition) {
        super();
        this.loop = loop;
        this.body = body;
        this.condition = condition;
    }
    toLines() {
        const bodyLines = this.body.toLines();
        if (this.condition !== undefined) {
            const conditionLines = this.condition.toLines();
            conditionLines[0] = `${this.loop.content} ${conditionLines[0]}`;
            return stringUtils_1.joinLines(' ', conditionLines, bodyLines);
        }
        return stringUtils_1.joinLines(' ', [this.loop.content], bodyLines);
    }
    get start() {
        return this.loop.start;
    }
    get end() {
        return this.body.end;
    }
    get ranges() {
        return this.condition ?
            [this.loop, this.condition, this.body] :
            [this.loop, this.body];
    }
    accept(visitor, parameters) {
        return visitor.visitLoop(this, parameters);
    }
}
exports.Loop = Loop;
class UntilLoop extends Stmt {
    constructor(loop, body, until, condition) {
        super();
        this.loop = loop;
        this.body = body;
        this.until = until;
        this.condition = condition;
    }
    toLines() {
        const conditionLines = this.condition.toLines();
        const bodyLines = this.body.toLines();
        bodyLines[0] = `${this.loop.content} ${bodyLines[0]}`;
        conditionLines[0] = `${this.until.content} ${conditionLines[0]}`;
        return stringUtils_1.joinLines(' ', bodyLines, conditionLines);
    }
    get start() {
        return this.loop.start;
    }
    get end() {
        return this.body.end;
    }
    get ranges() {
        return [this.loop, this.condition, this.body];
    }
    accept(visitor, parameters) {
        return visitor.visitLoop(this, parameters);
    }
}
exports.UntilLoop = UntilLoop;
class WhileStmt extends Stmt {
    constructor(whileToken, condition, body) {
        super();
        this.whileToken = whileToken;
        this.condition = condition;
        this.body = body;
    }
    toLines() {
        const conditionLines = this.condition.toLines();
        const bodyLines = this.body.toLines();
        conditionLines[0] = `${this.whileToken.content} ${conditionLines[0]}`;
        return stringUtils_1.joinLines(' ', conditionLines, bodyLines);
    }
    get start() {
        return this.whileToken.start;
    }
    get end() {
        return this.body.end;
    }
    get ranges() {
        return [this.whileToken, this.condition, this.body];
    }
    accept(visitor, parameters) {
        return visitor.visitWhile(this, parameters);
    }
}
exports.WhileStmt = WhileStmt;
// TODO: Finish for loop
class ForStmt extends Stmt {
    constructor(forToken, inToken, body, iter1id, comma, iter2id) {
        super();
        this.forToken = forToken;
        this.inToken = inToken;
        this.body = body;
        this.iter1id = iter1id;
        this.comma = comma;
        this.iter2id = iter2id;
    }
    toLines() {
        const iterLine = this.comma && this.iter2id ?
            `${this.iter1id.content} ${this.comma} ${this.iter2id}` :
            this.iter1id.content;
        const bodyLines = this.body.toLines();
        return stringUtils_1.joinLines(' ', [iterLine], bodyLines);
    }
    get start() {
        return this.forToken.start;
    }
    get end() {
        return this.body.end;
    }
    get ranges() {
        if (this.comma && this.iter2id)
            return [this.forToken, this.iter1id, this.comma, this.iter2id, this.inToken, this.body];
        return [this.forToken, this.iter1id, this.inToken, this.body];
    }
    accept(visitor, parameters) {
        return visitor.visitFor(this, parameters);
    }
}
exports.ForStmt = ForStmt;
class Break extends Stmt {
    /**
     *
     * @param breakToken break token
     * @param label label jumping to
     */
    constructor(breakToken, label) {
        super();
        this.breakToken = breakToken;
        this.label = label;
    }
    toLines() {
        return this.label !== undefined ?
            [`${this.breakToken.content} ${this.label.content}`] :
            [`${this.breakToken.content}`];
    }
    get start() {
        return this.breakToken.start;
    }
    get end() {
        return this.breakToken.end;
    }
    get ranges() {
        return [this.breakToken];
    }
    accept(visitor, parameters) {
        return visitor.visitBreak(this, parameters);
    }
}
exports.Break = Break;
class Return extends Stmt {
    constructor(returnToken, value) {
        super();
        this.returnToken = returnToken;
        this.value = value;
    }
    toLines() {
        if (this.value !== undefined) {
            const exprLines = this.value.toLines();
            exprLines[0] = `${this.returnToken.content} ${exprLines[0]}`;
            exprLines[exprLines.length - 1] = `${exprLines[exprLines.length - 1]}.`;
            return exprLines;
        }
        return [`${this.returnToken.content}`];
    }
    get start() {
        return this.returnToken.start;
    }
    get end() {
        return this.value === undefined ? this.returnToken.end : this.value.end;
    }
    get ranges() {
        let ranges = [this.returnToken];
        if (this.value !== undefined) {
            ranges = ranges.concat(this.value.ranges);
        }
        return ranges;
    }
    accept(visitor, parameters) {
        return visitor.visitReturn(this, parameters);
    }
}
exports.Return = Return;
class TryStmt extends Stmt {
    constructor(tryToken, body, catchStmt, finallyStmt) {
        super();
        this.tryToken = tryToken;
        this.body = body;
        this.catchStmt = catchStmt;
        this.finallyStmt = finallyStmt;
    }
    toLines() {
        const stmtLines = this.body.toLines();
        stmtLines[0] = `${this.tryToken.content} ${stmtLines[0]}`;
        let lines = stmtLines;
        if (this.catchStmt !== undefined) {
            lines = stringUtils_1.joinLines(' ', lines, this.catchStmt.toLines());
        }
        if (this.finallyStmt !== undefined) {
            lines = stringUtils_1.joinLines(' ', lines, this.finallyStmt.toLines());
        }
        return lines;
    }
    get start() {
        return this.tryToken.start;
    }
    get end() {
        return (this.catchStmt === undefined) ? this.body.end : this.catchStmt.end;
    }
    get ranges() {
        const ranges = [this.tryToken, this.body];
        if (this.catchStmt !== undefined) {
            ranges.push(...this.catchStmt.ranges);
        }
        if (this.finallyStmt !== undefined) {
            ranges.push(...this.finallyStmt.ranges);
        }
        return ranges;
    }
    accept(visitor, parameters) {
        return visitor.visitTry(this, parameters);
    }
}
exports.TryStmt = TryStmt;
class CatchStmt extends Stmt {
    constructor(catchToken, errors, body) {
        super();
        this.catchToken = catchToken;
        this.errors = errors;
        this.body = body;
    }
    toLines() {
        const conditionLines = `${this.catchToken.content} ${this.errors.content}`;
        const bodyLines = this.body.toLines();
        return stringUtils_1.joinLines(' ', [conditionLines], bodyLines);
    }
    get start() {
        return this.catchToken.start;
    }
    get end() {
        return this.body.end;
    }
    get ranges() {
        return [this.catchToken, this.errors, this.body];
    }
    accept(visitor, parameters) {
        return visitor.visitCatch(this, parameters);
    }
}
exports.CatchStmt = CatchStmt;
class FinallyStmt extends Stmt {
    constructor(finallToken, body) {
        super();
        this.finallToken = finallToken;
        this.body = body;
    }
    toLines() {
        const bodyLines = this.body.toLines();
        bodyLines[0] = `${this.finallToken.content} ${bodyLines[0]}`;
        return bodyLines;
    }
    get start() {
        return this.finallToken.start;
    }
    get end() {
        return this.body.end;
    }
    get ranges() {
        return [this.finallToken, this.body];
    }
    accept(visitor, parameters) {
        return visitor.visitFinally(this, parameters);
    }
}
exports.FinallyStmt = FinallyStmt;
class Drective extends Stmt {
    constructor(drective, args) {
        super();
        this.drective = drective;
        this.args = args;
    }
    get start() {
        return this.drective.start;
    }
    get end() {
        return (this.args.length === 0) ?
            this.drective.end :
            this.args[this.args.length - 1].end;
    }
    get ranges() {
        const argsRange = this.args.flatMap(arg => arg.ranges);
        return [this.drective, ...argsRange];
    }
    toLines() {
        if (this.args.length === 0) {
            return [`${this.drective.content}`];
        }
        const argsLines = this.args.flatMap(a => a.toLines());
        const argsResult = stringUtils_1.joinLines(', ', argsLines);
        argsResult[0] = `${this.drective.content}${argsResult[0]}`;
        return argsResult;
    }
    accept(visitor, parameters) {
        return visitor.visitDrective(this, parameters);
    }
}
exports.Drective = Drective;
//# sourceMappingURL=stmt.js.map