"use strict";
/**
 * basic set operations, from MDN
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.difference = exports.symmetricDifference = exports.intersection = exports.union = exports.isSuperset = void 0;
/**
 * Is supper set of subset
 * @param set
 * @param subset
 */
function isSuperset(set, subset) {
    for (let elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}
exports.isSuperset = isSuperset;
/**
 * Return union set of setA and setB
 * @param setA
 * @param setB
 */
function union(setA, setB) {
    let _union = new Set(setA);
    for (let elem of setB) {
        _union.add(elem);
    }
    return _union;
}
exports.union = union;
function intersection(setA, setB) {
    let _intersection = new Set();
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}
exports.intersection = intersection;
function symmetricDifference(setA, setB) {
    let _difference = new Set(setA);
    for (let elem of setB) {
        if (_difference.has(elem)) {
            _difference.delete(elem);
        }
        else {
            _difference.add(elem);
        }
    }
    return _difference;
}
exports.symmetricDifference = symmetricDifference;
function difference(setA, setB) {
    let _difference = new Set(setA);
    for (let elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}
exports.difference = difference;
//# sourceMappingURL=setOperation.js.map