"use strict";
/**
 * reference: kos-language-server
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoService = exports.IoKind = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * What kind of entity is this
 */
var IoKind;
(function (IoKind) {
    /**
     * The io entity is a file
     */
    IoKind[IoKind["file"] = 0] = "file";
    /**
     * The io entity is a directory
     */
    IoKind[IoKind["folder"] = 1] = "folder";
})(IoKind = exports.IoKind || (exports.IoKind = {}));
function readFileAsync(path, encoding) {
    return new Promise((resolve, reject) => {
        fs_1.readFile(path, { encoding }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}
/**
 * A small set of functionality for loading files and directory of files
 */
class IoService {
    constructor() { }
    /**
     * Load a file from a given path
     * @param path the system path
     */
    load(path) {
        return readFileAsync(path, 'utf-8');
    }
    fileExistsSync(path) {
        return fs_1.existsSync(path) && fs_1.lstatSync(path).isFile();
    }
    /**
     * What entities are in the relevant directory
     * @param path The full path of the request
     */
    statDirectory(path) {
        const isDirectory = fs_1.existsSync(path) && fs_1.lstatSync(path).isDirectory();
        if (!isDirectory) {
            return [];
        }
        const directory = path;
        // check if file exists then
        if (!fs_1.existsSync(directory)) {
            return [];
        }
        const files = fs_1.readdirSync(directory);
        let entities = [];
        for (const file of files) {
            const path = path_1.join(directory, file);
            // in case of permition denied
            try {
                entities.push({
                    path: file,
                    kind: fs_1.statSync(path).isDirectory() ? IoKind.folder : IoKind.file
                });
            }
            catch (error) {
                // pass, just skip it
                continue;
            }
        }
        return entities;
    }
}
exports.IoService = IoService;
//# sourceMappingURL=ioService.js.map