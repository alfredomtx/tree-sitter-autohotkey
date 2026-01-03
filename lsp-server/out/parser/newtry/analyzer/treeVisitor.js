"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeVisitor = void 0;
class TreeVisitor {
    constructor() {
    }
    visitDeclVariable(decl) {
        throw new Error('Need Implentment');
    }
    visitDeclClass(decl) {
        throw new Error('Need Implentment');
    }
    visitDeclHotkey(decl) {
        throw new Error('Need Implentment');
    }
    visitDeclHotString(decl) {
        throw new Error('Need Implentment');
    }
    visitDeclFunction(decl) {
        throw new Error('Need Implentment');
    }
    visitDeclParameter(decl) {
        throw new Error('Need Implentment');
    }
    visitDeclLabel(decl) {
        throw new Error('Need Implentment');
    }
    visitStmtInvalid(stmt) {
        throw new Error('Need Implentment');
    }
    visitDrective(stmt) {
        throw new Error('Need Implentment');
    }
    visitBlock(stmt) {
        throw new Error('Need Implentment');
    }
    visitExpr(stmt) {
        throw new Error('Need Implentment');
    }
    visitAssign(stmt) {
        throw new Error('Need Implentment');
    }
    // visitCommand(stmt: Stmt.Command): T {
    // throw new Error('Need Implentment');
    // }
    // visitCommandExpr(
    //   stmt: Stmt.CommandExpr,
    //   parameters: [],
    // ): T {
    // throw new Error('Need Implentment');
    // }
    visitIf(stmt) {
        throw new Error('Need Implentment');
    }
    visitElse(stmt) {
        throw new Error('Need Implentment');
    }
    visitReturn(stmt) {
        throw new Error('Need Implentment');
    }
    visitBreak(stmt) {
        throw new Error('Need Implentment');
    }
    visitSwitch(stmt) {
        throw new Error('Need Implentment');
    }
    visitCase(stmt) {
        throw new Error('Need Implentment');
    }
    visitLoop(stmt) {
        throw new Error('Need Implentment');
    }
    visitWhile(stmt) {
        throw new Error('Need Implentment');
    }
    visitFor(stmt) {
        throw new Error('Need Implentment');
    }
    visitTry(stmt) {
        throw new Error('Need Implentment');
    }
    visitCatch(stmt) {
        throw new Error('Need Implentment');
    }
    visitFinally(stmt) {
        throw new Error('Need Implentment');
    }
}
exports.TreeVisitor = TreeVisitor;
//# sourceMappingURL=treeVisitor.js.map