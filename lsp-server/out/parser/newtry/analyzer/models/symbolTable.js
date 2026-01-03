"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolTable = void 0;
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
const symbol_1 = require("./symbol");
/**
 * Symbol Table for the entire AHK file
 * Used for global scoop and super global scoop
 */
class SymbolTable {
    constructor(name, scoopLevel, enclosingScoop) {
        this.symbols = new Map();
        this.name = name;
        this.scoopLevel = scoopLevel;
        this.enclosingScoop = enclosingScoop;
        this.dependcyScoop = new Set();
        this.includeTable = new Set();
        this.initTypeSystem();
    }
    initTypeSystem() {
        this.define(new symbol_1.BuiltinTypeSymbol('number'));
        this.define(new symbol_1.BuiltinTypeSymbol('string'));
    }
    define(sym) {
        this.symbols.set(sym.name, sym);
    }
    resolve(name) {
        var _a;
        let result = this.symbols.get(name);
        if (result)
            return result;
        // then check parent scoop
        result = (_a = this.enclosingScoop) === null || _a === void 0 ? void 0 : _a.resolve(name);
        if (result)
            return result;
        // finally check include symbol table
        for (const table of this.includeTable) {
            result = table.resolve(name);
            if (result)
                return result;
        }
        return undefined;
    }
    addScoop(scoop) {
        this.dependcyScoop.add(scoop);
    }
    addInclude(table) {
        this.includeTable.add(table);
    }
    allSymbols() {
        const syms = [];
        for (const [name, sym] of this.symbols)
            syms.push(sym);
        return syms;
    }
    symbolInformations() {
        let info = [];
        for (const [name, sym] of this.symbols) {
            if (sym instanceof symbol_1.VaribaleSymbol) {
                info.push(vscode_languageserver_types_1.SymbolInformation.create(name, vscode_languageserver_types_1.SymbolKind.Variable, sym.range));
            }
            else if (sym instanceof symbol_1.AHKMethodSymbol) {
                info.push(vscode_languageserver_types_1.SymbolInformation.create(name, vscode_languageserver_types_1.SymbolKind.Method, sym.range));
                info.push(...sym.symbolInformations());
            }
            else if (sym instanceof symbol_1.AHKObjectSymbol) {
                info.push(vscode_languageserver_types_1.SymbolInformation.create(name, vscode_languageserver_types_1.SymbolKind.Class, sym.range));
                info.push(...sym.symbolInformations());
            }
            else if (sym instanceof symbol_1.HotkeySymbol || sym instanceof symbol_1.HotStringSymbol) {
                info.push(vscode_languageserver_types_1.SymbolInformation.create(name, vscode_languageserver_types_1.SymbolKind.Event, sym.range));
            }
            else
                continue;
        }
        return info;
    }
    toString() {
        let scope_header = '作用域符号表：';
        let lines = ['\n', scope_header, '='.repeat(scope_header.length * 2)];
        lines.push(`作用域名称: ${this.name}`);
        let symtab_header = '符号表中的内容：';
        lines.push(...['\n', symtab_header, '-'.repeat(scope_header.length * 2)]);
        this.symbols.forEach((v, k) => lines.push(`${k}: ${v}`));
        return lines.join('\n');
    }
}
exports.SymbolTable = SymbolTable;
//# sourceMappingURL=symbolTable.js.map