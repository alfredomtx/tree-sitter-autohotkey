"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeManager = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const vscode_uri_1 = require("vscode-uri");
const types_1 = require("../parser/regParser/types");
const asttypes_1 = require("../parser/regParser/asttypes");
const semantic_stack_1 = require("../parser/regParser/semantic_stack");
const constants_1 = require("../utilities/constants");
const path_1 = require("path");
const os_1 = require("os");
const ahkparser_1 = require("../parser/regParser/ahkparser");
const ioService_1 = require("./ioService");
const scriptFinder_1 = require("../parser/regParser/scriptFinder");
// if belongs to FuncNode
function isFuncNode(node) {
    return typeof node['params'] !== 'undefined';
}
function setDiffSet(set1, set2) {
    let d12 = [], d21 = [];
    for (let item of set1) {
        if (!set2.has(item)) {
            d12.push(item);
        }
    }
    for (let item of set2) {
        if (!set1.has(item)) {
            d21.push(item);
        }
    }
    return [d12, d21];
}
class TreeManager {
    constructor(logger) {
        this.serverDocs = new Map();
        this.docsAST = new Map();
        this.localAST = new Map();
        this.incInfos = new Map();
        this.ioService = new ioService_1.IoService();
        this.builtinFunction = constants_1.buildBuiltinFunctionNode();
        this.builtinCommand = constants_1.buildBuiltinCommandNode();
        this.serverConfigDoc = undefined;
        this.currentDocUri = '';
        // TODO: non hardcoded Standard Library
        this.SLibDir = 'C:\\Program Files\\AutoHotkey\\Lib';
        this.ULibDir = os_1.homedir() + '\\Documents\\AutoHotkey\\Lib';
        this.logger = logger;
    }
    /**
     * Initialize information of a just open document
     * @param uri Uri of initialized document
     * @param docinfo AST of initialized document
     * @param doc TextDocument of initialized documnet
     */
    initDocument(uri, docinfo, doc) {
        this.currentDocUri = uri;
        this.updateDocumentAST(uri, docinfo, doc);
    }
    /**
     * Select a document for next steps. For provide node infomation of client requests
     * @param uri Uri of document to be selected
     */
    selectDocument(uri) {
        this.currentDocUri = this.serverDocs.has(uri) ? uri : '';
        return this;
    }
    /**
     * Update infomation of a given document, will automatic load its includes
     * @param uri Uri of updated document
     * @param docinfo AST of updated document
     * @param doc TextDocument of update documnet
     */
    async updateDocumentAST(uri, docinfo, doc) {
        var _a, _b;
        // update documnet
        this.serverDocs.set(uri, doc);
        const oldInclude = (_a = this.docsAST.get(uri)) === null || _a === void 0 ? void 0 : _a.include;
        let useneed, useless;
        // updata AST first, then its includes
        this.docsAST.set(uri, docinfo);
        if (oldInclude) {
            // useless need delete, useneed need to add
            // FIXME: delete useless include
            [useless, useneed] = setDiffSet(oldInclude, docinfo.include);
        }
        else {
            useneed = docinfo.include;
            useless = [];
        }
        // delete unused incinfo
        let incInfo = this.incInfos.get(doc.uri);
        if (incInfo) {
            let tempInfo = [];
            // acquire absulte uri to detele 
            for (const uri of useless) {
                for (const [abs, raw] of incInfo) {
                    if (raw === uri)
                        tempInfo.push(abs);
                }
            }
            for (const abs of tempInfo)
                incInfo.delete(abs);
        }
        // EnumIncludes
        let incQueue = [...useneed];
        // this code works why?
        // no return async always fails?
        let path = incQueue.shift();
        while (path) {
            const docDir = path_1.dirname(vscode_uri_1.URI.parse(this.currentDocUri).fsPath);
            let p = this.include2Path(path, docDir);
            if (!p) {
                path = incQueue.shift();
                continue;
            }
            // if is lib include, use lib dir
            // 我有必要一遍遍读IO来确认库文件存不存在吗？
            const doc = await this.loadDocumnet(p);
            if (doc) {
                let lexer = new ahkparser_1.Lexer(doc, this.logger);
                this.serverDocs.set(doc.uri, doc);
                let incDocInfo = lexer.Parse();
                // cache to local storage file AST
                this.localAST.set(doc.uri, incDocInfo);
                // TODO: Correct document include tree
                if (this.incInfos.has(uri))
                    (_b = this.incInfos.get(uri)) === null || _b === void 0 ? void 0 : _b.set(p, path);
                else
                    this.incInfos.set(uri, new Map([[p, path]]));
                incQueue.push(...Array.from(incDocInfo.include));
            }
            path = incQueue.shift();
        }
    }
    /**
     * Load and parse a set of documents. Used for process ahk includes
     * @param documnets A set of documents' uri to be loaded and parsed
     */
    async loadDocumnet(path) {
        const uri = vscode_uri_1.URI.file(path);
        try {
            const c = await this.retrieveResource(uri);
            let document = vscode_languageserver_textdocument_1.TextDocument.create(uri.toString(), 'ahk', 0, c);
            return document;
        }
        catch (err) {
            // TODO: log exception here
            return undefined;
        }
    }
    deleteUnusedDocument(uri) {
        let incinfo = this.incInfos.get(uri);
        this.docsAST.delete(uri);
        this.incInfos.delete(uri);
        if (incinfo) {
            for (const [path, raw] of incinfo) {
                let isUseless = true;
                for (const [docuri, docinc] of this.incInfos) {
                    if (docinc.has(path)) {
                        isUseless = false;
                        break;
                    }
                }
                if (isUseless)
                    this.localAST.delete(vscode_uri_1.URI.file(path).toString());
            }
        }
    }
    /**
   * Retrieve a resource from the provided uri
   * @param uri uri to load resources from
   */
    retrieveResource(uri) {
        const path = uri.fsPath;
        return this.ioService.load(path);
    }
    /**
     * Return a line of text up to the given position
     * @param position position of end mark
     */
    LineTextToPosition(position) {
        var _a;
        if (this.currentDocUri) {
            return (_a = this.serverDocs
                .get(this.currentDocUri)) === null || _a === void 0 ? void 0 : _a.getText(vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(position.line, 0), position)).trimRight();
        }
    }
    /**
     * Return the text of a given line
     * @param line line number
     */
    getLine(line) {
        var _a;
        if (this.currentDocUri) {
            return (_a = this.serverDocs
                .get(this.currentDocUri)) === null || _a === void 0 ? void 0 : _a.getText(vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(line, 0), vscode_languageserver_1.Position.create(line + 1, 0))).trimRight();
        }
    }
    include2Path(rawPath, scriptPath) {
        const scriptDir = scriptPath;
        const normalized = path_1.normalize(rawPath);
        switch (path_1.extname(normalized)) {
            case '.ahk':
                if (path_1.dirname(normalized)[0] === '.') // if dir start as ../ or .
                    return path_1.normalize(scriptDir + '\\' + normalized);
                else // absolute path
                    return normalized;
            case '':
                if (rawPath[0] === '<' && rawPath[rawPath.length - 1] === '>') {
                    let searchDir = [];
                    const np = path_1.normalize(rawPath.slice(1, rawPath.length - 1) + '.ahk');
                    const dir = path_1.normalize(scriptDir + '\\Lib\\' + np);
                    const ULibDir = path_1.normalize(this.ULibDir + '\\' + np);
                    const SLibDir = path_1.normalize(this.SLibDir + '\\' + np);
                    searchDir.push(dir, ULibDir, SLibDir);
                    for (const d of searchDir) {
                        if (this.ioService.fileExistsSync(d))
                            return d;
                    }
                }
                // TODO: handle include path change
                return undefined;
            default:
                return undefined;
        }
    }
    /**
     * A simple(vegetable) way to get all include AST of a document
     * @returns SymbolNode[]-ASTs, document uri
     */
    allIncludeTreeinfomation() {
        const docinfo = this.docsAST.get(this.currentDocUri);
        if (!docinfo)
            return undefined;
        const incInfo = this.incInfos.get(this.currentDocUri) || [];
        let r = [];
        for (const [path, raw] of incInfo) {
            const uri = vscode_uri_1.URI.file(path).toString();
            const incDocInfo = this.localAST.get(uri);
            if (incDocInfo) {
                r.push({
                    nodes: incDocInfo.tree,
                    uri: uri
                });
            }
        }
        return r;
    }
    /**
     * Return the AST of current select document
     */
    getTree() {
        var _a;
        // await this.done;
        if (this.currentDocUri)
            return (_a = this.docsAST.get(this.currentDocUri)) === null || _a === void 0 ? void 0 : _a.tree;
        else
            return [];
    }
    /**
     * Returns a string in the form of the function node's definition
     * @param symbol Function node to be converted
     * @param cmdFormat If ture, return in format of command
     */
    getFuncPrototype(symbol, cmdFormat = false) {
        const paramStartSym = cmdFormat ? ', ' : '(';
        const paramEndSym = cmdFormat ? '' : ')';
        let result = symbol.name + paramStartSym;
        symbol.params.map((param, index, array) => {
            result += param.name;
            if (param.isOptional)
                result += '[Optional]';
            if (param.defaultVal)
                result += ' := ' + param.defaultVal;
            if (array.length - 1 !== index)
                result += ', ';
        });
        return result + paramEndSym;
    }
    convertParamsCompletion(node) {
        if (node.kind === vscode_languageserver_1.SymbolKind.Function) {
            let params = node.params;
            return params.map(param => {
                let pc = vscode_languageserver_1.CompletionItem.create(param.name);
                pc.kind = vscode_languageserver_1.CompletionItemKind.Variable;
                pc.detail = '(parameter) ' + param.name;
                return pc;
            });
        }
        return [];
    }
    getGlobalCompletion() {
        var _a;
        let incCompletion = [];
        let docinfo;
        if (this.currentDocUri)
            docinfo = this.docsAST.get(this.currentDocUri);
        if (!docinfo)
            return [];
        // TODO: 应该统一只用this.allIncludeTreeinfomation
        const incInfo = this.incInfos.get(this.currentDocUri) || [];
        // 为方便的各种重复存储，还要各种加上累赘代码，真是有点沙雕
        for (let [path, raw] of incInfo) {
            const incUri = vscode_uri_1.URI.file(path).toString();
            // read include file tree from disk file tree caches
            const tree = (_a = this.localAST.get(incUri)) === null || _a === void 0 ? void 0 : _a.tree;
            if (tree) {
                incCompletion.push(...tree.map(node => {
                    let c = this.convertNodeCompletion(node);
                    c.data += '  \nInclude from ' + raw;
                    return c;
                }));
            }
        }
        return this.getTree().map(node => this.convertNodeCompletion(node))
            .concat(this.builtinFunction.map(node => {
            let ci = vscode_languageserver_1.CompletionItem.create(node.name);
            ci.data = this.getFuncPrototype(node);
            ci.kind = vscode_languageserver_1.CompletionItemKind.Function;
            return ci;
        }))
            .concat(this.builtinCommand.map(node => {
            let ci = vscode_languageserver_1.CompletionItem.create(node.name);
            ci.data = this.getFuncPrototype(node, true);
            ci.kind = vscode_languageserver_1.CompletionItemKind.Function;
            return ci;
        }))
            .concat(incCompletion);
    }
    getScopedCompletion(pos) {
        let node = this.searchNodeAtPosition(pos, this.getTree());
        if (node && node.subnode) {
            return node.subnode.map(node => {
                return this.convertNodeCompletion(node);
            }).concat(...this.convertParamsCompletion(node));
        }
        else {
            return [];
        }
    }
    includeDirCompletion(position) {
        const context = this.LineTextToPosition(position);
        const reg = /^\s*#include/i;
        if (!context)
            return undefined;
        let match = context.match(reg);
        if (!match)
            return undefined;
        // get dir text
        const p = context.slice(match[0].length).trim();
        const docDir = path_1.dirname(vscode_uri_1.URI.parse(this.currentDocUri).fsPath);
        let searchDir = [];
        // if is lib include, use lib dir
        if (p[0] === '<') {
            const np = path_1.normalize(p.slice(1));
            const dir = path_1.normalize(docDir + '\\Lib\\' + np);
            const ULibDir = path_1.normalize(this.ULibDir + '\\' + np);
            const SLibDir = path_1.normalize(this.SLibDir + '\\' + np);
            searchDir.push(dir, ULibDir, SLibDir);
        }
        else {
            const dir = path_1.normalize(docDir + '\\' + path_1.normalize(p));
            searchDir.push(dir);
        }
        let completions = [];
        for (const dir of searchDir) {
            completions.push(...this.ioService.statDirectory(dir));
            // If is not '#include <', because of library search order 
            // we must not search all directory. Once we found an exist directory, 
            // we return it
            if (completions.length > 0 && p !== '<')
                break;
        }
        return completions.map((completion) => {
            let c = vscode_languageserver_1.CompletionItem.create(completion.path);
            c.kind = completion.kind === ioService_1.IoKind.folder ?
                vscode_languageserver_1.CompletionItemKind.Folder :
                vscode_languageserver_1.CompletionItemKind.File;
            return c;
        });
    }
    /**
     * All words at a given position(top scope at last)
     * @param position
     */
    getLexemsAtPosition(position) {
        const context = this.getLine(position.line);
        if (!context)
            return undefined;
        let suffix = this.getWordAtPosition(position);
        let perfixs = [];
        let temppos = (suffix.name === '') ?
            position.character - 1 : // we need pre-character of empty suffix
            suffix.range.start.character - 1;
        // Push perfixs into perfixs stack
        while (this.getChar(context, temppos) === '.') {
            // FIXME: correct get word here 
            let word = this.getWordAtPosition(vscode_languageserver_1.Position.create(position.line, temppos - 1));
            perfixs.push(word.name);
            temppos = word.range.start.character - 1;
        }
        return [suffix.name].concat(perfixs);
    }
    /**
     * Get all nodes of a particular token.
     * return all possible nodes or empty list
     * @param position
     */
    getSuffixNodes(position) {
        let lexems = this.getLexemsAtPosition(position);
        if (!lexems)
            return undefined;
        return this.searchSuffix(lexems.slice(1), position);
    }
    /**
     * Get suffixs list of a given perfixs list
     * @param perfixs perfix list for search(top scope at last)
     */
    searchSuffix(perfixs, position) {
        if (!perfixs.length)
            return undefined;
        const find = this.searchNode(perfixs, position, true);
        if (!find)
            return undefined;
        const node = find.nodes[0];
        if (!node.subnode)
            return undefined;
        return {
            nodes: node.subnode,
            uri: find.uri
        };
    }
    /**
     * Get node of position and lexems
     * @param lexems all words strings(这次call，全部的分割词)
     * @param position position of qurey word(这个call的位置)
     */
    searchNode(lexems, position, issuffix = false) {
        // first search tree of current document
        let currTreeUri = this.currentDocUri;
        let nodeList = this.getTree();
        let incTreeMap = this.allIncludeTreeinfomation();
        // 这写的都是什么破玩意，没有天分就不要写，还学别人写LS --武状元
        // if first word is 'this'
        // find what 'this' is point
        if (lexems[lexems.length - 1] === 'this') {
            let classNode = this.searchNodeAtPosition(position, this.getTree(), vscode_languageserver_1.SymbolKind.Class);
            if (classNode) {
                // set next search tree to class node we found
                lexems[lexems.length - 1] = classNode.name;
                // if this is the only word, 
                // just return class' subnode
                if (!lexems.length)
                    return {
                        nodes: [classNode],
                        uri: currTreeUri
                    };
            }
            else {
                return undefined;
            }
        }
        if (!nodeList)
            return undefined;
        let cond = [];
        // finder search need top scope at first
        // 这里又要从头向后搜索了，转来转去的可真蠢
        lexems = lexems.reverse();
        for (const lexem of lexems) {
            cond.push(new scriptFinder_1.NodeMatcher(lexem));
        }
        let finder = new scriptFinder_1.ScriptFinder(cond, nodeList, currTreeUri, incTreeMap ? incTreeMap : []);
        let result = finder.find(issuffix);
        if (result) {
            return {
                nodes: [result.node],
                uri: result.uri
            };
        }
        return undefined;
    }
    /**
     * search at given tree to
     * find the deepest node that
     * covers the given condition
     *
     * @param pos position to search
     * @param tree AST tree for search
     * @param kind symbol kind of search item
     */
    searchNodeAtPosition(pos, tree, kind) {
        for (const node of tree) {
            if (pos.line > node.range.start.line && pos.line < node.range.end.line) {
                if (node.subnode) {
                    if (kind && !(node.kind === kind)) {
                        continue;
                    }
                    let subScopedNode = this.searchNodeAtPosition(pos, node.subnode, kind);
                    if (subScopedNode) {
                        return subScopedNode;
                    }
                    else {
                        return node;
                    }
                }
            }
        }
        return undefined;
    }
    /**
     * Convert a node to comletion item
     * @param info node to be converted
     */
    convertNodeCompletion(info) {
        let ci = vscode_languageserver_1.CompletionItem.create(info.name);
        if (isFuncNode(info)) {
            ci['kind'] = vscode_languageserver_1.CompletionItemKind.Function;
            ci.data = this.getFuncPrototype(info);
        }
        else if (info.kind === vscode_languageserver_1.SymbolKind.Variable) {
            ci.kind = vscode_languageserver_1.CompletionItemKind.Variable;
        }
        else if (info.kind === vscode_languageserver_1.SymbolKind.Class) {
            ci['kind'] = vscode_languageserver_1.CompletionItemKind.Class;
            ci.data = '';
        }
        else if (info.kind === vscode_languageserver_1.SymbolKind.Event) {
            ci['kind'] = vscode_languageserver_1.CompletionItemKind.Event;
        }
        else if (info.kind === vscode_languageserver_1.SymbolKind.Null) {
            ci['kind'] = vscode_languageserver_1.CompletionItemKind.Text;
        }
        return ci;
    }
    getFuncAtPosition(position) {
        let context = this.LineTextToPosition(position);
        if (!context)
            return undefined;
        // check if we need to attach to previous lines
        const attachToPreviousTest = new RegExp('^[ \t]*,');
        if (attachToPreviousTest.test(context)) {
            let linenum = position.line - 1;
            let lines = this.getLine(linenum);
            context = lines + context;
            while (lines) {
                if (attachToPreviousTest.test(lines)) {
                    linenum -= 1;
                    lines = this.getLine(linenum);
                    context = lines + context;
                }
                else
                    lines = undefined;
            }
        }
        let stmtStack = new semantic_stack_1.SemanticStack(context);
        let stmt;
        try {
            stmt = stmtStack.statement();
        }
        catch (err) {
            return undefined;
        }
        if (!stmt) {
            return undefined;
        }
        let perfixs = [];
        let node = stmt;
        if (semantic_stack_1.isExpr(stmt.value)) {
            node = stmt.value.right;
            while (semantic_stack_1.isExpr(node.value)) {
                node = node.value.right;
            }
        }
        stmt = node;
        if (stmt.value instanceof asttypes_1.FunctionCall) {
            // CommandCall always no errors
            if (!stmt.errors && !(stmt.value instanceof asttypes_1.CommandCall)) {
                return undefined;
            }
            let lastnode = this.getUnfinishedFunc(stmt.value);
            if (!lastnode) {
                lastnode = stmt.value;
            }
            if (lastnode instanceof asttypes_1.MethodCall) {
                perfixs = lastnode.ref.map(r => {
                    return r.content;
                });
            }
            const funcName = lastnode.name;
            let index = lastnode.actualParams.length === 0 ?
                lastnode.actualParams.length :
                lastnode.actualParams.length - 1;
            if (lastnode instanceof asttypes_1.CommandCall) {
                // All Commands are built-in, just search built-in Commands
                const bfind = arrayFilter(this.builtinCommand, item => item.name.toLowerCase() === funcName.toLowerCase());
                if (!bfind)
                    return undefined;
                return {
                    func: bfind,
                    index: index,
                    isCmd: true
                };
            }
            let find = this.searchNode([funcName].concat(...perfixs.reverse()), position);
            // if no find, search build-in
            if (!find) {
                const bfind = arrayFilter(this.builtinFunction, item => item.name.toLowerCase() === funcName.toLowerCase());
                if (!bfind)
                    return undefined;
                return {
                    func: bfind,
                    index: index,
                    isCmd: false
                };
            }
            return {
                func: find.nodes[0],
                index: index,
                isCmd: false
            };
        }
    }
    /**
     * Find the deepest unfinished Function of a AST node
     * @param node Node to be found
     */
    getUnfinishedFunc(node) {
        let perfixs;
        let lastParam = node.actualParams[node.actualParams.length - 1];
        // no-actual-parameter check 
        if (!lastParam || !lastParam.errors) {
            return undefined;
        }
        if (lastParam.value instanceof asttypes_1.FunctionCall) {
            let lastnode = this.getUnfinishedFunc(lastParam.value);
            if (lastnode) {
                if (node instanceof asttypes_1.FunctionCall) {
                    return lastnode;
                }
            }
            return lastParam.value;
        }
        return node;
    }
    getDefinitionAtPosition(position) {
        let lexems = this.getLexemsAtPosition(position);
        if (!lexems)
            return [];
        let find = this.searchNode(lexems, position);
        if (!find)
            return [];
        let locations = [];
        for (const node of find.nodes) {
            locations.push(vscode_languageserver_1.Location.create(find.uri, node.range));
        }
        return locations;
    }
    getWordAtPosition(position) {
        let reg = /[a-zA-Z0-9\u4e00-\u9fa5#_@\$\?]+/;
        const context = this.getLine(position.line);
        if (!context)
            return types_1.Word.create('', vscode_languageserver_1.Range.create(position, position));
        let wordName;
        let start;
        let end;
        let pos;
        pos = position.character;
        // Scan start
        // Start at previous character
        // 从前一个字符开始
        while (pos >= 0) {
            if (reg.test(this.getChar(context, pos - 1)))
                pos -= 1;
            else
                break;
        }
        start = vscode_languageserver_1.Position.create(position.line, pos);
        pos = position.character;
        // Scan end
        while (pos <= context.length) {
            if (reg.test(this.getChar(context, pos)))
                pos += 1;
            else
                break;
        }
        end = vscode_languageserver_1.Position.create(position.line, pos);
        wordName = context.slice(start.character, end.character);
        return types_1.Word.create(wordName, vscode_languageserver_1.Range.create(start, end));
    }
    getChar(context, pos) {
        try {
            // if (context[pos] === '\r' || context[pos] === '\t')
            return context[pos] ? context[pos] : '';
        }
        catch (err) {
            return '';
        }
    }
    getReference() {
        var _a;
        if (this.currentDocUri) {
            const ref = (_a = this.docsAST.get(this.currentDocUri)) === null || _a === void 0 ? void 0 : _a.refTable;
            if (ref)
                return ref;
        }
        return new Map();
    }
}
exports.TreeManager = TreeManager;
/**
 * Get eligible items in the array(找到数组中符合callback条件的项)
 * @param list array to be filted
 * @param callback condition of filter
 */
function arrayFilter(list, callback) {
    for (const item of list) {
        if (callback(item))
            return item;
    }
    return undefined;
}
//# sourceMappingURL=treeManager.js.map