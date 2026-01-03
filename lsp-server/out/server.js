"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const vscode_languageserver_1 = require("vscode-languageserver");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const constants_1 = require("./utilities/constants");
const builtins_1 = require("./utilities/builtins");
const ahkparser_1 = require("./parser/regParser/ahkparser");
const treeManager_1 = require("./services/treeManager");
const logger_1 = require("./utilities/logger");
// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = vscode_languageserver_1.createConnection(vscode_languageserver_1.ProposedFeatures.all);
// Create a simple text document manager. 
let documents = new vscode_languageserver_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;
const logger = new logger_1.Logger(connection.console);
let keyWordCompletions = constants_1.buildKeyWordCompletions();
let builtinVariableCompletions = constants_1.buildbuiltin_variable();
let DOCManager = new treeManager_1.TreeManager(logger);
connection.onInitialize((params) => {
    let capabilities = params.capabilities;
    // Does the client support the `workspace/configuration` request?
    // If not, we fall back using global settings.
    hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
    hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
    hasDiagnosticRelatedInformationCapability = !!(capabilities.textDocument &&
        capabilities.textDocument.publishDiagnostics &&
        capabilities.textDocument.publishDiagnostics.relatedInformation);
    const result = {
        serverInfo: {
            // The name of the server as defined by the server.
            name: constants_1.languageServer,
        },
        capabilities: {
            textDocumentSync: vscode_languageserver_1.TextDocumentSyncKind.Incremental,
            // Tell the client that this server supports code completion.
            // `/` and `<` is only used for include compeltion
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: ['.', '/', '<']
            },
            signatureHelpProvider: {
                triggerCharacters: ['(', ',']
            },
            documentSymbolProvider: true,
            definitionProvider: true
        }
    };
    if (hasWorkspaceFolderCapability) {
        result.capabilities.workspace = {
            workspaceFolders: {
                supported: true
            }
        };
    }
    return result;
});
connection.onInitialized(() => {
    if (hasConfigurationCapability) {
        // Register for all configuration changes.
        connection.client.register(vscode_languageserver_1.DidChangeConfigurationNotification.type, undefined);
    }
    if (hasWorkspaceFolderCapability) {
        connection.workspace.onDidChangeWorkspaceFolders(_event => {
            connection.console.log('Workspace folder change event received.');
        });
    }
});
/**
 * Name of AHK document language
 */
