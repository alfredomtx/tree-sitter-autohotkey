"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoopKind = exports.VarKind = void 0;
var VarKind;
(function (VarKind) {
    VarKind[VarKind["variable"] = 0] = "variable";
    VarKind[VarKind["parameter"] = 1] = "parameter";
    VarKind[VarKind["property"] = 2] = "property";
})(VarKind = exports.VarKind || (exports.VarKind = {}));
var ScoopKind;
(function (ScoopKind) {
    ScoopKind[ScoopKind["SupperGlobal"] = 0] = "SupperGlobal";
    ScoopKind[ScoopKind["Global"] = 1] = "Global";
    ScoopKind[ScoopKind["Local"] = 2] = "Local";
})(ScoopKind = exports.ScoopKind || (exports.ScoopKind = {}));
//# sourceMappingURL=types.js.map