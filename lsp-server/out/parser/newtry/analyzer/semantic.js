"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreProcesser = void 0;
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
const vscode_languageserver_1 = require("vscode-languageserver");
const treeVisitor_1 = require("./treeVisitor");
const Stmt = require("../parser/models/stmt");
const Expr = require("../parser/models/expr");
const SuffixTerm = require("../parser/models/suffixterm");
const symbolTable_1 = require("./models/symbolTable");
const symbol_1 = require("./models/symbol");
const types_1 = require("./types");
const tokenTypes_1 = require("../tokenizor/tokenTypes");
class PreProcesser extends treeVisitor_1.TreeVisitor {
    constructor(script) {
        super();
        this.script = script;
        this.supperGlobal = new symbolTable_1.SymbolTable('supperGlobal', 0);
        this.table = new symbolTable_1.SymbolTable('global', 1, this.supperGlobal);
        this.supperGlobal.addScoop(this.table);
        this.stack = [this.table];
        this.currentScoop = this.stack[this.stack.length - 1];
    }
    process() {
        const stmts = this.script.stmts;
        const errors = [];
        for (const stmt of stmts) {
            const error = stmt.accept(this, []);
            errors.push(...error);
        }
        return {
            table: this.table,
            diagnostics: errors
        };
    }
    visitDeclVariable(decl) {
        const errors = [];
        const [e, vs] = this.createVarSym(decl.assigns);
        errors.push(...e);
        if (decl.scope.type === tokenTypes_1.TokenType.static) {
            if (!(this.currentScoop instanceof symbol_1.AHKObjectSymbol)) {
                errors.push(this.error(vscode_languageserver_1.Range.create(decl.start, decl.end), 'Static declaration can only be used in class'));
            }
            // Define static property of class
            vs.forEach(v => this.currentScoop.define(v));
        }
        // global and local declaration is not allowed in class
        // report errors and return
        if (this.currentScoop instanceof symbol_1.AHKObjectSymbol)
            return errors;
        // TODO: 变量在local和global上重复定义的问题
        // Define global and local variable
        if (decl.scope.type === tokenTypes_1.TokenType.local)
            vs.forEach(v => this.currentScoop.define(v));
        else {
            for (const sym of vs) {
                // global declaration in global
                if (this.currentScoop.name === 'global')
                    this.supperGlobal.define(sym);
                const globalSym = this.table.resolve(sym.name);
                // if variable exists in global
                // add it to local, make it visible in local
                if (globalSym)
                    this.currentScoop.define(sym);
                // if not add to both
                else {
                    this.currentScoop.define(sym);
                    this.table.define(sym);
                }
            }
        }
        return errors;
    }
    visitDeclFunction(decl) {
        const params = decl.params;
        const reqParams = this.paramAction(params.requiredParameters);
        const dfltParams = this.paramAction(params.optionalParameters);
        const sym = new symbol_1.AHKMethodSymbol(this.script.uri, decl.nameToken.content, copyRange(decl), reqParams, dfltParams, this.supperGlobal, this.currentScoop);
        // this.supperGlobal.define(sym);
        // this.supperGlobal.addScoop(sym);
        // this.table.define(sym);
        // this.table.addScoop(sym);
        this.currentScoop.define(sym);
        this.currentScoop.addScoop(sym);
        // Define Implicit this variable
        if (this.currentScoop instanceof symbol_1.AHKObjectSymbol)
            sym.defineThis();
        this.enterScoop(sym);
        const errors = decl.body.accept(this, []);
        this.leaveScoop();
        return errors;
    }
    paramAction(params) {
        const syms = [];
        for (const param of params) {
            syms.push(new symbol_1.VaribaleSymbol(this.script.uri, param.identifier.content, copyRange(param), types_1.VarKind.parameter, undefined));
        }
        return syms;
    }
    visitDeclClass(decl) {
        // TODO: parent scoop of class
        const parentScoop = undefined;
        const objTable = new symbol_1.AHKObjectSymbol(this.script.uri, decl.name.content, copyRange(decl), parentScoop, this.currentScoop);
        const errors = [];
        // supper global means we are in global scoop
        if (this.currentScoop === this.supperGlobal) {
            this.supperGlobal.define(objTable);
            this.table.define(objTable);
        }
        else {
            this.currentScoop.define(objTable);
        }
        this.enterScoop(objTable);
        errors.push(...decl.body.accept(this, []));
        this.leaveScoop();
        return errors;
    }
    visitDeclHotkey(decl) {
        const name = decl.key2 ?
            decl.key1.key.content + ' & ' + decl.key2.key.content :
            decl.key1.key.content;
        this.table.define(new symbol_1.HotkeySymbol(this.script.uri, name, copyRange(decl)));
        return [];
    }
    visitDeclHotString(decl) {
        this.table.define(new symbol_1.HotStringSymbol(this.script.uri, decl.str.content, copyRange(decl)));
        return [];
    }
    visitDeclLabel(decl) {
        this.table.define(new symbol_1.LabelSymbol(this.script.uri, decl.name.content, copyRange(decl)));
        return [];
    }
    visitStmtInvalid(stmt) {
        return [];
    }
    visitDrective(stmt) {
        // Nothing to do in first scanning
        return [];
    }
    visitBlock(stmt) {
        const errors = [];
        for (const singleStmt of stmt.stmts) {
            const e = singleStmt.accept(this, []);
            errors.push(...e);
        }
        return errors;
    }
    visitAssign(stmt) {
        const errors = [];
        errors.push(...this.processAssignVar(stmt.left, stmt));
        errors.push(...this.processExpr(stmt.expr));
        return errors;
    }
    visitExpr(stmt) {
        return this.processExpr(stmt.suffix);
    }
    processExpr(expr) {
        const errors = [];
        if (expr instanceof Expr.Factor) {
            if (!expr.trailer) {
                const atom = expr.suffixTerm.atom;
                if (atom instanceof SuffixTerm.Identifier) {
                    // Only check varible defination in first scanning
                    const idName = atom.token.content;
                    if (!this.currentScoop.resolve(idName))
                        errors.push(this.error(copyRange(atom), 'Variable is used before defination'));
                }
            }
            // TODO: Call and backet identifer check
        }
        else if (expr instanceof Expr.Unary) {
            errors.push(...this.processExpr(expr.factor));
        }
        else if (expr instanceof Expr.Binary) {
            // if contains assign expression
            // check if create a new variable检查是否有新的变量赋值
            if (expr.operator.type === tokenTypes_1.TokenType.aassign &&
                expr.left instanceof Expr.Factor) {
                errors.push(...this.processAssignVar(expr.left, expr));
            }
            else
                errors.push(...this.processExpr(expr.left));
            errors.push(...this.processExpr(expr.right));
        }
        else if (expr instanceof Expr.Ternary) {
            errors.push(...this.processExpr(expr.condition));
            errors.push(...this.processExpr(expr.trueExpr));
            errors.push(...this.processExpr(expr.falseExpr));
        }
        return errors;
    }
    processAssignVar(left, fullRange) {
        const id1 = left.suffixTerm.atom;
        const errors = [];
        if (id1 instanceof SuffixTerm.Identifier) {
            // if only varible 标识符只有一个
            // 就是变量赋值定义这个变量
            if (left.trailer === undefined) {
                const idName = id1.token.content;
                if (!this.currentScoop.resolve(idName)) {
                    const sym = new symbol_1.VaribaleSymbol(this.script.uri, idName, copyRange(left), types_1.VarKind.variable, undefined);
                    this.currentScoop.define(sym);
                }
                return errors;
            }
            // check if assign to a property
            if (id1.token.content === 'this') {
                if (!(this.currentScoop instanceof symbol_1.AHKMethodSymbol &&
                    this.currentScoop.parentScoop instanceof symbol_1.AHKObjectSymbol)) {
                    errors.push(vscode_languageserver_types_1.Diagnostic.create(copyRange(left), 'Assign a property out of class'));
                    return errors;
                }
                const trailer = left.trailer;
                if (trailer.trailer === undefined) {
                    const prop = trailer.suffixTerm.atom;
                    if (prop instanceof SuffixTerm.Identifier) {
                        if (!this.currentScoop.resolve(prop.token.content)) {
                            const sym = new symbol_1.VaribaleSymbol(this.script.uri, prop.token.content, copyRange(fullRange), types_1.VarKind.property, undefined);
                            this.currentScoop.parentScoop.define(sym);
                        }
                    }
                    return errors;
                }
            }
        }
        errors.push(vscode_languageserver_types_1.Diagnostic.create(copyRange(left), 'Assign to unassignable object'));
        return errors;
    }
    visitIf(stmt) {
        const condExpr = stmt.condition;
        const errors = [...this.processExpr(condExpr)];
        errors.push(...stmt.body.accept(this, []));
        if (stmt.elseStmt) {
            const elseStmt = stmt.elseStmt;
            errors.push(...elseStmt.accept(this, []));
        }
        return errors;
    }
    visitElse(stmt) {
        const erorrs = [];
        // TODO: else if
        erorrs.push(...stmt.body.accept(this, []));
        return erorrs;
    }
    visitReturn(stmt) {
        // If any value returns process them
        if (stmt.value) {
            return this.processExpr(stmt.value);
        }
        return [];
    }
    visitBreak(stmt) {
        // Nothing need to do with break in propcesss
        // Since label can be defined after break
        return [];
    }
    visitSwitch(stmt) {
        const errors = [...this.processExpr(stmt.condition)];
        // process every case
        for (const caseStmt of stmt.cases) {
            errors.push(...caseStmt.accept(this, []));
        }
        return errors;
    }
    visitCase(stmt) {
        const errors = [];
        // if is case <experssion>, process every expressions
        if (stmt.CaseNode instanceof Stmt.CaseExpr) {
            for (const cond of stmt.CaseNode.conditions) {
                errors.push(...this.processExpr(cond));
            }
        }
        // process every single statement under this case
        for (const s of stmt.body) {
            errors.push(...s.accept(this, []));
        }
        return errors;
    }
    visitLoop(stmt) {
        const errors = [];
        // loop <expression> body
        if (stmt instanceof Stmt.Loop) {
            // if any expression
            if (stmt.condition)
                errors.push(...this.processExpr(stmt.condition));
            errors.push(...stmt.body.accept(this, []));
            return errors;
        }
        // loop body until <expression>
        errors.push(...stmt.body.accept(this, []));
        errors.push(...this.processExpr(stmt.condition));
        return errors;
    }
    visitWhile(stmt) {
        const errors = [...this.processExpr(stmt.condition)];
        errors.push(...stmt.body.accept(this, []));
        return errors;
    }
    visitFor(stmt) {
        // check if iter varible is defined, if not define them
        if (!this.currentScoop.resolve(stmt.iter1id.content)) {
            const sym = new symbol_1.VaribaleSymbol(this.script.uri, stmt.iter1id.content, copyRange(stmt.iter1id), types_1.VarKind.variable, undefined);
            this.currentScoop.define(sym);
        }
        if (stmt.iter2id) {
            const sym = new symbol_1.VaribaleSymbol(this.script.uri, stmt.iter1id.content, copyRange(stmt.iter2id), types_1.VarKind.variable, undefined);
            this.currentScoop.define(sym);
        }
        return stmt.body.accept(this, []);
    }
    visitTry(stmt) {
        const errors = [];
        errors.push(...stmt.body.accept(this, []));
        if (stmt.catchStmt) {
            errors.push(...stmt.catchStmt.accept(this, []));
        }
        if (stmt.finallyStmt) {
            errors.push(...stmt.finallyStmt.accept(this, []));
        }
        return errors;
    }
    visitCatch(stmt) {
        // check if output varible is defined, if not define it
        if (!this.currentScoop.resolve(stmt.errors.content)) {
            const sym = new symbol_1.VaribaleSymbol(this.script.uri, stmt.errors.content, copyRange(stmt.errors), types_1.VarKind.variable, undefined);
            this.currentScoop.define(sym);
        }
        return stmt.body.accept(this, []);
    }
    visitFinally(stmt) {
        return stmt.body.accept(this, []);
    }
    enterScoop(scoop) {
        this.stack.push(scoop);
        this.currentScoop = scoop;
    }
    leaveScoop() {
        this.stack.pop();
        this.currentScoop = this.stack[this.stack.length - 1];
    }
    createVarSym(assigns) {
        const errors = [];
        const varSym = [];
        for (const assign of assigns) {
            // if there are any assign in variable declaration, 如果scoop声明里有赋值
            if (assign.assign) {
                const kind = this.currentScoop instanceof symbol_1.AHKObjectSymbol ?
                    types_1.VarKind.property : types_1.VarKind.variable;
                const sym = new symbol_1.VaribaleSymbol(this.script.uri, assign.identifer.content, vscode_languageserver_1.Range.create(assign.start, assign.end), kind, undefined);
                varSym.push(sym);
            }
        }
        return [errors, varSym];
    }
    error(range, message) {
        return vscode_languageserver_types_1.Diagnostic.create(range, message);
    }
}
exports.PreProcesser = PreProcesser;
function copyRange(r) {
    return vscode_languageserver_1.Range.create(r.start, r.end);
}
//# sourceMappingURL=semantic.js.map