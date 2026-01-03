"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pair = exports.Grouping = exports.Identifier = exports.AssociativeArray = exports.ArrayTerm = exports.Literal = exports.PercentDereference = exports.BracketIndex = exports.Call = exports.SuffixTerm = exports.SuffixTrailer = exports.Invalid = exports.SuffixTermBase = void 0;
const tokenTypes_1 = require("../../tokenizor/tokenTypes");
const types_1 = require("../../types");
const nodeBase_1 = require("./nodeBase");
/**
 * Base class for all suffix terms
 */
class SuffixTermBase extends nodeBase_1.NodeBase {
    /**
     * Tag used to denote syntax node of the instance
     */
    get tag() {
        return types_1.SyntaxKind.suffixTerm;
    }
}
exports.SuffixTermBase = SuffixTermBase;
/**
 * Container for tokens constituting an invalid suffix term
 */
class Invalid extends SuffixTermBase {
    /**
     * Invalid suffix term constructor
     * @param tokens tokens in the invalid range
     */
    constructor(position) {
        super();
        this.position = position;
    }
    get start() {
        return this.position;
    }
    get end() {
        return this.position;
    }
    get ranges() {
        return [];
    }
    toLines() {
        return [''];
    }
}
exports.Invalid = Invalid;
/**
 * Class holding all suffix trailers
 */
class SuffixTrailer extends SuffixTermBase {
    /**
     * Constructor for the suffix trailer
     * @param suffixTerm base suffix term
     * @param dot colon separating the base from the trailer
     * @param trailer the suffix trailer
     */
    constructor(suffixTerm, dot, trailer) {
        super();
        this.suffixTerm = suffixTerm;
        this.dot = dot;
        this.trailer = trailer;
    }
    get start() {
        return this.suffixTerm.start;
    }
    get end() {
        return (this.trailer === undefined) ? this.suffixTerm.end : this.trailer.end;
    }
    get ranges() {
        if (!(this.dot === undefined) && !(this.trailer === undefined)) {
            return [this.suffixTerm, this.dot, this.trailer];
        }
        return [this.suffixTerm];
    }
    toLines() {
        const suffixTermLines = this.suffixTerm.toLines();
        if (!(this.dot === undefined) && !(this.trailer === undefined)) {
            const [joinLine, ...restLines] = this.trailer.toLines();
            if (suffixTermLines.length === 1) {
                return [`${suffixTermLines[0]}${this.dot.content}${joinLine}`].concat(restLines);
            }
            return suffixTermLines
                .slice(0, suffixTermLines.length - 2)
                .concat(`${suffixTermLines[0]}${this.dot.content}${joinLine}`, restLines);
        }
        return suffixTermLines;
    }
}
exports.SuffixTrailer = SuffixTrailer;
/**
 * Class holding all valid suffix terms
 */
class SuffixTerm extends SuffixTermBase {
    /**
     * Constructor for suffix terms
     * @param atom base item of the suffix term
     * @param trailers trailers present in the suffixterm
     */
    constructor(atom, trailers) {
        super();
        this.atom = atom;
        this.trailers = trailers;
    }
    get ranges() {
        return [this.atom, ...this.trailers];
    }
    get start() {
        return this.atom.start;
    }
    get end() {
        if (this.trailers.length > 0) {
            return this.trailers[this.trailers.length - 1].end;
        }
        return this.atom.end;
    }
    toLines() {
        const atomLines = this.atom.toLines();
        const trailersLines = this.trailers.map(t => t.toLines());
        const flatLines = trailersLines.flat();
        if (flatLines.length === 0)
            return atomLines;
        return atomLines.concat(flatLines);
    }
}
exports.SuffixTerm = SuffixTerm;
/**
 * Class containing all valid call suffixterm trailers
 */
class Call extends SuffixTermBase {
    /**
     * Constructor for the suffix term trailers
     * @param open open paren of the call
     * @param args arguments for the call
     * @param close close paren of the call
     */
    constructor(open, args, close) {
        super();
        this.open = open;
        this.args = args;
        this.close = close;
    }
    get start() {
        return this.open.start;
    }
    get end() {
        return this.close.end;
    }
    get ranges() {
        return [this.open, ...this.args, this.close];
    }
    toLines() {
        if (this.args.length === 0) {
            return [`${this.open.content}${this.close.content}`];
        }
        const argsLines = this.args.map(a => a.toLines());
        const argsResult = argsLines.flatMap(l => {
            l.join(',');
            return l;
        });
        argsResult[0] = `${this.open.content}${argsResult[0]}`;
        argsResult[argsResult.length - 1] = `${argsResult[argsResult.length - 1]}${this.close.content}`;
        return argsResult;
    }
}
exports.Call = Call;
/**
 * Class containing all valid array bracket suffix term trailers
 */
class BracketIndex extends SuffixTermBase {
    /**
     * Constructor for the array bracket suffix term trailer
     * @param open open bracket
     * @param index index into the collection
     * @param close close bracket
     */
    constructor(open, index, close) {
        super();
        this.open = open;
        this.index = index;
        this.close = close;
    }
    get start() {
        return this.open.start;
    }
    get end() {
        return this.close.end;
    }
    get ranges() {
        return [this.open, this.index, this.close];
    }
    toLines() {
        const lines = this.index.toLines();
        lines[0] = `${this.open.content}${lines[0]}`;
        lines[lines.length - 1] = `${lines[lines.length - 1]}${this.close.content}`;
        return lines;
    }
}
exports.BracketIndex = BracketIndex;
/**
 * Class containing percent dereference suffix terms
 */
