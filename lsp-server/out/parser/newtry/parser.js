"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AHKParser = void 0;
const tokenizer_1 = require("./tokenizer");
const tokenTypes_1 = require("./tokenTypes");
const parseError_1 = require("./models/parseError");
const Stmt = require("./models/stmt");
const Expr = require("./models/expr");
const SuffixTerm = require("./models/suffixterm");
const precedences_1 = require("./models/precedences");
const parseResult_1 = require("./utils/parseResult");
class AHKParser {
    constructor(document) {
        /**
         * list for storaging all tokens
         */
        this.tokens = [];
        this.pos = 0;
        this.tokenizer = new tokenizer_1.Tokenizer(document);
        this.currentToken = this.tokenizer.GetNextToken();
        this.tokens.push(this.currentToken);
    }
    // private nextToken(): Token {
    //     try {
    //         return this.tokenizer.GetNextToken();
    //     }
    //     catch (error) {
    //     }
    // }
    advance() {
        this.pos++;
        if (this.pos >= this.tokens.length) {
            this.currentToken = this.tokenizer.GetNextToken();
            this.tokens.push(this.currentToken);
        }
        return this;
    }
    previous() {
        return this.tokens[this.pos - 1];
    }
    /**
     * return newest token of tokenizer
     */
    peek() {
        let token = this.tokenizer.GetNextToken();
        this.tokens.push(token);
        return token;
    }
    error(token, message) {
        return new parseError_1.ParseError(token, message);
    }
    statement() {
        switch (this.currentToken.type) {
            case tokenTypes_1.TokenType.id:
                return this.idLeadStatement();
            // case TokenType.openBrace:
            //     return this.block();
            // case TokenType.command:
            //     return this.command();
            // case TokenType.if:
            //     return this.ifStmt();
            // case TokenType.break:
            //     return this.breakStmt();
            // case TokenType.return:
            //     return this.returnStmt();
            // case TokenType.switch:
            //     return this.switchStmt();
            // case TokenType.loop:
            //     return this.loopStmt();
            // case TokenType.while:
            //     return this.whileStmt();
            // case TokenType.try:
            //     return this.tryStmt();
            // case TokenType.drective:
            //     return this.drective();
            default:
                throw this.error(this.currentToken, 'UnKnown statment found');
        }
    }
    // private block(): INodeResult<IASTNode> {
    // }
    // private ifStmt(): INodeResult<IASTNode> {
    // }
    // private breakStmt(): INodeResult<IASTNode> {
    // }
    // private returnStmt(): INodeResult<IASTNode> {
    // }
    // private switchStmt(): INodeResult<IASTNode> {
    // }
    // private loopStmt(): INodeResult<IASTNode> {
    // }
    // private whileStmt(): INodeResult<IASTNode> {
    // }
    // private tryStmt(): INodeResult<IASTNode> {
    // }
    // private drective(): INodeResult<IASTNode> {
    // }
    idLeadStatement() {
        const p = this.peek();
        switch (p.type) {
            // case TokenType.openParen:
            //     return this.func();
            case tokenTypes_1.TokenType.equal:
            case tokenTypes_1.TokenType.aassign:
                // expression is only allowed in assignment in AHK
                return this.assign();
            // case TokenType.and:
            // case TokenType.hotkey:
            //     return this.hotkey();
            // case TokenType.colon:
            //     return this.label();
            // 其他是语法错误，统一当作有错误的赋值语句
            default:
                throw this.error(p, 'Invalid follower(s) of identifer');
        }
    }
    declaration() {
        try {
            switch (this.currentToken.type) {
                case tokenTypes_1.TokenType.id:
                    return this.idLeadStatement();
                // case TokenType.class:
                //     return this.classDecl();
                case tokenTypes_1.TokenType.global:
                case tokenTypes_1.TokenType.local:
                case tokenTypes_1.TokenType.static:
                    return this.assign();
                // !|^|# 开始的热键
                // case TokenType.not:
                // case TokenType.xor:
                // case TokenType.sharp:
                //     return this.hotkey();
                default:
                    return this.statement();
            }
        }
        catch (error) {
            if (error instanceof parseError_1.ParseError) {
                return {
                    errors: [error],
                    value: new Stmt.Invalid(this.currentToken.end, [this.currentToken])
                };
            }
            throw error;
        }
    }
    // assignment statemnet
    assign() {
        let id = this.currentToken;
        this.advance();
        let assign = this.currentToken;
        this.advance();
        let expr = this.expression();
        return {
            errors: expr.errors,
            value: new Stmt.AssignStmt(id, assign, expr.value)
        };
    }
    // for test expresion
    testExpr() {
        return this.expression();
    }
    expression(p = 0) {
        let start = this.pos;
        let result;
        try {
            switch (this.currentToken.type) {
                // all Unary operator
                case tokenTypes_1.TokenType.plus:
                case tokenTypes_1.TokenType.minus:
                case tokenTypes_1.TokenType.and:
                case tokenTypes_1.TokenType.multi:
                case tokenTypes_1.TokenType.not:
                case tokenTypes_1.TokenType.bnot:
                    const saveToken = this.currentToken;
                    this.advance();
                    const expr = this.expression(precedences_1.UnaryPrecedence);
                    result = parseResult_1.nodeResult(new Expr.Unary(saveToken, expr.value), expr.errors);
                case tokenTypes_1.TokenType.openParen:
                    // TODO: Process paren expression
                    let OPar = this.currentToken;
                    this.advance();
                    result = this.expression();
                    let CPar = this.currentToken;
                    this.advance();
                    break;
                case tokenTypes_1.TokenType.number:
                case tokenTypes_1.TokenType.string:
                case tokenTypes_1.TokenType.openBrace:
                case tokenTypes_1.TokenType.openBracket:
                case tokenTypes_1.TokenType.id:
                case tokenTypes_1.TokenType.precent:
                    // TODO: process array, dict, and precent expression
                    result = this.factor();
                    break;
                default:
                    throw this.error(this.currentToken, 'Expect an experssion');
            }
            // pratt parse
            while ((this.currentToken.type >= tokenTypes_1.TokenType.pplus &&
                this.currentToken.type <= tokenTypes_1.TokenType.lshifteq) &&
                precedences_1.Precedences[this.currentToken.type] >= p) {
                const saveToken = this.currentToken;
                this.advance();
                const q = precedences_1.Precedences[saveToken.type];
                const right = this.expression(q + 1);
                result = parseResult_1.nodeResult(new Expr.Binary(result.value, saveToken, right.value), result.errors.concat(right.errors));
            }
            return result;
        }
        catch (error) {
            if (error instanceof parseError_1.ParseError) {
                // this.logger.verbose(JSON.stringify(error.partial));
                // this.synchronize(error.failed);
                // TODO: Correct error token list
                const tokens = this.tokens[start];
                return {
                    errors: [error],
                    value: new Expr.Invalid(tokens.start, [tokens]),
                };
            }
            throw error;
        }
    }
    factor() {
        const suffixTerm = this.suffixTerm();
        const factor = new Expr.factor(suffixTerm.value);
        const errors = suffixTerm.errors;
        // check is if factor has a suffix
        if (this.currentToken.type === tokenTypes_1.TokenType.dot) {
            // create first suffix for connecting all suffix togther
            // TODO: Why use linked list here?
            // Is linked list more efficient than Array?
            let dot = this.currentToken;
            this.advance();
            let suffixTerm = this.suffixTerm(true);
            errors.push(...suffixTerm.errors);
            // link suffix to factor with trailer
            let trailer = new SuffixTerm.SuffixTrailer(suffixTerm.value);
            factor.dot = dot;
            factor.trailer = trailer;
            let current = trailer;
            // parse down and link all while is suffix
            while (this.currentToken.type === tokenTypes_1.TokenType.dot) {
                let dot = this.currentToken;
                this.advance();
                let suffixTerm = this.suffixTerm(true);
                errors.push(...suffixTerm.errors);
                let trailer = new SuffixTerm.SuffixTrailer(suffixTerm.value);
                current.dot = dot;
                current.trailer = trailer;
            }
        }
        return parseResult_1.nodeResult(factor, errors);
    }
    suffixTerm(isTailor = false) {
        const atom = this.atom(isTailor);
        const trailers = [];
        const errors = [];
        const isValid = !(atom.value instanceof SuffixTerm.Invalid);
        // parse all exist trailor  
        while (isValid) {
            if (this.currentToken.type === tokenTypes_1.TokenType.openBracket) {
                const bracket = this.arrayBracket();
                errors.push(...bracket.errors);
                trailers.push(bracket.value);
            }
            else if (this.currentToken.type === tokenTypes_1.TokenType.openParen) {
                const callTrailer = this.funcCallTrailer();
                errors.push(...callTrailer.errors);
                trailers.push(callTrailer.value);
            }
            else
                break;
        }
        return parseResult_1.nodeResult(new SuffixTerm.SuffixTerm(atom.value, trailers), errors);
    }
    atom(isTailor = false) {
        switch (this.currentToken.type) {
            case tokenTypes_1.TokenType.number:
            // TODO: All keywords is allowed in suffix.
            // But not allowed at first atom
            case tokenTypes_1.TokenType.id:
            case tokenTypes_1.TokenType.string:
                let t = this.currentToken;
                this.advance();
                return parseResult_1.nodeResult(new SuffixTerm.Literal(t), []);
            case tokenTypes_1.TokenType.precent:
                // TODO: Finish precent deference expresion
                let open = this.currentToken;
                this.advance();
                let derefAtom = this.atom();
                const errors = derefAtom.errors;
                if (this.currentToken.type === tokenTypes_1.TokenType.precent) {
                    this.advance();
                    return parseResult_1.nodeResult(derefAtom.value, errors);
                }
                else
                    throw this.error(this.currentToken, 'Expect "%" in precent expression');
            default:
                if (isTailor) {
                    const previous = this.previous();
                    return parseResult_1.nodeResult(new SuffixTerm.Invalid(previous.end), [
                        this.error(previous, 'Expected suffix')
                    ]);
                }
                throw this.error(this.currentToken, 'Expected an expression');
        }
    }
    arrayBracket() {
        const open = this.currentToken;
        this.advance();
        const index = this.expression();
        const close = this.eatAndThrow(tokenTypes_1.TokenType.closeBracket, 'Expected a "]" at end of array index ');
        return parseResult_1.nodeResult(new SuffixTerm.BracketIndex(open, index.value, close), index.errors);
    }
    funcCallTrailer() {
        const open = this.currentToken;
        this.advance();
        const args = [];
        const errors = [];
        // if there are arguments parse them all
        if (this.currentToken.type !== tokenTypes_1.TokenType.closeParen &&
            this.currentToken.type !== tokenTypes_1.TokenType.EOF) {
            let a = this.expression();
            args.push(a.value);
            errors.push(...a.errors);
            while (this.currentToken.type === tokenTypes_1.TokenType.dot) {
                this.advance();
                a = this.expression();
                args.push(a.value);
                errors.push(...a.errors);
            }
        }
        const close = this.eatAndThrow(tokenTypes_1.TokenType.closeParen, 'Expected a "(" at end of call');
        return parseResult_1.nodeResult(new SuffixTerm.Call(open, args, close), errors);
    }
    // private func(): INodeResult<IFunctionCall|FunctionDeclaration> {
    //     let token = this.currentToken
    //     this.advance();
    //     let unclosed: number = 1;
    //     while (unclosed <= 0) {
    //         let t = this.peek().type
    //         if (t === TokenType.closeParen)
    //             unclosed--;
    //         if (t === TokenType.openParen) 
    //             unclosed++;
    //     }
    //     if (this.peek().type === TokenType.openBrace) {
    //         let parameters = this.parameters();
    //         let block = this.block();
    //         let errors = parameters.errors.concat(block.errors);
    //         return {
    //             errors: errors,
    //             value: new FunctionDeclaration(
    //                 token.content,
    //                 parameters.value,
    //                 block.value,
    //                 token
    //             )
    //         };
    //     }
    //     let actualParams = this.actualParams();
    //     return {
    //         errors: actualParams.errors,
    //         value: new FunctionCall(
    //             token.content,
    //             actualParams.value,
    //             token,
    //             {
    //                 start: token.start,
    //                 end: token.end
    //             }
    //         )
    //     };
    // }
    // private parameters(): INodeResult<IParameter[]> {
    // }
    // private actualParams(): INodeResult<Expr[]> {
    // }
    // private command(): INodeResult<ICommandCall> {
    // }
    // private assign(): INodeResult<IAssign> {
    // }
    // private hotkey(): INodeResult<IASTNode> {
    // }
    // private label(): INodeResult<IASTNode> {
    // }
    // private classDecl(): INodeResult<IClassDecl> {
    // }
    program() {
        const statment = [];
        const diagnostics = [];
        try {
            while (this.currentToken.type !== tokenTypes_1.TokenType.EOF) {
                let { errors, value } = this.declaration();
                statment.push(value);
                diagnostics.push(...errors);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    check(t) {
        return t === this.currentToken.type;
    }
    eatAndThrow(t, message) {
        if (this.currentToken.type === t) {
            this.advance();
            return this.previous();
        }
        else
            throw this.error(this.currentToken, message);
    }
}
exports.AHKParser = AHKParser;
//# sourceMappingURL=parser.js.map