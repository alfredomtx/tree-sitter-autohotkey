"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AHKParser = void 0;
const tokenizer_1 = require("../tokenizor/tokenizer");
const types_1 = require("../types");
const tokenTypes_1 = require("../tokenizor/tokenTypes");
const parseError_1 = require("./models/parseError");
const Stmt = require("./models/stmt");
const Expr = require("./models/expr");
const SuffixTerm = require("./models/suffixterm");
const precedences_1 = require("./models/precedences");
const parseResult_1 = require("./utils/parseResult");
const Decl = require("./models/declaration");
const types_2 = require("../tokenizor/types");
const logger_1 = require("../../../utilities/logger");
const script_1 = require("../models/script");
class AHKParser {
    constructor(document, uri, logger = logger_1.mockLogger) {
        this.pos = 0;
        this.tokens = [];
        this.tokenErrors = [];
        this.comments = [];
        this.tokenizer = new tokenizer_1.Tokenizer(document);
        this.tokenizer.isParseHotkey = true;
        this.currentToken = this.nextToken(tokenTypes_1.TokenType.EOL);
        this.tokens.push(this.currentToken);
        this.logger = logger;
        this.uri = uri;
    }
    nextToken(preType) {
        let token = this.tokenizer.GetNextToken(preType);
        while (token.kind !== types_2.TokenKind.Token) {
            if (token.kind === types_2.TokenKind.Diagnostic) {
                this.tokenErrors.push(token.result);
                token = this.tokenizer.GetNextToken(tokenTypes_1.TokenType.unknown);
            }
            else if (token.kind === types_2.TokenKind.Commnet) {
                this.comments.push(token.result);
                token = this.tokenizer.GetNextToken(token.result.type);
            }
        }
        return token.result;
    }
    advance() {
        this.pos++;
        if (this.pos >= this.tokens.length) {
            this.currentToken = this.nextToken(this.currentToken.type);
            // AHK connect next line to current line
            // when next line start with operators and ','
            if (this.currentToken.type === tokenTypes_1.TokenType.EOL) {
                const saveToken = this.currentToken;
                this.currentToken = this.nextToken(saveToken.type);
                // 下一行是运算符或者','时丢弃EOL
                // discard EOL
                if (this.currentToken.type >= tokenTypes_1.TokenType.pplus &&
                    this.currentToken.type <= tokenTypes_1.TokenType.comma) {
                    this.tokens.push(this.currentToken);
                }
                else {
                    this.tokens.push(saveToken);
                    this.tokens.push(this.currentToken);
                    this.currentToken = saveToken;
                }
            }
            else
                this.tokens.push(this.currentToken);
        }
        this.currentToken = this.tokens[this.pos];
        return this;
    }
    previous() {
        return this.tokens[this.pos - 1];
    }
    /**
     * look ahead one token
     */
    peek() {
        if (this.pos + 1 <= this.tokens.length - 1)
            return this.tokens[this.pos + 1];
        let token = this.nextToken(this.currentToken.type);
        if (token.type === tokenTypes_1.TokenType.EOL) {
            const saveToken = token;
            token = this.nextToken(saveToken.type);
            if (token.type >= tokenTypes_1.TokenType.pplus &&
                token.type <= tokenTypes_1.TokenType.comma) {
                this.tokens.push(token);
                return token;
            }
            this.tokens.push(saveToken);
            this.tokens.push(token);
            return saveToken;
        }
        this.tokens.push(token);
        return token;
    }
    error(token, message) {
        return new parseError_1.ParseError(token, message);
    }
    parse() {
        const statment = [];
        const diagnostics = [];
        const baseName = this.uri.split('/').slice(-1)[0];
        this.logger.info(`Parsing started for ${baseName}`);
        try {
            this.jumpWhiteSpace();
            while (this.currentToken.type !== tokenTypes_1.TokenType.EOF) {
                let { errors, value } = this.declaration();
                statment.push(value);
                diagnostics.push(...errors);
                this.jumpWhiteSpace();
            }
            this.logger.info(`Parsing finished for ${baseName}`);
            return {
                script: new script_1.Script(this.uri, statment, this.tokens, this.comments),
                sytanxErrors: diagnostics,
                tokenErrors: this.tokenErrors
            };
        }
        catch (error) {
            this.logger.error(error);
        }
        return {
            script: new script_1.Script(this.uri, [], [], []),
            sytanxErrors: [],
            tokenErrors: []
        };
    }
    testDeclaration() {
        return this.declaration();
    }
    declaration() {
        const start = this.pos;
        try {
            switch (this.currentToken.type) {
                case tokenTypes_1.TokenType.id:
                    return this.idLeadStatement();
                case tokenTypes_1.TokenType.class:
                    return this.classDefine();
                case tokenTypes_1.TokenType.global:
                case tokenTypes_1.TokenType.local:
                case tokenTypes_1.TokenType.static:
                    return this.varDecl();
                case tokenTypes_1.TokenType.label:
                    return this.label();
                case tokenTypes_1.TokenType.key:
                    // 所有热键的修饰符
                    // case TokenType.sharp:
                    // case TokenType.not:
                    // case TokenType.xor:
                    // case TokenType.plus:
                    // case TokenType.less:
                    // case TokenType.greater:
                    // case TokenType.multi:
                    // case TokenType.bnot:
                    // case TokenType.dollar:
                    return this.hotkey();
                case tokenTypes_1.TokenType.hotstringOpen:
                    return this.hotstring();
                default:
                    return this.statement();
            }
        }
        catch (error) {
            if (error instanceof parseError_1.ParseError) {
                this.synchronize();
                const tokens = this.tokens.slice(start, this.pos);
                tokens.push(this.currentToken);
                return parseResult_1.nodeResult(new Stmt.Invalid(tokens[0].start, tokens), [error]);
            }
            throw error;
        }
    }
    varDecl() {
        const scope = this.currentToken;
        const assign = [];
        const errors = [];
        this.advance();
        // check if there are varible,
        // if any parse them all
        do {
            // TODO: Deal with errors 
            // when second declaration contains no identifer
            if (this.currentToken.type === tokenTypes_1.TokenType.id) {
                let id = this.currentToken;
                this.advance();
                const saveToken = this.currentToken;
                // check if there is an assignment
                if (saveToken.type === tokenTypes_1.TokenType.aassign ||
                    saveToken.type === tokenTypes_1.TokenType.equal) {
                    this.advance();
                    const expr = this.expression();
                    errors.push(...expr.errors);
                    assign.push(new Decl.OptionalAssginStmt(id, saveToken, expr.value));
                }
                else
                    assign.push(new Decl.OptionalAssginStmt(id));
            }
            else {
                // Generate error when no varible is found
                errors.push(this.error(this.currentToken, 'Expect an identifer in varible declaration'));
                // Generate Invalid Mark
                assign.push(new Decl.OptionalAssginStmt(this.currentToken, undefined, new Expr.Invalid(this.currentToken.start, [this.currentToken])));
            }
        } while (this.eatDiscardCR(tokenTypes_1.TokenType.comma));
        this.terminal();
        return parseResult_1.nodeResult(new Decl.VarDecl(scope, assign), errors);
    }
    classDefine() {
        const classToken = this.eat();
        const name = this.eatAndThrow(tokenTypes_1.TokenType.id, 'Expect an indentifier in class define');
        if (this.currentToken.type === tokenTypes_1.TokenType.extends) {
            const extendsToken = this.eat();
            const parentName = this.eatAndThrow(tokenTypes_1.TokenType.id, 'Expect an indentifier after "extends" keyword');
            const body = this.block();
            return parseResult_1.nodeResult(new Decl.ClassDef(classToken, name, body.value, extendsToken, parentName), body.errors);
        }
        const body = this.block();
        return parseResult_1.nodeResult(new Decl.ClassDef(classToken, name, body.value), body.errors);
    }
    // TODO:  class block statement
    // private classBlock(): INodeResult<Stmt.Block> {
    //     switch (this.currentToken.type) {
    //         case TokenType.id:
    //             switch (this.peek().type) {
    //                 case TokenType.openBracket:
    //             }
    //     }
    // }
    label() {
        const name = this.currentToken;
        this.advance();
        return parseResult_1.nodeResult(new Decl.Label(name), []);
    }
    // v1 version
    hotkey() {
        const k1 = new Decl.Key(this.currentToken);
        this.advance();
        if (this.currentToken.type === tokenTypes_1.TokenType.hotkeyand) {
            const and = this.currentToken;
            this.advance();
            const k2 = new Decl.Key(this.currentToken);
            this.advance();
            return parseResult_1.nodeResult(new Decl.Hotkey(k1, and, k2), []);
        }
        this.eatAndThrow(tokenTypes_1.TokenType.hotkey, 'Expect a "::" at the end of hotkey declaration');
        return parseResult_1.nodeResult(new Decl.Hotkey(k1), []);
    }
    hotstring() {
        const option = this.eat();
        const str = this.eatAndThrow(tokenTypes_1.TokenType.hotstringEnd, 'Expect a hotstring in hotstring');
        // TODO: FINISH X OPTION
        if (this.currentToken.type === tokenTypes_1.TokenType.EOL) {
            const expend = this.eat();
            return parseResult_1.nodeResult(new Decl.HotString(option, str, expend), []);
        }
        const expend = this.eatAndThrow(tokenTypes_1.TokenType.string, 'Expect a expend string in hotstring');
        return parseResult_1.nodeResult(new Decl.HotString(option, str, expend), []);
    }
    statement() {
        switch (this.currentToken.type) {
            case tokenTypes_1.TokenType.id:
                return this.idLeadStatement();
            case tokenTypes_1.TokenType.openBrace:
                return this.block();
            // case TokenType.command:
            //     return this.command();
            case tokenTypes_1.TokenType.if:
                return this.ifStmt();
            case tokenTypes_1.TokenType.break:
                return this.breakStmt();
            case tokenTypes_1.TokenType.return:
                return this.returnStmt();
            case tokenTypes_1.TokenType.switch:
                return this.switchStmt();
            case tokenTypes_1.TokenType.loop:
                return this.loopStmt();
            case tokenTypes_1.TokenType.while:
                return this.whileStmt();
            case tokenTypes_1.TokenType.for:
                return this.forStmt();
            case tokenTypes_1.TokenType.try:
                return this.tryStmt();
            case tokenTypes_1.TokenType.drective:
                return this.drective();
            default:
                throw this.error(this.currentToken, 'UnKnown statment found');
        }
    }
    idLeadStatement() {
        const p = this.peek();
        switch (p.type) {
            case tokenTypes_1.TokenType.openParen:
                return this.func();
            case tokenTypes_1.TokenType.equal:
            case tokenTypes_1.TokenType.aassign:
            case tokenTypes_1.TokenType.dot:
            case tokenTypes_1.TokenType.openBracket:
                // expression is only allowed in assignment in AHK
                return this.assign();
            case tokenTypes_1.TokenType.hotkeyand:
            case tokenTypes_1.TokenType.hotkey:
                return this.hotkey();
            // 其他是语法错误，统一当作有错误的赋值语句
            default:
                throw this.error(p, 'Invalid follower(s) of identifer');
        }
    }
    block() {
        const open = this.eatDiscardCR(tokenTypes_1.TokenType.openBrace);
        if (!open) {
            throw this.error(this.currentToken, 'Expect a "{" at begining of block');
        }
        const errors = [];
        const block = [];
        this.jumpWhiteSpace();
        while (this.currentToken.type !== tokenTypes_1.TokenType.closeBrace &&
            this.currentToken.type !== tokenTypes_1.TokenType.EOF) {
            const stmt = this.declaration();
            errors.push(...stmt.errors);
            block.push(stmt.value);
            this.jumpWhiteSpace();
        }
        const close = this.eatAndThrow(tokenTypes_1.TokenType.closeBrace, 'Expect a "}" at block end');
        return parseResult_1.nodeResult(new Stmt.Block(open, block, close), errors);
    }
    ifStmt() {
        const iftoken = this.currentToken;
        this.advance();
        const errors = [];
        const condition = this.expression();
        errors.push(...condition.errors);
        // skip all EOL
        this.jumpWhiteSpace();
        const body = this.declaration();
        errors.push(...body.errors);
        // parse else branch if found else
        if (this.currentToken.type === tokenTypes_1.TokenType.else) {
            const elsetoken = this.currentToken;
            this.advance();
            const body = this.block();
            errors.push(...body.errors);
            return parseResult_1.nodeResult(new Stmt.If(iftoken, condition.value, body.value, new Stmt.Else(elsetoken, body.value)), errors);
        }
        return parseResult_1.nodeResult(new Stmt.If(iftoken, condition.value, body.value), errors);
    }
    breakStmt() {
        const breakToken = this.currentToken;
        this.advance();
        // If there are break label, parse it
        if (!this.atLineEnd()) {
            // ',' is negotiable
            this.eatDiscardCR(tokenTypes_1.TokenType.comma);
            const label = this.eatAndThrow(tokenTypes_1.TokenType.id, 'Expect a label name');
            this.terminal();
            return parseResult_1.nodeResult(new Stmt.Break(breakToken, label), []);
        }
        this.terminal();
        return parseResult_1.nodeResult(new Stmt.Break(breakToken), []);
    }
    returnStmt() {
        const returnToken = this.currentToken;
        // If expersions parse all
        if (!this.atLineEnd()) {
            // ',' is negotiable
            this.eatDiscardCR(tokenTypes_1.TokenType.comma);
            const expr = this.expression();
            this.terminal();
            return parseResult_1.nodeResult(new Stmt.Return(returnToken, expr.value), expr.errors);
        }
        this.terminal();
        return parseResult_1.nodeResult(new Stmt.Return(returnToken), []);
    }
    switchStmt() {
        const switchToken = this.eat();
        const errors = [];
        const cond = this.expression();
        errors.push(...cond.errors);
        const open = this.eatAndThrow(tokenTypes_1.TokenType.openBrace, 'Expect a "{"');
        const cases = [];
        let inloop = true;
        while (inloop) {
            switch (this.currentToken.type) {
                case tokenTypes_1.TokenType.closeBrace:
                    // TODO: warning 0 case found
                    inloop = false;
                    break;
                case tokenTypes_1.TokenType.case:
                    const caseToken = this.eat();
                    const conditions = [];
                    do {
                        const cond = this.expression();
                        errors.push(...cond.errors);
                        conditions.push(cond.value);
                    } while (this.eatDiscardCR(tokenTypes_1.TokenType.comma));
                    const colon = this.eatAndThrow(tokenTypes_1.TokenType.colon, 'Expect a ":" at end of case');
                    const stmts = this.stmtList();
                    errors.push(...stmts.errors);
                    cases.push(new Stmt.CaseStmt(new Stmt.CaseExpr(caseToken, conditions, colon), stmts.value));
                    break;
                case tokenTypes_1.TokenType.label:
                    if (this.currentToken.content === 'default') {
                        // TODO: warning multidefault found
                        const caseToken = this.eat();
                        const CaseNode = new Stmt.DefaultCase(caseToken);
                        const stmts = this.stmtList();
                        errors.push(...stmts.errors);
                        cases.push(new Stmt.CaseStmt(CaseNode, stmts.value));
                        break;
                    }
                // throw other label to default
                default:
                    this.error(this.currentToken, 'Expect "case" statement or "default:"');
            }
        }
        const close = this.eatAndThrow(tokenTypes_1.TokenType.closeBrace, 'Expect a "}"');
        return parseResult_1.nodeResult(new Stmt.SwitchStmt(switchToken, cond.value, open, cases, close), errors);
    }
    /**
     * Parse all statement below a case,
     * for switch-case statement
     * 用来解析switch下面的没有大括号的语句
     */
    stmtList() {
        const stmts = [];
        const errors = [];
        do {
            const stmt = this.declaration();
            stmts.push(stmt.value);
            errors.push(...stmt.errors);
            // stop at default case
            if (this.currentToken.type === tokenTypes_1.TokenType.label &&
                this.currentToken.content === 'default')
                break;
        } while (!this.matchTokens([
            tokenTypes_1.TokenType.case,
            tokenTypes_1.TokenType.closeBrace
        ]));
        return parseResult_1.nodeResult(stmts, errors);
    }
    loopStmt() {
        const loop = this.eat();
        // TODO: LOOP Funtoins
        // if no expression follows, check if is until loop
        if (this.matchTokens([
            tokenTypes_1.TokenType.EOL,
            tokenTypes_1.TokenType.openBrace
        ])) {
            this.jumpWhiteSpace();
            const body = this.declaration();
            if (this.matchTokens([tokenTypes_1.TokenType.until])) {
                const until = this.eatAndThrow(tokenTypes_1.TokenType.until, 'Expect a until in loop-until');
                const cond = this.expression();
                this.terminal();
                return parseResult_1.nodeResult(new Stmt.UntilLoop(loop, body.value, until, cond.value), body.errors.concat(cond.errors));
            }
            return parseResult_1.nodeResult(new Stmt.Loop(loop, body.value), body.errors);
        }
        const cond = this.expression();
        this.jumpWhiteSpace();
        const body = this.declaration();
        return parseResult_1.nodeResult(new Stmt.Loop(loop, body.value, cond.value), cond.errors.concat(body.errors));
    }
    whileStmt() {
        const whileToken = this.currentToken;
        this.advance();
        const cond = this.expression();
        // skip all EOL
        this.jumpWhiteSpace();
        const body = this.declaration();
        return parseResult_1.nodeResult(new Stmt.WhileStmt(whileToken, cond.value, body.value), cond.errors.concat(body.errors));
    }
    forStmt() {
        const forToken = this.currentToken;
        this.advance();
        const id1 = this.eatAndThrow(tokenTypes_1.TokenType.id, 'Expect an identifer in for loop');
        if (this.currentToken.type === tokenTypes_1.TokenType.comma) {
            const comma = this.eat();
            const id2 = this.eatAndThrow(tokenTypes_1.TokenType.id, 'Expect second identifer after `,` in for loop');
            const inToken = this.eatAndThrow(tokenTypes_1.TokenType.in, 'Expect in keyword in for loop');
            const body = this.declaration();
            const errors = body.errors;
            return parseResult_1.nodeResult(new Stmt.ForStmt(forToken, inToken, body.value, id1, comma, id2), errors);
        }
        const inToken = this.eatAndThrow(tokenTypes_1.TokenType.in, 'Expect in keyword in for loop');
        const body = this.declaration();
        const errors = body.errors;
        return parseResult_1.nodeResult(new Stmt.ForStmt(forToken, inToken, body.value, id1), errors);
    }
    tryStmt() {
        const tryToken = this.currentToken;
        this.advance();
        this.jumpWhiteSpace();
        const body = this.declaration();
        const errors = body.errors;
        let catchStmt;
        let finallyStmt;
        if (this.currentToken.type === tokenTypes_1.TokenType.catch) {
            const catchToken = this.currentToken;
            this.advance();
            const errorVar = this.eatAndThrow(tokenTypes_1.TokenType.id, 'Expect an identifer as output variable');
            this.jumpWhiteSpace();
            const body = this.declaration();
            errors.push(...body.errors);
            catchStmt = new Stmt.CatchStmt(catchToken, errorVar, body.value);
        }
        if (this.currentToken.type === tokenTypes_1.TokenType.finally) {
            const finallyToken = this.currentToken;
            this.advance();
            this.jumpWhiteSpace();
            const body = this.declaration();
            errors.push(...body.errors);
            finallyStmt = new Stmt.FinallyStmt(finallyToken, body.value);
        }
        return parseResult_1.nodeResult(new Stmt.TryStmt(tryToken, body.value, catchStmt, finallyStmt), errors);
    }
    // TODO: Need Finish
    drective() {
        const drective = this.eat();
        const errors = [];
        const args = [];
        while (this.currentToken.type !== tokenTypes_1.TokenType.EOL) {
            const a = this.expression();
            errors.push(...a.errors);
            args.push(a.value);
        }
        this.terminal();
        return parseResult_1.nodeResult(new Stmt.Drective(drective, args), errors);
    }
    // assignment statemnet
    assign() {
        const left = this.factor();
        if (!this.matchTokens([
            tokenTypes_1.TokenType.aassign,
            tokenTypes_1.TokenType.equal
        ])) {
            throw this.error(this.currentToken, 'Expect an assignment');
        }
        const assign = this.currentToken;
        this.advance();
        const expr = this.expression();
        this.terminal();
        return {
            errors: left.errors.concat(expr.errors),
            value: new Stmt.AssignStmt(left.value, assign, expr.value)
        };
    }
    // for test expresion
    testExpr() {
        this.tokens.pop();
        this.tokenizer.Reset();
        this.tokenizer.isParseHotkey = false;
        this.currentToken = this.nextToken(tokenTypes_1.TokenType.EOL);
        this.tokens.push(this.currentToken);
        return this.expression();
    }
    expression(p = 0) {
        let start = this.pos;
        // let tokenizer parse operators as normal
        // 让分词器不进行热键分词正常返回符号
        this.tokenizer.isParseHotkey = false;
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
                case tokenTypes_1.TokenType.pplus:
                case tokenTypes_1.TokenType.mminus:
                    const saveToken = this.currentToken;
                    this.advance();
                    const q = (saveToken.type >= tokenTypes_1.TokenType.pplus &&
                        saveToken.type <= tokenTypes_1.TokenType.mminus) ?
                        precedences_1.Precedences[tokenTypes_1.TokenType.pplus] :
                        precedences_1.UnaryPrecedence;
                    const expr = this.expression(q);
                    result = parseResult_1.nodeResult(new Expr.Unary(saveToken, expr.value), expr.errors);
                    break;
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
            while (true) {
                this.tokenizer.isParseHotkey = false;
                // infix left-associative 
                if ((this.currentToken.type >= tokenTypes_1.TokenType.power &&
                    this.currentToken.type <= tokenTypes_1.TokenType.logicor) &&
                    precedences_1.Precedences[this.currentToken.type] >= p) {
                    const saveToken = this.currentToken;
                    this.advance();
                    const q = precedences_1.Precedences[saveToken.type];
                    const right = this.expression(q + 1);
                    result = parseResult_1.nodeResult(new Expr.Binary(result.value, saveToken, right.value), result.errors.concat(right.errors));
                    continue;
                }
                // postfix
                if ((this.currentToken.type >= tokenTypes_1.TokenType.pplus &&
                    this.currentToken.type <= tokenTypes_1.TokenType.mminus) &&
                    precedences_1.Precedences[this.currentToken.type] >= p) {
                    const saveToken = this.currentToken;
                    this.advance();
                    const q = precedences_1.Precedences[saveToken.type];
                    result = parseResult_1.nodeResult(new Expr.Unary(saveToken, result.value), result.errors);
                    continue;
                }
                // infix and ternary, right-associative 
                if ((this.currentToken.type >= tokenTypes_1.TokenType.question &&
                    this.currentToken.type <= tokenTypes_1.TokenType.lshifteq) &&
                    precedences_1.Precedences[this.currentToken.type] >= p) {
                    const saveToken = this.currentToken;
                    this.advance();
                    const q = precedences_1.Precedences[saveToken.type];
                    // ternary expression
                    if (saveToken.type === tokenTypes_1.TokenType.question) {
                        // This expression has no relation 
                        // with next expressions. Thus, 0 precedence
                        const trueExpr = this.expression();
                        const colon = this.eatAndThrow(tokenTypes_1.TokenType.colon, 'Expect a ":" in ternary expression');
                        // right-associative 
                        const falseExpr = this.expression(q);
                        result = parseResult_1.nodeResult(new Expr.Ternary(result.value, saveToken, trueExpr.value, colon, falseExpr.value), result.errors
                            .concat(trueExpr.errors)
                            .concat(falseExpr.errors));
                    }
                    // other assignments
                    else {
                        // right-associative 
                        const right = this.expression(q);
                        result = parseResult_1.nodeResult(new Expr.Binary(result.value, saveToken, right.value), result.errors.concat(right.errors));
                    }
                    continue;
                }
                // Implicit connect
                if ((this.currentToken.type >= tokenTypes_1.TokenType.string &&
                    this.currentToken.type <= tokenTypes_1.TokenType.precent) &&
                    precedences_1.Precedences[tokenTypes_1.TokenType.sconnect] >= p) {
                    const right = this.expression(precedences_1.Precedences[tokenTypes_1.TokenType.sconnect] + 1);
                    result = parseResult_1.nodeResult(new Expr.Binary(result.value, new types_1.Token(tokenTypes_1.TokenType.implconn, ' ', result.value.end, right.value.start), right.value), result.errors.concat(right.errors));
                    continue;
                }
                break;
            }
            this.tokenizer.isParseHotkey = true;
            return result;
        }
        catch (error) {
            if (error instanceof parseError_1.ParseError) {
                // this.logger.verbose(JSON.stringify(error.partial));
                // this.synchronize(error.failed);
                this.synchronize();
                // TODO: Correct error token list
                const tokens = this.tokens.slice(start, this.pos);
                tokens.push(this.currentToken);
                return parseResult_1.nodeResult(new Expr.Invalid(tokens[0].start, tokens), [error]);
            }
            throw error;
        }
    }
    factor() {
        const suffixTerm = this.suffixTerm();
        const factor = new Expr.Factor(suffixTerm.value);
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
        const errors = [...atom.errors];
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
            // TODO: All keywords is allowed in suffix.
            // But not allowed at first atom
            case tokenTypes_1.TokenType.id:
                this.advance();
                return parseResult_1.nodeResult(new SuffixTerm.Identifier(this.previous()), []);
            case tokenTypes_1.TokenType.number:
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
            case tokenTypes_1.TokenType.openBracket:
                return this.arrayTerm();
            case tokenTypes_1.TokenType.openBrace:
                return this.associativeArray();
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
    arrayTerm() {
        const open = this.currentToken;
        this.advance();
        const items = [];
        const errors = [];
        // if there are items parse them all
        if (this.currentToken.type !== tokenTypes_1.TokenType.closeBracket &&
            this.currentToken.type !== tokenTypes_1.TokenType.EOF) {
            let a = this.expression();
            items.push(a.value);
            errors.push(...a.errors);
            while (this.eatDiscardCR(tokenTypes_1.TokenType.comma)) {
                a = this.expression();
                items.push(a.value);
                errors.push(...a.errors);
            }
        }
        const close = this.eatAndThrow(tokenTypes_1.TokenType.closeBracket, 'Expect a "]" to end array');
        return parseResult_1.nodeResult(new SuffixTerm.ArrayTerm(open, close, items), errors);
    }
    associativeArray() {
        const open = this.currentToken;
        this.advance();
        const pairs = [];
        const errors = [];
        // if there are pairs parse them all
        if (this.currentToken.type !== tokenTypes_1.TokenType.closeBracket &&
            this.currentToken.type !== tokenTypes_1.TokenType.EOF) {
            do {
                let a = this.pair();
                pairs.push(a.value);
                errors.push(...a.errors);
            } while (this.eatDiscardCR(tokenTypes_1.TokenType.comma));
        }
        const close = this.eatAndThrow(tokenTypes_1.TokenType.closeBrace, 'Expect a "}" at the end of associative array');
        return parseResult_1.nodeResult(new SuffixTerm.AssociativeArray(open, close, pairs), errors);
    }
    pair() {
        const key = this.expression();
        const errors = key.errors;
        if (this.eatDiscardCR(tokenTypes_1.TokenType.colon)) {
            const colon = this.previous();
            const value = this.expression();
            errors.push(...value.errors);
            return parseResult_1.nodeResult(new SuffixTerm.Pair(key.value, colon, value.value), errors);
        }
        // if no colon, generate an error
        // and contiune parsing rest of dict
        errors.push(this.error(this.currentToken, 'Expect a ":" on key-value pairs in associative array'));
        return parseResult_1.nodeResult(new SuffixTerm.Pair(key.value, this.currentToken, new Expr.Invalid(this.currentToken.start, [this.currentToken])), errors);
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
            while (this.eatDiscardCR(tokenTypes_1.TokenType.comma)) {
                a = this.expression();
                args.push(a.value);
                errors.push(...a.errors);
            }
        }
        const close = this.eatAndThrow(tokenTypes_1.TokenType.closeParen, 'Expected a ")" at end of call');
        return parseResult_1.nodeResult(new SuffixTerm.Call(open, args, close), errors);
    }
    func() {
        let token = this.currentToken;
        this.advance();
        const pos = this.pos;
        let unclosed = 1;
        while (unclosed > 0) {
            let t = this.peek().type;
            if (t === tokenTypes_1.TokenType.closeParen)
                unclosed--;
            if (t === tokenTypes_1.TokenType.openParen)
                unclosed++;
            this.advance();
        }
        this.advance();
        if (this.eatDiscardCR(tokenTypes_1.TokenType.openBrace)) {
            this.backto(pos);
            let parameters = this.parameters();
            let block = this.block();
            let errors = parameters.errors.concat(block.errors);
            return {
                errors: errors,
                value: new Decl.FuncDef(token, parameters.value, block.value)
            };
        }
        this.backto(pos);
        const call = this.factor();
        return parseResult_1.nodeResult(new Stmt.ExprStmt(call.value), call.errors);
    }
    parameters() {
        const open = this.eat();
        const errors = [];
        const requiredParameters = [];
        const DefaultParameters = [];
        let isDefaultParam = false;
        if (this.currentToken.type !== tokenTypes_1.TokenType.closeParen) {
            do {
                const name = this.eatAndThrow(tokenTypes_1.TokenType.id, 'Expect an identifier in parameter');
                if (this.matchTokens([
                    tokenTypes_1.TokenType.aassign,
                    tokenTypes_1.TokenType.equal
                ])) {
                    const assign = this.eat();
                    const dflt = this.expression();
                    errors.push(...dflt.errors);
                    DefaultParameters.push(new Decl.DefaultParam(name, assign, dflt.value));
                    isDefaultParam = true;
                }
                if (isDefaultParam)
                    errors.push(this.error(name, 'Expect a Optional parameter'));
                requiredParameters.push(new Decl.Parameter(name));
            } while (this.eatDiscardCR(tokenTypes_1.TokenType.comma));
        }
        const close = this.eatAndThrow(tokenTypes_1.TokenType.closeParen, 'Expect a ")"');
        return parseResult_1.nodeResult(new Decl.Param(open, requiredParameters, DefaultParameters, close), errors);
    }
    // private command(): INodeResult<ICommandCall> {
    // }
    /**
     * Check the the statement is terminated
     */
    terminal() {
        if (this.currentToken.type !== tokenTypes_1.TokenType.EOF)
            this.eatAndThrow(tokenTypes_1.TokenType.EOL, 'Expect "`n" to terminate statement');
    }
    /**
     * backwards tokens
     * @param pos position to
     */
    backto(pos) {
        this.pos = pos;
        this.currentToken = this.tokens[pos];
    }
    /**
     * check if token match type,
     * and when token is return
     * check next token
     */
    eatDiscardCR(t) {
        if (this.currentToken.type === tokenTypes_1.TokenType.EOL) {
            if (this.peek().type === t) {
                this.advance().advance();
                return this.previous();
            }
        }
        else if (this.check(t)) {
            this.advance();
            return this.previous();
        }
        return undefined;
    }
    check(t) {
        return t === this.currentToken.type;
    }
    eat() {
        this.advance();
        return this.previous();
    }
    eatAndThrow(t, message) {
        if (this.currentToken.type === t) {
            this.advance();
            return this.previous();
        }
        else
            throw this.error(this.currentToken, message);
    }
    /**
     * check if current token matches a set of tokens
     * @param ts match types array
     */
    matchTokens(ts) {
        if (this.currentToken.type === tokenTypes_1.TokenType.EOF)
            return false;
        for (const t of ts) {
            if (t === this.currentToken.type)
                return true;
        }
        return false;
    }
    jumpWhiteSpace() {
        while (this.currentToken.type === tokenTypes_1.TokenType.EOL)
            this.advance();
    }
    atLineEnd() {
        return this.currentToken.type === tokenTypes_1.TokenType.EOL ||
            this.currentToken.type === tokenTypes_1.TokenType.EOF;
    }
    // attempt to synchronize parser
    synchronize() {
        // need to confirm this is the only case
        // if (empty(failed.stmt)) {
        //   this.advance();
        // }
        while (this.currentToken.type !== tokenTypes_1.TokenType.EOF) {
            switch (this.peek().type) {
                // declarations
                case tokenTypes_1.TokenType.local:
                case tokenTypes_1.TokenType.global:
                case tokenTypes_1.TokenType.static:
                case tokenTypes_1.TokenType.class:
                // commands
                case tokenTypes_1.TokenType.command:
                // control flow
                case tokenTypes_1.TokenType.if:
                case tokenTypes_1.TokenType.loop:
                case tokenTypes_1.TokenType.while:
                case tokenTypes_1.TokenType.until:
                case tokenTypes_1.TokenType.return:
                case tokenTypes_1.TokenType.break:
                case tokenTypes_1.TokenType.switch:
                case tokenTypes_1.TokenType.for:
                case tokenTypes_1.TokenType.try:
                case tokenTypes_1.TokenType.throw:
                // drective
                case tokenTypes_1.TokenType.drective:
                // close scope
                case tokenTypes_1.TokenType.closeBrace:
                    return;
                // end of line
                // 开始解析下一句
                case tokenTypes_1.TokenType.EOL:
                    this.advance();
                    return;
                default:
                    break;
            }
            this.advance();
        }
    }
}
exports.AHKParser = AHKParser;
//# sourceMappingURL=parser.js.map