var docLangName;
(function (docLangName) {
    docLangName["CN"] = "CN";
    docLangName["NO"] = "no"; // No Doc
})(docLangName || (docLangName = {}));
;
// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings = {
    maxNumberOfProblems: 1000,
    documentLanguage: docLangName.NO
};
let globalSettings = defaultSettings;
// Cache the settings of all open documents
let documentSettings = new Map();
connection.onDidChangeConfiguration(change => {
    if (hasConfigurationCapability) {
        // Reset all cached document settings
        documentSettings.clear();
    }
    else {
        globalSettings = ((change.settings.languageServerExample || defaultSettings));
    }
    // Revalidate all open text documents
    documents.all().forEach(validateTextDocument);
});
function getDocumentSettings(resource) {
    if (!hasConfigurationCapability) {
        return Promise.resolve(globalSettings);
    }
    let result = documentSettings.get(resource);
    if (!result) {
        result = connection.workspace.getConfiguration({
            scopeUri: resource,
            section: 'AutohotkeyLanguageServer'
        });
        documentSettings.set(resource, result);
    }
    return result;
}
function flatTree(tree) {
    let result = [];
    tree.map(info => {
        // FIXME: temporary soluation, invaild -1 line marked builtin property
        if (info.range.start.line !== -1)
            result.push(info);
        if (info.subnode)
            result.push(...flatTree(info.subnode));
    });
    return result;
}
connection.onDocumentSymbol((params) => {
    const tree = DOCManager.selectDocument(params.textDocument.uri).getTree();
    return flatTree(tree).map(info => {
        return vscode_languageserver_1.SymbolInformation.create(info.name, info.kind, info.range, params.textDocument.uri);
    });
});
connection.onSignatureHelp(async (positionParams, cancellation) => {
    const { position } = positionParams;
    const { uri } = positionParams.textDocument;
    if (cancellation.isCancellationRequested) {
        return undefined;
    }
    let info = DOCManager.selectDocument(uri).getFuncAtPosition(position);
    if (info) {
        return {
            signatures: [
                vscode_languageserver_1.SignatureInformation.create(DOCManager.getFuncPrototype(info.func, info.isCmd), undefined, ...info.func.params.map((param) => {
                    return vscode_languageserver_1.ParameterInformation.create(param.name);
                }))
            ],
            activeParameter: info.index,
            activeSignature: 0
        };
    }
    else {
        return undefined;
    }
});
connection.onDefinition(async (params, token) => {
    if (token.isCancellationRequested) {
        return undefined;
    }
    let { position } = params;
    // search definiton at request position
    let locations = DOCManager.selectDocument(params.textDocument.uri).getDefinitionAtPosition(position);
    if (locations.length) {
        return locations;
    }
    return undefined;
});
// load opened document
documents.onDidOpen(async (e) => {
    let lexer = new ahkparser_1.Lexer(e.document, logger);
    const docInfo = lexer.Parse();
    DOCManager.initDocument(e.document.uri, docInfo, e.document);
});
// Only keep settings for open documents
documents.onDidClose(e => {
    // delete document infomation that is closed
    documentSettings.delete(e.document.uri);
    //TODO: better sulotion about close document
    DOCManager.deleteUnusedDocument(e.document.uri);
});
// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
    let lexer = new ahkparser_1.Lexer(change.document, logger);
    let docAST = lexer.Parse();
    DOCManager.updateDocumentAST(change.document.uri, docAST, change.document);
    validateTextDocument(change.document);
});
async function validateTextDocument(textDocument) {
    // In this simple example we get the settings for every validate run.
    let result = await getDocumentSettings(textDocument.uri);
    // connection.console.log(result.documentLanguage);
}
connection.onDidChangeWatchedFiles(_change => {
    // Monitored files have change in VSCode
    connection.console.log('We received an file change event');
});
// This handler provides the initial list of the completion items.
connection.onCompletion(async (_compeltionParams, token) => {
    if (token.isCancellationRequested) {
        return undefined;
    }
    const { position, textDocument } = _compeltionParams;
    // findout if we are in an include compeltion
    if (_compeltionParams.context &&
        (_compeltionParams.context.triggerCharacter === '/' || _compeltionParams.context.triggerCharacter === '<')) {
        let result = DOCManager.selectDocument(textDocument.uri).includeDirCompletion(position);
        // if request is fired by `/` and `<`,but not start with "include", we exit
        if (result)
            return result;
        else
            return undefined;
    }
    // search and find out if we are in a suffix compeltion
    let result = DOCManager.selectDocument(textDocument.uri).getSuffixNodes(position);
    if (result) {
        return result.nodes.map(DOCManager.convertNodeCompletion.bind(DOCManager));
    }
    // if not go to symbol compeltion
    return DOCManager.getGlobalCompletion()
        .concat(DOCManager.getScopedCompletion(_compeltionParams.position))
        .concat(keyWordCompletions).concat(builtinVariableCompletions);
});
// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve(async (item) => {
    switch (item.kind) {
        case vscode_languageserver_1.CompletionItemKind.Function:
        case vscode_languageserver_1.CompletionItemKind.Method:
        case vscode_languageserver_1.CompletionItemKind.Class:
            // provide addition infomation of class and function
            item.detail = item.data;
            break;
        case vscode_languageserver_1.CompletionItemKind.Variable:
            // if this is a `built-in` variable
            // provide the document of it
            if (item.detail === 'Built-in Variable') {
                // TODO: configuration for each document.
                let uri = documents.all()[0].uri;
                let cfg = await documentSettings.get(uri);
                if ((cfg === null || cfg === void 0 ? void 0 : cfg.documentLanguage) === docLangName.CN)
                    // item.data contains the infomation index(in builtin_variable)
                    // of variable
                    item.documentation = {
                        kind: 'markdown',
                        value: builtins_1.builtin_variable[item.data][1]
                    };
            }
        default:
            break;
    }
    return item;
});
// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);
// Listen on the connection
connection.listen();
connection.console.log('Starting AHK Server');
//# sourceMappingURL=server.js.map