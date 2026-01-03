"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Script = void 0;
const types_1 = require("../types");
const vscode_languageserver_1 = require("vscode-languageserver");
const nodeBase_1 = require("../parser/models/nodeBase");
class Script extends nodeBase_1.NodeBase {
    constructor(uri, stmts, tokens, comments, include) {
        super();
        this.uri = uri;
        this.stmts = stmts;
        this.tokens = tokens;
        this.comments = comments;
        this.include = include;
    }
    toLines() {
        return this.stmts.flatMap(stmt => stmt.toLines());
    }
    get start() {
        if (this.stmts.length === 0) {
            return vscode_languageserver_1.Position.create(0, 0);
        }
        return this.stmts[0].start;
    }
    get end() {
        if (this.stmts.length === 0) {
            return vscode_languageserver_1.Position.create(0, 0);
        }
        return this.stmts[this.stmts.length - 1].end;
    }
    get ranges() {
        return [...this.stmts];
    }
    toLocation() {
        return { uri: this.uri, range: { start: this.start, end: this.end } };
    }
    get tag() {
        return types_1.SyntaxKind.script;
    }
}
exports.Script = Script;
//# sourceMappingURL=script.js.map