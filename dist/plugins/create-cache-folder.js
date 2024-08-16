"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCacheFolder = void 0;
const node_path_1 = require("node:path");
const promises_1 = __importDefault(require("node:fs/promises"));
const logger_1 = require("./logger");
const createCacheFolder = (cachePath) => {
    return {
        name: 'create-cache-folder',
        setup: (build) => {
            build.onStart(() => __awaiter(void 0, void 0, void 0, function* () {
                const cache = cachePath !== null && cachePath !== void 0 ? cachePath : (0, node_path_1.resolve)('wwwroot/Cache');
                try {
                    const stat = yield promises_1.default.stat(cache);
                    if (stat.isDirectory()) {
                        console.log('Папка Cache уже существует.');
                    }
                }
                catch (e) {
                    if (e instanceof Error && e.code === 'ENOENT') {
                        yield promises_1.default.mkdir(cache, { recursive: true });
                        logger_1.loggerMessages.cacheCreated();
                    }
                    else {
                        console.error('Произошла ошибка при проверке или создании папки Cache: ', e);
                    }
                }
            }));
        }
    };
};
exports.createCacheFolder = createCacheFolder;
