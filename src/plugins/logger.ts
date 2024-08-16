import { Plugin, BuildResult } from 'esbuild';

const enum prefix {
    default = '[ESBuild]',
    watch = '[ESBuild Watch]'
}

function createLogger(prefix: prefix, message: string, isError = false) {
    return (response?: BuildResult | void) => {
        console.log(
            isError ? '\x1b[31m%s\x1b[0m' : '\x1b[32m%s\x1b[0m', 
            `${new Date().toLocaleTimeString()} ${prefix}: ${message}`
        );

        if (isError) {
            console.log(response);
        }
    }
}

export const loggerMessages = {
    buildFulfilled: createLogger(prefix.default, '✅  Сборка выполнена успешно!'),
    buildRejected: createLogger(prefix.default, 'Ошибка cборки', true),

    watchFulfilled: createLogger(prefix.watch, '👀 Отслеживание успешно включено!'),
    watchRejected: createLogger(prefix.watch, 'Ошибка отслеживания', true),
    watchStarted: createLogger(prefix.watch, 'Началась сборка файлов'),
    watchFinished: createLogger(prefix.watch, 'Закончилась сборка файлов'),

    removeOutdir: createLogger(prefix.default, '♻️ Удалена старая сборка')
}

export const plugin: Plugin = {
    name : 'watch-messages',
    setup (build) {
        build.onStart(loggerMessages.watchStarted);
        build.onEnd(loggerMessages.watchFinished);
    },
}