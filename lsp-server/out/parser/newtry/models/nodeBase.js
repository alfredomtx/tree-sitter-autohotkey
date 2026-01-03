"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeBase = void 0;
class NodeBase {
    /**
     * String representation of the syntax node
     */
    toString() {
        return this.toLines().join('\r\n');
    }
    /**
     * Create a uri location for this node element
     * @param uri uri to set location to
     */
    toLocation(uri) {
        return { uri, range: { start: this.start, end: this.end } };
    }
}
exports.NodeBase = NodeBase;
//# sourceMappingURL=nodeBase.js.map