class PercentDereference extends SuffixTermBase {
    /**
     * Constructor of percent dereference
     * @param open Start precent
     * @param close End precent
     * @param referValue The value to be derefer
     */
    constructor(open, close, referValue) {
        super();
        this.open = open;
        this.close = close;
        this.referValue = referValue;
    }
    get start() {
        return this.open.start;
    }
    get end() {
        return this.open.end;
    }
    get ranges() {
        return [this.open, this.referValue, this.close];
    }
    toLines() {
        let v = this.referValue.type === tokenTypes_1.TokenType.string ?
            '"' + this.referValue.content + '"' :
            this.referValue.content;
        return [this.open.content + v + this.close.content];
    }
}
exports.PercentDereference = PercentDereference;
/**
 * Class containing literal suffix terms
 */
class Literal extends SuffixTermBase {
    /**
     * Constructor for literal suffix term
     * @param token token for the literal
     */
    constructor(token) {
        super();
        this.token = token;
    }
    get start() {
        return this.token.start;
    }
    get end() {
        return this.token.end;
    }
    get ranges() {
        return [this.token];
    }
    toLines() {
        return [`${this.token.content}`];
    }
}
exports.Literal = Literal;
/**
 * Class containing Array suffix terms
 */
class ArrayTerm extends SuffixTermBase {
    /**
     * Constructor of Array
     * @param open Start [
     * @param close End ]
     * @param items items of arrays
     */
    constructor(open, close, items) {
        super();
        this.open = open;
        this.close = close;
        this.items = items;
    }
    get start() {
        return this.open.start;
    }
    get end() {
        return this.close.end;
    }
    get ranges() {
        const itemsRange = this.items.flatMap(item => item.ranges);
        return [this.open]
            .concat(itemsRange)
            .concat(this.close);
    }
    toLines() {
        const itemLines = this.items.flatMap(item => item.toLines());
        itemLines[0] = this.open.content + itemLines[0];
        itemLines[itemLines.length - 1] += this.close.content;
        return itemLines;
    }
}
exports.ArrayTerm = ArrayTerm;
/**
 * Class containing Associative Array suffix terms
 */
class AssociativeArray extends SuffixTermBase {
    /**
     * Constructor of Associative Array
     * @param open Start {
     * @param close End }
     * @param pairs key-value pairs of object
     */
    constructor(open, close, pairs) {
        super();
        this.open = open;
        this.close = close;
        this.pairs = pairs;
    }
    get start() {
        return this.open.start;
    }
    get end() {
        return this.close.end;
    }
    get ranges() {
        const pairsRange = this.pairs.flatMap(item => item.ranges);
        return [this.open]
            .concat(pairsRange)
            .concat(this.close);
    }
    toLines() {
        const pairLines = this.pairs.flatMap(item => item.toLines());
        pairLines[0] = this.open.content + pairLines[0];
        pairLines[pairLines.length - 1] += this.close.content;
        return pairLines;
    }
}
exports.AssociativeArray = AssociativeArray;
/**
 * Class containing all valid identifiers
 */
class Identifier extends SuffixTermBase {
    /**
     * Constructor for suffix term identifiers
     * @param token identifier token
     */
    constructor(token) {
        super();
        this.token = token;
    }
    get start() {
        return this.token.start;
    }
    get end() {
        return this.token.end;
    }
    get ranges() {
        return [this.token];
    }
    get isKeyword() {
        return !(this.token.type === tokenTypes_1.TokenType.id);
    }
    toLines() {
        return [`${this.token.content}`];
    }
}
exports.Identifier = Identifier;
/**
 * Class containing all valid groupings
 */
class Grouping extends SuffixTermBase {
    /**
     * Grouping constructor
     * @param open open paren token
     * @param expr expression within the grouping
     * @param close close paren token
     */
    constructor(open, expr, close) {
        super();
        this.open = open;
        this.expr = expr;
        this.close = close;
    }
    get start() {
        return this.open.start;
    }
    get end() {
        return this.close.end;
    }
    get ranges() {
        return [this.open, this.expr, this.close];
    }
    toString() {
        return `${this.open.content}${this.expr.toString()}${this.close.content}`;
    }
    toLines() {
        const lines = this.expr.toLines();
        lines[0] = `${this.open.content}${lines[0]}`;
        lines[lines.length - 1] = `${lines[lines.length - 1]}${this.close.content}`;
        return lines;
    }
}
exports.Grouping = Grouping;
/**
 * Class containing all valid key-value pair
 */
class Pair extends SuffixTermBase {
    /**
     * Pair constructor
     * @param key key of pair
     * @param colon middle :
     * @param value value of pair
     */
    constructor(key, colon, value) {
        super();
        this.key = key;
        this.colon = colon;
        this.value = value;
    }
    get start() {
        return this.key.start;
    }
    get end() {
        return this.value.end;
    }
    get ranges() {
        return [this.key, this.colon, this.value];
    }
    toLines() {
        const keyLines = this.key.toLines();
        const valueLines = this.value.toLines();
        keyLines[keyLines.length - 1] += this.colon.content + valueLines[0];
        return keyLines.concat(valueLines.slice(1));
    }
}
exports.Pair = Pair;
//# sourceMappingURL=suffixterm.js.map