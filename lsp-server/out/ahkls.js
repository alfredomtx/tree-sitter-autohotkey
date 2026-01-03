"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AHKLS = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const constants_1 = require("./utilities/constants");
class AHKLS {
    constructor(connection) {
        this.connection = connection;
        this.keywords = constants_1.buildKeyWordCompletions();
        this.documents = new vscode_languageserver_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
    }
    listen() {
        this.connection.onInitialize(this.onInitialize.bind(this));
        this.connection.onCompletion(this.onCompletion.bind(this));
        this.connection.onCompletionResolve(this.onCompletionResolve.bind(this));
        // this.connection.onDocumentSymbol(this.onDocumentSymbol.bind(this));
        // this.documents.onDidChangeContent(this.onChange.bind(this));
        // Make the text document manager listen on the connection
        // for open, change and close text document events
        this.documents.listen(this.connection);
        // Listen on the connection
        this.connection.listen();
    }
    /**
     * Initialize the server from the client connection
     * @param params initialization parameters
     */
    onInitialize(params) {
        return {
            serverInfo: {
                // The name of the server as defined by the server.
                name: constants_1.languageServer,
            },
            capabilities: {
                textDocumentSync: vscode_languageserver_1.TextDocumentSyncKind.Incremental,
                // Tell the client that this server supports code completion.
                completionProvider: {
                    resolveProvider: true,
                    triggerCharacters: ['.', '(']
                },
                signatureHelpProvider: {
                    retriggerCharacters: ['(']
                },
                documentSymbolProvider: true
            }
        };
    }
    /**
     * Respond to completion requests from the client. This handler currently provides
     * both symbol completion as well as suffix completion.
     * @param completion the parameters describing the completion request
     * @param cancellation request cancellation token
     */
    async onCompletion(completion, cancellation) {
        return this.keywords;
    }
    /**
     * This handler provider completion item resolution capability. This provides
     * additional information for the currently completion item selection
     * @param completionItem the item to resolve further
     */
    onCompletionResolve(completionItem) {
        try {
            return completionItem;
        }
        catch (err) {
            // logException(this.logger, this.tracer, err, LogLevel.error);
            return completionItem;
        }
    }
}
exports.AHKLS = AHKLS;
//# sourceMappingURL=ahkls.js.map