"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMatcher = exports.ScriptFinder = void 0;
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
const types_1 = require("./types");
class ScriptFinder {
    constructor(cond, syntaxNode, uri, includeTree) {
        /**
         * index of condition to be matched
         */
        this.pos = 0;
        this.issuffix = false;
        // Create a tree contains file AST and AST of file include
        // file AST in the first index => file AST is top level
        let Trees = [{
                nodes: syntaxNode,
                uri: uri
            }].concat(includeTree);
        this.Trees = Trees;
        this.uri = uri;
        this.cond = cond;
    }
    /**
     * return if we need to search on deep node
     */
    needDeep() {
        // This function will not be called more than once when it is not needed
        // and we need pos to be over length when search suffix on a variable
        // just add one
        this.pos++;
        if (this.pos >= this.cond.length)
            return false;
        else
            return true;
    }
    searchDeep(nodes) {
        for (const node of nodes) {
            let n = this.visit(node);
            if (n)
                return n;
        }
        return undefined;
    }
    visit(node) {
        if (node instanceof types_1.FuncNode)
            return this.visitFunc(node);
        if (node instanceof types_1.ClassNode)
            return this.visitClass(node);
        if (node instanceof types_1.VariableNode)
            return this.visitVar(node);
        return undefined;
    }
    visitFunc(node) {
        if (this.cond[this.pos].match(node)) {
            if (this.needDeep()) {
                if (node.subnode)
                    return this.searchDeep(node.subnode);
                return undefined;
            }
            return node;
        }
        return undefined;
    }
    visitClass(node) {
        if (this.cond[this.pos].match(node)) {
            if (this.needDeep()) {
                if (node.subnode)
                    return this.searchDeep(node.subnode);
                return undefined;
            }
            return node;
        }
        return undefined;
    }
    visitVar(node) {
        if (this.cond[this.pos].match(node)) {
            // issuffix is true means we need suffix infomation
            // so we also convert variable node to its reference 
            if (this.needDeep() || this.issuffix) {
                // if node has refere a class we search that class
                // since class should be global, 
                // just search the whole tree by this.find()
                if (node.refname) {
                    // add condition to the next search pos
                    // next search will begin at that position
                    this.cond = this.cond.slice(this.pos);
                    this.cond.unshift(new NodeMatcher(node.refname, vscode_languageserver_types_1.SymbolKind.Class));
                    this.pos = 0;
                    let temp = this.find();
                    if (!temp)
                        return undefined;
                    this.uri = temp.uri;
                    return temp.node;
                }
                // 这里请求一个有后缀的节点，检查是否有子节点代表后缀，
                // 这个是在之后的函数检查，如果返回undefined就会将搜索链条打断
                return this.issuffix ? node : undefined;
            }
            return node;
        }
        return undefined;
    }
    find(issuffix = false) {
        this.issuffix = issuffix;
        for (const tree of this.Trees) {
            this.uri = tree.uri;
            for (const node of tree.nodes) {
                let n = this.visit(node);
                if (n)
                    return {
                        node: n,
                        uri: this.uri
                    };
            }
        }
        return undefined;
    }
}
exports.ScriptFinder = ScriptFinder;
/**
 * condition a node need to be matched
 */
class NodeMatcher {
    constructor(name, kind) {
        this.name = name;
        this.kind = kind;
    }
    /**
     * check if node matches the conditions
     * @param node node to match
     */
    match(node) {
        return this.kind ?
            (node.name.toLowerCase() === this.name.toLowerCase() && node.kind === this.kind) :
            (node.name.toLowerCase() === this.name.toLowerCase());
    }
}
exports.NodeMatcher = NodeMatcher;
//# sourceMappingURL=scriptFinder.js.map