"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockLogger = exports.Logger = void 0;
/**
 * Simple Logger, reference: kos-language-server
 */
class Logger {
    constructor(connection) {
        this.connection = connection;
    }
    error(message) {
        this.connection.warn(message);
    }
    warn(message) {
        this.connection.warn(message);
    }
    log(message) {
        this.connection.log(message);
    }
    info(message) {
        this.connection.info(message);
    }
}
exports.Logger = Logger;
/**
 * A mock logger for testings or performance
 * reference: kos-language-server
 */
exports.mockLogger = {
    error: (_) => { },
    warn: (_) => { },
    info: (_) => { },
    log: (_) => { }
};
//# sourceMappingURL=logger.js.map