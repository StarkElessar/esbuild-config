"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearFolder = void 0;
const node_fs_1 = require("node:fs");
const logger_1 = require("./logger");
exports.clearFolder = {
    name: 'clear-folder',
    setup: (build) => {
        build.onStart(() => {
            const { outdir } = build.initialOptions;
            if (outdir && (0, node_fs_1.existsSync)(outdir)) {
                (0, node_fs_1.rmSync)(outdir, { recursive: true });
                logger_1.loggerMessages.removeOutdir();
            }
        });
    }
};
