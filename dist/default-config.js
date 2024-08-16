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
exports.defaultConfig = void 0;
const postcss_sort_media_queries_1 = __importDefault(require("postcss-sort-media-queries"));
const esbuild_sass_plugin_1 = require("esbuild-sass-plugin");
const postcss_1 = __importDefault(require("postcss"));
const autoprefixer_1 = __importDefault(require("autoprefixer"));
const esbuild_plugin_alias_path_1 = require("esbuild-plugin-alias-path");
const clear_folder_1 = require("./plugins/clear-folder");
const logger_1 = require("./plugins/logger");
const create_cache_folder_1 = require("./plugins/create-cache-folder");
const defaultConfig = (props) => {
    const { outdir, entryPoints, tsconfig, isDevelopment, aliases, aspCachePath } = props;
    return {
        outdir,
        entryPoints,
        tsconfig,
        bundle: true,
        metafile: true,
        minify: !isDevelopment,
        sourcemap: isDevelopment,
        charset: 'utf8',
        plugins: [
            clear_folder_1.clearFolder,
            (0, create_cache_folder_1.createCacheFolder)(aspCachePath),
            (0, esbuild_plugin_alias_path_1.aliasPath)({ alias: aliases }),
            (0, esbuild_sass_plugin_1.sassPlugin)({
                transform(source) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { css } = yield (0, postcss_1.default)([
                            autoprefixer_1.default,
                            (0, postcss_sort_media_queries_1.default)({ sort: 'desktop-first' })
                        ]).process(source, {
                            from: undefined
                        });
                        return css;
                    });
                },
            }),
            {
                name: 'ignore-assets',
                setup(build) {
                    build.onResolve({ filter: /\.(svg|png|jpe?g|gif|woff|woff2)$/ }, (args) => {
                        return {
                            path: args.path,
                            external: true
                        };
                    });
                },
            },
            logger_1.plugin
        ],
        legalComments: isDevelopment ? 'eof' : 'none',
        drop: isDevelopment ? [] : ['console', 'debugger'],
        //-----------optimisation-----------
        assetNames: 'assets/[name]-[hash]',
        chunkNames: 'chunks/[name]-[hash]'
    };
};
exports.defaultConfig = defaultConfig;
