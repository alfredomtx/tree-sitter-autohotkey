"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AHKObjectSymbol = exports.AHKMethodSymbol = exports.AHKBuiltinObjectSymbol = exports.AHKBuiltinMethodSymbol = exports.ScopedSymbol = exports.BuiltinTypeSymbol = exports.LabelSymbol = exports.HotStringSymbol = exports.HotkeySymbol = exports.VaribaleSymbol = exports.BuiltinVaribelSymbol = exports.AHKSymbol = void 0;
const types_1 = require("../types");
const vscode_languageserver_1 = require("vscode-languageserver");
class AHKSymbol {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
exports.AHKSymbol = AHKSymbol;
class BuiltinVaribelSymbol extends AHKSymbol {
    constructor(name, tag, type) {
        super(name, type);
        this.name = name;
        this.tag = tag;
    }
    toString() {
        return this.type !== undefined ?
            `<${this.name}: ${this.type.name}>` :
            `<Variable ${this.name}>`;
    }
}
exports.BuiltinVaribelSymbol = BuiltinVaribelSymbol;
class VaribaleSymbol extends AHKSymbol {
    /**
     * @param name Name of a variable
     * @param range Range of its defined area
     * @param tag Kind of this variable
     * @param type Type of this variable
     */
    constructor(uri, name, range, tag, type) {
        super(name, type);
        this.uri = uri;
        this.name = name;
        this.range = range;
        this.tag = tag;
    }
    toString() {
        return this.type !== undefined ?
            `<${this.name}: ${this.type.name}>` :
            `<Variable ${this.name}>`;
    }
}
exports.VaribaleSymbol = VaribaleSymbol;
class HotkeySymbol extends AHKSymbol {
    constructor(uri, name, range) {
        super(name);
        this.uri = uri;
        this.range = range;
    }
    toString() {
        return `<Hotkey ${this.name}>`;
    }
}
exports.HotkeySymbol = HotkeySymbol;
class HotStringSymbol extends AHKSymbol {
    constructor(uri, name, range) {
        super(name);
        this.uri = uri;
        this.range = range;
    }
    toString() {
        return `<HotString ${this.name}>`;
    }
}
exports.HotStringSymbol = HotStringSymbol;
class LabelSymbol extends AHKSymbol {
    constructor(uri, name, range) {
        super(name);
        this.uri = uri;
        this.range = range;
    }
    toString() {
        return `<Label ${this.name}>`;
    }
}
exports.LabelSymbol = LabelSymbol;
class BuiltinTypeSymbol extends AHKSymbol {
    constructor(name) {
        super(name);
    }
    toString() {
        return `<BuiltinType ${this.name}>`;
    }
}
exports.BuiltinTypeSymbol = BuiltinTypeSymbol;
class ScopedSymbol extends AHKSymbol {
    constructor(name, enclosingScoop) {
        super(name);
        this.symbols = new Map();
        this.enclosingScoop = enclosingScoop;
        this.dependcyScoop = new Set();
    }
    define(sym) {
        this.symbols.set(sym.name, sym);
    }
    resolve(name) {
        var _a;
        if (this.symbols.has(name))
            return this.symbols.get(name);
        return (_a = this.enclosingScoop) === null || _a === void 0 ? void 0 : _a.resolve(name);
    }
    addScoop(scoop) {
        this.dependcyScoop.add(scoop);
    }
    allSymbols() {
        const syms = [];
        for (const [name, sym] of this.symbols)
            syms.push(sym);
        return syms;
    }
    symbolInformations() {
        const info = [];
        for (const [name, sym] of this.symbols) {
            if (sym instanceof VaribaleSymbol && sym.tag !== types_1.VarKind.parameter) {
                const kind = sym.tag === types_1.VarKind.variable ? vscode_languageserver_1.SymbolKind.Variable : vscode_languageserver_1.SymbolKind.Property;
                info.push(vscode_languageserver_1.SymbolInformation.create(name, kind, sym.range));
            }
            else if (sym instanceof AHKMethodSymbol) {
                info.push(vscode_languageserver_1.SymbolInformation.create(name, vscode_languageserver_1.SymbolKind.Method, sym.range));
                info.push(...sym.symbolInformations());
            }
            else if (sym instanceof AHKObjectSymbol) {
                info.push(vscode_languageserver_1.SymbolInformation.create(name, vscode_languageserver_1.SymbolKind.Class, sym.range));
                info.push(...sym.symbolInformations());
            }
            else if (sym instanceof HotkeySymbol || sym instanceof HotStringSymbol) {
                info.push(vscode_languageserver_1.SymbolInformation.create(name, vscode_languageserver_1.SymbolKind.Event, sym.range));
            }
            else
                continue;
        }
        return info;
    }
}
exports.ScopedSymbol = ScopedSymbol;
class AHKBuiltinMethodSymbol extends ScopedSymbol {
    constructor(name, requiredParameters, optionalParameters, enclosingScoop) {
        super(name, enclosingScoop);
        this.requiredParameters = requiredParameters;
        this.optionalParameters = optionalParameters;
        this.initParameters();
    }
    initParameters() {
        this.requiredParameters.forEach(v => this.define(v));
        this.optionalParameters.forEach(v => this.define(v));
    }
}
exports.AHKBuiltinMethodSymbol = AHKBuiltinMethodSymbol;
class AHKBuiltinObjectSymbol extends ScopedSymbol {
    /**
     * @param name Name of class symbol
     * @param parentScoop parent class
     * @param enclosingScoop parent scoop
     */
    constructor(name, parentScoop, enclosingScoop) {
        super(name, enclosingScoop);
        this.parentScoop = parentScoop;
    }
    /**
     * Lookup property symbol of a class
     * @param name Property symbol name
     */
    resolveProp(name) {
        var _a;
        if (this.symbols.has(name))
            return this.symbols.get(name);
        return (_a = this.parentScoop) === null || _a === void 0 ? void 0 : _a.resolve(name);
    }
}
exports.AHKBuiltinObjectSymbol = AHKBuiltinObjectSymbol;
class AHKMethodSymbol extends ScopedSymbol {
    constructor(uri, name, range, requiredParameters, optionalParameters, enclosingScoop, parentScoop) {
        super(name, enclosingScoop);
        this.uri = uri;
        this.range = range;
        this.requiredParameters = requiredParameters;
        this.optionalParameters = optionalParameters;
        this.parentScoop = parentScoop;
        this.initParameters();
    }
    initParameters() {
        this.requiredParameters.forEach(v => this.define(v));
        this.optionalParameters.forEach(v => this.define(v));
    }
    defineThis() {
        if (this.parentScoop && this.parentScoop instanceof AHKMethodSymbol)
            this.symbols.set('this', this.parentScoop);
    }
    toString() {
        const reqParaStr = this.requiredParameters.map(v => v.name);
        const optParaStr = this.optionalParameters.map(v => v.name);
        return `${this.name}(${reqParaStr.concat(optParaStr).join(',')})`;
    }
}
exports.AHKMethodSymbol = AHKMethodSymbol;
class AHKObjectSymbol extends ScopedSymbol {
    /**
     * @param name Name of class symbol
     * @param range range of symbol
     * @param parentScoop parent class
     * @param enclosingScoop parent scoop
     */
    constructor(uri, name, range, parentScoop, enclosingScoop) {
        super(name, enclosingScoop);
        this.uri = uri;
        this.range = range;
        this.parentScoop = parentScoop;
    }
    /**
     * Lookup property symbol of a class
     * @param name Property symbol name
     */
    resolveProp(name) {
        var _a;
        if (this.symbols.has(name))
            return this.symbols.get(name);
        return (_a = this.parentScoop) === null || _a === void 0 ? void 0 : _a.resolve(name);
    }
}
exports.AHKObjectSymbol = AHKObjectSymbol;
//# sourceMappingURL=symbol.js.map