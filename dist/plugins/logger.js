"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.loggerMessages = void 0;
function createLogger(prefix, message, isError = false) {
    return (response) => {
        console.log(isError ? '\x1b[31m%s\x1b[0m' : '\x1b[32m%s\x1b[0m', `${new Date().toLocaleTimeString()} ${prefix}: ${message}`);
        if (isError) {
            console.log(response);
        }
    };
}
exports.loggerMessages = {
    buildFulfilled: createLogger("[ESBuild]" /* prefix.default */, '✅  Сборка выполнена успешно!'),
    buildRejected: createLogger("[ESBuild]" /* prefix.default */, 'Ошибка cборки', true),
    watchFulfilled: createLogger("[ESBuild Watch]" /* prefix.watch */, '👀 Отслеживание успешно включено!'),
    watchRejected: createLogger("[ESBuild Watch]" /* prefix.watch */, 'Ошибка отслеживания', true),
    watchStarted: createLogger("[ESBuild Watch]" /* prefix.watch */, 'Началась сборка файлов'),
    watchFinished: createLogger("[ESBuild Watch]" /* prefix.watch */, 'Закончилась сборка файлов'),
    removeOutdir: createLogger("[ESBuild]" /* prefix.default */, '♻️ Удалена старая сборка')
};
exports.plugin = {
    name: 'watch-messages',
    setup(build) {
        build.onStart(exports.loggerMessages.watchStarted);
        build.onEnd(exports.loggerMessages.watchFinished);
    },
};
