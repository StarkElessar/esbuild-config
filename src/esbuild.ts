import ESBuild from 'esbuild';
import { defaultConfig } from './default-config';
import { loggerMessages } from './plugins/logger';

export const defineConfig = async (externalConfig: DefineConfig) => {
	const isDevelopment = process.argv.includes('--development');
	const config = defaultConfig(externalConfig);

	const init = async () => {
		try {
			if (isDevelopment) {
				const context = await ESBuild.context(config);
				await context.watch();
			}
			else {
				await ESBuild.build(config);
			}
		}
		catch {
			loggerMessages[isDevelopment ? 'watchRejected' : 'buildRejected']();
			process.exit(1);
		}
		finally {
			loggerMessages[isDevelopment ? 'watchFulfilled' : 'buildFulfilled']();
		}
	};

	await init();
}