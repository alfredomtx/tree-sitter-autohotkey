"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const path_1 = require("path");
const types_1 = require("./types");
const tokenizer_1 = require("./tokenizer");
const logger_1 = require("../../utilities/logger");
class Lexer {
    constructor(document, logger = logger_1.mockLogger) {
        this.line = -1;
        this.lineCommentFlag = false;
        this.includeFile = new Set();
        this.document = document;
        this.symboltree = null;
        this.referenceTable = new Map();
        this.logger = logger;
    }
    advanceLine() {
        if (this.line < this.document.lineCount - 1) {
            this.line++;
            // this.currentrawText = this.GetText();
            // this.currentText = this.currentrawText.replace(/"(""|.)*?"/g, '""');
            this.currentText = this.GetText();
        }
        else {
            this.currentText = undefined;
        }
    }
    Parse() {
        this.line = -1;
        this.advanceLine();
        this.referenceTable = new Map();
        this.symboltree = this.Analyze();
        return {
            tree: this.symboltree,
            refTable: this.referenceTable,
            include: this.includeFile
        };
    }
    Analyze(isEndByBrace = false, maxLine = 10000) {
        const lineCount = Math.min(this.document.lineCount, this.line + maxLine);
        let Symbol;
        const result = [];
        let match;
        let unclosedBrace = 1;
        let varnames = new Set();
        while (this.currentText && this.line <= lineCount - 1) {
            this.JumpMeanless();
            let startLine = this.line;
            try {
                if ((match = this.currentText.match(FuncReg)) && this.isVaildBlockStart(match[0].length)) {
                    switch (match[1].toLowerCase()) {
                        // skip if() and while()
                        case 'if':
                        case 'while':
                            unclosedBrace++;
                            break;
                        default:
                            result.push(this.GetMethodInfo(match, startLine));
                            break;
                    }
                }
                else if ((match = this.currentText.match(ClassReg)) && this.isVaildBlockStart(match[0].length)) {
                    result.push(this.GetClassInfo(match, startLine));
                }
                else if (Symbol = this.GetLabelInfo()) {
                    unclosedBrace += this.getUnclosedNum();
                    result.push(Symbol);
                }
                // improved var match and parse
                // thanks to 天黑请闭眼
                else if (match = this.currentText.match(VarReg)) {
                    unclosedBrace += this.getUnclosedNum();
                    for (let i = 0; i < match.length; i++) {
                        let name = match[i].trim();
                        // FIXME: wrong when refer class after first assign
                        if (varnames.has(name.toLowerCase())) {
                            continue;
                        }
                        varnames.add(name.toLowerCase());
                        result.push(this.GetVarInfo(name));
                    }
                }
                else {
                    if (match = this.currentText.match(includeReg)) {
                        this.checkInclude(this.currentText.slice(match[0].length).trim());
                    }
                    unclosedBrace += this.getUnclosedNum();
                }
            }
            catch (error) {
                // TODO: log every parse error here
                // this.logger(error.stringfy())
                // abandone a line while error
                continue;
            }
            if (isEndByBrace && unclosedBrace <= 0) {
                break;
            }
            this.advanceLine();
        }
        return result;
    }
    /**
     * verify is a vaild block start
     * if not is add reference of this symbol
     */
    isVaildBlockStart(startIndex) {
        // search if there is a "{" in the rest of the line
        // if not we go next line 
        let line = this.line;
        const text = this.currentText.slice(startIndex);
        if (text.search(/{/) >= 0) {
            this.advanceLine();
            return true;
        }
        else {
            this.advanceLine();
            // we jump Meanless line, space line and comment line
            this.JumpMeanless();
            if (this.currentText === undefined) {
                return false;
            }
            if (this.currentText.search(/^[ \t]*({)/) >= 0) {
                this.advanceLine();
                return true;
            }
        }
        // let templ = text.split(':=', 2);
        // this.addReference(templ[0].trim(), templ[1].trim(), line);
        return false;
    }
    getUnclosedNum() {
        let nextSearchStr = this.currentText;
        let unclosedPairNum = 0;
        let a_LPair = nextSearchStr.match(/[\s\t]*{/g);
        let a_RPair = nextSearchStr.match(/[\s\t]*}/g);
        if (a_LPair) {
            unclosedPairNum += a_LPair.length;
        }
        if (a_RPair) {
            unclosedPairNum -= a_RPair.length;
        }
        return unclosedPairNum;
    }
    /**
     * Add a normalized absolute include path
     * @param rawPath Raw include path of a ahk file
     */
    checkInclude(rawPath) {
        switch (path_1.extname(rawPath)) {
            case '.ahk':
                this.includeFile.add(rawPath);
                break;
            case '':
                if (rawPath[0] === '<' && rawPath[rawPath.length - 1] === '>')
                    this.includeFile.add(rawPath);
                // TODO: handle include path change
                break;
            default:
                break;
        }
    }
    /**
    * @param match fullmatch array of a method
    * @param startLine start line of a method
    */
    GetMethodInfo(match, startLine) {
        // if we match the funcName(param*), 
        // then we check if it is a function definition
        let name = match['groups']['funcname'];
        let sub = this.Analyze(true, 500);
        let endMatch;
        if (this.currentText && (endMatch = this.currentText.match(/^[ \t]*(})/))) {
            let endLine = this.line;
            let endIndex = endMatch[0].length;
            return new types_1.FuncNode(name, vscode_languageserver_1.SymbolKind.Function, vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(startLine, 0), vscode_languageserver_1.Position.create(endLine, endIndex)), this.PParams(match[2]), sub);
        }
        this.logger.error(`Method parse fail: ${name} at ${startLine + 1}-${this.line + 1}`);
        return new types_1.FuncNode(name, vscode_languageserver_1.SymbolKind.Function, vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(startLine, 0), vscode_languageserver_1.Position.create(startLine, 0)), this.PParams(match[2]));
    }
    /**
    * @param match match result
    * @param startLine startline of this symbol
    */
    GetClassInfo(match, startLine) {
        let name = match['groups']['classname'];
        let sub = this.Analyze(true, 2000);
        let endMatch;
        // FIXME: temporary soluation, invaild -1 line marked builtin property
        const invaildRange = vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(-1, -1), vscode_languageserver_1.Position.create(-1, -1));
        // class property belongs to method's subnode which is wrong
        // fix it here
        let propertyList = [
            new types_1.SymbolNode('base', vscode_languageserver_1.SymbolKind.Property, invaildRange),
            new types_1.SymbolNode('__class', vscode_languageserver_1.SymbolKind.Property, invaildRange)
        ];
        for (const fNode of sub) {
            if (fNode instanceof types_1.FuncNode && fNode.subnode) {
                // temp array containing non-property node
                let temp = [];
                for (const node of fNode.subnode) {
                    if (node.kind === vscode_languageserver_1.SymbolKind.Property) {
                        propertyList.push(node);
                    }
                    else
                        temp.push(node);
                }
                fNode.subnode = temp;
            }
            // varible belongs to class is a property
            // fix it here
            else if (fNode.kind === vscode_languageserver_1.SymbolKind.Variable)
                fNode.kind = vscode_languageserver_1.SymbolKind.Property;
        }
        sub.push(...propertyList);
        // get end of class
        if (this.currentText && (endMatch = this.currentText.match(/^[ \t]*(})/))) {
            let endLine = this.line;
            let endIndex = endMatch[0].length;
            return new types_1.ClassNode(name, vscode_languageserver_1.SymbolKind.Class, vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(startLine, 0), vscode_languageserver_1.Position.create(endLine, endIndex)), sub);
        }
        this.logger.error(`Class parse fail: ${name} at ${startLine + 1}-${this.line + 1}`);
        return new types_1.ClassNode(name, vscode_languageserver_1.SymbolKind.Class, vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(startLine, 0), vscode_languageserver_1.Position.create(startLine, 0)), sub);
    }
    GetLabelInfo() {
        let text = this.currentText;
        let match = text.match(/^\s*(?<labelname>[a-zA-Z\u4e00-\u9fa5#_@$][a-zA-Z0-9\u4e00-\u9fa5#_@$]*):\s*(\s;.*)?$/);
        let range = vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(this.line, 0), vscode_languageserver_1.Position.create(this.line, 0));
        if (match) {
            let labelname = match['groups']['labelname'];
            return new types_1.SymbolNode(labelname, vscode_languageserver_1.SymbolKind.Null, range);
        }
        else if (match = text.match(/^\s*(?<labelname>[\x09\x20-\x7E]+)::/)) {
            let labelname = match['groups']['labelname'];
            return new types_1.SymbolNode(labelname, vscode_languageserver_1.SymbolKind.Event, range);
        }
    }
    /**
     * Return variable symbol node
     * @param match matched variable name string
     */
    GetVarInfo(match) {
        // get position of current variable in current line
        const index = this.currentText.search(match);
        // cut string to assignment token for parsing of tokenizer
        const s = this.currentText.slice(index + match.length);
        let ref;
        const tokenizer = new tokenizer_1.Tokenizer(s);
        let tokenStack = [];
        tokenStack.push(tokenizer.GetNextToken());
        tokenStack.push(tokenizer.GetNextToken());
        let t = tokenStack.pop();
        if (t && t.type === types_1.TokenType.new) {
            let token = tokenizer.GetNextToken();
            if (token.type === types_1.TokenType.id) {
                let perfix = [token.content];
                while (tokenizer.currChar === '.') {
                    tokenizer.GetNextToken();
                    token = tokenizer.GetNextToken();
                    if (token.type === types_1.TokenType.id) {
                        perfix.push(token.content);
                    }
                }
                ref = perfix.join('.');
                this.addReference(match, perfix.join('.'), this.line);
            }
        }
        // check if var is a property
        if (match.search(/\./) >= 0) {
            let propertyList = match.split('.');
            if (propertyList[0] === 'this') {
                // property is return as subnode of method
                // will be fixed in GetClassInfo
                return new types_1.VariableNode(propertyList[1], vscode_languageserver_1.SymbolKind.Property, vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(this.line, index), vscode_languageserver_1.Position.create(this.line, index)), ref);
            }
        }
        return new types_1.VariableNode(match, vscode_languageserver_1.SymbolKind.Variable, vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(this.line, index), vscode_languageserver_1.Position.create(this.line, index)), ref);
    }
    PParams(s_params) {
        s_params = s_params.slice(1, -1);
        let result = [];
        s_params.split(',').map(param => {
            let paraminfo = types_1.Parameter.create(param.trim());
            // check if the parameter has a default value
            let l = paraminfo.name.split(/:?=/);
            if (l.length > 1) {
                paraminfo.name = l[0].trim();
                paraminfo.isOptional = true;
                paraminfo.defaultVal = l[1];
            }
            result.push(paraminfo);
        });
        return result;
    }
    GetText() {
        let line = vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(this.line, 0), vscode_languageserver_1.Position.create(this.line + 1, 0));
        // FIXME: getline here
        let text = this.document.getText(line);
        return text;
    }
    /**
     * Add reference infomation to referenceTable
     * @param variable var
     * @param symbol Class or function that a variable is refered
     * @param line Line of the variable
     */
    addReference(variable, symbol, line) {
        var _a;
        if (this.referenceTable.has(symbol)) {
            (_a = this.referenceTable.get(symbol)) === null || _a === void 0 ? void 0 : _a.push(types_1.ReferenceInfomation.create(variable, line));
        }
        else {
            this.referenceTable.set(symbol, [types_1.ReferenceInfomation.create(variable, line)]);
        }
    }
    PComment() {
        let text = this.currentText;
        if (this.lineCommentFlag === true) {
            // end of block commentss
            if (text.search(/^[ \t]*\*\//) >= 0) {
                this.lineCommentFlag = false;
            }
            return true;
        }
        else if (text.search(/^[ \t]*[;]/) >= 0) {
            return true;
        }
        // start of block comments
        // TODO: Support Docs comments
        else if (text.search(/^[ \t]*\/\*/) >= 0) {
            this.lineCommentFlag = true;
            return true;
        }
        return false;
    }
    JumpMeanless() {
        while ((this.currentText && this.currentText.trim() === "") ||
            this.PComment()) {
            this.advanceLine();
            if (this.line >= this.document.lineCount - 1) {
                break;
            }
        }
        this.lineCommentFlag = false;
    }
}
exports.Lexer = Lexer;
// Test regexes
const FuncReg = /^[ \t]*(?<funcname>[a-zA-Z0-9\u4e00-\u9fa5#_@\$\?\[\]]+)(\(.*?\))/;
const ClassReg = /^[ \t]*class[ \t]+(?<classname>[a-zA-Z0-9\u4e00-\u9fa5#_@\$\?\[\]]+)/i;
const VarReg = /\s*\b((?<!\.)[a-zA-Z\u4e00-\u9fa5#_@$][a-zA-Z0-9\u4e00-\u9fa5#_@$]*)(\.[a-zA-Z0-9\u4e00-\u9fa5#_@$]+)*?\s*(?=[+\-*/.:]=|\+\+|\-\-)/g;
const includeReg = /^\s*#include[,]?/i;
//# sourceMappingURL=ahkparser.js.map