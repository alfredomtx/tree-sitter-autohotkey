"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildBuiltinCommandNode = exports.buildBuiltinFunctionNode = exports.buildbuiltin_variable = exports.buildKeyWordCompletions = exports.keywords = exports.languageServer = exports.serverName = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const builtins_1 = require("./builtins");
exports.serverName = 'mock-ahk-vscode';
exports.languageServer = 'ahk-language-server';
exports.keywords = [
    'class', 'extends', 'if',
    'else', 'while', 'try',
    'loop', 'until', 'switch',
    'case', 'break', 'goto',
    'gosub', 'return', 'global',
    'local', 'throw', 'continue',
    'catch', 'finally', 'in',
    'for', 'this', 'new',
    'critical', 'exit', 'exitapp'
];
function buildKeyWordCompletions() {
    return exports.keywords.map(keyword => ({
        kind: vscode_languageserver_1.CompletionItemKind.Keyword,
        label: keyword,
        data: 0,
    }));
}
exports.buildKeyWordCompletions = buildKeyWordCompletions;
function buildbuiltin_variable() {
    return builtins_1.builtin_variable.map((bti_var_info, index) => {
        return {
            kind: vscode_languageserver_1.CompletionItemKind.Variable,
            detail: 'Built-in Variable',
            label: bti_var_info[0],
            data: index
        };
    });
}
exports.buildbuiltin_variable = buildbuiltin_variable;
function buildBuiltinFunctionNode() {
    return builtins_1.builtin_function;
}
exports.buildBuiltinFunctionNode = buildBuiltinFunctionNode;
function buildBuiltinCommandNode() {
    return builtins_1.builtin_command;
}
exports.buildBuiltinCommandNode = buildBuiltinCommandNode;
//# sourceMappingURL=constants.js.map