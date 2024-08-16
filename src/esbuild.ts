import ESBuild from 'esbuild';
import { defaultConfig } from './default-config';
import { loggerMessages } from './plugins/logger';

export const defineConfig = async (externalConfig: DefineConfig) => {
	const config = defaultConfig(externalConfig);

	const init = async () => {
		try {
			if (externalConfig.isDevelopment) {
				const context = await ESBuild.context(config);
				await context.watch();
			}
			else {
				await ESBuild.build(config);
			}
		}
		catch {
			loggerMessages[externalConfig.isDevelopment ? 'watchRejected' : 'buildRejected']();
			process.exit(1);
		}
		finally {
			loggerMessages[externalConfig.isDevelopment ? 'watchFulfilled' : 'buildFulfilled']();
		}
	};

	await init();
}