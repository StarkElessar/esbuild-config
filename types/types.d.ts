export interface DefineConfig {
	isDevelopment: boolean;
	aliases: Record<string, string>;
	entryPoints: string[];
	outdir: string;
	tsconfig?: string;
}

type DefineConfig = (externalConfig: DefineConfig) => Promise<void>;

export declare module 'esbuild-config' {
	export const defineConfig: DefineConfig;
}