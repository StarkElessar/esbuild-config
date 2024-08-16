import { resolve } from 'node:path';
import promises from 'node:fs/promises';
import { Plugin } from 'esbuild';
import { loggerMessages } from './logger';

export const createCacheFolder = (cachePath?: string): Plugin => {
	return {
		name: 'create-cache-folder',
		setup: (build) => {
			build.onStart(async () => {
				const cache = cachePath ?? resolve('wwwroot/Cache');

				try {
					const stat = await promises.stat(cache);
					if (stat.isDirectory()) {
						console.log('Папка Cache уже существует.');
					}
				}
				catch (e) {
					if (e instanceof Error && (e as NodeJS.ErrnoException).code === 'ENOENT') {
						await promises.mkdir(cache, { recursive: true });
						loggerMessages.cacheCreated();
					}
					else {
						console.error('Произошла ошибка при проверке или создании папки Cache: ', e);
					}
				}
			});
		}
	};
};